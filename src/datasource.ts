// External Libraries
import { DataSource } from 'typeorm'

import * as dotenv from 'dotenv'
dotenv.config()

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['src/migrations/*.js'],
  synchronize: false,
  ssl: process.env.DB_SSL === 'true' ? true : false,
  logging: true
})

export default AppDataSource
