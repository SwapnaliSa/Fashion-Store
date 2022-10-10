import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
			const existsItem = state.cartItems.find(
				(i) => i.product === item.product
			);

			if (existsItem) {
				return {
					...state,
					cartItems: state.cartItems.map((i) =>
						i.product === existsItem.product ? item : i
					),
				};
			} else {
				return { ...state, cartItems: [...state.cartItems, item] };
			}
		default:
			return state;
	}
};
