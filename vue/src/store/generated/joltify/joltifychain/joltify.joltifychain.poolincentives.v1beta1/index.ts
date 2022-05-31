import { txClient, queryClient, MissingWalletError , registry} from './module'

import { ReplacePoolIncentivesProposal } from "./module/types/pool_incentives/v1beta1/gov"
import { UpdatePoolIncentivesProposal } from "./module/types/pool_incentives/v1beta1/gov"
import { Params } from "./module/types/pool_incentives/v1beta1/incentives"
import { LockableDurationsInfo } from "./module/types/pool_incentives/v1beta1/incentives"
import { DistrInfo } from "./module/types/pool_incentives/v1beta1/incentives"
import { DistrRecord } from "./module/types/pool_incentives/v1beta1/incentives"
import { QueryGaugeIdsResponse_GaugeIdWithDuration } from "./module/types/pool_incentives/v1beta1/query"
import { IncentivizedPool } from "./module/types/pool_incentives/v1beta1/query"


export { ReplacePoolIncentivesProposal, UpdatePoolIncentivesProposal, Params, LockableDurationsInfo, DistrInfo, DistrRecord, QueryGaugeIdsResponse_GaugeIdWithDuration, IncentivizedPool };

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
				GaugeIds: {},
				DistrInfo: {},
				Params: {},
				LockableDurations: {},
				IncentivizedPools: {},
				ExternalIncentiveGauges: {},
				
				_Structure: {
						ReplacePoolIncentivesProposal: getStructure(ReplacePoolIncentivesProposal.fromPartial({})),
						UpdatePoolIncentivesProposal: getStructure(UpdatePoolIncentivesProposal.fromPartial({})),
						Params: getStructure(Params.fromPartial({})),
						LockableDurationsInfo: getStructure(LockableDurationsInfo.fromPartial({})),
						DistrInfo: getStructure(DistrInfo.fromPartial({})),
						DistrRecord: getStructure(DistrRecord.fromPartial({})),
						QueryGaugeIdsResponse_GaugeIdWithDuration: getStructure(QueryGaugeIdsResponse_GaugeIdWithDuration.fromPartial({})),
						IncentivizedPool: getStructure(IncentivizedPool.fromPartial({})),
						
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
				getGaugeIds: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.GaugeIds[JSON.stringify(params)] ?? {}
		},
				getDistrInfo: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.DistrInfo[JSON.stringify(params)] ?? {}
		},
				getParams: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Params[JSON.stringify(params)] ?? {}
		},
				getLockableDurations: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.LockableDurations[JSON.stringify(params)] ?? {}
		},
				getIncentivizedPools: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.IncentivizedPools[JSON.stringify(params)] ?? {}
		},
				getExternalIncentiveGauges: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ExternalIncentiveGauges[JSON.stringify(params)] ?? {}
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
			console.log('Vuex module: joltify.joltifychain.poolincentives.v1beta1 initialized!')
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
		
		
		
		 		
		
		
		async QueryGaugeIds({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryGaugeIds( key.pool_id)).data
				
					
				commit('QUERY', { query: 'GaugeIds', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryGaugeIds', payload: { options: { all }, params: {...key},query }})
				return getters['getGaugeIds']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryGaugeIds API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryDistrInfo({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryDistrInfo()).data
				
					
				commit('QUERY', { query: 'DistrInfo', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryDistrInfo', payload: { options: { all }, params: {...key},query }})
				return getters['getDistrInfo']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryDistrInfo API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryParams({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryParams()).data
				
					
				commit('QUERY', { query: 'Params', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryParams', payload: { options: { all }, params: {...key},query }})
				return getters['getParams']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryParams API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryLockableDurations({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryLockableDurations()).data
				
					
				commit('QUERY', { query: 'LockableDurations', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryLockableDurations', payload: { options: { all }, params: {...key},query }})
				return getters['getLockableDurations']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryLockableDurations API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryIncentivizedPools({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryIncentivizedPools()).data
				
					
				commit('QUERY', { query: 'IncentivizedPools', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryIncentivizedPools', payload: { options: { all }, params: {...key},query }})
				return getters['getIncentivizedPools']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryIncentivizedPools API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryExternalIncentiveGauges({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryExternalIncentiveGauges()).data
				
					
				commit('QUERY', { query: 'ExternalIncentiveGauges', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryExternalIncentiveGauges', payload: { options: { all }, params: {...key},query }})
				return getters['getExternalIncentiveGauges']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryExternalIncentiveGauges API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
	}
}
