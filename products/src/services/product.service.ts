import Product, { ProductDocument } from './../model/product.model';
import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  RootQuerySelector,
} from 'mongoose';

//create product
export const createProduct = async (
  input: DocumentDefinition<Omit<ProductDocument, 'createdAt,updatedAt'>>
) => {
  const product = await Product.create(input);
  if (!product) {
    throw new Error('Something wrong! product create failed');
  }
  return product;
};

//find a product
export const findProductBySlug = async (slug: ProductDocument['slug']) => {
  const product = await Product.findOne({ slug });
  if (!product) {
    throw new Error('Something wrong! product create failed');
  }
  return product;
};

//update a product
export const updateProductBySlug = async (
  slug: UpdateQuery<ProductDocument['slug']>,
  data: ProductDocument
) => {
  const product = await Product.findOneAndUpdate({ slug }, data, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new Error('Something wrong! product update failed');
  }
  return product;
};

//delete a product
export const deleteProductBySlug = async (
  slug: FilterQuery<ProductDocument['slug']>
) => {
  return await Product.findOneAndDelete({ slug });
};

//get all products
export const geAllProductBySlug = async () => {
  const products = await Product.find({});
  return products;
};
