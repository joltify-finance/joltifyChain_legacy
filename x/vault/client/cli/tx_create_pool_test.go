package cli_test

import (
	stderr "errors"
	"fmt"
	"testing"

	"github.com/cosmos/cosmos-sdk/client/flags"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	"github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"

	"gitlab.com/joltify/joltifychain/joltifychain/testutil/network"
	"gitlab.com/joltify/joltifychain/joltifychain/x/vault/client/cli"
)

func setupBech32Prefix() {
	config := sdk.GetConfig()
	// thorchain will import go-tss as a library , thus this is not needed, we copy the prefix here to avoid go-tss to import thorchain

	config.SetBech32PrefixForAccount("jolt", "joltpub")
	config.SetBech32PrefixForValidator("joltval", "joltvpub")
	config.SetBech32PrefixForConsensusNode("joltvalcons", "joltcpub")
}

func TestCreateCreatePool(t *testing.T) {
	setupBech32Prefix()
	net := network.New(t)
	val := net.Validators[0]
	ctx := val.ClientCtx

	sk := ed25519.GenPrivKey()
	sk.PubKey().Address()
	pubkey, err := sdk.Bech32ifyPubKey(sdk.Bech32PubKeyTypeAccPub, sk.PubKey())
	require.NoError(t, err)

	for _, tc := range []struct {
		desc   string
		id     string
		fields []string
		args   []string
		err    error
		code   uint32
	}{
		{
			id:     "0",
			err:    stderr.New("invalid pubkey (invalid Bech32 prefix; expected invpub, got inv): invalid pubkey"),
			desc:   "invalid",
			fields: []string{"inv12k0nzax6dr3d9tssxne7ygmhdpj79rpx797a4k", "1"},
			args: []string{
				fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
				fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
			},
		},

		{
			id:     "1",
			desc:   "valid",
			fields: []string{pubkey, "1"},
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
			var args []string
			args = append(args, tc.fields...)
			args = append(args, tc.args...)
			out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateCreatePool(), args)
			if tc.err != nil {
				require.Equal(t, err.Error(), tc.err.Error())
			} else {
				require.NoError(t, err)
				var resp sdk.TxResponse
				require.NoError(t, ctx.JSONMarshaler.UnmarshalJSON(out.Bytes(), &resp))
				require.Equal(t, tc.code, resp.Code)
			}
		})
	}
}
