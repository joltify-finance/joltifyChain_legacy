package cli_test

import (
	"fmt"
	"strconv"
	"testing"
	"time"

	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/bech32/legacybech32" //nolint
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gitlab.com/joltify/joltifychain/testutil/network"
	"gitlab.com/joltify/joltifychain/x/vault/client/cli"

	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func preparePool(t *testing.T) (*network.Network, []*types.CreatePool) {
	t.Helper()
	height := []int{4, 7}
	cfg := network.DefaultConfig()
	state := types.GenesisState{}
	require.NoError(t, cfg.Codec.UnmarshalJSON(cfg.GenesisState[types.ModuleName], &state))
	poolPubKey := "joltpub1addwnpepq2ax6hva3nkzup7xlsrr5nzc7wjfp86hfnx30z9sclet92qehdwzutn0ag3"
	operatorStr := "joltval1yu5wjall4atm29puasahplrkvyz3vplmngm7kk"
	operator, err := sdk.ValAddressFromBech32(operatorStr)
	require.NoError(t, err)
	validators := make([]*stakingtypes.Validator, len(height))
	for i, el := range height {
		sk := ed25519.GenPrivKey()
		desc := stakingtypes.NewDescription("tester", "testId", "www.test.com", "aaa", "aaa")
		testValidator, err := stakingtypes.NewValidator(operator, sk.PubKey(), desc)
		require.NoError(t, err)
		validators = append(validators, &testValidator)
		validators[i] = &testValidator
		pro := types.PoolProposal{
			PoolPubKey: poolPubKey,
			Nodes:      []sdk.AccAddress{operator.Bytes()},
		}
		state.CreatePoolList = append(state.CreatePoolList, &types.CreatePool{BlockHeight: strconv.Itoa(el), Validators: []stakingtypes.Validator{testValidator}, Proposal: []*types.PoolProposal{&pro}})
	}
	state.Params.BlockChurnInterval = 3

	buf, err := cfg.Codec.MarshalJSON(&state)
	require.NoError(t, err)
	cfg.GenesisState[types.ModuleName] = buf

	var stateVault stakingtypes.GenesisState
	require.NoError(t, cfg.Codec.UnmarshalJSON(cfg.GenesisState[stakingtypes.ModuleName], &stateVault))
	stateVault.Params.MaxValidators = 3
	buf, err = cfg.Codec.MarshalJSON(&stateVault)
	require.NoError(t, err)
	cfg.GenesisState[stakingtypes.ModuleName] = buf

	net := network.New(t, cfg)
	return net, state.CreatePoolList
}

// this test will fail as it is not from pool owner
func TestCreateIssueTokenFail(t *testing.T) {
	setupBech32Prefix()
	net, _ := preparePool(t)
	val := net.Validators[0]
	ctx := val.ClientCtx
	id := "0"

	fields := []string{"100vvusd", "jolt1xdpg5l3pxpyhxqg4ey4krq2pf9d3sphmmuuugg"}
	for _, tc := range []struct {
		desc string
		id   string
		args []string
		err  error
		code uint32
	}{
		{
			id:   id,
			desc: "valid issue token",
			args: []string{
				fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
				fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
			},
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			args := []string{tc.id}

			args = append(args, fields...)
			args = append(args, tc.args...)
			out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateIssueToken(), args)
			var resp sdk.TxResponse
			require.NoError(t, ctx.Codec.UnmarshalJSON(out.Bytes(), &resp))
			expected := fmt.Sprintf("failed to execute message; message index: 0: creator %v is not in pool addresses set: invalid request", val.Address.String())
			require.Equal(t, expected, resp.RawLog)
			require.Nil(t, err)
			require.NotEqual(t, uint32(0), resp.Code)
		})
	}
}

func networkPrepare(t *testing.T, maxValidator uint32, addr string) (*network.Network, []*types.CreatePool) {
	t.Helper()
	cfg := network.DefaultConfig()
	cfg.MinGasPrices = "0stake"
	state := types.GenesisState{}
	stateStaking := stakingtypes.GenesisState{}
	stateBank := banktypes.GenesisState{}

	require.NoError(t, cfg.Codec.UnmarshalJSON(cfg.GenesisState[types.ModuleName], &state))
	require.NoError(t, cfg.Codec.UnmarshalJSON(cfg.GenesisState[stakingtypes.ModuleName], &stateStaking))
	require.NoError(t, cfg.Codec.UnmarshalJSON(cfg.GenesisState[banktypes.ModuleName], &stateBank))

	state.Params.BlockChurnInterval = 3
	buf, err := cfg.Codec.MarshalJSON(&state)
	require.NoError(t, err)
	stateBank.Balances = []banktypes.Balance{banktypes.Balance{Address: addr, Coins: sdk.Coins{sdk.NewCoin("stake", sdk.NewInt(100000))}}}
	bankBuf, err := cfg.Codec.MarshalJSON(&stateBank)
	require.NoError(t, err)
	cfg.GenesisState[banktypes.ModuleName] = bankBuf

	cfg.GenesisState[types.ModuleName] = buf

	var stateVault stakingtypes.GenesisState
	require.NoError(t, cfg.Codec.UnmarshalJSON(cfg.GenesisState[stakingtypes.ModuleName], &stateVault))
	stateVault.Params.MaxValidators = maxValidator
	buf, err = cfg.Codec.MarshalJSON(&stateVault)
	require.NoError(t, err)
	cfg.GenesisState[stakingtypes.ModuleName] = buf

	nb := network.New(t, cfg)
	return nb, state.CreatePoolList
}

// this test will fail as it is not from pool owner
func TestCreateIssue(t *testing.T) {
	setupBech32Prefix()
	k2 := keyring.NewInMemory()
	_, _, err := k2.NewMnemonic("0",
		keyring.English, sdk.FullFundraiserPath, keyring.DefaultBIP39Passphrase, hd.Secp256k1)
	assert.Nil(t, err)
	v, err := k2.Key("0")
	assert.Nil(t, err)
	net, _ := networkPrepare(t, 3, v.GetAddress().String())

	val := net.Validators[0]
	ctx := val.ClientCtx
	key := ctx.Keyring
	info, err := key.List()
	assert.Nil(t, err)

	am, err := k2.ExportPrivKeyArmor("0", "testme")
	assert.Nil(t, err)

	err = key.ImportPrivKey("0", am, "testme")
	assert.Nil(t, err)

	thisInfo, err := key.Key("0")
	assert.Nil(t, err)

	pubkey := legacybech32.MustMarshalPubKey(legacybech32.AccPK, thisInfo.GetPubKey()) //nolint
	createPoolFields := []string{pubkey, "10"}

	commonArgs := []string{
		fmt.Sprintf("--%s=%s", flags.FlagFrom, info[0].GetAddress()),
		fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
		fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
		fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
	}

	commonArgs2 := []string{
		fmt.Sprintf("--%s=%s", flags.FlagFrom, thisInfo.GetAddress()),
		fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
		fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
	}
	var args []string
	args = append(args, createPoolFields...)
	args = append(args, commonArgs...)

	_, err = net.WaitForHeightWithTimeout(10, time.Minute)
	assert.Nil(t, err)

	out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateCreatePool(), args)
	assert.Nil(t, err)
	var resp sdk.TxResponse
	require.NoError(t, ctx.Codec.UnmarshalJSON(out.Bytes(), &resp))

	_, err = net.WaitForHeightWithTimeout(15, time.Minute)
	assert.Nil(t, err)
	// now we submit the issue token request
	issueTokenfields := []string{"100vvusd", "jolt1xdpg5l3pxpyhxqg4ey4krq2pf9d3sphmmuuugg"}
	id := "0"
	issueTokenArgs := []string{id}
	issueTokenArgs = append(issueTokenArgs, issueTokenfields...)
	issueTokenArgs = append(issueTokenArgs, commonArgs2...)
	out, err = clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateIssueToken(), issueTokenArgs)
	assert.Nil(t, err)
	var respIssueToken sdk.TxResponse
	require.NoError(t, ctx.Codec.UnmarshalJSON(out.Bytes(), &respIssueToken))
	fmt.Printf(">>>>>>###>>>>%v\n", respIssueToken.RawLog)
	require.Equal(t, uint32(0), respIssueToken.Code)
}
