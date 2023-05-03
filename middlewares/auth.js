const { tokenDecoder } = require("../helpers/jwt")
const { User, Admin } = require("../models/index")

const authentication = async (req, res, next) => {
    try {
        let access_token = req.headers.access_token
        if (!access_token) { next({name: 'Unauthenticated'}) } 
        
        payload = tokenDecoder(access_token)
        let data 
        if (!payload.isAdmin){
          data = await User.findByPk(payload.id)
        } else {
          data = await Admin.findByPk(payload.id)
        }
      
        if (!data) {
          next({name: 'Unauthenticated'})  
        }
    
        req.user = {
            id: payload.id,
            isAdmin: payload.isAdmin
        }
        next()
    } catch(error) {
        next(error)
    }
}

const authorization = async (req, res, next) => {
    try{
        const { isAdmin } = req.user
        console.log(req.user)
        if (!isAdmin){
          throw {name: 'Forbidden'}
        } else {
          next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { authentication, authorization }