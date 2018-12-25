import { firebaseAction } from 'vuexfire';
import db from '@/db';
import uuid from 'uuid';


let favorites = db.collection('favorites');


const state = {
    favorites:[]

};

const actions = {
    favoriteInit:firebaseAction(({ bindFirebaseRef}, val) => {
        bindFirebaseRef('favorites', favorites.where('user_id', "==",val));
    }),
    async addFavorite({commit}, val){
        let favoritedBefore = false;
        await favorites.where('song_id', "==", val.id).where('user_id',"==", val.user_id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(element => {
                let data = element.data();
                if(data){
                    favoritedBefore = true;
                    return;
                }
            });
            if(!favoritedBefore){
                let songElement ={
                song_id: val.id,
                name: val.name,
                signer: val.signer,
                poster: val.poster,
                realaseDate: val.realaseDate,
                user_id: val.user_id
            };
                favorites.doc(uuid.v4()).set(songElement);
               
            }
        })
        .catch((err) => {
            console.log("Error",err);
        });
    }

};

export default {
    namespaced:true,
    state,
    actions
};
