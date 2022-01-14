// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgCreateCreatePool } from "./types/vault/tx";
import { MsgCreateIssueToken } from "./types/vault/tx";
const types = [
    ["/joltify.joltifychain.vault.MsgCreateCreatePool", MsgCreateCreatePool],
    ["/joltify.joltifychain.vault.MsgCreateIssueToken", MsgCreateIssueToken],
];
export const MissingWalletError = new Error("wallet is required");
export const registry = new Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw MissingWalletError;
    let client;
    if (addr) {
        client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    }
    else {
        client = await SigningStargateClient.offline(wallet, { registry });
    }
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgCreateCreatePool: (data) => ({ typeUrl: "/joltify.joltifychain.vault.MsgCreateCreatePool", value: MsgCreateCreatePool.fromPartial(data) }),
        msgCreateIssueToken: (data) => ({ typeUrl: "/joltify.joltifychain.vault.MsgCreateIssueToken", value: MsgCreateIssueToken.fromPartial(data) }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
