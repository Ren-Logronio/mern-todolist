import passport from "passport";
import { userModel } from "../models/userModel";
import { Strategy as LocalStrategy } from "passport-local";

const auth = passport.use(new LocalStrategy(
    (username, password, done) => {
        userModel.findOne({
            username: username,
            password: password
        }, (err: any, user: any) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (!user.verifyPassword(password)) { 
                return done(null, false); 
            }
            return done(null, user);
        })
    }
));

export { auth };