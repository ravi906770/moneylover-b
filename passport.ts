import GoogleStrategy from "passport-google-oauth20"
import passport from "passport"


const google = GoogleStrategy.Strategy

const GOOGLE_CLIENT_ID = "904326384994-44tugk4nllf5d8h5q5uikrp28usg43m0.apps.googleusercontent.com"

const GOOGLE_CLIENT_SECRET_ID = "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"

passport.use(
    new google ({
        clientID : GOOGLE_CLIENT_ID,
        clientSecret : GOOGLE_CLIENT_SECRET_ID,
        callbackURL : "http://localhost:5000/auth/google/callback",
        scope :["profile","email"]
    },      
    function(access_token , refresh_token , profile ,done){
        // const user = {
        //     firstname : profile.displayName,
        //     lastname : profile.name,
        //     email : profile.emails ? profile.emails[0]:"",
        //     mobile_no : "",
        //     avatar :profile.photos ? profile.photos[0]:""
        // }
        done(null , profile)
    }
    )
)


passport.serializeUser((user:any , done)=>{
    done(null , user)
})

passport.deserializeUser((user:any , done)=>{
     done(null, user)
})
