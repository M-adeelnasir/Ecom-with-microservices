import passport from 'passport';
import {
  Strategy,
  GoogleCallbackParameters,
  VerifyCallback,
  Profile,
} from 'passport-google-oauth20';
import config from 'config';
import { Request } from 'express';
import { googleSignup, getAUserByGoogleId, getAUser } from './user.service';

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async function (_id: any, cb) {
  console.log('OBJECT===>', _id);
  const user = await getAUser(_id);
  cb(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: config.get<string>('google_client_id'),
      clientSecret: config.get<string>('google_client_secret'),
      callbackURL: 'https://shopproduct.dev/api/v1/users/auth-google-callback',
      passReqToCallback: true,
      scope: ['profile'],
      state: true,
    },
    async (
      req: Request,
      accessToken: string,
      refreshToken: string,
      params: GoogleCallbackParameters,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const profileUser = profile._json;

        const existingUser = await getAUserByGoogleId(profileUser.sub);
        if (existingUser) {
          console.log('PREV SESSION USED');

          return done(null, existingUser);
        }
        console.log('LOGIN SESSSIO CREATED AGAIN');
        const user = await googleSignup({
          googleId: profileUser.sub,
          firstName: profileUser.given_name!,
          lastName: profileUser.family_name,
          avatar: profileUser.picture,
          verified: true,
          email: profileUser.email!,
        });
        done(null, user);
      } catch (err: any) {
        //   @ts-ignore
        done(err, null);
      }
    }
  )
);
