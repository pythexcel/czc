import { createSlice } from "@reduxjs/toolkit";

const triggerWebhookSlice = createSlice({
  name: 'triggerWebhook',
  initialState: {
    triggerWebhookData: [],
  },
  reducers: {
    addEmptyWebhookObject: (state) => {
      const newWebHook = {
        Triggergoalname: "",
        TriggerselectTriggers: "",
        TriggerwebhookUrl: "",
        Triggerwebhookdesc: "",
        TriggervalueOfheaders: "",
        headers: []
      }
      state.triggerWebhookData = [...state.triggerWebhookData, newWebHook]
    },
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
    addHeadersSlice: (state, action) => {
      const index = action.payload?.index
      const webhookToAddHeaders = state.triggerWebhookData[index]
      if (webhookToAddHeaders) {
        if (!webhookToAddHeaders.headers) {
          webhookToAddHeaders.headers = []
        }
        webhookToAddHeaders.headers.push({ headerName: "", valueOfHeader: "" })
      }
    },   
    deleteWebhook: (state, action) => {
      const newTriggerWebhookData = state.triggerWebhookData.filter((item, i) => i !== action.payload)
      state.triggerWebhookData = newTriggerWebhookData
    },
    deleteHeaders: (state, action) => {
      const { headerIndex, webHookIndex } = action.payload
      let newWebHookData = [...state.triggerWebhookData]
      let webhookToModify = newWebHookData[webHookIndex]
      webhookToModify.headers = webhookToModify.headers?.filter((item, i) => i !== headerIndex)
      state.triggerWebhookData = newWebHookData
    },
    handleHeaderChange: (state, action) => {
      const { headerIndex, name, value, webHookIndex } = action.payload
      let newWebHookData = [...state.triggerWebhookData]
      let webhookToModify = newWebHookData[webHookIndex]
      webhookToModify.headers[headerIndex][name] = value
      state.triggerWebhookData = newWebHookData
    },
    handleReset: (state) => {
      state.triggerWebhookData = []
    },
  },
});

export const { setTriggerWebhookSlice, addHeadersSlice, addEmptyWebhookObject, deleteWebhook, deleteHeaders, handleHeaderChange, handleReset } = triggerWebhookSlice.actions;
export default triggerWebhookSlice.reducer;
