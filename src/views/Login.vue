<template>
  <v-app id="inspire">
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
          <v-card class="elevation-12 grey darken-2">
            <v-toolbar
              class="grey darken-3"
              flat
            >
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    v-on="on"
                  >
                    <v-icon>help</v-icon>
                  </v-btn>
                </template>
                <span>Login</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Email"
                  prepend-icon="email"
                  type="text"
                  hide-details
                  color="yellow darken-3"
                ></v-text-field>
                <v-text-field
                  class="mt-3"
                  label="Password"
                  prepend-icon="lock"
                  type="password"
                  hide-details
                  color="yellow darken-3"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                class="grey darken-3"
                depressed
                :loading="isSubmitLoading"
                @click="handleOnSubmitClicked"
              >Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { UserResponse } from '@/store/user/types';
import { loginUser } from '@/api';

@Component({
  components: {},
})

export default class Login extends Vue {
    @Action('loginUser', { namespace: 'user' }) loginUser: any;

    @Action('fetchUser', { namespace: 'user' }) fetchUser: any;

    @Action('setUser', { namespace: 'user' }) setUser: any;

    form: { email: string; password: string } = {
      email: '',
      password: '',
    };

    isSubmitLoading = false;

    created() {
      this.$vuetify.theme.dark = true;
    }

    handleOnSubmitClicked() {
      this.isSubmitLoading = true;

      loginUser({
        email: this.form.email,
        password: this.form.password,
      }).then((res) => {
        const { data } = res.data;

        this.setUser(data);

        // set token
        window.localStorage.setItem('token', data.token);

        // redirect
        const redirectPath: string | (string | null)[] = this.$route.query.redirect;
        if (this.$route.query.redirect) {
          this.$router.replace(`${redirectPath}`);
        }
      }).catch((err: any) => {
        console.log(err);
      }).finally(() => {
        this.isSubmitLoading = false;
      });
    }
}
</script>
<style lang="scss">
</style>
