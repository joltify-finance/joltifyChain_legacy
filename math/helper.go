package math

import sdk "github.com/cosmos/cosmos-sdk/types"

func SubMut(a, b sdk.Dec) sdk.Dec {
	c := a.Sub(b)
	return c
}

func NegMut(a sdk.Dec) sdk.Dec {
	return a.Neg()
}

func AddMut(a, b sdk.Dec) sdk.Dec {
	c := a.Add(b)
	return c
}

func MulMut(a, b sdk.Dec) sdk.Dec {
	c := a.Mul(b)
	return c
}

func Clone(a sdk.Dec) sdk.Dec {
	return a.Add(sdk.NewDec(0))
}
