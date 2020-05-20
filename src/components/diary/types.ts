import {Meal} from "@/components/meal/types";

export interface Diary {
  id?: string;
  userId?: string;
  title?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface DiaryWithMeal extends Diary{
  meals?: Meal[]
}
