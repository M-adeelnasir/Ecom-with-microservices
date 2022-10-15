import { Response, Request } from 'express';
import { get } from 'lodash';
import {
  createCategory,
  deleteCategoryWithSlug,
  findCategoryWithSlug,
  getAllCategories,
  updateCategoryWithSlug,
} from '../services/category.service';

export const createCategoryHandler = async (req: Request, res: Response) => {
  const product = await createCategory(req.body);
  res.status(201).json({ product });
};

export const findProductHandler = async (req: Request, res: Response) => {
  const slug = get(req.params, 'slug');
  const product = await findCategoryWithSlug(slug);
  res.json({ product });
};

export const deleteProductHandler = async (req: Request, res: Response) => {
  const slug = get(req.body, 'slug');
  await deleteCategoryWithSlug(slug);
  res.status(204).json({ msg: 'Product Deleted' });
};

export const getAllProductHandler = async (req: Request, res: Response) => {
  const products = await getAllCategories();
  res.json({ products });
};

export const updateProductHandler = async (req: Request, res: Response) => {
  const slug = get(req.body, 'slug');
  const product = await updateCategoryWithSlug(slug, req.body);
  res.json({ product });
};
