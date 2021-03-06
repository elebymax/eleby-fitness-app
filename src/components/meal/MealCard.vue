<template>
  <v-card
    class="elevation-12 grey darken-3"
    flat
    :loading="isLoading"
  >
    <v-toolbar
      class="grey darken-3"
      flat
    >
      <v-toolbar-title>
        <div v-show="!isEditing">{{ name }}</div>
        <v-text-field
          v-show="isEditing"
          :disabled="isLoading"
          v-model="mealForm.name"
          hide-details
          type="text"
          dense
          filled
          rounded
          full-width
          color="white"
        >
        </v-text-field>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-flex">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-show="!isEditing"
              icon
              v-on="on"
              small
              @click="handleOnEditClicked"
            >
              <v-icon small>edit</v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-show="!isEditing"
              icon
              v-on="on"
              small
              @click="isShowDeleteDialog = true"
            >
              <v-icon small>delete</v-icon>
            </v-btn>
          </template>
          <span>Delete</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-show="isEditing"
              :disabled="isLoading"
              icon
              v-on="on"
              small
              @click="isEditing = false"
            >
              <v-icon small>close</v-icon>
            </v-btn>
          </template>
          <span>Delete</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-show="isEditing"
              :disabled="isLoading"
              icon
              v-on="on"
              small
              @click="handleOnCompleteClicked"
            >
              <v-icon small>check</v-icon>
            </v-btn>
          </template>
          <span>Done</span>
        </v-tooltip>
      </div>
    </v-toolbar>
    <v-divider></v-divider>
    <div class="d-flex flex-column pa-1">
      <div class="d-flex">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-card
              class="d-flex flex-column flex-grow-1 grey darken-1
                pa-1 ma-1 white--text text-center"
              v-on="on"
            >
              <v-icon class="pa-1 fa fa-fire-alt" color="red" small></v-icon>
              <div v-show="!isEditing">{{ Math.round(formatedCalories * 100) / 100 }}</div>
              <v-text-field
                v-show="isEditing"
                :disabled="isLoading"
                v-model="mealForm.calories"
                hide-details
                type="number"
                dense
                outlined
                color="red"
              >
              </v-text-field>
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
              <div v-show="!isEditing">{{ carb }}</div>
              <v-text-field
                v-show="isEditing"
                :disabled="isLoading"
                v-model="mealForm.carb"
                hide-details
                type="number"
                dense
                color="green"
                outlined
              >
              </v-text-field>
            </v-card>
          </template>
          <span>Carbs (g)</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-card
              class="d-flex flex-column flex-grow-1 grey darken-1
                pa-1 ma-1 white--text text-center"
              v-on="on"
            >
              <v-icon class="pa-1 fa fa-fish" color="blue" small></v-icon>
              <div v-show="!isEditing">{{ protein }}</div>
              <v-text-field
                v-show="isEditing"
                :disabled="isLoading"
                v-model="mealForm.protein"
                hide-details
                type="number"
                dense
                outlined
                color="blue"
              >
              </v-text-field>
            </v-card>
          </template>
          <span>Protein (g)</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-card
              class="d-flex flex-column flex-grow-1 grey darken-1
                pa-1 ma-1 white--text text-center"
              v-on="on"
            >
              <v-icon class="pa-1 fa fa-oil-can" color="yellow" small></v-icon>
              <div v-show="!isEditing">{{ fat }}</div>
              <v-text-field
                v-show="isEditing"
                :disabled="isLoading"
                v-model="mealForm.fat"
                hide-details
                type="number"
                dense
                outlined
                color="yellow"
              >
              </v-text-field>
            </v-card>
          </template>
          <span>Fat (g)</span>
        </v-tooltip>
      </div>
    </div>
    <confirm-dialog
      v-model="isShowDeleteDialog"
      text-title="info"
      :text-content="`Do you want to delete the meal '${ name }' ?`"
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
import { deleteMeal, modifyMeal } from '@/api';
import { Mutation } from 'vuex-class';
import ConfirmDialog from '@/components/ConfirmDialog.vue';

  @Component({
    components: { ConfirmDialog },
  })

export default class MealCard extends Vue {
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
    name!: string;

    @Prop({
      type: Number,
      default: 0,
    })
    calories!: number;

    @Prop({
      type: Number,
      default: 0,
    })
    carb!: number;

    @Prop({
      type: Number,
      default: 0,
    })
    protein!: number;

    @Prop({
      type: Number,
      default: 0,
    })
    fat!: number;

    isEditing = false;

    isLoading = false;

    isShowDeleteDialog = false;

    mealForm: Meal = {
      name: '',
      calories: 0,
      carb: 0,
      protein: 0,
      fat: 0,
    };

    get formatedCalories(): number {
      return this.calories
        ? +this.calories
        : (+(this.carb || 0) * 4) + (+(this.protein || 0) * 4) + (+(this.fat || 0) * 9);
    }

    initMealForm() {
      this.mealForm.name = '';
      this.mealForm.calories = 0;
      this.mealForm.carb = 0;
      this.mealForm.protein = 0;
      this.mealForm.fat = 0;
    }

    handleOnEditClicked() {
      this.isEditing = true;
      this.mealForm.name = this.name;
      this.mealForm.calories = this.calories;
      this.mealForm.carb = this.carb;
      this.mealForm.protein = this.protein;
      this.mealForm.fat = this.fat;
    }

    handleOnCompleteClicked() {
      this.isLoading = true;

      const body: Meal = {
        name: this.mealForm.name || '',
        calories: this.mealForm.calories || 0,
        carb: this.mealForm.carb || 0,
        protein: this.mealForm.protein || 0,
        fat: this.mealForm.fat || 0,
      };

      modifyMeal(this.id, body).then((res) => {
        const { data, message } = res.data;
        this.initMealForm();
        this.isEditing = false;
        this.$emit('modified', data);

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

    handleOnDeleteClicked() {
      this.isLoading = true;

      deleteMeal(this.id).then((res) => {
        const { message } = res.data;
        this.initMealForm();
        this.isEditing = false;
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
}
</script>
<style lang="scss">
</style>
