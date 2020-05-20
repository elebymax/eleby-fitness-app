import { Meal } from '@/components/meal/types';
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

export const listMeals = (query: { last?: number; offset?: number; createdAt?: string }) => axios.get(`${baseApi}/meals`, {
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
