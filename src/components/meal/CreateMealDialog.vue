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
        <v-toolbar-title>Create Meal</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            icon
            dark
            @click="handleCreateMeal"
          >
            <v-icon>check</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-subheader>Meal info</v-subheader>
        <v-card
          class="elevation-12 grey darken-3 pa-3"
        >
          <v-text-field
            v-model="mealForm.name"
            hide-details
            label="Name"
            placeholder="ex: G nuggets"
            color="yellow darken-3"
          ></v-text-field>
        </v-card>
        <v-subheader>Included ingredients</v-subheader>
        <v-row>
          <v-col cols="6">
            <v-card
              class="elevation-12 grey darken-3 pa-3"
            >
              <div class="d-flex justify-center align-center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      class="pa-1 fa fa-fire-alt mr-3"
                      color="red"
                      small
                      v-on="on"
                    ></v-icon>
                  </template>
                  <span>Calories, it will calculate automatically if you set the value to 0</span>
                </v-tooltip>
                <v-text-field
                  v-model="mealForm.calories"
                  color="red"
                  type="number"
                  dense
                  hide-details
                  full-width
                  outlined
                ></v-text-field>
              </div>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card
              class="elevation-12 grey darken-3 pa-3"
            >
              <div class="d-flex justify-center align-center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      class="pa-1 fa fa-bread-slice mr-3"
                      color="green"
                      small
                      v-on="on"
                    ></v-icon>
                  </template>
                  <span>Carbs (g)</span>
                </v-tooltip>
                <v-text-field
                  v-model="mealForm.carb"
                  color="green"
                  type="number"
                  dense
                  hide-details
                  full-width
                  outlined
                ></v-text-field>
                <span class="ml-3">g</span>
              </div>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card
              class="elevation-12 grey darken-3 pa-3"
            >
              <div class="d-flex align-center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      class="pa-1 fa fa-fish mr-3"
                      color="blue"
                      small
                      v-on="on"
                    ></v-icon>
                  </template>
                  <span>Protein (g)</span>
                </v-tooltip>
                <v-text-field
                  v-model="mealForm.protein"
                  color="blue"
                  type="number"
                  dense
                  hide-details
                  full-width
                  outlined
                ></v-text-field>
                <span class="ml-3">g</span>
              </div>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card
              class="elevation-12 grey darken-3 pa-3"
            >
              <div class="d-flex align-center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      class="pa-1 fa fa-oil-can mr-3"
                      color="yellow"
                      small
                      v-on="on"
                    ></v-icon>
                  </template>
                  <span>Fat (g)</span>
                </v-tooltip>
                <v-text-field
                  v-model="mealForm.fat"
                  color="yellow"
                  type="number"
                  dense
                  outlined
                  hide-details
                  full-width
                ></v-text-field>
                <span class="ml-3">g</span>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import { createMeal } from '@/api';
import { Mutation } from 'vuex-class';

  @Component({
    components: {},
  })

export default class CreateDiaryDialog extends Vue {
    @Mutation('setMessageData', { namespace: 'messageSnackBar' }) setSnackBarMessageData: any;

    @Mutation('show', { namespace: 'messageSnackBar' }) showSnackBar: any;

    @Mutation('dismiss', { namespace: 'messageSnackBar' }) dismissSnackBar: any;

    isShowDialog = false;

    isLoading = false;

    mealForm = {
      name: '',
      calories: 0,
      carb: 0,
      protein: 0,
      fat: 0,
    };

    initMealForm() {
      this.mealForm.name = '';
      this.mealForm.calories = 0;
      this.mealForm.carb = 0;
      this.mealForm.protein = 0;
      this.mealForm.fat = 0;
    }

    handleCreateMeal() {
      this.isLoading = true;

      const body: { [key: string]: string | number } = {
        name: this.mealForm.name || '',
        calories: this.mealForm.calories || 0,
        carb: this.mealForm.carb || 0,
        protein: this.mealForm.protein || 0,
        fat: this.mealForm.fat || 0,
      };

      createMeal(body).then((res) => {
        const { data, message } = res.data;
        this.$emit('created', data);
        this.dismissSnackBar();
        this.setSnackBarMessageData({
          text: message,
          color: 'success',
        });
        this.showSnackBar();
        this.initMealForm();
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
}
</script>
<style lang="scss">
</style>
