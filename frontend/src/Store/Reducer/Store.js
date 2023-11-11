import { configureStore } from '@reduxjs/toolkit';
import TagTypeSlice from '../slice/TagTypeSlice';
import customFieldSlice from '../slice/CustomFieldSlice'
import TriggerWebhookSlice from '../slice/TriggerWebhookSlice'


export const store = configureStore({
  reducer: {
    tag: TagTypeSlice,
    customReducer: customFieldSlice, 
    TriggerWebhook: TriggerWebhookSlice
  },
});