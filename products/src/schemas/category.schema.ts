import { string, object } from 'yup';

export const categorySchema = object({
  body: object({
    name: string().required('Category Name is required'),
  }),
});

export const subCategorySchema = object({
  body: object({
    name: string().required('Sub category Name is required'),
  }),
});
