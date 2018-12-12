import db from '@/db';

import uuid from 'uuid';


const ratings = db.collection('ratings');


const state = {
    ratedSongs : [],
};

const actions = {
    async ratedSong({commit}, val){
        let rated = false;
        await rating.where('song_id','==',val.song_id).where('user_id','==',val.user_id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                if(data){
                    rated = true;
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
    }
}

export default {
    namespaced:true,
    state,
    actions
};