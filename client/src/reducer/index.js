
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import account from './account'
import schedule from './schedule'
import { persistReducer } from 'redux-persist'

const combinPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['account']
}

const authPersistConfig = {
    key: 'account',
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const rootReducer  = combineReducers({
    account: persistReducer(authPersistConfig, account),
    schedule: schedule
})

export default persistReducer(combinPersistConfig, rootReducer)