//import { ref, firebaseAuth } from '../config/firebaseConfig';
import { ref } from '../config/firebaseConfig';
import axios from 'axios';
//import { get } from 'core-js/core/dict';
const API_URL = 'http://localhost:8080/'

export async function updateCart ({commit}, {token, itemId,item, quantity }) { 
	let updateCartMessage;
	console.log(item);
	const parameters = {  };
	let url = API_URL + 'api/v1/shopping-session/cart-items/change-quantity/' + itemId + '/' + quantity;
	console.log('token ' + token);
	await axios.put(url, parameters, {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Authorization': token
		}
	})
	.then(response => (updateCartMessage = response.data  ))
	.catch(function(error) {
		console.log(error);
		let message_obj = {
			message: error.response.data.message,
			messageClass: "danger",
			autoClose: true
		}
		commit('ADD_MESSAGE', message_obj);
	});
	console.log(updateCartMessage);
	
	//let quantity ='';
	//commit('UPDATE_CART', {item, quantity});
	getShoppingCart({commit},{token});
  //this.getShoppingCart({token});
//   if (isAdd) {
//     let message_obj = {
//       message: `${item.name} dodano pomyślnie do koszyka`,
//       messageClass: "success",
//       autoClose: true
//     }
//     commit('ADD_MESSAGE', message_obj);
// 	return;
//   }
//   let message_obj = {
// 	message: `${item.name} już znajduje się w koszyku `,
// 	messageClass: "danger",
// 	autoClose: true
//   }
//   commit('ADD_MESSAGE', message_obj);
}

export async function addItemToCart ({commit}, {token, item}) { 
	let updateCartMessage;
	let isAdd = false;
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
	.then(response => (updateCartMessage = response.data, isAdd =true ))
	.catch(function(error) {
		console.log(error);
	});
	console.log(updateCartMessage);
	//let quantity ='';
  //commit('UPDATE_CART', {item, quantity, isAdd});
  if (isAdd) {
    let message_obj = {
      message: `${item.name} dodano pomyślnie do koszyka`,
      messageClass: "success",
      autoClose: true
    }
	commit('ADD_MESSAGE', message_obj);
	getShoppingCart({commit},{token});
	return;
  }
  let message_obj = {
	message: `${item.name} już znajduje się w koszyku `,
	messageClass: "danger",
	autoClose: true
  }
  commit('ADD_MESSAGE', message_obj);
}


export async function removeItemInCart ({commit}, {token, itemId}) {
	
	let updateCartMessage;
	//let isAdd = false;
	//const parameters = {  };
	let url = API_URL + 'api/v1/shopping-session/cart-items/delete/' + itemId;
	console.log('token ' + token);
	await axios.delete(url, {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Authorization': token
		}
	})
	.then(response => (updateCartMessage = response.data  ))
	.catch(function(error) {
		console.log(error);
	});
	console.log(updateCartMessage);
	getShoppingCart({commit},{token});
	//commit('REMOVE_CART_ITEM', {itemId});
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

	//commit('UPDATE_PRODUCT_LIST', products)
	//return firebaseAuth().createUserWithEmailAndPassword(email, password);
}

export const logout = ({commit}) => {
  commit('SET_CART', []); // clear current cart
  let logoutData = {
	isLoggedIn: false,
}
//commit('AUTH_STATUS_CHANGE', loginMessage.authorizationToken, loginMessage, isLoggedInTest, emailTest);
commit('AUTH_STATUS_CHANGE', logoutData);
  //return firebaseAuth().signOut();
}

// export function loginWithEmail (_, {email, password}) {
//   return firebaseAuth().signInWithEmailAndPassword(email, password);
// }

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
		console.log('token ' + token);
	let loginData = {
		isLoggedIn: isLoggedIn,
		email: email,
		token: token

	}
	commit('AUTH_STATUS_CHANGE', loginData);
	getShoppingCart({commit},{token});
    //this.getShoppingCart({token});
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
	//return ref.child("products").on('value', (products) => {
	//	commit('UPDATE_PRODUCT_LIST', products.val());
	//});
}

// export function getShoppingCart({commit}, {uid, currentCart}) {
// 	if (uid) {
// 		return ref.child("cart/" + uid).once('value').then((cart) => {
// 			// console.log(cart.val());
// 			if (cart.val() && (!currentCart || currentCart.length == 0)) {
// 				commit('SET_CART', cart.val());
// 			}
// 		});
// 	} else {
// 		// console.log("User has not logged in");
// 	}
// }
export async function getShoppingCart({commit}, {token}) {
	console.log("TEST 2");
	let updateCartMessage;
	let url = API_URL + 'api/v1/shopping-session/cart-items';
	await axios.get(url, {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Authorization': token
		}
	})
	.then(response => (updateCartMessage = response.data.data ))
	.catch(function(error) {
		console.log(error);
	});
	console.log(updateCartMessage);
	console.log(updateCartMessage.cart_items);
	//let quantity ='';
	commit('SET_CART', updateCartMessage);
//   commit('UPDATE_CART', {item, quantity, isAdd});
//   if (isAdd) {
//     let message_obj = {
//       message: `${item.name} dodano pomyślnie do koszyka`,
//       messageClass: "success",
//       autoClose: true
//     }
//     commit('ADD_MESSAGE', message_obj);
// 	return;
//   }
//   let message_obj = {
// 	message: `${item.name} już znajduje się w koszyku `,
// 	messageClass: "danger",
// 	autoClose: true
//   }
//   commit('ADD_MESSAGE', message_obj);
}

// export function saveShoppingCart(_, {uid, cartItemList}) {
// 	// console.log("ACTIONS saveShoppingCart");
// 	// console.log("CART DATA", cartItemList);
// 	return ref.child("cart/" + uid).set(cartItemList);
// }

export function saveToTransaction(_, {uid, cartItemList}) {
	let newTransactionKey = ref.child("transactions").push().key;
	var newTransaction = {}
	newTransaction['/transactions/' + uid + '/' + newTransactionKey] = cartItemList;
	return ref.update(newTransaction);
}

export async function makeOrder({commit}, {token}) { 
	let updateCartMessage;
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
	.then(response => (updateCartMessage = response.data.message, statutCode = response.data.status))
	.catch(function(error) {
		console.log(error);
		updateCartMessage = error.response.data.message;
	});
	console.log(updateCartMessage);
	//let quantity ='';
  //commit('UPDATE_CART', {item, quantity, isAdd});
  if (statutCode >= 200 ) {
    let message_obj = {
      message: 'Zamówienie zostało złożone',
      messageClass: "success",
      autoClose: true
    }
	commit('ADD_MESSAGE', message_obj);
	getShoppingCart({ commit }, { token });
	//window.location.href = '/';
	return;
  }
  let message_obj = {
	message: updateCartMessage,
	messageClass: "danger",
	autoClose: true
  }
  commit('ADD_MESSAGE', message_obj);
}