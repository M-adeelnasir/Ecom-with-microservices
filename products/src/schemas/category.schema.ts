import { string, object } from 'yup';

export const categorySchema = object({
  body: object({
    name: string()
      .required('Category Name is required')
      .min(2, 'Category name should be more then 2 characters')
      .max(32, 'Category name should be less then 23 characters'),
  }),
});

export const findCategory = object({
  params: object({
    slug: string().required('Slug is required'),
  }),
});

export const subCategorySchema = object({
  body: object({
    name: string()
      .required('Sub category Name is required')
      .min(2, 'Category name should be more then 2 characters')
      .max(32, 'Category name should be less then 23 characters'),
  }),
});
