<template>
  <div class="d-flex flex-column">
    <v-subheader>Diaries</v-subheader>
    <diary-card
      v-for="(diary, index) in diaries"
      :key="index"
      :class="{ 'mt-3': index !== 0 }"
      :id="diary.id"
      :title="diary.title"
      :content="diary.content"
      :meals="diary.meals"
      @modified="handleDiaryModified"
      @deleted="handleDiaryDeleted"
    ></diary-card>
    <create-diary-dialog
      @created="handleLoadDiaries"
    ></create-diary-dialog>
  </div>
</template>
<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import { listDiaries } from '@/api';
import { Getter, Mutation } from 'vuex-class';
import { DiaryWithMeal } from '@/components/diary/types';
import DiaryCard from '@/components/diary/DiaryCard.vue';
import CreateDiaryDialog from '@/components/diary/CreateDiaryDialog.vue';
import { findIndex } from 'lodash';
import { User } from '@/store/user/types';

  @Component({
    components: { CreateDiaryDialog, DiaryCard },
  })

export default class DiaryList extends Vue {
    @Getter('token', { namespace: 'user' }) token!: string;

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
      console.log(`load ${this.token}`);

      const query: { [key: string]: number | string } = {
        last: 20,
        offset: this.currentPage >= 1 ? (this.currentPage - 1) * 20 : 0,
        createdAt: 'desc:',
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

    handleDiaryModified(diaryWithMeal: DiaryWithMeal) {
      const index: number = findIndex(this.diaries, ['id', diaryWithMeal.id]);
      this.diaries[index].title = diaryWithMeal.title;
      this.diaries[index].content = diaryWithMeal.content;
      this.diaries[index].meals = diaryWithMeal.meals;
      this.diaries[index].createdAt = diaryWithMeal.createdAt;
      this.diaries[index].updatedAt = diaryWithMeal.updatedAt;
    }

    handleDiaryDeleted(diaryId: string) {
      const index: number = findIndex(this.diaries, ['id', diaryId]);
      this.diaries.splice(index, 1);
    }
}
</script>
<style lang="scss">
</style>
