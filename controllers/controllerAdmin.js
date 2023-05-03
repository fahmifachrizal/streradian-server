const { comparePassword } = require('../helpers/bcrypt')
const { tokenGenerator } = require('../helpers/jwt')
const { Admin } = require('../models/index')

class Controller {
    static async login(req, res, next) {
        try {
            const { password, email } = req.body
            if (!email || !password){
                throw { name: 'EmailOrPasswordRequired' }
            }
            const data = await Admin.findOne({ where: { email} })
            if (!data) {
                throw { name: 'InvalidCredentials' }
            }
            let isMatched = comparePassword(password, data.password)
            if (!isMatched){
                throw { name: 'InvalidCredentials' }
            }

            let payload = {
                id : data.id,
                isAdmin: true
            }
            let access_token = tokenGenerator(payload)
            res.status(200).json({ access_token, username: 'Admin', isAdmin:true, id:data.id})

        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller