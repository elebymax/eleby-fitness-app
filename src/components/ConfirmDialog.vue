<template>
  <div>
    <v-dialog
            v-model="isShowDialog"
            max-width="290"
    >
      <v-card>
        <v-card-title class="headline">{{ textTitle }}</v-card-title>

        <v-card-text>
          {{ textContent }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="d-flex justify-end">
          <v-btn
                  depressed
                  color="yellow darken-3"
                  @click="handleOnConfirmClicked"
          >
            {{ textConfirm }}
          </v-btn>

          <v-btn
                  depressed
                  @click="handleOnCancelClicked"
          >
            {{ textCancel }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';

  @Component({
    components: {},
  })

export default class ConfirmDialog extends Vue {
    @Prop({
      type: Boolean,
      default: false,
    })
    value!: boolean;

    @Prop({
      type: Function,
      default: () => null,
    })
    onConfirm!: Function;

    @Prop({
      type: Function,
      default: () => null,
    })
    onCancel!: Function;

    @Prop({
      type: String,
      default: 'Info',
    })
    textTitle!: string;

    @Prop({
      type: String,
      default: '',
    })
    textContent!: string;

    @Prop({
      type: String,
      default: 'Confirm',
    })
    textConfirm!: string;

    @Prop({
      type: String,
      default: 'Cancel',
    })
    textCancel!: string;

    isShowDialog = false;

    @Watch('value')
    private onValueChange(val: boolean) {
      this.isShowDialog = val;
      this.$emit('input', val);
    }

    @Watch('isShowDialog')
    private onIsShowDialogChange(val: boolean) {
      this.$emit('input', val);
    }

    mounted() {
      this.isShowDialog = this.value;
    }

    handleOnConfirmClicked() {
      this.onConfirm();
      this.isShowDialog = false;
      this.$emit('input', false);
    }

    handleOnCancelClicked() {
      this.onCancel();
      this.isShowDialog = false;
      this.$emit('input', false);
    }
}
</script>
