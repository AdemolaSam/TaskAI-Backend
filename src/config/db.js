import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
const env = process.env.NODE_ENV || 'development';
import configObj from '../../config/config.js'
const config = configObj[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect
  }
);

sequelize.authenticate().then(() => {
  console.log("Database Connected");
}).catch((error) => {
  console.log(error.message);
  return error.message;
});

export default sequelize




