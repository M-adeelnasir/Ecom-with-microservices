import { Response, Request, Express } from 'express';
import { createUserHandler, currentUser } from './controller/user.controller';
import { validateRequest } from '@shopproduct/common-module';
import { createUserSchema } from './schemas/create-user.schema';
import deserializeUser from './middlewares/deserialize.user';
import {
  sendEmailVerificationHandler,
  verifyEmailOPThanlder,
} from './controller/email-verification.controller';
import {
  requireAdminSignin,
  requireUserSignIn,
} from './middlewares/current.user';
import {
  sendOPTHandler,
  verifyOPTHandler,
} from './controller/phone-verification.controller';
import {
  sessionCreateleHandler,
  getAllSessionOfUserHanlder,
  deleteUserSessionHandler,
  logoutSessionHandler,
} from './controller/session.controller';
import {
  sessionCreate,
  userSessions,
  sessionIdSchema,
} from './schemas/session-create.scehma';
import {
  phoneOPTScehma,
  verifyOPTSchema,
} from './schemas/opt-verifications.schema';

import passport from 'passport';

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

  // * USERS AND USER SESSIONS ROUTES

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
   *   /api/v1/users/current-user:
   *     get:
   *      tags:
   *        - get current user
   *      summary: current logged in user
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
   *                   email:
   *                       type: string
   *                   verified:
   *                       type: boolean
   *                   countryCode:
   *                       type: string
   *                   phoneNumber:
   *                       type: string
   *                   firstName:
   *                       type: string
   *                   avatar:
   *                       type: string
   *                   createdAt:
   *                       type: boolean
   *                   updatedAt:
   *                       type: string
   *         '400':
   *          description: Bad Request
   *         '409':
   *           description: Conflict
   *         '403':
   *           description: Forbiden (require Signin)
   */

  app.get(
    baseURI + '/current-user',
    deserializeUser,
    requireUserSignIn,
    currentUser
  );

  /**
   * @openapi
   * security:
   *   - bearerAuth: []
   * paths:
   *   /api/v1/users/logout:
   *     delete:
   *      tags:
   *        - Logout session
   *      summary: logout session from the device
   *      responses:
   *         '204':
   *           description: Success
   *         '400':
   *          description: Bad Request
   *         '409':
   *           description: Conflict
   */
  app.delete(
    baseURI + '/logout',
    deserializeUser,
    requireUserSignIn,
    logoutSessionHandler
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
    deserializeUser,
    requireUserSignIn,
    deleteUserSessionHandler
  );

  // * SEND AND VERIFY OPT TO USER PHONE
  /**
   * @openapi
   * security:
   *   - bearerAuth: []
   * paths:
   *   /api/v1/users/send-opt:
   *     post:
   *      tags:
   *        - Send OPT code
   *      summary: OPT code send to user phone number
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              required:
   *                - countryCode
   *                -  phoneNumber
   *              properties:
   *                countryCode:
   *                    type: string
   *                phoneNumber:
   *                    type: string
   *      responses:
   *         '200':
   *           description: Success
   *         '400':
   *          description: Bad Request
   *         '409':
   *           description: Conflict
   */

  app.post(
    baseURI + '/send-opt',
    deserializeUser,
    validateRequest(phoneOPTScehma),
    sendOPTHandler
  );

  /**
   * @openapi
   * security:
   *   - bearerAuth: []
   * paths:
   *   /api/v1/users/verify-opt:
   *     post:
   *      tags:
   *        - Verify OPT code
   *      summary: Verify Phone OPT Code
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              required:
   *                - opt
   *              properties:
   *                otp:
   *                    type: string
   *      responses:
   *         '200':
   *           description: Success
   *         '400':
   *          description: Bad Request
   *         '409':
   *           description: Conflict
   */

  app.post(
    baseURI + '/verify-opt',
    deserializeUser,
    validateRequest(verifyOPTSchema),
    verifyOPTHandler
  );

  //* SEND AND VERIFY USER EMAIL BY SENDING OPT
  /**
   * @openapi
   * security:
   *   - bearerAuth: []
   * paths:
   *   /api/v1/users/send-email-opt:
   *     post:
   *      tags:
   *        - Send OPT code
   *      summary: OPT code send to user Email address
   *      responses:
   *         '200':
   *           description: Success
   *         '400':
   *          description: Bad Request
   *         '409':
   *           description: Conflict
   */
  app.post(
    baseURI + '/send-email-opt',
    deserializeUser,
    sendEmailVerificationHandler
  );
  /**
   * @openapi
   * security:
   *   - bearerAuth: []
   * paths:
   *   /api/v1/users/verify-email-opt:
   *     post:
   *      tags:
   *        - Verify OPT code
   *      summary: Verify Email OPT Code
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              required:
   *                - opt
   *              properties:
   *                opt:
   *                    type: string
   *      responses:
   *         '200':
   *           description: Success
   *         '400':
   *          description: Bad Request
   *         '409':
   *           description: Conflict
   */

  app.post(
    baseURI + '/verify-email-opt',
    deserializeUser,
    validateRequest(verifyOPTSchema),
    verifyEmailOPThanlder
  );

  // * GOOGLE AUTHENTICATION
  app.get(
    baseURI + '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    baseURI + '/auth-google-callback',
    passport.authenticate('google'),
    // todo deal whenever starts client side development
    (req, res) => {
      try {
        //@ts-ignore
        console.log('Request done', req.user);
        res.sendStatus(200);
      } catch (err: any) {
        console.log(err);
      }
    }
  );
}
