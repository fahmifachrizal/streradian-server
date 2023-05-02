const { tokenDecoder } = require("../helpers/jwt")
const { User, Admin } = require("../models/index")

const authentication = async (req, res, next) => {
    try {
        let access_token = req.headers.access_token
        if (!access_token) { next({name: 'Unauthenticated'}) } 
        
        payload = tokenDecoder(access_token)
        let data 
        let isAdmin = false
        data = await User.findByPk(payload.id)
      
        if (!data) {
          if (!data) {
            data = await Admin.findByPk(payload.id)
            isAdmin = true
          }
          else { 
            next({name: 'Unauthenticated'}) 
          } 
        }
    
        req.user = {
            id: payload.id,
            email: payload.email,
            isAdmin
        }
        next()
    } catch(error) {
        next(error)
    }
}

const authorization = async (req, res, next) => {
    try{
        const role = req.user.isAdmin
        if (!role){
          throw {name: 'Forbidden'}
        } else {
          next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { authentication, authorization }