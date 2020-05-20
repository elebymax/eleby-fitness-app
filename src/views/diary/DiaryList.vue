<template>
  <div class="d-flex flex-column">
    <diary-card
      v-for="(diary, index) in diaries"
      :key="index"
      :title="diary.title"
      :content="diary.content"
      :meals="diary.meals"
    ></diary-card>
  </div>
</template>
<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import { listDiaries } from '@/api';
import { Mutation } from 'vuex-class';
import { DiaryWithMeal } from '@/components/diary/types';
import DiaryCard from '@/components/diary/DiaryCard.vue';

  @Component({
    components: { DiaryCard },
  })

export default class DiaryList extends Vue {
    @Mutation('setMessageData', { namespace: 'messageSnackBar' }) setSnackBarMessageData: any;

    @Mutation('show', { namespace: 'messageSnackBar' }) showSnackBar: any;

    @Mutation('dismiss', { namespace: 'messageSnackBar' }) dismissSnackBar: any;

    currentPage = 1;

    totalPage = 1;

    diaries: DiaryWithMeal[] = [];

    isLoading = false;

    mounted() {
      this.handleLoadDiaries();
    }

    handleLoadDiaries() {
      this.isLoading = true;

      const query: { last: number; offset: number } = {
        last: 20,
        offset: this.currentPage >= 1 ? (this.currentPage - 1) * 20 : 0,
      };

      listDiaries(query).then((res) => {
        const { data, paginate } = res.data;
        this.diaries = data;
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
