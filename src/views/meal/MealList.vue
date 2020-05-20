<template>
  <div class="d-flex flex-column">
    <v-subheader>Meals</v-subheader>
    <meal-card
      v-for="(meal, index) in meals"
      :key="index"
      :name="meal.name"
      :calories="meal.calories"
      :carb="meal.carb"
      :protein="meal.protein"
      :fat="meal.fat"
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

      const query: { last: number; offset: number } = {
        last: 20,
        offset: this.currentPage >= 1 ? (this.currentPage - 1) * 20 : 0,
      };

      listMeals(query).then((res) => {
        const { data, paginate } = res.data;
        this.meals = data;
        this.totalPage = Math.ceil(paginate.total / 20);
      }).catch((err) => {
        const { error } = err.response.data;
        this.dismissSnackBar();
        this.setSnackBarMessageData({
          text: error.message,
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
