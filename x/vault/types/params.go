package types

import (
	stderr "errors"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"

	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	yaml "gopkg.in/yaml.v2"
)

const (
	DefaultBlockChurnInterval = 20
	DEFAULTPOWER              = 1000
	DEFAULTSTEP               = 10
	DEFAULTRATIO              = 80
)

var (
	KeyBlockChurnInterval = []byte("blockChurnInterval")
	KeyPower              = []byte("power")
	KeyStep               = []byte("step")
	KeyRatio              = []byte("candidateRatio")
)
var _ paramtypes.ParamSet = (*Params)(nil)

func ParamKeyTable() paramtypes.KeyTable {
	return paramtypes.NewKeyTable().RegisterParamSet(&Params{})
}

func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
	return paramtypes.ParamSetPairs{
		paramtypes.NewParamSetPair(KeyBlockChurnInterval, &p.BlockChurnInterval, validateInteger),
		paramtypes.NewParamSetPair(KeyPower, &p.Power, validateInteger),
		paramtypes.NewParamSetPair(KeyStep, &p.Step, validateInteger),
		paramtypes.NewParamSetPair(KeyRatio, &p.CandidateRatio, validateFloat),
	}
}

// NewParams creates a new Params instance
func NewParams(blockChurnInterval, power, step int64, ratio sdk.Dec) Params {
	return Params{
		BlockChurnInterval: blockChurnInterval,
		Power:              power,
		Step:               step,
		CandidateRatio:     ratio,
	}
}

// DefaultParams returns a default set of parameters.
func DefaultParams() Params {
	return NewParams(
		DefaultBlockChurnInterval,
		DEFAULTPOWER,
		DEFAULTSTEP,
		sdk.NewDecWithPrec(DEFAULTRATIO, 2),
	)
}

// String returns a human readable string representation of the parameters.
func (p Params) String() string {
	out, _ := yaml.Marshal(p)
	return string(out)
}

// validate a set of params
func (p Params) Validate() error {
	if err := validateInteger(p.BlockChurnInterval); err != nil {
		return err
	}

	if err := validateInteger(p.Power); err != nil {
		return err
	}

	if err := validateInteger(p.Step); err != nil {
		return err
	}

	if err := validateInteger(p.CandidateRatio); err != nil {
		return err
	}
	return nil
}

func validateInteger(i interface{}) error {

	v, ok := i.(int64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}

	if v < 0 {
		return stderr.New("invalid height")
	}

	return nil
}
func validateFloat(i interface{}) error {
	v, ok := i.(sdk.Dec)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}

	if v.IsNegative() {
		return fmt.Errorf("goal bonded cannot be negative: %s", v)
	}
	if v.GT(sdk.OneDec()) {
		return fmt.Errorf("goal bonded too large: %s", v)
	}

	return nil
}
