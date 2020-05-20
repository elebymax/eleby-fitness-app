<template>
  <div class="fill-height d-flex flex-column">
    <v-navigation-drawer
      v-model="isDrawerOpen"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <!--      <v-app-bar-nav-icon -->
      <!--        @click.stop="isDrawerOpen = !isDrawerOpen"-->
      <!--      ></v-app-bar-nav-icon>-->
      <v-toolbar-title>Eleby Fitness</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer class="pa-0">
      <v-bottom-navigation
        :value="1"
        app
        dark
        grow
      >
        <v-btn
          to="/"
        >
          <span>Diaries</span>
          <v-icon>book</v-icon>
        </v-btn>

        <v-btn
          to="/meals"
        >
          <span>Meals</span>
          <v-icon>local_dining</v-icon>
        </v-btn>

        <v-btn>
          <span>Account</span>
          <v-icon>person</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </div>
</template>
<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import { fetchUser } from '@/api';
import { Mutation } from 'vuex-class';

  @Component({
    components: {},
  })

export default class Main extends Vue {
    @Mutation('fetchUser', { namespace: 'user' }) fetchUser: any;

    @Mutation('setUser', { namespace: 'user' }) setUser: any;

    @Mutation('setToken', { namespace: 'user' }) setToken: any;

    isDrawerOpen = false;

    created() {
      const token: string | null = window.localStorage.getItem('token');
      if (!token) {
        this.$router.replace('/login');
        return;
      }

      fetchUser(token).then((res) => {
        const { data } = res.data;
        this.setUser(data);
        this.setToken(token);
      }).catch((err: any) => {
        console.log(err);
      });
    }
}
</script>
<style lang="scss">
</style>
