import { Response, Request, Express } from 'express';
import { createUserHandler, curretUser } from './controller/user.controller';
import { validateRequest } from './middlewares/validateRequest';
import { createUserSchema } from './schemas/create-user.schema';
import deserializeUser from './middlewares/deserialize.user';
import {
  requireAdminSignin,
  requireUserSignIn,
} from './middlewares/current.user';
import {
  sessionCreateleHandler,
  getAllSessionOfUserHanlder,
  deleteUserSessionHandler,
} from './controller/session.controller';
import {
  sessionCreate,
  userSessions,
  sessionIdSchema,
} from './schemas/session-create.scehma';

const baseURI = '/api/v1/users';

export default function (app: Express) {
  /**
   * @openapi
   * /api/v1/users/health-check:
   *   get:
   *    tags:
   *      - Health-Check
   *    description: Respond if the app is ruuning
   *    responses:
   *      200:
   *        description: App is running and up :)
   */
  app.get(baseURI + '/health-check', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  /**
   * @openapi
   * /api/v1/users/signup:
   *  post:
   *     tags:
   *       - User Signup
   *     summary: Adds a new user
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - firstName
   *               - email
   *               - password
   *               - confirmPassword
   *             properties:
   *               firstName:
   *                   type: string
   *                   default: adeel
   *               email:
   *                   type: string
   *                   default: example@gmail.com
   *               password:
   *                   type: string
   *                   default: strong!Passsword123
   *               confirmPassword:
   *                   type: string
   *                   default: strong!Password123
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
   *                  email:
   *                      type: string
   *                  verfied:
   *                      type: boolean
   *                  createdAt:
   *                      type: string
   *                  updateAt:
   *                      type: string
   *        '400':
   *          description: Bad Request
   *        '409':
   *          description: Conflict
   */

  app.post(
    baseURI + '/signup',
    validateRequest(createUserSchema),
    createUserHandler
  );

  /**
   * @openapi
   * security:
   *   - bearerAuth: []
   * paths:
   *   /api/v1/users/signin:
   *     post:
   *      tags:
   *        - User Signin
   *      summary: Create User Login Session
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              required:
   *                - firstName
   *                - email
   *                - password
   *                - confirmPassword
   *              properties:
   *                email:
   *                    type: string
   *                    default: example@gmail.com
   *                password:
   *                    type: string
   *                    default: strong!Passsword123
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
   *                   user:
   *                       type: string
   *                   userAgent:
   *                       type: string
   *                   valid:
   *                       type: boolean
   *                   createdAt:
   *                       type: string
   *                   updateAt:
   *                       type: string
   *                   accessToken:
   *                       type: string
   *                       description: User token used to be authenticated
   *         '400':
   *          description: Bad Request
   *         '409':
   *           description: Conflict
   */

  app.post(
    baseURI + '/signin',
    validateRequest(sessionCreate),
    sessionCreateleHandler
  );

  /**
   * @openapi
   * security:
   *   - bearerAuth: []
   * paths:
   *   /api/v1/users/sessions:
   *     post:
   *      tags:
   *        - User Sessions
   *      summary: Get all currently login sessions of a user
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              required:
   *                - userId
   *              properties:
   *                userId:
   *                    type: string
   *                    default: UserId
   *      responses:
   *         '200':
   *           description: Success
   *         '400':
   *          description: Bad Request
   *         '409':
   *           description: Conflict
   */

  app.post(
    baseURI + '/sessions',
    validateRequest(userSessions),
    deserializeUser,
    requireUserSignIn,
    getAllSessionOfUserHanlder
  );

  /**
   * @openapi
   * security:
   *   - bearerAuth: []
   * paths:
   *   /api/v1/users/sessions:
   *     delete:
   *      tags:
   *        - User Sessions deletion
   *      summary: delete a login session
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              required:
   *                - sessionId
   *              properties:
   *                sessionId:
   *                    type: string
   *                    default: sessionId
   *      responses:
   *         '200':
   *           description: Success
   *         '400':
   *          description: Bad Request
   *         '409':
   *           description: Conflict
   */

  app.delete(
    baseURI + '/sessions',
    validateRequest(sessionIdSchema),
    deleteUserSessionHandler
  );

  app.get(
    baseURI + '/current-user',
    deserializeUser,
    requireUserSignIn,
    curretUser
  );
}
