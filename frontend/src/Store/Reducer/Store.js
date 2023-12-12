// Store.js

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import TagTypeSlice from '../slice/TagTypeSlice';
import customFieldSlice from '../slice/CustomFieldSlice';
import TriggerWebhookSlice from '../slice/TriggerWebhookSlice';
import flagSlice from '../slice/flagSlice';
import MngeSlice from '../slice/MngeSlice';
import CreUserFlagSlice from '../slice/CreUserFlagSlice';
import FaqsSlice from '../slice/FaqsSlice';
import ConnectedFlagSlice from '../slice/ConnectedFlagSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  connect: ConnectedFlagSlice, 
  tag: TagTypeSlice,
  custom: customFieldSlice,
  TriggerWebhook: TriggerWebhookSlice,
  FaqsAccess: FaqsSlice,
  flag: flagSlice,
  ManageFlag: MngeSlice,
  userRefresh: CreUserFlagSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
