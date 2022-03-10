import { StdFee } from "@cosmjs/launchpad";
import { Registry, OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgCreatePlaceOrder } from "./types/invoice/tx";
import { MsgDeleteSellOrder } from "./types/invoice/tx";
import { MsgDeleteInvoice } from "./types/invoice/tx";
import { MsgCreateSellOrder } from "./types/invoice/tx";
import { MsgCreateInvoice } from "./types/invoice/tx";
export declare const MissingWalletError: Error;
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
}
interface SignAndBroadcastOptions {
    fee: StdFee;
    memo?: string;
}
declare const txClient: (wallet: OfflineSigner, { addr: addr }?: TxClientOptions) => Promise<{
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }?: SignAndBroadcastOptions) => any;
    msgCreatePlaceOrder: (data: MsgCreatePlaceOrder) => EncodeObject;
    msgDeleteSellOrder: (data: MsgDeleteSellOrder) => EncodeObject;
    msgDeleteInvoice: (data: MsgDeleteInvoice) => EncodeObject;
    msgCreateSellOrder: (data: MsgCreateSellOrder) => EncodeObject;
    msgCreateInvoice: (data: MsgCreateInvoice) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
