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
        icon
        small
        v-on="on"
      >
        <v-icon small>edit</v-icon>
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
        <v-toolbar-title>Modify Diary</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            icon
            dark
            @click="handleModifyDiary"
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
                          {{ Math.round(caloriesCalculator(data.item) * 100) / 100 }}
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
  Component, Prop, Vue,
} from 'vue-property-decorator';
import moment from 'moment';
import { listMeals, modifyDiary } from '@/api';
import { Mutation } from 'vuex-class';
import { Meal } from '@/components/meal/types';

  @Component({
    components: {},
  })

export default class CreateDiaryDialog extends Vue {
    @Mutation('setMessageData', { namespace: 'messageSnackBar' }) setSnackBarMessageData: any;

    @Mutation('show', { namespace: 'messageSnackBar' }) showSnackBar: any;

    @Mutation('dismiss', { namespace: 'messageSnackBar' }) dismissSnackBar: any;

    @Prop({
      type: String,
      default: '',
    })
    id!: string;

    @Prop({
      type: String,
      default: '',
    })
    title!: string;

    @Prop({
      type: String,
      default: '',
    })
    content!: string;

    @Prop({
      type: Array,
      default: () => [],
    })
    meals!: Meal[];

    isShowDialog = false;

    isLoading = false;

    diaryForm: {
      title: string;
      content: string;
      meals: Meal[];
      mealIds: string[];
    } = {
      title: '',
      content: '',
      meals: [],
      mealIds: [],
    };

    mounted() {
      this.diaryForm.title = moment().utc(true).format('YYYY-MM-DD');
      this.handleListMeals();
      this.diaryForm.title = this.title;
      this.diaryForm.content = this.content;
      this.diaryForm.mealIds = this.meals.map((meal: Meal) => meal.id || '');
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

    handleModifyDiary() {
      this.isLoading = true;

      const body: { [key: string]: string | string[] } = {
        title: this.diaryForm.title || '',
        content: this.diaryForm.content || '',
        mealIds: this.diaryForm.mealIds || [],
      };

      modifyDiary(this.id, body).then((res) => {
        const { data, message } = res.data;
        this.$emit('modified', data);
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
