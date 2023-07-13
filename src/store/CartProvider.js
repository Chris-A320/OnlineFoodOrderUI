import CartContext from "./cart-context";
import {useReducer} from 'react';

const defaultCartState= {
    items: [],
    totalAmount:0
};

const cartReducer = (state,action) =>{
    if(action.type==='ADD'){
        
        // const updatedItems = state.items.concat(action.item);
        // const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id=== action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
       
        let updatedItem;
        let updatedItems;

        if(existingCartItem){
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex]= updatedItem;
        } else{
            updatedItem= {...action.item};
            updatedItems= state.items.concat(updatedItem);

        }
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    return defaultCartState;
}
const CartProvider = props => {
    const[cartState, dispatchCartActiion]= useReducer(cartReducer, defaultCartState);
    const addItemHandler= item =>{
        dispatchCartActiion({type: 'ADD', item: item})
    }
    const removeItemFromCartHandler = id =>{
        dispatchCartActiion({type: 'REMOVE', id:id})
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler ,
        removeItem: removeItemFromCartHandler
    };
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}
export default CartProvider;