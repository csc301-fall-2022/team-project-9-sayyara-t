import { Dialect, Sequelize } from 'sequelize'
import * as fs from 'fs';
const caCert = fs.readFileSync('./ca-certificate.crt');

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  dialectOptions: {
    ssl: {
        ca: caCert
    }
  }
})

export default sequelizeConnection
