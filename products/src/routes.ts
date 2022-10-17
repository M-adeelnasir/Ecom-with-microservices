import { Response, Request, Express } from 'express';
import { validateRequest } from '@shopproduct/common-module';
import {
  categorySchema,
  subCategorySchema,
  findCategory,
} from './schemas/category.schema';
import {
  requireAdminSignin,
  requireUserSignIn,
} from './middlewares/current.user';
import deserializeUser from './middlewares/deserialize.user';
import {
  createCategoryHandler,
  findCategoryHandler,
  deleteCategoryHandler,
  getAllCategoryHandler,
  updateCategoryHandler,
} from './controller/category.controller';

const baseURI = '/api/v1/products';

export default function (app: Express) {
  /**
   * @openapi
   * /api/v1/products/health-check:
   *   get:
   *    tags:
   *      - Health-Check
   *    description: Respond if the product service is ruuning
   *    responses:
   *      200:
   *        description: App is running and up :)
   */
  app.get(baseURI + '/health-check', async (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  /**
   * @openapi
   * /api/v1/products/category:
   *  post:
   *     tags:
   *       - Category
   *     summary: Create a new category for product
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *             properties:
   *               name:
   *                   type: string
   *     responses:
   *        '201':
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  _id:
   *                      type: string
   *                  name:
   *                      type: string
   *                  slug:
   *                      type: string
   *                  createdAt:
   *                      type: string
   *                  updateAt:
   *                      type: string
   *        '400':
   *          description: Bad Request
   *        '409':
   *          description: Conflict
   *        '403':
   *          description: Forbiden
   *        '401':
   *          description: Not Authorized (require Signin as admin)
   */
  app.post(
    baseURI + '/category',
    [deserializeUser, requireAdminSignin, validateRequest(categorySchema)],
    createCategoryHandler
  );

  /**
   * @openapi
   * security:
   *   - bearerAuth: []
   * paths:
   *   /api/v1/products/category/{slug}:
   *     get:
   *      tags:
   *        - Category
   *      summary: get a category by slug
   *      parameters:
   *        - in: path
   *          name: slug
   *          schema:
   *            type: string
   *          required: true
   *          description: category slug to get a specfic category
   *      responses:
   *         '200':
   *           description: Success
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   _id:
   *                       type: string
   *                   name:
   *                       type: string
   *                   slug:
   *                       type: string
   *                   createdAt:
   *                       type: string
   *                   updatedAt:
   *                       type: string
   *         '400':
   *           description: Bad Request
   *         '401':
   *           description: Not Authorized (require Signin as admin)
   *         '409':
   *           description: Conflict
   */
  app.get(
    baseURI + '/category/:slug',
    [deserializeUser, validateRequest(findCategory)],
    findCategoryHandler
  );

  /**
   * @openapi
   * /api/products/categories:
   *  get:
   *    tags:
   *      - Category
   *    summary: Get all Categories
   *    responses:
   *      '200':
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                type: object
   *                required:
   *                  - _id
   *                  - name
   *                  - slug
   *                  - createtAt
   *                  - updatedtAt
   *                properties:
   *                  _id:
   *                       type: string
   *                  name:
   *                       type: string
   *                  slug:
   *                       type: string
   *                  createdAt:
   *                       type: Date
   *                  updatedAt:
   *                       type: Date
   */

  app.get(
    baseURI + '/categories',
    [deserializeUser, validateRequest(findCategory)],
    getAllCategoryHandler
  );

  /**
   * @openapi
   * security:
   *   - bearerAuth: []
   * paths:
   *   /api/v1/products/category/{slug}:
   *     get:
   *      tags:
   *        - Category
   *      summary: get a category by slug
   *      parameters:
   *        - in: path
   *          name: slug
   *          schema:
   *            type: string
   *          required: true
   *          description: category slug to get a specfic category
   *      responses:
   *         '204':
   *           description: Success
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   _id:
   *                       type: string
   *                   name:
   *                       type: string
   *                   slug:
   *                       type: string
   *                   createdAt:
   *                       type: string
   *                   updatedAt:
   *                       type: string
   *         '400':
   *           description: Bad Request
   *         '401':
   *           description: Not Authorized (require Signin as admin)
   *         '409':
   *           description: Conflict
   */

  app.delete(
    baseURI + '/category/slug',
    [deserializeUser, requireAdminSignin, validateRequest(findCategory)],
    deleteCategoryHandler
  );

  /**
   * @openapi
   * /api/v1/products/category/{slug}:
   *  put:
   *     tags:
   *       - Category
   *     summary: Create a new category for product
   *      parameters:
   *        - in: path
   *          name: slug
   *          schema:
   *            type: string
   *          required: true
   *          description: category slug to get a specfic category
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *             properties:
   *               name:
   *                   type: string
   *     responses:
   *        '200':
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  _id:
   *                      type: string
   *                  name:
   *                      type: string
   *                  slug:
   *                      type: string
   *                  createdAt:
   *                      type: string
   *                  updateAt:
   *                      type: string
   *        '400':
   *          description: Bad Request
   *        '409':
   *          description: Conflict
   *        '403':
   *          description: Forbiden
   *        '401':
   *          description: Not Authorized (require Signin as admin)
   */

  app.put(
    baseURI + '/category/slug',
    [deserializeUser, requireAdminSignin, validateRequest(findCategory)],
    updateCategoryHandler
  );
}
