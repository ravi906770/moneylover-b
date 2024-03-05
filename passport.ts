import GoogleStrategy from "passport-google-oauth20"
import passport from "passport"


const google = GoogleStrategy.Strategy

passport.use(
    new google ({
        clientID : "904326384994-mf4r4obeb2srdmtjl8up02tlat3ca4tu.apps.googleusercontent.com",
        clientSecret : "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",
        callbackURL : "/auth/google/callback",
        scope :["profile" ,"email"]
    },
    function(access_token , refresh_token , profile ,callback){
        callback(null , profile)
    }
    )
)


passport.serializeUser((user:any , done)=>{
    done(null , user)
})

passport.deserializeUser((user:any , done)=>{
     done(null, user)
})
