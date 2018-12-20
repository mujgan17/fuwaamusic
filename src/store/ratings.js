import { firebaseAction } from 'vuexfire';
import db from '@/db';

import uuid from 'uuid';


const ratings = db.collection('ratings');


const state = {
    ratedSongs : [],
};

const actions = {
    async rateSong({ commit }, val){
        let rated = false;
        await ratings.where('song_id','==',val.song_id).where('user_id','==',val.user_id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                if(data){
                    rated = true;
                    return;
                }
            });
            if(!rated){
                let ratingElement = {
                    song_id:val.song_id,
                    user_id:val.user_id,
                    rate:val.rate
                };
                ratings.doc(uuid.v4()).set(ratingElement);

            }
        })
        .catch((err) => {
            console.log("Error",err);
        });
    },
    rateInit:firebaseAction(({ bindFirebaseRef}) => {
        bindFirebaseRef('ratedSongs', ratings);
    }),
};

export default {
    namespaced:true,
    state,
    actions
};