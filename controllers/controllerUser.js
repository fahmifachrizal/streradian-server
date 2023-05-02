const { comparePassword } = require('../helpers/bcrypt')
const { tokenGenerator } = require('../helpers/jwt')
const { User } = require('../models/index')

class Controller {
    static async register(req, res, next) {
        try {
          console.log(req.body)
            const { email, phoneNumber, city, zip, message, password, username, address } = req.body
            const createdUser = await User.create({ email, phoneNumber, city, zip, message, password, username, address })
            let data = {username: createdUser.username, email:createdUser.email} 
            res.status(201).json({ statusCode: 201, message:'New record has been created', data })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { password, username } = req.body
            if (!username || !password){
                throw { name: 'EmailOrPasswordRequired' }
            }
            const data = await User.findOne({ where: { username} })
            if (!data) {
                throw { name: 'InvalidCredentials' }
            }
            let isMatched = comparePassword(password, data.password)
            if (!isMatched){
                throw { name: 'InvalidCredentials' }
            }

            let payload = {
                id : data.id,
                username: data.username,
                isAdmin: false
            }
            let access_token = tokenGenerator(payload)
            res.status(200).json({ access_token, username: data.username, role: data.role, id:data.id})

        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller