<template>
     <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="#e74c3c">
                <v-spacer></v-spacer>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
               
              </v-toolbar>
              <!--<v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="username" label="username" type="text" v-model="user.username"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="user.password"></v-text-field>
                </v-form>
              </v-card-text>-->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#e74c3c" dark class="w-100" @click="googleLogin()">
                    Google ile giris yap
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
               <!--<v-card-actions>
                <v-btn color="#e74c3c" dark class='w-100' to="Register">
                    Register
                </v-btn>
              </v-card-actions>-->
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    computed:{
        ...mapState('auth',['isError'])

    },
    data: () =>({
     
    }),
    methods: {
      ...mapActions('auth',['googleLogin'])
    }
}
</script>

<style>
.w-100{
    width: 100%;
    text-align: center;
}
</style>