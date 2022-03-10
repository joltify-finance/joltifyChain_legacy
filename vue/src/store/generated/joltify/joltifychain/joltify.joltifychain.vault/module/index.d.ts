import { StdFee } from "@cosmjs/launchpad";
import { Registry, OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgCreateOutboundTx } from "./types/vault/tx";
import { MsgCreateCreatePool } from "./types/vault/tx";
import { MsgCreateIssueToken } from "./types/vault/tx";
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
    msgCreateOutboundTx: (data: MsgCreateOutboundTx) => EncodeObject;
    msgCreateCreatePool: (data: MsgCreateCreatePool) => EncodeObject;
    msgCreateIssueToken: (data: MsgCreateIssueToken) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
