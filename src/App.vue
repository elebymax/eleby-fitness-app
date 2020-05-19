<template>
  <v-app>
    <router-view></router-view>
    <message-snack-bar></message-snack-bar>
  </v-app>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import MessageSnackBar from './components/MessageSnackBar.vue';

  @Component({
    components: {
      MessageSnackBar,
    },
  })

export default class App extends Vue {
  created() {
    this.$vuetify.theme.dark = true;
  }
}
</script>
