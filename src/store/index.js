import vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import songs from './songs';

import { firebaseMutations } from 'vuexfire';

vue.use(Vuex);


export default new Vuex.Store({
mutations:{
    ...firebaseMutations
},
modules:{
    auth,
    songs
}


});