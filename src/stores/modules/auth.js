//import { firebaseAuth } from '../../config/firebaseConfig';
const state = {
	isLoggedIn: false,
	user: 
	{email: '',
	token: ''},
}

const mutations = {
	//'AUTH_STATUS_CHANGE' (state, token, loginMessage, isLoggedInTest, emailTest) {
	'AUTH_STATUS_CHANGE' (state, loginData) {
		console.log("mutation");
		console.log(loginData.isLoggedIn);
		// console.log(emailTest);
		// console.log(loginMessage);
		// console.log(state);
		// state.isLoggedIn = isLoggedInTest;
		state.isLoggedIn = loginData.isLoggedIn;
		if(state.isLoggedIn)
		{
			state.user.email = loginData.email;
			state.user.token = loginData.token;
			return;
		} 
		state.user.email = '';
		state.user.token = '';
		window.location.href = '/';
		// console.log(state);
		//state.user = firebaseAuth().currentUser;
		//console.log(testData);
		//console.log(state);
	}
}

const actions = {

}

const getters = {
	isLoggedIn: (state) => {
		return state.isLoggedIn;
	},
	currentUser: (state) => {
		if (state && state.user) {
			return {
				email: state.user.email,
				//emailVerified: state.user.emailVerified,
				//uid: state.user.uid
				token: state.user.token
			}
		} else {
			return {};
		}
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}
