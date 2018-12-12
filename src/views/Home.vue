<template>
  <v-app>
    <v-toolbar color="red lighten-1" app>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title white--text">
          <v-icon class="white--text">dashboard</v-icon>Fuwa
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        v-model="searchVideoSync"
        label="Oylamak için şarkı arayın..."
        solo
        class="mt-2"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <v-btn slot="activator" fab color="white" small @click="isAdding = true">
          <v-icon>add</v-icon>
        </v-btn>
        <span>add new song</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn slot="activator" fab color="white" small>
          <v-icon>supervised_user_circle</v-icon>
        </v-btn>
        <span>who is online</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn slot="activator" fab color="white" small @click="logout()">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
        <span>Log out</span>
      </v-tooltip>
    </v-toolbar>
    <v-content>
      <v-layout fill-height>
        <v-dialog v-model="isAdding" max-width="850px">
          <v-card>
            <v-card-title>add a music</v-card-title>
            <v-card-text>
              <v-autocomplete
                v-model="searchModelText"
                :items="searchItems"
                :loading="searchLoading"
                :search-input.sync="searchModelTextSync"
                small-chips
                cache-items
                hide-no-data
                item-text="name"
                item-value="video_id"
                label="Search music..."
                solo
              >
                <template slot="selection" slot-scope="{ item, selected }">
                  <v-chip :selected="selected" color="blue-grey" class="white--text">
                    <v-list-tile-avatar
                      color="indigo"
                      class="headline font-weight-light white--text"
                    >
                      <img :src="item.image" alt>
                    </v-list-tile-avatar>
                    <span v-text="item.name"></span>
                  </v-chip>
                </template>
                <template slot="item" slot-scope="{ item, tile }">
                  <v-list-tile-avatar color="indigo" class="headline font-weight-light white--text">
                    <img :src="item.image" alt>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-text="item.channelName"></v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>mdi-coin</v-icon>
                  </v-list-tile-action>
                </template>
              </v-autocomplete>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" flat @click="saveMusic()">Add</v-btn>
              <v-btn color="primary" flat @click="isAdding=false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-flex xs12 class="ma-2">
          <v-data-table
            :items="getItems()"
            class="elevation-1"
            hide-actions
            hide-headers
            v-if="!songLoading"
          >
            <template slot="items" slot-scope="props">
              <td>
                <v-btn flat @click="playVideo(props.item.id)">
                  <v-icon>play_circle_outline</v-icon>
                </v-btn>
              </td>
              <td class="text-xs-center">{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.realaseDate }}</td>
              <td class="text-xs-center">{{ props.item.signer }}</td>
              <td class="text-xs-center">
                <v-rating
                  v-model="props.item.rating"
                  color="red"
                  background-color="grey lighten-1"
                  readonly
                ></v-rating>
              </td>
              <td class="text-xs-center">
                <v-btn class="warning" @click="dialogRate(props.item.id)" small>vote</v-btn>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>

      <v-dialog v-model="isRateAdding" max-width="300">
        <v-card>
            <v-card-text class="text-xs-center">
              <v-rating
                  v-model="ratingVideoRate"
                  color="red"
                  background-color="grey lighten-1"
                  half-increments
                ></v-rating>
            </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat="flat" @click="rateSongBefore()">Vote</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card flat>
        <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="transparent">
          <v-btn color="teal" flat value="favorites">
            <span>favorite songs</span>
            <v-icon>favorite</v-icon>
          </v-btn>
        </v-bottom-nav>
      </v-card>
    </v-content>
    <iframe id="ytplayer" type="text/html" width="0" height="0" src frameborder="0"/>
  </v-app>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import firebase from "../firebase";

export default {
  data: () => ({
    desserts: [
      {
        item: "play",
        value: false,
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%"
      },
      {
        value: false,
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: "1%"
      },
      {
        value: false,
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%"
      },
      {
        value: false,
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: "8%"
      },
      {
        value: false,
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: "16%"
      },
      {
        value: false,
        name: "Jelly bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: "0%"
      },
      {
        value: false,
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%"
      },
      {
        value: false,
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: "45%"
      },
      {
        value: false,
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: "22%"
      },
      {
        value: false,
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%"
      }
    ],
    bottomNav: "favorites",
    isAdding: false,
    searchModelText: "",
    searchItems: [],
    searchLoading: false,
    searchModelTextSync: null,
    API_KEY: "AIzaSyB2GDGY8sH0frJJRxzL3WCW5VLEC7ySHfw",
    searchVideoSync: "",
    searchingItems: [],
    isRateAdding: false,
    ratingVideoId: '',
    ratingVideoRate: 2.5,
    user_id: firebase.auth().currentUser.uid,
  }),
  computed: {
    ...mapState("songs", ["songs", "songLoading"]),
    ...mapState("ratings", ["ratings"])
  },
  mounted() {
    this.songInit();
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    ...mapActions("songs", ["addSong", "songInit", "updateSongs"]),
    ...mapActions("ratings", ["rateSong"]),
    ...mapMutations("songs", ["updateSongs"]),
    async saveMusic() {
      if (this.searchModelText != "") {
        this.isAdding = false;
        const VIDEO_API_LINK =
          "https://www.googleapis.com/youtube/v3/videos?id=" +
          this.searchModelText +
          "&part=snippet&key=" +
          this.API_KEY;
        fetch(VIDEO_API_LINK)
          .then(res => res.json())
          .then(data => {
            let youtubeItems = data.items;
            youtubeItems.forEach(video => {
              let songElement = {
                id: video.id,
                name: video.snippet.title,
                signer: video.snippet.channelTitle,
                poster: video.snippet.thumbnails.medium.url,
                realaseDate: video.snippet.publishedAt.substring(0, 4),
                voted: 1,
                rating: 5.0,
                user_id: firebase.auth().currentUser.uid,
                rateduser: firebase.auth().currentUser.uid
              };
              let result = this.addSong(songElement);
            });
            this.searchItems = [];
            this.searchModelText = "";
          })
          .catch(err => {
            console.error(err);
          });
      }
    },

    playVideo(id) {
      let embed_key =
        "http://www.youtube.com/embed/" +
        id +
        "?autoplay=1&origin=http://localhost:8080";
      let player = document.getElementById("ytplayer");
      player.src = embed_key;
    },
    getItems() {
      if (this.searchingItems.length != 0) {
        return this.searchingItems;
      } else {
        //this.songInit();
        return this.songs;
      }
    },
    dialogRate(id){
        this.isRateAdding = true;
        this.ratingVideoId = id;
    },
    rateSongBefore(){
        let sendingElement = {
            song_id:this.ratingVideoId,
            user_id:this.user_id,
            rate:this.ratingVideoRate,
        };
        this.rateSong(sendingElement);
        this.ratingVideoId = '';
        this.ratingVideoRate = 2.5;
        this.isRateAdding = false;
    }
  },
  watch: {
    searchModelTextSync(val) {
      if (val != null || val != "") {
        this.searchLoading = true;
        const YOUTUBE_LINK =
          "https://www.googleapis.com/youtube/v3/search?q=" +
          val +
          "&maxResults=50&part=snippet&key=" +
          this.API_KEY +
          "&type=regionCode:90";
        let responseItems = [];
        fetch(YOUTUBE_LINK)
          .then(res => res.json())
          .then(data => {
            let youtubeItems = data.items;
            youtubeItems.forEach(video => {
              responseItems.push({
                name: video.snippet.title,
                image: video.snippet.thumbnails.medium.url,
                channelName: video.snippet.channelTitle,
                video_id: video.id.videoId
              });
            });
            this.searchItems = responseItems;
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            this.searchLoading = false;
          });
      } else {
        this.searchLoading = false;
        this.searchItems = [];
      }
    },
    searchVideoSync(val) {
      this.searchingItems = [];
      if (val != "" && val != undefined && this.songs != undefined) {
        for (let i = 0; i < this.songs.length; i++) {
          if (this.songs[i]["name"].toLowerCase().includes(val)) {
            //console.log(this.songs[i]["name"]);
            this.searchingItems.push(this.songs[i]);
          }
        }
      } else {
        this.searchingItems = [];
        this.songInit();
      }
    }
  }
};
</script>

<style>
</style>
