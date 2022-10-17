import Category, { CategoryDocument } from '../model/category.model';
import { DocumentDefinition, FilterQuery } from 'mongoose';
import { BadRequestError } from '@shopproduct/common-module';
import slugify from 'slugify';

//created category
export const createCategory = async (
  input: DocumentDefinition<Omit<CategoryDocument, 'createdAt,updateAt'>>
) => {
  try {
    const category = await Category.create(input);
    if (!category) {
      throw new Error('Category create failed');
    }
    return category;
  } catch (err: any) {
    if (err.code === 11000) {
      throw new BadRequestError('Category Already exits with this name');
    }
    throw new Error('Category create failed');
  }
};

//find category with using slug
export const findCategoryWithSlug = async (slug: CategoryDocument['slug']) => {
  const category = await Category.findOne({ slug }).lean();

  if (!category) {
    throw new BadRequestError('No category found!');
  }
  return category;
};

//delete category with using slug
export const deleteCategoryWithSlug = async (
  slug: CategoryDocument['slug']
) => {
  return await Category.findOneAndDelete({ slug });
};

//update category with using slug
export const updateCategoryWithSlug = async (
  slug: CategoryDocument['slug'],
  name: string
) => {
  const newSlug = slugify(name);
  const category = await Category.findOneAndUpdate(
    { slug },
    { name, slug: newSlug },
    { new: true, runValidators: true }
  ).lean();

  if (!category) {
    throw new Error('Category update failed');
  }
  return category;
};

//get all cayegories
export const getAllCategories = async () => {
  const category = await Category.find({}).lean();
  return category;
};
