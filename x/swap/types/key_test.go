package types

import (
	"math"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/stretchr/testify/require"
)

func TestGetPoolShareDenom(t *testing.T) {
	denom := GetPoolShareDenom(0)
	require.NoError(t, sdk.ValidateDenom(denom))
	require.Equal(t, "jswap/pool/0", denom)

	denom = GetPoolShareDenom(10)
	require.NoError(t, sdk.ValidateDenom(denom))
	require.Equal(t, "jswap/pool/10", denom)

	denom = GetPoolShareDenom(math.MaxUint64)
	require.NoError(t, sdk.ValidateDenom(denom))
	require.Equal(t, "jswap/pool/18446744073709551615", denom)
}
