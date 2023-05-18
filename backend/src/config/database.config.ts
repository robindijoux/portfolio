import { registerAs } from "@nestjs/config"

export default registerAs('database', () => ({
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    database: process.env.DATABASE_DB_NAME,
    synchronize: process.env.DATABASE_SYNCHRONIZE
}))