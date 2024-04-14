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
            console.log("Inside add item");
            console.log(item.payload);

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
            console.log(item);
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
        removeItem: (state) => {
            //state.value -= 1
        },
    },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, updateQuantity } = cartSlice.actions

export default cartSlice.reducer