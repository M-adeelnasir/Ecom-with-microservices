import Category, { CategoryDocument } from '../model/category.model';
import { DocumentDefinition, FilterQuery } from 'mongoose';
import { BadRequestError } from '@shopproduct/common-module';
import slugify from 'slugify';

//created category
export const createCategory = async (
  input: DocumentDefinition<Omit<CategoryDocument, 'createdAt,updateAt'>>
) => {
  const subCategory = await Category.create(input);
  if (!subCategory) {
    throw new Error('Category create failed');
  }
  return subCategory;
};

//find category with using slug
export const findCategoryWithSlug = async (
  slug: FilterQuery<CategoryDocument['slug']>
) => {
  const subCategory = await Category.findOne({ slug });

  if (!subCategory) {
    throw new BadRequestError('No category found!');
  }
  return subCategory;
};

//delete category with using slug
export const deleteCategoryWithSlug = async (
  slug: FilterQuery<CategoryDocument['slug']>
) => {
  await Category.findOneAndDelete({ slug });
};

//update category with using slug
export const updateCategoryWithSlug = async (
  slug: FilterQuery<CategoryDocument['slug']>,
  name: string
) => {
  const newSlug = slugify(name);
  const subCategory = await Category.findOneAndUpdate(
    { slug },
    { name, slug: newSlug },
    { new: true, runValidators: true }
  );

  if (!subCategory) {
    throw new Error('Category update failed');
  }
};

//get all cayegories
export const getAllCategories = async () => {
  const subCategory = await Category.find({});
  return subCategory;
};
