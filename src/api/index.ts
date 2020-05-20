import { Meal } from '@/components/meal/types';
import { Diary } from '@/components/diary/types';
import axios from 'axios';
import store from '../store';

const baseApi = 'http://localhost:3000/api';

export const loginUser = async (body: { email: string; password: string }) => axios.post(`${baseApi}/user/login`, body);

export const fetchUser = async (token: string) => axios.get(`${baseApi}/user`, {
  headers: {
    Authorization: token,
  },
});

export const listDiaries = (query: { last?: number; offset?: number }) => axios.get(`${baseApi}/diaries`, {
  params: query,
  headers: {
    Authorization: store.getters['user/token'],
  },
});

export const listMeals = (query: { [key: string]: string | number }) => axios.get(`${baseApi}/meals`, {
  params: query,
  headers: {
    Authorization: store.getters['user/token'],
  },
});

export const modifyMeal = (mealId: string, body: Meal) => axios.put(`${baseApi}/meals/${mealId}`, body, {
  headers: {
    Authorization: store.getters['user/token'],
  },
});

export const deleteMeal = (mealId: string) => axios.delete(`${baseApi}/meals/${mealId}`, {
  headers: {
    Authorization: store.getters['user/token'],
  },
});

export const createMeal = (body: Meal) => axios.post(`${baseApi}/meals`, body, {
  headers: {
    Authorization: store.getters['user/token'],
  },
});

export const createDiary = (body: Diary) => axios.post(`${baseApi}/diaries`, body, {
  headers: {
    Authorization: store.getters['user/token'],
  },
});

export const deleteDiary = (diaryId: string) => axios.delete(`${baseApi}/diaries/${diaryId}`, {
  headers: {
    Authorization: store.getters['user/token'],
  },
});

export const getDairy = (diaryId: string) => axios.get(`${baseApi}/diaries/${diaryId}`, {
  headers: {
    Authorization: store.getters['user/token'],
  },
});

export const modifyDiary = (diaryId: string, body: Diary) => axios.put(`${baseApi}/diaries/${diaryId}`, body, {
  headers: {
    Authorization: store.getters['user/token'],
  },
});
