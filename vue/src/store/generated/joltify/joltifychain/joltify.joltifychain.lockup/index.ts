import { txClient, queryClient, MissingWalletError , registry} from './module'

import { PeriodLock } from "./module/types/lockup/lock"
import { QueryCondition } from "./module/types/lockup/lock"
import { SyntheticLock } from "./module/types/lockup/lock"


export { PeriodLock, QueryCondition, SyntheticLock };

async function initTxClient(vuexGetters) {
	return await txClient(vuexGetters['common/wallet/signer'], {
		addr: vuexGetters['common/env/apiTendermint']
	})
}

async function initQueryClient(vuexGetters) {
	return await queryClient({
		addr: vuexGetters['common/env/apiCosmos']
	})
}

function mergeResults(value, next_values) {
	for (let prop of Object.keys(next_values)) {
		if (Array.isArray(next_values[prop])) {
			value[prop]=[...value[prop], ...next_values[prop]]
		}else{
			value[prop]=next_values[prop]
		}
	}
	return value
}

function getStructure(template) {
	let structure = { fields: [] }
	for (const [key, value] of Object.entries(template)) {
		let field: any = {}
		field.name = key
		field.type = typeof value
		structure.fields.push(field)
	}
	return structure
}

const getDefaultState = () => {
	return {
				ModuleBalance: {},
				ModuleLockedAmount: {},
				AccountUnlockableCoins: {},
				AccountUnlockingCoins: {},
				AccountLockedCoins: {},
				AccountLockedPastTime: {},
				AccountLockedPastTimeNotUnlockingOnly: {},
				AccountUnlockedBeforeTime: {},
				AccountLockedPastTimeDenom: {},
				LockedDenom: {},
				LockedByID: {},
				SyntheticLockupsByLockupID: {},
				AccountLockedLongerDuration: {},
				AccountLockedLongerDurationNotUnlockingOnly: {},
				AccountLockedLongerDurationDenom: {},
				
				_Structure: {
						PeriodLock: getStructure(PeriodLock.fromPartial({})),
						QueryCondition: getStructure(QueryCondition.fromPartial({})),
						SyntheticLock: getStructure(SyntheticLock.fromPartial({})),
						
		},
		_Registry: registry,
		_Subscriptions: new Set(),
	}
}

// initial state
const state = getDefaultState()

export default {
	namespaced: true,
	state,
	mutations: {
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		},
		QUERY(state, { query, key, value }) {
			state[query][JSON.stringify(key)] = value
		},
		SUBSCRIBE(state, subscription) {
			state._Subscriptions.add(JSON.stringify(subscription))
		},
		UNSUBSCRIBE(state, subscription) {
			state._Subscriptions.delete(JSON.stringify(subscription))
		}
	},
	getters: {
				getModuleBalance: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ModuleBalance[JSON.stringify(params)] ?? {}
		},
				getModuleLockedAmount: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ModuleLockedAmount[JSON.stringify(params)] ?? {}
		},
				getAccountUnlockableCoins: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.AccountUnlockableCoins[JSON.stringify(params)] ?? {}
		},
				getAccountUnlockingCoins: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.AccountUnlockingCoins[JSON.stringify(params)] ?? {}
		},
				getAccountLockedCoins: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.AccountLockedCoins[JSON.stringify(params)] ?? {}
		},
				getAccountLockedPastTime: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.AccountLockedPastTime[JSON.stringify(params)] ?? {}
		},
				getAccountLockedPastTimeNotUnlockingOnly: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.AccountLockedPastTimeNotUnlockingOnly[JSON.stringify(params)] ?? {}
		},
				getAccountUnlockedBeforeTime: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.AccountUnlockedBeforeTime[JSON.stringify(params)] ?? {}
		},
				getAccountLockedPastTimeDenom: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.AccountLockedPastTimeDenom[JSON.stringify(params)] ?? {}
		},
				getLockedDenom: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.LockedDenom[JSON.stringify(params)] ?? {}
		},
				getLockedByID: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.LockedByID[JSON.stringify(params)] ?? {}
		},
				getSyntheticLockupsByLockupID: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.SyntheticLockupsByLockupID[JSON.stringify(params)] ?? {}
		},
				getAccountLockedLongerDuration: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.AccountLockedLongerDuration[JSON.stringify(params)] ?? {}
		},
				getAccountLockedLongerDurationNotUnlockingOnly: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.AccountLockedLongerDurationNotUnlockingOnly[JSON.stringify(params)] ?? {}
		},
				getAccountLockedLongerDurationDenom: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.AccountLockedLongerDurationDenom[JSON.stringify(params)] ?? {}
		},
				
		getTypeStructure: (state) => (type) => {
			return state._Structure[type].fields
		},
		getRegistry: (state) => {
			return state._Registry
		}
	},
	actions: {
		init({ dispatch, rootGetters }) {
			console.log('Vuex module: joltify.joltifychain.lockup initialized!')
			if (rootGetters['common/env/client']) {
				rootGetters['common/env/client'].on('newblock', () => {
					dispatch('StoreUpdate')
				})
			}
		},
		resetState({ commit }) {
			commit('RESET_STATE')
		},
		unsubscribe({ commit }, subscription) {
			commit('UNSUBSCRIBE', subscription)
		},
		async StoreUpdate({ state, dispatch }) {
			state._Subscriptions.forEach(async (subscription) => {
				try {
					const sub=JSON.parse(subscription)
					await dispatch(sub.action, sub.payload)
				}catch(e) {
					throw new Error('Subscriptions: ' + e.message)
				}
			})
		},
		
		
		
		 		
		
		
		async QueryModuleBalance({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryModuleBalance()).data
				
					
				commit('QUERY', { query: 'ModuleBalance', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryModuleBalance', payload: { options: { all }, params: {...key},query }})
				return getters['getModuleBalance']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryModuleBalance API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryModuleLockedAmount({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryModuleLockedAmount()).data
				
					
				commit('QUERY', { query: 'ModuleLockedAmount', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryModuleLockedAmount', payload: { options: { all }, params: {...key},query }})
				return getters['getModuleLockedAmount']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryModuleLockedAmount API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryAccountUnlockableCoins({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryAccountUnlockableCoins( key.owner)).data
				
					
				commit('QUERY', { query: 'AccountUnlockableCoins', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryAccountUnlockableCoins', payload: { options: { all }, params: {...key},query }})
				return getters['getAccountUnlockableCoins']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryAccountUnlockableCoins API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryAccountUnlockingCoins({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryAccountUnlockingCoins( key.owner)).data
				
					
				commit('QUERY', { query: 'AccountUnlockingCoins', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryAccountUnlockingCoins', payload: { options: { all }, params: {...key},query }})
				return getters['getAccountUnlockingCoins']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryAccountUnlockingCoins API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryAccountLockedCoins({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryAccountLockedCoins( key.owner)).data
				
					
				commit('QUERY', { query: 'AccountLockedCoins', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryAccountLockedCoins', payload: { options: { all }, params: {...key},query }})
				return getters['getAccountLockedCoins']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryAccountLockedCoins API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryAccountLockedPastTime({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryAccountLockedPastTime( key.owner, query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryAccountLockedPastTime( key.owner, {...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'AccountLockedPastTime', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryAccountLockedPastTime', payload: { options: { all }, params: {...key},query }})
				return getters['getAccountLockedPastTime']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryAccountLockedPastTime API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryAccountLockedPastTimeNotUnlockingOnly({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryAccountLockedPastTimeNotUnlockingOnly( key.owner, query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryAccountLockedPastTimeNotUnlockingOnly( key.owner, {...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'AccountLockedPastTimeNotUnlockingOnly', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryAccountLockedPastTimeNotUnlockingOnly', payload: { options: { all }, params: {...key},query }})
				return getters['getAccountLockedPastTimeNotUnlockingOnly']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryAccountLockedPastTimeNotUnlockingOnly API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryAccountUnlockedBeforeTime({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryAccountUnlockedBeforeTime( key.owner, query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryAccountUnlockedBeforeTime( key.owner, {...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'AccountUnlockedBeforeTime', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryAccountUnlockedBeforeTime', payload: { options: { all }, params: {...key},query }})
				return getters['getAccountUnlockedBeforeTime']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryAccountUnlockedBeforeTime API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryAccountLockedPastTimeDenom({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryAccountLockedPastTimeDenom( key.owner, query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryAccountLockedPastTimeDenom( key.owner, {...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'AccountLockedPastTimeDenom', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryAccountLockedPastTimeDenom', payload: { options: { all }, params: {...key},query }})
				return getters['getAccountLockedPastTimeDenom']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryAccountLockedPastTimeDenom API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryLockedDenom({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryLockedDenom(query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryLockedDenom({...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'LockedDenom', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryLockedDenom', payload: { options: { all }, params: {...key},query }})
				return getters['getLockedDenom']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryLockedDenom API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryLockedByID({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryLockedById( key.lock_id)).data
				
					
				commit('QUERY', { query: 'LockedByID', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryLockedByID', payload: { options: { all }, params: {...key},query }})
				return getters['getLockedByID']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryLockedByID API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QuerySyntheticLockupsByLockupID({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.querySyntheticLockupsByLockupId( key.lock_id)).data
				
					
				commit('QUERY', { query: 'SyntheticLockupsByLockupID', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QuerySyntheticLockupsByLockupID', payload: { options: { all }, params: {...key},query }})
				return getters['getSyntheticLockupsByLockupID']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QuerySyntheticLockupsByLockupID API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryAccountLockedLongerDuration({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryAccountLockedLongerDuration( key.owner, query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryAccountLockedLongerDuration( key.owner, {...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'AccountLockedLongerDuration', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryAccountLockedLongerDuration', payload: { options: { all }, params: {...key},query }})
				return getters['getAccountLockedLongerDuration']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryAccountLockedLongerDuration API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryAccountLockedLongerDurationNotUnlockingOnly({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryAccountLockedLongerDurationNotUnlockingOnly( key.owner, query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryAccountLockedLongerDurationNotUnlockingOnly( key.owner, {...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'AccountLockedLongerDurationNotUnlockingOnly', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryAccountLockedLongerDurationNotUnlockingOnly', payload: { options: { all }, params: {...key},query }})
				return getters['getAccountLockedLongerDurationNotUnlockingOnly']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryAccountLockedLongerDurationNotUnlockingOnly API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryAccountLockedLongerDurationDenom({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryAccountLockedLongerDurationDenom( key.owner, query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryAccountLockedLongerDurationDenom( key.owner, {...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'AccountLockedLongerDurationDenom', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryAccountLockedLongerDurationDenom', payload: { options: { all }, params: {...key},query }})
				return getters['getAccountLockedLongerDurationDenom']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryAccountLockedLongerDurationDenom API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		async sendMsgLockTokens({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgLockTokens(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
	gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgLockTokens:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgLockTokens:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgBeginUnlockingAll({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgBeginUnlockingAll(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
	gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgBeginUnlockingAll:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgBeginUnlockingAll:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgBeginUnlocking({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgBeginUnlocking(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
	gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgBeginUnlocking:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgBeginUnlocking:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		
		async MsgLockTokens({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgLockTokens(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgLockTokens:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgLockTokens:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgBeginUnlockingAll({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgBeginUnlockingAll(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgBeginUnlockingAll:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgBeginUnlockingAll:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgBeginUnlocking({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgBeginUnlocking(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgBeginUnlocking:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgBeginUnlocking:Create Could not create message: ' + e.message)
				}
			}
		},
		
	}
}
