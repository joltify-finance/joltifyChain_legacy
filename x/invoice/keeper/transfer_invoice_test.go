package keeper

import (
	"encoding/hex"
	"github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"
	"gitlab.com/joltify/joltifychain/joltifychain/x/invoice/tools"
	"gitlab.com/joltify/joltifychain/joltifychain/x/invoice/types"
)

func newRootInvoice(t *testing.T, creator sdk.AccAddress, invoiceName string) (types.Invoice, sdk.Context, *Keeper) {
	keeper, ctx := setupKeeper(t)
	srv := NewMsgServerImpl(*keeper)
	wctx := sdk.WrapSDKContext(ctx)
	_, err := srv.CreateInvoice(wctx, &types.MsgCreateInvoice{Creator: creator, OrigOwner: creator, Name: invoiceName, Apy: "100", Amount: sdk.NewInt(100), Url: "testURL", IsRootOwner: true})
	require.NoError(t, err)
	invoiceIDByte, err := tools.GenHash([]string{creator.String(), creator.String(), invoiceName})
	require.NoError(t, err)
	invoiceID := hex.EncodeToString(invoiceIDByte)
	rootInvoice, ok := keeper.GetInvoice(ctx, invoiceID)
	require.True(t, ok)
	return rootInvoice, ctx, keeper
}

func Test_msgServer_TransferInvoice(t *testing.T) {
	invoiceName := "any"
	setupBech32Prefix()
	sk := ed25519.GenPrivKey()
	addr, err := sdk.AccAddressFromHex(sk.PubKey().Address().String())
	require.Nil(t, err)
	creatorStr := addr.String()

	sk = ed25519.GenPrivKey()
	addr, err = sdk.AccAddressFromHex(sk.PubKey().Address().String())
	require.Nil(t, err)
	user2Str := addr.String()

	sk = ed25519.GenPrivKey()
	addr, err = sdk.AccAddressFromHex(sk.PubKey().Address().String())
	require.Nil(t, err)
	user3Str := addr.String()

	sk = ed25519.GenPrivKey()
	addr, err = sdk.AccAddressFromHex(sk.PubKey().Address().String())
	require.Nil(t, err)
	user4Str := addr.String()

	sk = ed25519.GenPrivKey()
	addr, err = sdk.AccAddressFromHex(sk.PubKey().Address().String())
	require.Nil(t, err)
	user5Str := addr.String()

	creator, err := sdk.AccAddressFromBech32(creatorStr)
	require.NoError(t, err)
	user2, err := sdk.AccAddressFromBech32(user2Str)
	require.NoError(t, err)
	user3, err := sdk.AccAddressFromBech32(user3Str)
	require.NoError(t, err)
	user4, err := sdk.AccAddressFromBech32(user4Str)
	require.NoError(t, err)
	user5, err := sdk.AccAddressFromBech32(user5Str)
	require.NoError(t, err)
	type args struct {
		ctx              sdk.Context
		claimedOwner     sdk.AccAddress
		sharesAllocation map[string]sdk.Int
		parentInvoice    *types.Invoice
	}

	type testStruct struct {
		name    string
		args    args
		wantErr bool
	}
	tstruct := testStruct{
		name: "valid transfer",
		args: args{
			claimedOwner: creator,
		},
		wantErr: false,
	}

	// for the fist test, we test creating a new invoice from the root invoice
	t.Run(tstruct.name, func(t *testing.T) {
		rootInvoice, ctx, keeper := newRootInvoice(t, creator, invoiceName)
		// we need to add the money in the locked amount before we can transfer
		rootInvoice.InvoiceFinance.AmountLocked = sdk.NewInt(100)
		sharesAllocation := make(map[string]sdk.Int)
		sharesAllocation[user2Str] = sdk.NewInt(10)
		tstruct.args.parentInvoice = &rootInvoice
		tstruct.args.ctx = ctx
		tstruct.args.sharesAllocation = sharesAllocation

		if err := keeper.TransferInvoice(tstruct.args.ctx, tstruct.args.claimedOwner, tstruct.args.sharesAllocation, tstruct.args.parentInvoice); (err != nil) != tstruct.wantErr {
			t.Errorf("TransferInvoice() error = %v, wantErr %v", err, tstruct.wantErr)
		}
		allInvoices := keeper.GetAllInvoice(ctx)
		for _, el := range allInvoices {
			if el.RootOwner {
				require.Equal(t, sdk.NewInt(90), el.InvoiceMembers[0].Share)
				require.Equal(t, creator, el.InvoiceMembers[0].InvoiceHolder)
				require.Equal(t, sdk.NewInt(10), el.InvoiceMembers[1].Share)
				require.Equal(t, creator, el.InvoiceMembers[0].InvoiceHolder)
				require.Equal(t, user2, el.InvoiceMembers[1].InvoiceHolder)
			} else {
				require.Equal(t, user2, el.CurrentOwner)
				require.Equal(t, creator, el.GetInvoiceBase().Creator)
				require.Equal(t, creator, el.GetInvoiceBase().OrigOwner)
				require.Equal(t, 1, len(el.InvoiceMembers))
				require.Equal(t, sdk.NewInt(10), el.InvoiceMembers[0].Share)
				require.Equal(t, user2, el.InvoiceMembers[0].InvoiceHolder)
			}
		}
	})

	// for the second test, we test creating two new invoice from the root invoice
	t.Run(tstruct.name, func(t *testing.T) {
		invoiceName := "two invoice test"
		rootInvoice, ctx, keeper := newRootInvoice(t, creator, invoiceName)
		// we need to transfer some money in locked
		rootInvoice.InvoiceFinance.AmountLocked = sdk.NewInt(100)
		sharesAllocation := make(map[string]sdk.Int)
		sharesAllocation[user2Str] = sdk.NewInt(10)
		sharesAllocation[creatorStr] = sdk.NewInt(20)
		tstruct.args.parentInvoice = &rootInvoice
		tstruct.args.ctx = ctx
		tstruct.args.sharesAllocation = sharesAllocation
		if err := keeper.TransferInvoice(tstruct.args.ctx, tstruct.args.claimedOwner, tstruct.args.sharesAllocation, tstruct.args.parentInvoice); (err != nil) != tstruct.wantErr {
			t.Errorf("TransferInvoice() error = %v, wantErr %v", err, tstruct.wantErr)
		}
		allInvoices := keeper.GetAllInvoice(ctx)
		for _, el := range allInvoices {
			if el.RootOwner {
				require.Equal(t, sdk.NewInt(70), el.InvoiceMembers[0].Share)
				require.Equal(t, sdk.NewInt(70), el.GetInvoiceFinance().AmountLocked)
				require.Equal(t, creator, el.InvoiceMembers[0].InvoiceHolder)
				for _, eachInvoiceMember := range el.InvoiceMembers[1:] {
					switch eachInvoiceMember.InvoiceHolder.String() {
					case user2Str:
						require.Equal(t, sdk.NewInt(10), eachInvoiceMember.Share)
					case creatorStr:
						require.Equal(t, sdk.NewInt(20), eachInvoiceMember.Share)
					}
				}
				continue
			}
			if el.CurrentOwner.Equals(creator) {
				require.Equal(t, creator, el.GetInvoiceBase().Creator)
				require.Equal(t, creator, el.GetInvoiceBase().OrigOwner)
				require.Equal(t, 1, len(el.InvoiceMembers))
				require.Equal(t, sdk.NewInt(20), el.InvoiceMembers[0].Share)
				require.Equal(t, creator, el.InvoiceMembers[0].InvoiceHolder)
				continue
			}
			if el.CurrentOwner.Equals(user2) {
				require.Equal(t, creator, el.GetInvoiceBase().Creator)
				require.Equal(t, creator, el.GetInvoiceBase().OrigOwner)
				require.Equal(t, 1, len(el.InvoiceMembers))
				require.Equal(t, sdk.NewInt(10), el.InvoiceMembers[0].Share)
				require.Equal(t, user2, el.InvoiceMembers[0].InvoiceHolder)
				continue
			}
		}
	})

	// for the third test, we test creating two new invoices from the root invoice(user2,user3), and then, user4,user5 from user2's invoice and creator user5,user2 from user3
	t.Run(tstruct.name, func(t *testing.T) {
		invoiceName := "multiinvoicetest"
		rootInvoice, ctx, keeper := newRootInvoice(t, creator, invoiceName)
		// we need to top up the money in locked amount before we can transfer
		rootInvoice.InvoiceFinance.AmountLocked = sdk.NewInt(100)
		sharesAllocationLevel1 := make(map[string]sdk.Int)
		// the root only have 10 left
		sharesAllocationLevel1[user2Str] = sdk.NewInt(40)
		sharesAllocationLevel1[user3Str] = sdk.NewInt(50)

		// the user 2 has 10 left
		sharesAllocationLevel21 := make(map[string]sdk.Int)
		sharesAllocationLevel21[user4Str] = sdk.NewInt(10)
		sharesAllocationLevel21[user5Str] = sdk.NewInt(20)

		// the user 3 has 5 left
		sharesAllocationLevel22 := make(map[string]sdk.Int)
		sharesAllocationLevel22[creatorStr] = sdk.NewInt(10)
		sharesAllocationLevel22[user2Str] = sdk.NewInt(15)
		sharesAllocationLevel22[user5Str] = sdk.NewInt(20)
		tstruct.args.parentInvoice = &rootInvoice
		tstruct.args.ctx = ctx
		// now we run 3 invoice transfer
		if err := keeper.TransferInvoice(tstruct.args.ctx, tstruct.args.claimedOwner, sharesAllocationLevel1, tstruct.args.parentInvoice); (err != nil) != tstruct.wantErr {
			t.Errorf("TransferInvoice() error = %v, wantErr %v", err, tstruct.wantErr)
		}

		invoiceIDByte, err := tools.GenHash([]string{creator.String(), creator.String(), invoiceName})
		require.NoError(t, err)
		rootInvoiceID := hex.EncodeToString(invoiceIDByte)
		rootInvoice, ok := keeper.GetInvoice(ctx, rootInvoiceID)
		require.True(t, ok)

		var invoiceIDUser2ID, invoiceIDUser3ID string
		for _, el := range rootInvoice.InvoiceMembers {
			switch el.InvoiceHolder.String() {
			case user2Str:
				invoiceIDUser2ID = el.InvoiceID
			case user3Str:
				invoiceIDUser3ID = el.InvoiceID
			}
		}

		invoiceUser02, ok := keeper.GetInvoice(ctx, invoiceIDUser2ID)
		require.True(t, ok)
		invoiceUser03, ok := keeper.GetInvoice(ctx, invoiceIDUser3ID)
		require.True(t, ok)

		var invoiceIDUser24ID, invoiceIDUser25ID string
		for _, el := range invoiceUser03.InvoiceMembers {
			switch el.InvoiceHolder.String() {
			case user4Str:
				invoiceIDUser24ID = el.InvoiceID
			case user5Str:
				invoiceIDUser25ID = el.InvoiceID
			}
		}

		invoiceUser02.InvoiceFinance.AmountLocked = sdk.NewInt(40)
		invoiceUser03.InvoiceFinance.AmountLocked = sdk.NewInt(50)

		if err := keeper.TransferInvoice(ctx, user2, sharesAllocationLevel21, &invoiceUser02); (err != nil) != tstruct.wantErr {
			t.Errorf("TransferInvoice() error = %v, wantErr %v", err, tstruct.wantErr)
		}
		if err := keeper.TransferInvoice(ctx, user3, sharesAllocationLevel22, &invoiceUser03); (err != nil) != tstruct.wantErr {
			t.Errorf("TransferInvoice() error = %v, wantErr %v", err, tstruct.wantErr)
		}
		var invoiceIDUser3CreatorID, invoiceIDUser35ID, invoiceIDUser32ID string
		for _, el := range invoiceUser03.InvoiceMembers {
			switch el.InvoiceHolder.String() {
			case creatorStr:
				invoiceIDUser3CreatorID = el.InvoiceID
			case user2Str:
				invoiceIDUser32ID = el.InvoiceID
			case user5Str:
				invoiceIDUser35ID = el.InvoiceID

			}
		}

		allInvoices := keeper.GetAllInvoice(ctx)
		for _, el := range allInvoices {
			switch el.InvoiceID {
			case rootInvoiceID:
				require.Equal(t, sdk.NewInt(10), el.InvoiceFinance.Amount)
				require.Equal(t, creator, el.InvoiceMembers[0].InvoiceHolder)
				for _, invoiceMember := range el.InvoiceMembers {
					switch invoiceMember.InvoiceHolder.String() {
					case creatorStr:
						require.Equal(t, sdk.NewInt(10), invoiceMember.Share)
					case user2Str:
						require.Equal(t, sdk.NewInt(40), invoiceMember.Share)
					case user3Str:
						require.Equal(t, sdk.NewInt(50), invoiceMember.Share)
					}
				}

			case invoiceIDUser2ID:
				require.Equal(t, user2, el.CurrentOwner)
				require.Equal(t, sdk.NewInt(10), el.InvoiceFinance.Amount)
				for _, invoiceMember := range el.InvoiceMembers {
					switch invoiceMember.InvoiceHolder.String() {
					case user2Str, user4Str:
						require.Equal(t, sdk.NewInt(10), invoiceMember.Share)
					case user5Str:
						require.Equal(t, sdk.NewInt(20), invoiceMember.Share)
					default:
						t.Error("should not reach here")
					}
				}

			case invoiceIDUser25ID:
				require.Equal(t, el.CurrentOwner, user5)
				require.Equal(t, sdk.NewInt(20), el.InvoiceFinance.Amount)
				for _, invoiceMember := range el.InvoiceMembers {
					switch invoiceMember.InvoiceHolder.String() {
					case user5Str:
						require.Equal(t, sdk.NewInt(20), invoiceMember.Share)
					default:
						t.Error("should not reach here")
					}
				}

			case invoiceIDUser24ID:
				require.Equal(t, el.CurrentOwner, user4)
				require.Equal(t, sdk.NewInt(10), el.InvoiceFinance.Amount)
				for _, invoiceMember := range el.InvoiceMembers {
					switch invoiceMember.InvoiceHolder.String() {
					case user4Str:
						require.Equal(t, sdk.NewInt(10), invoiceMember.Share)
					default:
						t.Error("should not reach here")
					}
				}

			case invoiceIDUser3ID:
				require.Equal(t, el.CurrentOwner, user3)
				require.Equal(t, sdk.NewInt(5), el.InvoiceFinance.Amount)
				for _, invoiceMember := range el.InvoiceMembers {
					switch invoiceMember.InvoiceHolder.String() {
					case user3Str:
						require.Equal(t, sdk.NewInt(5), invoiceMember.Share)
					case creatorStr:
						require.Equal(t, sdk.NewInt(10), invoiceMember.Share)
					case user2Str:
						require.Equal(t, sdk.NewInt(15), invoiceMember.Share)
					case user5Str:
						require.Equal(t, sdk.NewInt(20), invoiceMember.Share)
					default:
						t.Error("should not reach here")
					}
				}

			case invoiceIDUser35ID:
				require.Equal(t, el.CurrentOwner, user5)
				require.Equal(t, sdk.NewInt(20), el.InvoiceFinance.Amount)
				require.Equal(t, 1, len(el.GetInvoiceMembers()))
				require.Equal(t, user5, el.GetInvoiceMembers()[0].InvoiceHolder)
				require.Equal(t, sdk.NewInt(20), el.GetInvoiceMembers()[0].Share)
			case invoiceIDUser32ID:
				require.Equal(t, el.CurrentOwner, user2)
				require.Equal(t, sdk.NewInt(15), el.InvoiceFinance.Amount)
				require.Equal(t, 1, len(el.GetInvoiceMembers()))
				require.Equal(t, user2, el.GetInvoiceMembers()[0].InvoiceHolder)
				require.Equal(t, sdk.NewInt(15), el.GetInvoiceMembers()[0].Share)
			case invoiceIDUser3CreatorID:
				require.Equal(t, el.CurrentOwner, creator)
				require.Equal(t, sdk.NewInt(10), el.InvoiceFinance.Amount)
				require.Equal(t, 1, len(el.GetInvoiceMembers()))
				require.Equal(t, creator, el.GetInvoiceMembers()[0].InvoiceHolder)
				require.Equal(t, sdk.NewInt(10), el.GetInvoiceMembers()[0].Share)
			default:
				//t.Error("there exist cases not handled")
			}
		}
	})

	// now we run the test that has enough found
	t.Run(tstruct.name, func(t *testing.T) {
		invoiceName := "invalid invoice"
		rootInvoice, ctx, keeper := newRootInvoice(t, creator, invoiceName)
		rootInvoice.InvoiceFinance.AmountLocked = sdk.NewInt(100)
		sharesAllocationLevel1 := make(map[string]sdk.Int)
		// the root only have 10 left
		sharesAllocationLevel1[user2Str] = sdk.NewInt(20)
		sharesAllocationLevel1[user3Str] = sdk.NewInt(10)

		// the user 2 has 10 left
		sharesAllocationInvalidLevel21 := make(map[string]sdk.Int)
		sharesAllocationInvalidLevel21[user4Str] = sdk.NewInt(10)
		sharesAllocationInvalidLevel21[user5Str] = sdk.NewInt(20)

		// invalid invoice creating

		sharesAllocationInvalid := make(map[string]sdk.Int)
		// the root only have 10 left
		sharesAllocationInvalid[user2Str] = sdk.NewInt(40)
		sharesAllocationInvalid[user3Str] = sdk.NewInt(70)

		// now we run 3 invoice transfer
		if err := keeper.TransferInvoice(ctx, tstruct.args.claimedOwner, sharesAllocationInvalid, &rootInvoice); (err != nil) != tstruct.wantErr {
			require.Equal(t, "not enough balance to create the sub-invoice", err.Error())
		}

		// we need to load the root invoice from db as the root invoice we hold now is dirty
		invoiceIDByte, err := tools.GenHash([]string{creator.String(), creator.String(), invoiceName})
		require.Nil(t, err)
		rootInvoice, ok := keeper.GetInvoice(ctx, hex.EncodeToString(invoiceIDByte))
		rootInvoice.InvoiceFinance.AmountLocked = sdk.NewInt(100)
		require.True(t, ok)

		if err := keeper.TransferInvoice(ctx, tstruct.args.claimedOwner, sharesAllocationLevel1, &rootInvoice); err != nil {
			t.Errorf("transfer should not fail with err %v", err)
		}

		invoiceIDUser2ID := rootInvoice.InvoiceMembers[1].InvoiceID
		invoiceUser2, ok := keeper.GetInvoice(ctx, invoiceIDUser2ID)
		require.True(t, ok)
		if err := keeper.TransferInvoice(ctx, user3, sharesAllocationInvalidLevel21, &invoiceUser2); err != nil {
			require.ErrorIs(t, err, sdkerrors.ErrInvalidAddress)
		}
		if err := keeper.TransferInvoice(ctx, user2, sharesAllocationInvalidLevel21, &invoiceUser2); err != nil {
			require.Equal(t, "not enough balance to create the sub-invoice", err.Error())
		}
	})
}
