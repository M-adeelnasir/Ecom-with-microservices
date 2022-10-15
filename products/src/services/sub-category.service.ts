import SubCategory, { SubCategoryDocument } from '../model/sub-category.model';
import { DocumentDefinition, FilterQuery } from 'mongoose';
import { BadRequestError } from '@shopproduct/common-module';
import slugify from 'slugify';

//created category
export const createSubCategory = async (
  input: DocumentDefinition<Omit<SubCategoryDocument, 'createdAt,updateAt'>>
) => {
  const subCategory = await SubCategory.create(input);

  if (!subCategory) {
    throw new Error('Sub category create failed');
  }
  return subCategory;
};

//find category with using slug
export const findSubCategoryWithSlug = async (
  slug: FilterQuery<SubCategoryDocument['slug']>
) => {
  const subCategory = await SubCategory.findOne({ slug });

  if (!subCategory) {
    throw new BadRequestError('No sub category found!');
  }
  return subCategory;
};

//delete category with using slug
export const deleteSubCategoryWithSlug = async (
  slug: FilterQuery<SubCategoryDocument['slug']>
) => {
  await SubCategory.findOneAndDelete({ slug });
};

//update category with using slug
export const updateSubCategoryWithSlug = async (
  slug: FilterQuery<SubCategoryDocument['slug']>,
  name: string
) => {
  const newSlug = slugify(name);
  const subCategory = await SubCategory.findOneAndUpdate(
    { slug },
    { name, slug: newSlug },
    { new: true, runValidators: true }
  );

  if (!subCategory) {
    throw new Error('Sub category update failed');
  }
};

//get all cayegories
export const getAllSubCategories = async () => {
  const subCategory = await SubCategory.find({});
  return subCategory;
};
