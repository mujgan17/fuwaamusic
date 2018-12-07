import { firebaseAction } from 'vuexfire';
import db from '@/db';



const songsDoc = db.collection('songs');


const state = {
    songs: [],
    songLoading: true,
};

const actions = {
    async addSong (_, post){
        const result = await songsDoc.doc(post.id);
        result.get().then((doc)=> {
            if(doc.exists){
                let data = doc.data();
            }else{
                let data = result.set(post);
                return null;
            }
        });
    },
    songInit:firebaseAction(({ bindFirebaseRef}) => {
        bindFirebaseRef('songs', songsDoc).then(() => {
            state.songLoading = false;
        });
    }),
    setLoading({_, value}){
        state.songLoading = value;
    },
    updateSongs({commit,playload}){
        commit('updateSongs', playload);
    },

}



const mutations = {
    updateSongs({state,playload}){
        state.songs = playload; 
    }
}


export default{
    namespaced:true,
    state,
    actions,
    mutations
};