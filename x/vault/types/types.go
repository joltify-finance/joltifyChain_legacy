package types

import stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"

type (
	ValidatorsByAddr map[string][]byte

	ValidatorPowerInfo struct {
		Validator stakingtypes.Validator
		Power     int64
	}
)
