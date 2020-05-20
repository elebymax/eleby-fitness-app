<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <div class="mb-2 text-center">
          <v-icon
            class="font-weight-bold"
            color="yellow darken-3"
          >
            fitness_center
          </v-icon>
        </div>
        <v-card class="elevation-12 grey darken-2">
          <v-toolbar
            class="grey darken-3"
            flat
          >
            <v-toolbar-title>Sign up</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="form.name"
                label="Name"
                prepend-icon="person"
                type="text"
                hide-details
                color="yellow darken-3"
              ></v-text-field>
              <v-text-field
                v-model="form.email"
                label="Email"
                prepend-icon="email"
                type="text"
                hide-details
                color="yellow darken-3"
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                hide-details
                prepend-icon="lock"
                color="yellow darken-3"
                label="New password"
                :type="form.isShowPassword ? 'text' : 'password'"
                :append-icon="form.isShowPassword ? 'visibility' : 'visibility_off'"
                @click:append="form.isShowPassword = !form.isShowPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              class="grey darken-2"
              depressed
              @click="$router.push('/login')"
            >
              Login
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="grey darken-3"
              depressed
              :loading="isSubmitLoading"
              @click="handleOnSubmitClicked"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
        <div class="mt-2 text-center">
          <div class="body-2">© 2020 Eleby Fitness</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
import { signUpUser } from '@/api';
import MessageSnackBar from '../components/MessageSnackBar.vue';

  @Component({
    components: {
      MessageSnackBar,
    },
  })

export default class Login extends Vue {
    @Mutation('setToken', { namespace: 'user' }) setToken: any;

    @Mutation('setUser', { namespace: 'user' }) setUser: any;

    @Mutation('setMessageData', { namespace: 'messageSnackBar' }) setSnackBarMessageData: any;

    @Mutation('show', { namespace: 'messageSnackBar' }) showSnackBar: any;

    @Mutation('dismiss', { namespace: 'messageSnackBar' }) dismissSnackBar: any;

    form ={
      name: '',
      email: '',
      password: '',
      isShowPassword: false,
    };

    isSubmitLoading = false;

    handleOnSubmitClicked() {
      this.isSubmitLoading = true;

      signUpUser({
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
      }).then((res) => {
        const { message } = res.data;
        this.dismissSnackBar();
        this.setSnackBarMessageData({
          text: message,
          color: 'success',
        });
        this.showSnackBar();
        this.$router.push('/login');
      }).catch((err: any) => {
        const { error } = err.response.data;
        this.dismissSnackBar();
        this.setSnackBarMessageData({
          text: error.message,
          color: 'error',
        });
        this.showSnackBar();
      }).finally(() => {
        this.isSubmitLoading = false;
      });
    }
}
</script>
<style lang="scss">
</style>
