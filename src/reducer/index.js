
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import auth from './auth'
import { persistReducer } from 'redux-persist'

const combinPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['auth']
}

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const rootReducer  = combineReducers({
    auth: persistReducer(authPersistConfig, auth)
})

export default persistReducer(combinPersistConfig, rootReducer)