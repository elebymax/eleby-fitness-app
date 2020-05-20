<template>
  <v-dialog
    v-model="isShowDialog"
    dark
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="yellow darken-3"
        v-on="on"
        fixed
        fab
        bottom
        right
        style="bottom: 72px;"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark>
        <v-btn
          icon
          dark
          @click="isShowDialog = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Create Diary</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            icon
            dark
            @click="handleCreateDiary"
          >
            <v-icon>check</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-subheader>Diary info</v-subheader>
        <v-card
          class="elevation-12 grey darken-3 pa-3"
        >
          <v-text-field
            v-model="diaryForm.title"
            hide-details
            label="Title"
            placeholder="Diary title"
            color="yellow darken-3"
          ></v-text-field>
          <v-textarea
            class="mt-3"
            v-model="diaryForm.content"
            hide-details
            label="Content"
            placeholder="Some details..."
            :rows="3"
            auto-grow
            autofocus
            color="yellow darken-3"
          ></v-textarea>
        </v-card>
        <v-subheader>Included meals</v-subheader>
        <v-card
          class="elevation-12 grey darken-3 pa-3"
        >
          <v-autocomplete
            v-model="diaryForm.mealIds"
            :items="diaryForm.meals"
            chips
            label="Meals"
            multiple
            hide-details
            placeholder="Select some meals"
            color="yellow darken-3"
            item-text="name"
            item-value="id"
            item-color="yellow darken-3"
          >
            <template v-slot:item="data">
              <template>
                <v-list-item-content>
                  <v-list-item-title v-html="data.item.name"></v-list-item-title>
                  <v-list-item-subtitle>
                    <div class="d-flex">
                      <div class="d-flex justify-center align-center">
                        <v-icon class="pa-1 fa fa-fire-alt" color="red" small></v-icon>
                        <div
                          class="d-flex justify-center align-center"
                        >
                          {{ caloriesCalculator(data.item) }}
                        </div>
                      </div>
                      <div class="d-flex justify-center align-center ml-3">
                        <v-icon class="pa-1 fa fa-bread-slice" color="green" small></v-icon>
                        <div
                          class="d-flex justify-center align-center"
                        >
                          {{ data.item.carb }}
                        </div>
                      </div>
                      <div class="d-flex justify-center align-center ml-3">
                        <v-icon class="pa-1 fa fa-fish" color="blue" small></v-icon>
                        <div
                          class="d-flex justify-center align-center"
                        >
                          {{ data.item.protein }}
                        </div>
                      </div>
                      <div class="d-flex justify-center align-center ml-3">
                        <v-icon class="pa-1 fa fa-oil-can" color="yellow" small></v-icon>
                        <div
                          class="d-flex justify-center align-center"
                        >
                          {{ data.item.fat }}
                        </div>
                      </div>
                    </div>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-card>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import {
  Component, Vue, Watch,
} from 'vue-property-decorator';
import moment from 'moment';
import { createDiary, listMeals } from '@/api';
import { Mutation } from 'vuex-class';
import { Meal } from '@/components/meal/types';

  @Component({
    components: {},
  })

export default class CreateDiaryDialog extends Vue {
    @Mutation('setMessageData', { namespace: 'messageSnackBar' }) setSnackBarMessageData: any;

    @Mutation('show', { namespace: 'messageSnackBar' }) showSnackBar: any;

    @Mutation('dismiss', { namespace: 'messageSnackBar' }) dismissSnackBar: any;

    isShowDialog = false;

    isLoading = false;

    diaryForm = {
      title: '',
      content: '',
      meals: [],
      mealIds: [],
    };

    @Watch('isShowDialog')
    private onIsShowDialogChange(val: boolean) {
      if (val) {
        this.initDiaryForm();
      }
    }

    mounted() {
      this.initDiaryForm();
    }

    initDiaryForm() {
      this.handleListMeals();
      this.diaryForm.title = '';
      this.diaryForm.content = '';
      this.diaryForm.meals = [];
      this.diaryForm.mealIds = [];
      this.diaryForm.title = moment().utc(true).format('YYYY-MM-DD');
    }

    handleListMeals() {
      const query: { [key: string]: string | number } = {
        name: 'asc:',
      };

      listMeals(query).then((res) => {
        const { data } = res.data;
        this.diaryForm.meals = data;
      });
    }

    handleCreateDiary() {
      this.isLoading = true;

      const body: { [key: string]: string | string[] } = {
        title: this.diaryForm.title || '',
        content: this.diaryForm.content || '',
        mealIds: this.diaryForm.mealIds || [],
      };

      createDiary(body).then((res) => {
        const { data, message } = res.data;
        this.$emit('created', data);
        this.dismissSnackBar();
        this.setSnackBarMessageData({
          text: message,
          color: 'success',
        });
        this.showSnackBar();
        this.isShowDialog = false;
      }).catch((err) => {
        this.dismissSnackBar();
        this.setSnackBarMessageData({
          text: err.response ? err.response.data.error.message : err,
          color: 'error',
        });
        this.showSnackBar();
      }).finally(() => {
        this.isLoading = false;
      });
    }

    // eslint-disable-next-line class-methods-use-this
    caloriesCalculator(meal: Meal): number {
      return meal && meal.calories
        ? +meal.calories
        : (+(meal.carb || 0) * 4) + (+(meal.protein || 0) * 4) + (+(meal.fat || 0) * 9);
    }
}
</script>
<style lang="scss">
</style>
