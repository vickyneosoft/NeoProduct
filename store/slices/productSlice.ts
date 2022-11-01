import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface ProductsSlice {
    data: any[],
}

// Define the initial state using that type
const initialState: ProductsSlice = {
    data: [],
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        saveProducts: function (state, action: PayloadAction<any[]>) {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.data = [...action.payload]
        },
    }
})

// Action creators are generated for each case reducer function
export const { saveProducts } = productSlice.actions

export default productSlice.reducer