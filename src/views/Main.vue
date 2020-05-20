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
      <v-icon
        class="mr-3"
        color="yellow darken-3"
      >
        fitness_center
      </v-icon>
      <v-toolbar-title>Eleby Fitness</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer class="pa-0">
      <v-bottom-navigation
        app
        dark
        grow
      >
        <v-btn
          to="/diaries"
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

        <v-btn
          to="/account"
        >
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
import { Mutation } from 'vuex-class';

  @Component({
    components: {},
  })

export default class Main extends Vue {
    @Mutation('fetchUser', { namespace: 'user' }) fetchUser: any;

    @Mutation('setUser', { namespace: 'user' }) setUser: any;

    @Mutation('setToken', { namespace: 'user' }) setToken: any;

    isDrawerOpen = false;
}
</script>
<style lang="scss">
</style>
