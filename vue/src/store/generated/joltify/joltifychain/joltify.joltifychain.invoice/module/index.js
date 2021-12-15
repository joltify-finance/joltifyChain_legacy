// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgDeleteInvoice } from "./types/invoice/tx";
import { MsgDeleteSellOrder } from "./types/invoice/tx";
import { MsgCreatePlaceOrder } from "./types/invoice/tx";
import { MsgCreateSellOrder } from "./types/invoice/tx";
import { MsgCreateInvoice } from "./types/invoice/tx";
const types = [
    ["/joltify.joltifychain.invoice.MsgDeleteInvoice", MsgDeleteInvoice],
    ["/joltify.joltifychain.invoice.MsgDeleteSellOrder", MsgDeleteSellOrder],
    ["/joltify.joltifychain.invoice.MsgCreatePlaceOrder", MsgCreatePlaceOrder],
    ["/joltify.joltifychain.invoice.MsgCreateSellOrder", MsgCreateSellOrder],
    ["/joltify.joltifychain.invoice.MsgCreateInvoice", MsgCreateInvoice],
];
export const MissingWalletError = new Error("wallet is required");
const registry = new Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw MissingWalletError;
    const client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgDeleteInvoice: (data) => ({ typeUrl: "/joltify.joltifychain.invoice.MsgDeleteInvoice", value: data }),
        msgDeleteSellOrder: (data) => ({ typeUrl: "/joltify.joltifychain.invoice.MsgDeleteSellOrder", value: data }),
        msgCreatePlaceOrder: (data) => ({ typeUrl: "/joltify.joltifychain.invoice.MsgCreatePlaceOrder", value: data }),
        msgCreateSellOrder: (data) => ({ typeUrl: "/joltify.joltifychain.invoice.MsgCreateSellOrder", value: data }),
        msgCreateInvoice: (data) => ({ typeUrl: "/joltify.joltifychain.invoice.MsgCreateInvoice", value: data }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
