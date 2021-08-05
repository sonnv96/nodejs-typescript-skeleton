import swaggerJSDoc = require('swagger-jsdoc')
import systemConstant from './config/system-constant'
const baseHost = 'localhost:' + systemConstant.portLocal.toString()
// const baseHost = 'nodejs-api-landing.herokuapp.com/'
// const baseHost = 's2nm-backend.herokuapp.com/'
const options = {
  // List of files to be processed.
  apis: ['**/*.ts'],
  host: baseHost,
  swaggerDefinition: {
    info: {
      title: 'RestFul API with TypeScript, Mongoose(Mongo DB) and JWT',
      version: '1.0.0',
      description: 'RestFul API with TypeScript, Mongoose(Mongo DB) and JWT',
      contact: {
        email: 'vsonnguyen96@gmail.com'
      },
      license: {
        name: 'MIT',
        url: ''
      }
    },
    host: baseHost,
    basePath: '',
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        scheme: 'bearer',
        name: 'Authorization',
        bearerFormat: 'JWT',
        description: 'Enter your bearer token in the format **Bearer &lt;token>**'
      }
    },
    security: [{
      bearerAuth: []
    }],
    externalDocs: {
      description: 'Sonnguyen',
      url: ''
    }
  }
}
const specs = swaggerJSDoc(options)

export default specs