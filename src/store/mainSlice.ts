import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// export const mainSlice = createSlice({
//   name: 'Settings',
//   initialState: {
//     PopupOpen: false,
   
//   },

//   reducers: {
//     changePopupOpen: (state, action: PayloadAction<boolean>) => {
//       state.PopupOpen = action.payload;
//     },
  
//   },
// });

// export const {
//     changePopupOpen,

// } = mainSlice.actions;

// export default mainSlice.reducer;

import type { RootState } from './store'

// Define a type for the slice state
interface PopupState {
  value: boolean
}

// Define the initial state using that type
const initialState: PopupState = {
  value: false
}

export const popupSlice = createSlice({
  name: 'popup',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
   
    // Use the PayloadAction type to declare the contents of `action.payload`
    changePopup: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    }
  }
})

export const { changePopup } = popupSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.popup.value

export default popupSlice.reducer