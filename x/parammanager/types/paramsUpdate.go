package types

type MintParams struct {
	Minter struct {
		AnnualProvisions string `yaml:"annual_provisions"`
		Inflation        string `yaml:"inflation"`
	} `yaml:"minter"`
	Params struct {
		BlocksPerYear       string `yaml:"blocks_per_year"`
		GoalBonded          string `yaml:"goal_bonded"`
		InflationMax        string `yaml:"inflation_max"`
		InflationMin        string `yaml:"inflation_min"`
		InflationRateChange string `yaml:"inflation_rate_change"`
	} `yaml:"params"`
}

type ParamUpdate struct {
	Version           string `yaml:"version"`
	ActiveBlockHeight int64  `yaml:"active_block_height"`
	Mint              MintParams
}
