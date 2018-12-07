import firebase from '../firebase';

import router from '../router/index';

const state = {
    user:{},
    isLoggedIn:false,
    isError:false
};

const mutations = {
    setUser(state, user){
        if(user) {
            state.user = user;
            state.isLoggedIn = true;
        }else{
            state.user = {};
            state.isLoggedIn = false;
        }
    }

};

const actions = {
    async googleLogin({commit}, user){
         const provider = new firebase.auth.GoogleAuthProvider();
         await firebase.auth().signInWithPopup(provider);
   

    },
    async logout({commit}){
        await firebase.auth().signOut();
        router.push('/Login');
    }
};

export default{
    namespaced:true,
    state,
    mutations,
    actions,
}