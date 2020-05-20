<template>
  <div class="d-flex flex-column">
    <v-subheader>Meals</v-subheader>
    <meal-card
      v-for="(meal, index) in meals"
      :key="index"
      :class="{ 'mt-3': index !== 0 }"
      :id="meal.id"
      :name="meal.name"
      :calories="meal.calories"
      :carb="meal.carb"
      :protein="meal.protein"
      :fat="meal.fat"
      @modified="handleMealModified"
      @deleted="handleMealDeleted"
    ></meal-card>
  </div>
</template>
<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import { listMeals } from '@/api';
import { Mutation } from 'vuex-class';
import { Meal } from '@/components/meal/types';
import MealCard from '@/components/meal/MealCard.vue';
import { findIndex } from 'lodash';

  @Component({
    components: { MealCard },
  })

export default class MealList extends Vue {
    @Mutation('setMessageData', { namespace: 'messageSnackBar' }) setSnackBarMessageData: any;

    @Mutation('show', { namespace: 'messageSnackBar' }) showSnackBar: any;

    @Mutation('dismiss', { namespace: 'messageSnackBar' }) dismissSnackBar: any;

    currentPage = 1;

    totalPage = 1;

    meals: Meal[] = [];

    isLoading = false;

    mounted() {
      this.handleLoadMeals();
    }

    handleLoadMeals() {
      this.isLoading = true;

      const query: { last: number; offset: number; createdAt: string } = {
        last: 20,
        offset: this.currentPage >= 1 ? (this.currentPage - 1) * 20 : 0,
        createdAt: 'desc:',
      };

      listMeals(query).then((res) => {
        const { data, paginate } = res.data;
        this.meals = data;
        this.totalPage = Math.ceil(paginate.total / 20);
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

    handleMealModified(meal: Meal) {
      const index: number = findIndex(this.meals, ['id', meal.id]);
      this.meals[index].name = meal.name;
      this.meals[index].calories = meal.calories;
      this.meals[index].carb = meal.carb;
      this.meals[index].protein = meal.protein;
      this.meals[index].fat = meal.fat;
    }

    handleMealDeleted(mealId: string) {
      const index: number = findIndex(this.meals, ['id', mealId]);
      this.meals.splice(index, 1);
    }
}
</script>
<style lang="scss">
</style>
