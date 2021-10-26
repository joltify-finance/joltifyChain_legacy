// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgCreateSellOrder } from "./types/invoice/tx";
import { MsgDeleteInvoice } from "./types/invoice/tx";
import { MsgCreateInvoice } from "./types/invoice/tx";
import { MsgCreatePlaceOrder } from "./types/invoice/tx";
import { MsgDeleteSellOrder } from "./types/invoice/tx";


const types = [
  ["/joltify.joltifychain.invoice.MsgCreateSellOrder", MsgCreateSellOrder],
  ["/joltify.joltifychain.invoice.MsgDeleteInvoice", MsgDeleteInvoice],
  ["/joltify.joltifychain.invoice.MsgCreateInvoice", MsgCreateInvoice],
  ["/joltify.joltifychain.invoice.MsgCreatePlaceOrder", MsgCreatePlaceOrder],
  ["/joltify.joltifychain.invoice.MsgDeleteSellOrder", MsgDeleteSellOrder],
  
];
export const MissingWalletError = new Error("wallet is required");

const registry = new Registry(<any>types);

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

  const client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgCreateSellOrder: (data: MsgCreateSellOrder): EncodeObject => ({ typeUrl: "/joltify.joltifychain.invoice.MsgCreateSellOrder", value: data }),
    msgDeleteInvoice: (data: MsgDeleteInvoice): EncodeObject => ({ typeUrl: "/joltify.joltifychain.invoice.MsgDeleteInvoice", value: data }),
    msgCreateInvoice: (data: MsgCreateInvoice): EncodeObject => ({ typeUrl: "/joltify.joltifychain.invoice.MsgCreateInvoice", value: data }),
    msgCreatePlaceOrder: (data: MsgCreatePlaceOrder): EncodeObject => ({ typeUrl: "/joltify.joltifychain.invoice.MsgCreatePlaceOrder", value: data }),
    msgDeleteSellOrder: (data: MsgDeleteSellOrder): EncodeObject => ({ typeUrl: "/joltify.joltifychain.invoice.MsgDeleteSellOrder", value: data }),
    
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
