// import UserModel from "../models/userModel";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as FacebookStrategy } from "passport-facebook";
import UserModel from "./models/user.js";
import dotenv from "dotenv";
dotenv.config({ path: "./routes/.env" });

// const GOOGLE_CLIENT_ID = '20191912233-pb3iapilc3ihoqvkaeasmtrqdud610rv.apps.googleusercontent.com';
// const GOOGLE_CLIENT_SECRET = "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";


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/user/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        UserModel.findOne({ 'google.id': profile.id }).then((currentUser) => {
            if (currentUser) {
                
                done(null, currentUser);

                console.log("currentUser");
            } else {
        console.log(profile);

        const newUser = new UserModel({
            'google.firstName': profile.name.givenName,
            'google.lastName': profile.name.familyName,
            'google.token': accessToken,
            'google.id': profile.id,
            'google.email': profile.emails[0].value,
            'google.image': profile.photos[0].value,
        });
        newUser.save()
                    .then((newUser) => {
                        done(null, newUser);
                    });
            }
        });
    }
)
);


// const GITHUB_CLIENT_ID = 'b9eea084e8b7dd5c723a';
// const GITHUB_CLIENT_SECRET = 'e15dd6e7faaf222afb9b0983a97d93ceaf63511d';

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/user/auth/github/callback"
},
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        UserModel.findOne({ 'github.id': profile.id }).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            } else {
                new UserModel({
                    'github.username': profile.username,
                    'github.id': profile.id,
                    'github.token': accessToken,
                    'github.image': profile.photos[0].value,
                })
                    .save()
                    .then((newUser) => {
                        done(null, newUser);
                    });
            }
        });
    }
)
);
// function (accessToken, refreshToken, profile, done) {
//     console.log("profile");
//     console.log(profile.username);
//     console.log(profile.id);
//     console.log("accessToken");
//     console.log(accessToken);
//     console.log("refreshToken");
//     console.log(refreshToken);
//     done(null, profile);
//   }
// )
// );

// const FACEBOOK_CLIENT_ID = '409312587969780';
// const FACEBOOK_CLIENT_SECRET = '729bdeb1b5577546fc49496053f59310';


passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: "/api/user/auth/facebook/callback",
            profileFields   : ['id','displayName','name','gender','picture.type(large)','email']
        },
        (accessToken, refreshToken, profile, done) => {
            UserModel.findOne({ 'facebook.id': profile.id }).then((currentUser) => {
                if (currentUser) {
                    
                    done(null, currentUser);

                    console.log("currentUser");
                } else {
            console.log(profile);

            const newUser = new UserModel({
                'facebook.firstName': profile.name.givenName,
                'facebook.lastName': profile.name.familyName,
                'facebook.token': accessToken,
                'facebook.id': profile.id,
                'facebook.email': profile.emails[0].value,
                'facebook.image': profile.photos[0].value,
            });
            newUser.save()
                        .then((newUser) => {
                            done(null, newUser);
                        });
                }
            });
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
}
);

passport.deserializeUser(function (user, done) {
    done(null, user);
}
);


export default passport;