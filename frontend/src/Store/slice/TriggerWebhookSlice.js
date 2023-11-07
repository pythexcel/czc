import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Triggergoalname: '',
    TriggerselectTriggers: '',
    TriggerwebhookUrl: '',
    Triggerwebhookdesc: '',
    TriggervalueOfheaders: ''
}

const triggerWebhookSlice = createSlice({
    name: 'triggerWebhookSlice',
    initialState,
    reducers: {
        setTriggerWebhookSlice: (state, action) => {
            const { value, type } = action.payload;
            switch (type) {
                case 'goalname':
                    state.Triggergoalname = value
                    break;
                case 'selectTriggers':
                    state.TriggerselectTriggers = value
                    break;
                case 'webhookUrl':
                    state.TriggerwebhookUrl = value
                    break;
                case 'webhookdesc':
                    state.Triggerwebhookdesc = value
                    break;
                case 'valueOfheaders':
                    state.TriggervalueOfheaders = value
                    break;
            }
        }
    }
})

export const { setTriggerWebhookSlice } = triggerWebhookSlice.actions
export default triggerWebhookSlice.reducer