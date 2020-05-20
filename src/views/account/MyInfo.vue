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

  @Component({
    components: { ConfirmDialog },
  })

export default class MyInfo extends Vue {
    @Getter('user', { namespace: 'user' }) user!: User;

    @Mutation('setUser', { namespace: 'user' }) setUser: any;

    isShowSignOutDialog = false;

    // eslint-disable-next-line class-methods-use-this
    handleOnSignOutClicked() {
      this.$router.replace('/login');
      window.localStorage.removeItem('token');
      this.setUser(undefined);
    }
}
</script>
<style lang="scss">
</style>
