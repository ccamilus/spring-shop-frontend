import axios from 'axios';
const API_URL = 'http://localhost:8080/'

export async function updateCart ({commit}, {token, itemId, quantity }) { 
	let updateCartMessage;
	const parameters = {  };
	let url = API_URL + 'api/v1/shopping-session/cart-items/change-quantity/' + itemId + '/' + quantity;
	await axios.put(url, parameters, {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Authorization': token
		}
	})
	.then(response => (updateCartMessage = response.data.message  ))
	.catch(function(error) {
		console.log(error);
		let message_obj = {
			message: error.response.data.message,
			messageClass: "danger",
			autoClose: true
		}
		commit('ADD_MESSAGE', message_obj);
	});
	getShoppingCart({commit},{token});
	console.log(updateCartMessage);	

}

export async function addItemToCart ({commit}, {token, item}) { 
	let addItemToCartMessage;
	let messageClass;
	let url = API_URL + 'api/v1/shopping-session/cart-items/save';
	var parameters = {
		productId: item.id,
		quantity: 1,
	};
	await axios.post(url, parameters, {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Authorization': token
		}
	})
	.then(response => (addItemToCartMessage = response.data.message, messageClass = 'success' ))
	.catch(function(error) {
		console.log(error);
		addItemToCartMessage = error.response.data.message;
		messageClass = 'danger';

	});
	let message_obj = {
		message: `${item.name} - ` + addItemToCartMessage,
		messageClass: messageClass,
		autoClose: true
  }
  commit('ADD_MESSAGE', message_obj);
  getShoppingCart({ commit }, { token });
}

export async function removeItemInCart ({commit}, {token, itemId}) {	
	let removeItemInCartMessage;
	let url = API_URL + 'api/v1/shopping-session/cart-items/delete/' + itemId;
	console.log('token ' + token);
	await axios.delete(url, {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Authorization': token
		}
	})
	.then(response => (removeItemInCartMessage = response.data  ))
	.catch(function(error) {
		console.log(error);
	});
	console.log(removeItemInCartMessage);
	getShoppingCart({commit},{token});
}

export async function registerByEmail  ({commit}, { email, password, firstName, lastName, telephone})  {
	let registerMessage;
	let messageClass;
	let url = API_URL + 'registration';
	var parameters = {
		email: email,
		password: password,
		firstName: firstName,
		lastName: lastName,
		telephone: telephone
	};
	await axios.post(url, parameters, {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		}
	})
	.then(response => (registerMessage = response.data.message, messageClass = 'success' ))
	.catch(function(error) {
		registerMessage = error.response.data.message;
		messageClass = 'danger';
	});
	let message_obj = {
		message: registerMessage,
		messageClass: messageClass,
		autoClose: true
	}
	commit('ADD_MESSAGE', message_obj);
	return registerMessage;

}

export const logout = ({commit}) => {
  commit('SET_CART', []); 
  let logoutData = {
	isLoggedIn: false,
}
commit('AUTH_STATUS_CHANGE', logoutData);
}


export async function loginWithEmail ({commit}, {email, password}) {
	let loginMessage;
	let status = false;
	let isLoggedIn = false;
	let url = API_URL + 'login';
	var parameters = {
		username: email,
		password: password

	};
	await axios.post(url, parameters, {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		}
	})
	.then(response => (loginMessage = response.data.data, status = response.data.status  ))
	.catch(function(error) {
		loginMessage = error.response.data.message;
		console.log(error);
		status = error.response.status;

	});
	if(status == 200){
	isLoggedIn = true;
	let token = loginMessage.authorization_token;
	let loginData = {
		isLoggedIn: isLoggedIn,
		email: email,
		token: token

	}
	commit('AUTH_STATUS_CHANGE', loginData);
	getShoppingCart({commit},{token});

	return; }	
	let message_obj = {
		message: `Nieprawdiłowy adres email lub hasło. `,
		messageClass: "danger",
		autoClose: true
	}
	commit('ADD_MESSAGE', message_obj);
  }

export async function listenToProductList({commit}) {
	let products;
	let url = API_URL + 'api/v1/products';
	await axios.get(url,  {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		}
	})
	.then(response => (products = response.data.data ))
	.catch(function(error) {
		console.log(error);
	});
	commit('UPDATE_PRODUCT_LIST', products)

}


export async function getShoppingCart({commit}, {token}) {
	let getShoppingCartMessage;
	let url = API_URL + 'api/v1/shopping-session/cart-items';
	await axios.get(url, {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Authorization': token
		}
	})
	.then(response => (getShoppingCartMessage = response.data.data ))
	.catch(function(error) {
		console.log(error);
	});
	commit('SET_CART', getShoppingCartMessage);

}


export async function makeOrder({commit}, {token}) { 
	let makeOrderMessage;
	let statutCode;
	let url = API_URL + 'api/v1/orders/make-order';
	var parameters = {
		shopUserAddressId: 1,
		shopUserPaymentId: 1,
	};
	await axios.post(url, parameters, {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Authorization': token
		}
	})
	.then(response => (makeOrderMessage = response.data.message, statutCode = response.data.status))
	.catch(function(error) {
		console.log(error);
		makeOrderMessage = error.response.data.message;
	});

  if (statutCode >= 200 ) {
    let message_obj = {
      message: 'Zamówienie zostało złożone',
      messageClass: "success",
      autoClose: true
    }
	commit('ADD_MESSAGE', message_obj);
	getShoppingCart({ commit }, { token });
	return;
  }
  let message_obj = {
	message: makeOrderMessage,
	messageClass: "danger",
	autoClose: true
  }
  commit('ADD_MESSAGE', message_obj);
}