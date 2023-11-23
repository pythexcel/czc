import { configureStore } from '@reduxjs/toolkit';
import TagTypeSlice from '../slice/TagTypeSlice';
import customFieldSlice from '../slice/CustomFieldSlice'
import TriggerWebhookSlice from '../slice/TriggerWebhookSlice';
// import InputHeaderSlice from '../slice/InputHeaderSlice';
import flagSlice from '../slice/flagSlice';
import MngeSlice from '../slice/MngeSlice';
import CreUserFlagSlice from '../slice/CreUserFlagSlice';


export const store = configureStore({
  reducer: {
    tag: TagTypeSlice,
    customReducer: customFieldSlice, 
    TriggerWebhook: TriggerWebhookSlice,
    // inputHeader: InputHeaderSlice,
    flag: flagSlice,
    ManageFlag: MngeSlice,
    userRefresh: CreUserFlagSlice
  },
});