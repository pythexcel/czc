import { createSlice } from "@reduxjs/toolkit";

const triggerWebhookSlice = createSlice({
  name: 'triggerWebhook',
  initialState: {
    triggerWebhookData: [],
  },
  reducers: {
    setTriggerWebhookSlice: (state, action) => {
      const { index, Triggergoalname, TriggerselectTriggers, TriggerwebhookUrl, Triggerwebhookdesc, TriggervalueOfheaders } = action.payload;

      state.triggerWebhookData[index] = {
        ...state.triggerWebhookData[index],
        Triggergoalname: Triggergoalname !== undefined ? Triggergoalname : state.triggerWebhookData[index]?.Triggergoalname,
        TriggerselectTriggers: TriggerselectTriggers !== undefined ? TriggerselectTriggers : state.triggerWebhookData[index]?.TriggerselectTriggers,
        TriggerwebhookUrl: TriggerwebhookUrl !== undefined ? TriggerwebhookUrl : state.triggerWebhookData[index]?.TriggerwebhookUrl,
        Triggerwebhookdesc: Triggerwebhookdesc !== undefined ? Triggerwebhookdesc : state.triggerWebhookData[index]?.Triggerwebhookdesc,
        TriggervalueOfheaders: TriggervalueOfheaders !== undefined ? TriggervalueOfheaders : state.triggerWebhookData[index]?.TriggervalueOfheaders,
      };
    },
  },
});

export const { setTriggerWebhookSlice } = triggerWebhookSlice.actions;
export default triggerWebhookSlice.reducer;
