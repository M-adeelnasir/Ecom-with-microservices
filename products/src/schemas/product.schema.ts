import { object, string, array, number, mixed } from 'yup';

enum ShippingEnum {
  yes = 'yes',
  no = 'no',
}

export const productSchema = object({
  body: object({
    title: string()
      .required('Product must have a title')
      .min(10, 'product tilte must be greater then 10 characters')
      .max(200, 'product tilte must be greater then 10 characters'),

    description: string().required('Product must have a description'),

    richDescription: string().notRequired(),

    images: array().of(string()).required('product images required'),

    price: number().required('Product must have a price'),

    quantity: number().required('Enter the quatity of product in stock'),

    shipping: mixed<ShippingEnum>().oneOf(Object.values(ShippingEnum)),

    colors: array().of(string()).required('product must have a color'),

    warranty: number().notRequired(),

    category: string().required('Product category is required'),

    subCategories: array().of(string()),
  }),
});
