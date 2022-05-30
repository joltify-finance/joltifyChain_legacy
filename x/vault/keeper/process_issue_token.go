package keeper

import (
	"context"
	"encoding/hex"
	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"
	"github.com/cosmos/cosmos-sdk/types/bech32/legacybech32" //nolint
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func (k msgServer) checkAddressInPool(pool []cryptotypes.Address, creator []byte) bool {
	for _, el := range pool {
		if hex.EncodeToString(el.Bytes()) == hex.EncodeToString(creator) {
			return true
		}
	}
	return false
}

func (k msgServer) getLastTwoPools(goCtx context.Context) ([]cryptotypes.Address, error) {
	req := types.QueryLatestPoolRequest{}
	lastTwoPools := make([]cryptotypes.Address, 2)

	lastPoolsInfo, err := k.GetLastPool(goCtx, &req)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "fail to get the last pool address")
	}

	pk, err := legacybech32.UnmarshalPubKey(legacybech32.AccPK, lastPoolsInfo.GetPools()[0].GetCreatePool().PoolPubKey) //nolint
	if err != nil {
		return nil, err
	}
	lastTwoPools[1] = pk.Address()

	// now we get the pool address before the last
	if len(lastPoolsInfo.GetPools()) == 2 {
		pk, err := legacybech32.UnmarshalPubKey(legacybech32.AccPK, lastPoolsInfo.GetPools()[1].GetCreatePool().PoolPubKey) //nolint
		if err != nil {
			return nil, err
		}
		lastTwoPools[0] = pk.Address()
	}
	return lastTwoPools, nil
}
