import passport from "passport";
import { IUser } from "../models";
import { userModel as User } from "../models/userModel";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(7);
const secret: string = process.env.JWT_SECRET || "secret";

const LoginStrategy = new LocalStrategy(
    { usernameField: "email", },
    (email, password, done) => {
        User.findOne({ email, password }, (err: Error, user: any) => {
            if (err) return done(err);
            if (!user) return done("No user found", false);
            if (!user.verifyPassword(password)) return done(null, false); 
            const token = jwt.sign(
                { username: user.username },
                secret,
                {
                  expiresIn: "30m",
                }
            );
            return done(null, user);
        })
    }
);

const RegistrationStrategy = new LocalStrategy(
    { passReqToCallback: true, usernameField: "email", },
    (req, email, password, done) => {
        User.findOne({ email }, (err: Error, user: any) => { 
            if(err) return done(err, false);
            if(!user) {
                const encryptedPassword = bcrypt.hashSync(password, salt);
                const newUser = new User({email: String, password: encryptedPassword, username: req.body.username});
                newUser.save()
                    .then((user: IUser) => done(null, user))
                    .catch((err: Error) => done(err, false));
            }
            if(user) done("User already exists", false);
        })
    }
  );

passport.use("local-login", LoginStrategy);
passport.use("local-register", RegistrationStrategy);

export { passport as auth, LoginStrategy, RegistrationStrategy };