import { txClient, queryClient, MissingWalletError , registry} from './module'

import { SmoothWeightChangeParams } from "./module/types/swap/pool_models/balancer/balancerPool"
import { PoolParams } from "./module/types/swap/pool_models/balancer/balancerPool"
import { Pool } from "./module/types/swap/pool_models/balancer/balancerPool"
import { Params } from "./module/types/swap/v1beta1/genesis"
import { PoolAsset } from "./module/types/swap/v1beta1/pool"
import { SwapAmountInRoute } from "./module/types/swap/v1beta1/tx"
import { SwapAmountOutRoute } from "./module/types/swap/v1beta1/tx"


export { SmoothWeightChangeParams, PoolParams, Pool, Params, PoolAsset, SwapAmountInRoute, SwapAmountOutRoute };

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
				Pools: {},
				NumPools: {},
				TotalLiquidity: {},
				Pool: {},
				PoolParams: {},
				TotalShares: {},
				PoolAssets: {},
				SpotPrice: {},
				EstimateSwapExactAmountIn: {},
				EstimateSwapExactAmountOut: {},
				
				_Structure: {
						SmoothWeightChangeParams: getStructure(SmoothWeightChangeParams.fromPartial({})),
						PoolParams: getStructure(PoolParams.fromPartial({})),
						Pool: getStructure(Pool.fromPartial({})),
						Params: getStructure(Params.fromPartial({})),
						PoolAsset: getStructure(PoolAsset.fromPartial({})),
						SwapAmountInRoute: getStructure(SwapAmountInRoute.fromPartial({})),
						SwapAmountOutRoute: getStructure(SwapAmountOutRoute.fromPartial({})),
						
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
				getPools: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Pools[JSON.stringify(params)] ?? {}
		},
				getNumPools: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.NumPools[JSON.stringify(params)] ?? {}
		},
				getTotalLiquidity: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.TotalLiquidity[JSON.stringify(params)] ?? {}
		},
				getPool: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Pool[JSON.stringify(params)] ?? {}
		},
				getPoolParams: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.PoolParams[JSON.stringify(params)] ?? {}
		},
				getTotalShares: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.TotalShares[JSON.stringify(params)] ?? {}
		},
				getPoolAssets: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.PoolAssets[JSON.stringify(params)] ?? {}
		},
				getSpotPrice: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.SpotPrice[JSON.stringify(params)] ?? {}
		},
				getEstimateSwapExactAmountIn: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.EstimateSwapExactAmountIn[JSON.stringify(params)] ?? {}
		},
				getEstimateSwapExactAmountOut: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.EstimateSwapExactAmountOut[JSON.stringify(params)] ?? {}
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
			console.log('Vuex module: joltify.joltifychain.swap.v1beta1 initialized!')
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
		
		
		
		 		
		
		
		async QueryPools({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryPools(query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryPools({...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'Pools', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryPools', payload: { options: { all }, params: {...key},query }})
				return getters['getPools']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryPools API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryNumPools({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryNumPools()).data
				
					
				commit('QUERY', { query: 'NumPools', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryNumPools', payload: { options: { all }, params: {...key},query }})
				return getters['getNumPools']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryNumPools API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryTotalLiquidity({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryTotalLiquidity()).data
				
					
				commit('QUERY', { query: 'TotalLiquidity', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryTotalLiquidity', payload: { options: { all }, params: {...key},query }})
				return getters['getTotalLiquidity']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryTotalLiquidity API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryPool({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryPool( key.poolId)).data
				
					
				commit('QUERY', { query: 'Pool', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryPool', payload: { options: { all }, params: {...key},query }})
				return getters['getPool']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryPool API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryPoolParams({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryPoolParams( key.poolId)).data
				
					
				commit('QUERY', { query: 'PoolParams', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryPoolParams', payload: { options: { all }, params: {...key},query }})
				return getters['getPoolParams']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryPoolParams API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryTotalShares({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryTotalShares( key.poolId)).data
				
					
				commit('QUERY', { query: 'TotalShares', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryTotalShares', payload: { options: { all }, params: {...key},query }})
				return getters['getTotalShares']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryTotalShares API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryPoolAssets({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryPoolAssets( key.poolId)).data
				
					
				commit('QUERY', { query: 'PoolAssets', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryPoolAssets', payload: { options: { all }, params: {...key},query }})
				return getters['getPoolAssets']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryPoolAssets API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QuerySpotPrice({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.querySpotPrice( key.poolId, query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.querySpotPrice( key.poolId, {...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'SpotPrice', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QuerySpotPrice', payload: { options: { all }, params: {...key},query }})
				return getters['getSpotPrice']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QuerySpotPrice API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryEstimateSwapExactAmountIn({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryEstimateSwapExactAmountIn( key.poolId, query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryEstimateSwapExactAmountIn( key.poolId, {...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'EstimateSwapExactAmountIn', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryEstimateSwapExactAmountIn', payload: { options: { all }, params: {...key},query }})
				return getters['getEstimateSwapExactAmountIn']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryEstimateSwapExactAmountIn API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryEstimateSwapExactAmountOut({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryEstimateSwapExactAmountOut( key.poolId, query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryEstimateSwapExactAmountOut( key.poolId, {...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'EstimateSwapExactAmountOut', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryEstimateSwapExactAmountOut', payload: { options: { all }, params: {...key},query }})
				return getters['getEstimateSwapExactAmountOut']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryEstimateSwapExactAmountOut API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		async sendMsgCreateBalancerPool({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgCreateBalancerPool(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
	gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateBalancerPool:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateBalancerPool:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		
		async MsgCreateBalancerPool({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgCreateBalancerPool(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateBalancerPool:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateBalancerPool:Create Could not create message: ' + e.message)
				}
			}
		},
		
	}
}
