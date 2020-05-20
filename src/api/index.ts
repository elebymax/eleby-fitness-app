import axios from 'axios';
import store from '../store';

const baseApi = 'http://localhost:3000/api';

export const loginUser = async (body: { email: string; password: string }) => axios.post(`${baseApi}/user/login`, body);

export const fetchUser = async () => axios.get(`${baseApi}/user`, {
  headers: {
    Authorization: store.getters['user/token'],
  },
});

export const listDiaries = (query: { last?: number; offset?: number }) => axios.get(`${baseApi}/diaries`, {
  params: query,
  headers: {
    Authorization: store.getters['user/token'],
  },
});
