import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface ProductsSlice {
    favProductIds: any,
}

// Define the initial state using that type
const initialState: ProductsSlice = {
    favProductIds: {} // using object to overcome iterating array to check already a fav or not
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        toggleFav: function (state, action: PayloadAction<number>) {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            let existingFavIds = { ...state.favProductIds }
            const isAlreadyFav = existingFavIds[action.payload]
            if (isAlreadyFav) {
                delete existingFavIds[action.payload]
            } else {
                existingFavIds = { ...existingFavIds, [action.payload]: true }
            }
            state.favProductIds = { ...existingFavIds }
        },
    }
})

// Action creators are generated for each case reducer function
export const { toggleFav } = productSlice.actions

export default productSlice.reducer