// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgCreateIssueToken } from "./types/vault/tx";
import { MsgCreateOutboundTx } from "./types/vault/tx";
import { MsgCreateCreatePool } from "./types/vault/tx";


const types = [
  ["/joltify.joltifychain.vault.MsgCreateIssueToken", MsgCreateIssueToken],
  ["/joltify.joltifychain.vault.MsgCreateOutboundTx", MsgCreateOutboundTx],
  ["/joltify.joltifychain.vault.MsgCreateCreatePool", MsgCreateCreatePool],
  
];
export const MissingWalletError = new Error("wallet is required");

export const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;
  let client;
  if (addr) {
    client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  }else{
    client = await SigningStargateClient.offline( wallet, { registry });
  }
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgCreateIssueToken: (data: MsgCreateIssueToken): EncodeObject => ({ typeUrl: "/joltify.joltifychain.vault.MsgCreateIssueToken", value: MsgCreateIssueToken.fromPartial( data ) }),
    msgCreateOutboundTx: (data: MsgCreateOutboundTx): EncodeObject => ({ typeUrl: "/joltify.joltifychain.vault.MsgCreateOutboundTx", value: MsgCreateOutboundTx.fromPartial( data ) }),
    msgCreateCreatePool: (data: MsgCreateCreatePool): EncodeObject => ({ typeUrl: "/joltify.joltifychain.vault.MsgCreateCreatePool", value: MsgCreateCreatePool.fromPartial( data ) }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
