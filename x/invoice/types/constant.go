package types

type Status int32

const STABLECOIN = "VUSD"
const (
	Success Status = iota
	Failed
)
