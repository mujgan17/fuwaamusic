import firebase from 'firebase';
import db from './db';

import store from './store/index';
import router from './router/index';



firebase.auth().onAuthStateChanged((user) => {
    if(user){
        const setUser = {
            id: user.uid,
            name: user.displayName,
            image: user.photoURL
        };
        db.collection('users').doc(setUser.id).set(setUser);
        store.commit('auth/setUser', setUser);
        router.push('/');
    }else{
        store.commit('auth/setUser', null);
    }
});