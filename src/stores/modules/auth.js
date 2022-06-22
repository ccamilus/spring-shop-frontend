const state = {
	isLoggedIn: false,
	user: 
	{email: '',
	token: ''},
}

const mutations = {
	'AUTH_STATUS_CHANGE' (state, loginData) {
		state.isLoggedIn = loginData.isLoggedIn;
		if(state.isLoggedIn)
		{
			state.user.email = loginData.email;
			state.user.token = loginData.token;
			return;
		} 
		state.user.email = '';
		state.user.token = '';

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
