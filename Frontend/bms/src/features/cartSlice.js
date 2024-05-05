import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    //reduceers manage the state of slice
    reducers: {
        addItem: (state, item) => {
            const { bookId } = item.payload;
            const items = state.items;
            var updated = false;
            for (let index = 0; index < items.length; index++) {
                const item = items.at(index);
                if (item.bookId == bookId) {
                    item.qty = item.qty + 1;
                    updated = true;
                    break;
                }
            }
            if (updated == false)
                state.items.push(item.payload);
        },
        updateQuantity: (state, item) => {
            const { bookId, qty } = item.payload;
            const items = state.items;
            for (let index = 0; index < items.length; index++) {
                const item = items.at(index);
                if (item.bookId == bookId) {
                    if (qty == 0) {
                        items.splice(index, 1);
                    }
                    else {
                        item.qty = qty;
                    }
                    break;
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
})

// Action creators are generated for each case reducer function
export const { addItem, clearCart, updateQuantity } = cartSlice.actions

export default cartSlice.reducer