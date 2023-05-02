const errorHandler = (error, req, res, next) => {
  let statusCode = 500
  let message = 'Internal Server Error'
  
  console.log(error)
  if (error.name.includes('Sequelize')) {
      const errorValidation = {}
      error.errors.forEach(el => { errorValidation[el.path] = el.message })
      statusCode = 400; message = errorValidation
  } else {

  switch(error.name){
    case 'Existed':
      statusCode = 400; message = 'Record already existed'; break
    case 'InvalidCredentials':
      statusCode = 400; message = 'Email or password invalid'; break
    case 'EmailOrPasswordRequired':
      statusCode = 400; message = 'Email and password is required'; break
    case 'JsonWebTokenError':
      statusCode = 401; message = 'Token not verified or no longer has access'; break
    case 'IngredientsError':
      statusCode = 400; message = 'Invalid ingredient(s) data'; break
    case 'Unauthenticated':
      statusCode = 401; message = 'Unauthenticated'; break 
    case 'ReferenceError':
    case 'Forbidden':
      statusCode = 403; message = 'Access unauthorized or forbidden'; break
    case 'RecordNotFound':
      statusCode = 404; message = 'Error not found'; break
    }

  }
      
  res.status(statusCode).json({statusCode, message})
} 

module.exports = { errorHandler }