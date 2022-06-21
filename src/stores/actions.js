//import { ref, firebaseAuth } from '../config/firebaseConfig';
import { ref } from '../config/firebaseConfig';
import axios from 'axios';
const API_URL = 'http://localhost:8080/'

export async function updateCart ({commit}, {token, item}) { 
	console.log("update ");
	console.log(token);
	console.log(item);
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
	.then(response => (updateCartMessage = response.data, console.log('test1'), isAdd =true, console.log(updateCartMessage),  console.log('test2') ))
	.catch(function(error) {
		console.log("err"),
		console.log(error);
	});

	let quantity ='';
  commit('UPDATE_CART', {item, quantity, isAdd});
  if (isAdd) {
    let message_obj = {
      message: `${item.name} dodano pomyślnie do koszyka`,
      messageClass: "success",
      autoClose: true
    }
    commit('ADD_MESSAGE', message_obj);
  }
}

export const removeItemInCart = ({commit}, {item}) => {
	commit('REMOVE_CART_ITEM', {item});
}

export async function registerByEmail  ({commit}, { email, password, firstName, lastName, telephone})  {
	let registerMessage;
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
	.then(response => (registerMessage = response.data, console.log('test1'), console.log(registerMessage), console.log(registerMessage.message), console.log('test2') ))
	.catch(function(error) {
		registerMessage = error.response.data.message;
		console.log("err"),
		console.log(error.response.data.message),
		console.log(error);
		let message_obj = {
			message: registerMessage,
			messageClass: "success",
			autoClose: true
		}
		commit('ADD_MESSAGE', message_obj);

	});
	console.log("test3");
	console.log(registerMessage);
	console.log(registerMessage.message);
	console.log('message');
	let message_obj = {
		message: registerMessage,
		messageClass: "success",
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
	.then(response => (loginMessage = response.data, status = response.status  ))
	.catch(function(error) {
		loginMessage = error.response.data.message;
		console.log("err"),
		console.log(error.response.data.message),
		console.log(error);
		status = error.response.status;
		//commit('AUTH_STATUS_CHANGE', "", isLoggedIn, email);
		return;

	});
	if(status == 200){
	isLoggedIn = true;
	let isLoggedInTest = isLoggedIn;
	let emailTest = email;
	console.log("return");
	console.log(loginMessage.authorizationToken);
	console.log(isLoggedInTest);
	console.log(emailTest);
	let loginData = {
		isLoggedIn: isLoggedIn,
		email: email,
		token: loginMessage.authorizationToken

	}
	//commit('AUTH_STATUS_CHANGE', loginMessage.authorizationToken, loginMessage, isLoggedInTest, emailTest);
	commit('AUTH_STATUS_CHANGE', loginData); }
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
	.then(response => (products = response.data ))
	.catch(function(error) {
		console.log(error);
	});
	commit('UPDATE_PRODUCT_LIST', products)
	//return ref.child("products").on('value', (products) => {
	//	commit('UPDATE_PRODUCT_LIST', products.val());
	//});
}

export function getShoppingCart({commit}, {uid, currentCart}) {
	if (uid) {
		return ref.child("cart/" + uid).once('value').then((cart) => {
			// console.log(cart.val());
			if (cart.val() && (!currentCart || currentCart.length == 0)) {
				commit('SET_CART', cart.val());
			}
		});
	} else {
		// console.log("User has not logged in");
	}
}

export function saveShoppingCart(_, {uid, cartItemList}) {
	// console.log("ACTIONS saveShoppingCart");
	// console.log("CART DATA", cartItemList);
	return ref.child("cart/" + uid).set(cartItemList);
}

export function saveToTransaction(_, {uid, cartItemList}) {
	let newTransactionKey = ref.child("transactions").push().key;
	var newTransaction = {}
	newTransaction['/transactions/' + uid + '/' + newTransactionKey] = cartItemList;
	return ref.update(newTransaction);
}
