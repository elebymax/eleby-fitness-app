<template>
  <v-card class="elevation-12 grey darken-3" flat>
    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header
          class="grey darken-3 px-3 icon-size-sm"
        >
          <div class="d-flex align-center mr-2">
            <div class="body-1 flex-grow-1">{{ title }}</div>
            <modify-diary-dialog
              :id="id"
              :title="title"
              :content="content"
              :meals="meals"
              @modified="handleDiaryModified"
            ></modify-diary-dialog>
            <v-btn
              icon
              small
              @click.stop="isShowDeleteDialog = true"
            >
              <v-icon small>delete</v-icon>
            </v-btn>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="grey darken-1">
         <div style="margin: 0 -24px -16px" class="py-2">
           <v-data-table
             hide-default-footer
             mobile-breakpoint="0"
             :headers="headers"
             :items="rows"
             :items-per-page="9999"
             dense
             style="background-color: rgba(0, 0, 0, 0);"
           ></v-data-table>
         </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-divider></v-divider>
    <div class="d-flex flex-column pa-1">
      <div class="body-2 pa-1">{{ content }}</div>
      <div class="d-flex">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-card
              class="d-flex flex-column flex-grow-1 grey darken-1
                pa-1 ma-1 white--text text-center"
              v-on="on"
            >
              <v-icon class="pa-1 fa fa-fire-alt" color="red" small></v-icon>
              <div>{{ caloriesSum }}</div>
            </v-card>
          </template>
          <span>Calories</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-card
              class="d-flex flex-column flex-grow-1 grey darken-1
                pa-1 ma-1 white--text text-center"
              v-on="on"
            >
              <v-icon class="pa-1 fa fa-bread-slice" color="green" small></v-icon>
              <div>{{ carbSum }}</div>
            </v-card>
          </template>
          <span>Carbs(g)</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-card
              class="d-flex flex-column flex-grow-1 grey darken-1
                pa-1 ma-1 white--text text-center"
              v-on="on"
            >
              <v-icon class="pa-1 fa fa-fish" color="blue" small></v-icon>
              <div>{{ proteinSum }}</div>
            </v-card>
          </template>
          <span>Protein(g)</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-card
              class="d-flex flex-column flex-grow-1 grey darken-1
                pa-1 ma-1 white--text text-center"
              v-on="on"
            >
              <v-icon class="pa-1 fa fa-oil-can" color="yellow" small></v-icon>
              <div>{{ fatSum }}</div>
            </v-card>
          </template>
          <span>Fat(g)</span>
        </v-tooltip>
      </div>
    </div>
    <confirm-dialog
      v-model="isShowDeleteDialog"
      text-title="info"
      :text-content="`Do you want to delete the diary '${ title }' ?`"
      text-cancel="No"
      text-confirm="Yes"
      :on-confirm="handleOnDeleteClicked"
    ></confirm-dialog>
  </v-card>
</template>
<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator';
import { Meal } from '@/components/meal/types';
import { sumBy, sum } from 'lodash';
import { deleteDiary } from '@/api';
import { Mutation } from 'vuex-class';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import ModifyDiaryDialog from '@/components/diary/ModifyDiaryDialog.vue';
import { DiaryWithMeal } from '@/components/diary/types';

  @Component({
    components: { ModifyDiaryDialog, ConfirmDialog },
  })

export default class DiaryCard extends Vue {
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

    isLoading = false;

    isShowDeleteDialog = false;

    get carbSum(): number {
      return sumBy(this.meals, 'carb');
    }

    get proteinSum(): number {
      return sumBy(this.meals, 'protein');
    }

    get fatSum(): number {
      return sumBy(this.meals, 'fat');
    }

    get caloriesSum(): number {
      const calories: number[] = this.meals.map((meal: Meal) => this.caloriesCalculator(meal));

      return sum(calories);
    }

    // eslint-disable-next-line class-methods-use-this
    get headers() {
      return [
        {
          text: 'Meal',
          value: 'name',
          sortable: false,
          align: 'center',
        },
        {
          text: 'Calories',
          value: 'calories',
          sortable: true,
          align: 'center',
        },
        {
          text: 'Carbs(g)',
          value: 'carb',
          sortable: true,
          align: 'center',
        },
        {
          text: 'Protein(g)',
          value: 'protein',
          sortable: true,
          align: 'center',
        },
        {
          text: 'Fat(g)',
          value: 'fat',
          sortable: true,
          align: 'center',
        },
      ];
    }

    get rows(): Meal[] {
      return this.meals.map((meal: Meal) => ({
        ...meal,
        calories: meal && meal.calories ? meal.calories : this.caloriesCalculator(meal),
      }));
    }

    handleOnDeleteClicked() {
      this.isLoading = true;

      deleteDiary(this.id).then((res) => {
        const { message } = res.data;
        this.$emit('deleted', this.id);

        this.dismissSnackBar();
        this.setSnackBarMessageData({
          text: message,
          color: 'success',
        });
        this.showSnackBar();
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

    handleDiaryModified(diaryWithMeal: DiaryWithMeal) {
      this.$emit('modified', diaryWithMeal);
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
  .v-expansion-panel-header__icon {
    i {
      font-size: 16px !important;
    }
  }
</style>
