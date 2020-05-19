<template>
  <v-snackbar
          v-model="show"
          :color="color"
          :timeout="3000"
          :top="true"
  >
    {{ text }}
  </v-snackbar>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';

const namespace = 'messageSnackBar';

  @Component({
    components: {

    },
  })

export default class MessageSnackBar extends Vue {
    // @Mutation('setColor', { namespace }) setColor: Function;
    @Mutation('setIsShow', { namespace }) setIsShow: any;

    @Getter('isShow', { namespace }) isShow!: boolean;

    @Getter('color', { namespace }) color!: string;

    @Getter('text', { namespace }) text!: string;

    show = false;

    @Watch('isShow')
    private onIsShowChange(value: boolean) {
      this.show = value;
    }

    @Watch('show')
    private onShowChange(value: boolean) {
      this.setIsShow(value);
    }
}
</script>
<style lang="scss">

</style>
