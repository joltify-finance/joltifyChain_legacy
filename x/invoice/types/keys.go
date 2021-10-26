package types

const (
	// ModuleName defines the module name
	ModuleName = "invoice"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey is the message route for slashing
	RouterKey = ModuleName

	// QuerierRoute defines the module's query routing key
	QuerierRoute = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_invoice"

	// this line is used by starport scaffolding # ibc/keys/name
)

// this line is used by starport scaffolding # ibc/keys/port

func KeyPrefix(p string) []byte {
	return []byte(p)
}

const (
	InvoiceKey = "Invoice-value-"
)

const (
	SellOrderKey = "SellOrder-value-"
)

const (
	AddedSellOrderKey = "Added-SellOrder-value-"
)

const (
	PlaceOrderKey = "PlaceOrder-value-"
)
