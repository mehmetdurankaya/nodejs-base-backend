// eslint-disable-next-line no-unused-vars
const passport = require("passport");
// eslint-disable-next-line no-unused-vars
const {ExtractJwt,Strategy} = require("passport-jwt");
// eslint-disable-next-line no-unused-vars
const config = require("../config/config")
const Users = require("../models/Users");
const UserRoles = require("../models/UserRoles");
const RolePrivileges = require("../models/RolePrivileges");
const { date } = require("is_js");



module.exports=function(){
    let strategy=new Strategy({
        secretOrKey:config.JWT.SECRET,
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
    },async(payload,done)=>{
        try {
            
       
        let user = await Users.findOne({_id:payload.id})
        if(user){
            let userRoles = await UserRoles.findOne({user_id:payload.id});
            let rolePrivileges = await RolePrivileges.findOne({role_id:{$in:userRoles.map(ur=>ur.role_id)}});
            done(null,{
                id:user._id,
                roles:rolePrivileges,
                email:user.email,
                first_name:user.first_name,
                last_name:user.last_name,
                exp:parseInt(Date.now()/1000)*config.JWT.EXPIRE_TIME
            });
        }else{
            done(new Error("User not found"),null);
        }
    } catch (err) {
           done(err,null) 
    }
    });  
    passport.use(strategy);
    return{
        initialize:function(){
            return passport.initialize();
        },
        authenticate:function(){
            return passport.authenticate("jwt",{session:false})
        }
    }
}