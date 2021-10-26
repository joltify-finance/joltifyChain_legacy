package keeper

import (
	"time"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/joltify/joltifyChain/x/invoice/types"
)

// SetSellOrder set a specific sellOrder in the store from its index
func (k Keeper) SetSellOrder(ctx sdk.Context, sellOrder types.SellOrder) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SellOrderKey))
	b := k.cdc.MustMarshalBinaryBare(&sellOrder)
	store.Set(types.KeyPrefix(sellOrder.SellOrderID), b)
}

// GetSellOrder returns a sellOrder from its index
func (k Keeper) GetSellOrder(ctx sdk.Context, index string) (val types.SellOrder, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SellOrderKey))

	b := store.Get(types.KeyPrefix(index))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshalBinaryBare(b, &val)
	return val, true
}

// RemoveSellOrder removes a sellOrder from the store
func (k Keeper) RemoveSellOrder(ctx sdk.Context, index string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SellOrderKey))
	store.Delete(types.KeyPrefix(index))
}

// GetAllSellOrder returns all sellOrder
func (k Keeper) GetAllSellOrder(ctx sdk.Context) (list []types.SellOrder) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SellOrderKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.SellOrder
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

func (k Keeper) RemoveExpireInvoice(ctx sdk.Context) error {
	allSellOrders := k.GetAllAddedSellOrder(ctx)
	for _, sellOrder := range allSellOrders {
		createdTime := sellOrder.CreatedTime
		duration := sellOrder.SellDuration
		expiredTime := createdTime.Add(duration)
		if expiredTime.Before(time.Now()) {
			// todo we need to launch the transfer before we delete the order
			// if we withdraw the sell order, we need to unlock the locked money
			invoiceToSell, ok := k.GetInvoice(ctx, sellOrder.InvoiceID)
			if !ok {
				return sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, "invalid invoice ID")
			}
			invoiceToSell.InvoiceFinance.AmountLocked = invoiceToSell.InvoiceFinance.AmountLocked.Sub(sellOrder.LeftAmount)
			k.SetInvoice(ctx, invoiceToSell)
			sellOrder.IsDeleted = true
			k.SetSellOrder(ctx, sellOrder)
			k.RemoveAddedSellOrder(ctx, sellOrder.SellOrderID)
		}
	}
	return nil
}
