<template>
  <v-container>
    <v-card
      class="grey darken-3 mt-8 pa-3"
      flat
    >
      <div class="d-flex flex-column">
        <div class="d-flex justify-center">
          <v-avatar
            color="yellow darken-3"
            size="62"
            style="margin-top: -48px"
          >
            <v-icon>person</v-icon>
          </v-avatar>
        </div>
        <div class="text-center mt-3 font-weight-bold body-1">
          {{ user.name }}
        </div>
        <div class="text-center mt-1 body-2">
          {{ user.email }}
        </div>
      </div>
    </v-card>
    <v-btn
      block
      class="mt-3"
      depressed
      color="yellow darken-3"
      @click="isShowSignOutDialog = true"
    >
      Sign out
    </v-btn>
    <div class="d-flex flex-column mt-3">
      <v-btn
        v-if="!isEditPassword"
        block
        depressed
        color="yellow darken-3"
        @click="isEditPassword = true"
      >
        Change Password
      </v-btn>
      <div
        v-else
        class="d-flex align-center"
      >
        <v-text-field
          v-model="passwordForm.password"
          hide-details
          dense
          outlined
          color="yellow darken-3"
          label="New password"
          :type="passwordForm.isShowPassword ? 'text' : 'password'"
          :append-icon="passwordForm.isShowPassword ? 'visibility' : 'visibility_off'"
          @click:append="passwordForm.isShowPassword = !passwordForm.isShowPassword"
        ></v-text-field>
        <v-btn
          class="ml-3 fill-height"
          depressed
          color="yellow darken-3"
          @click="handleChangePassword"
          :loading="passwordForm.isLoading"
        >
          Change!
        </v-btn>
      </div>
    </div>
    <confirm-dialog
      v-model="isShowSignOutDialog"
      text-title="info"
      :text-content="`You really want to sign out`"
      text-cancel="No"
      text-confirm="Yes"
      :on-confirm="handleOnSignOutClicked"
    ></confirm-dialog>
  </v-container>
</template>
<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import { User } from '@/store/user/types';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { changePassword } from '@/api';

  @Component({
    components: { ConfirmDialog },
  })

export default class MyInfo extends Vue {
    @Getter('user', { namespace: 'user' }) user!: User;

    @Mutation('setUser', { namespace: 'user' }) setUser: any;

    @Mutation('setMessageData', { namespace: 'messageSnackBar' }) setSnackBarMessageData: any;

    @Mutation('show', { namespace: 'messageSnackBar' }) showSnackBar: any;

    @Mutation('dismiss', { namespace: 'messageSnackBar' }) dismissSnackBar: any;

    isShowSignOutDialog = false;

    isEditPassword = false;

    passwordForm = {
      password: '',
      isShowPassword: false,
      isLoading: false,
    };

    // eslint-disable-next-line class-methods-use-this
    handleOnSignOutClicked() {
      this.$router.replace('/login');
      window.localStorage.removeItem('token');
      this.setUser(undefined);
    }

    // eslint-disable-next-line class-methods-use-this
    handleChangePassword() {
      this.passwordForm.isLoading = true;

      changePassword({
        password: this.passwordForm.password,
      }).then((res) => {
        const { message } = res.data;
        this.dismissSnackBar();
        this.setSnackBarMessageData({
          text: message,
          color: 'success',
        });
        this.showSnackBar();
        this.passwordForm.password = '';
        this.isEditPassword = false;
      }).catch((err: any) => {
        const { error } = err.response.data;
        this.dismissSnackBar();
        this.setSnackBarMessageData({
          text: error.message,
          color: 'error',
        });
        this.showSnackBar();
      }).finally(() => {
        this.passwordForm.isLoading = false;
      });
    }
}
</script>
<style lang="scss">
</style>
