const state = {
	cartItemList: [],
	cartValue: null
}

const mutations = {
	'UPDATE_CART' (state, {item, quantity}) {
		let isAdd = true;
		const record = state.cartItemList.find(element => element.id == item.id);
		if (record) {
			if (isAdd) {
				record.quantity += quantity;
			} else {
				record.quantity = quantity;
			}
		} else {
			state.cartItemList.push({
				...item,
				quantity
			});
		}
	},
	'SET_CART' (state, productList) {
		if (productList) {
			state.cartItemList = productList.cart_items;
			state.cartValue = productList.total;
		}
	},
	'REMOVE_CART_ITEM' (state, {itemId}) {
		const record = state.cartItemList.find(element => element.id == itemId);
		state.cartItemList.splice(state.cartItemList.indexOf(record), 1);
	}
}

const actions = {
	clearCart: ({commit}) => {
		commit('SET_CART', []);
	}
}

const getters = {
	cartItemList: (state) => {
		return state.cartItemList;
	},
	cartValue: (state) => {
		return state.cartValue;
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}
