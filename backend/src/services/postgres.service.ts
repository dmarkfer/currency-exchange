import { Connection, ConnectionManager } from 'typeorm';
import { ExchangeRate } from '../models/ExchangeRate.entity';



export class LiveConnection {

    private static connectionManager = new ConnectionManager();
    public static con: Connection;


    public static async createAndConnect() {
        this.con = this.connectionManager.create({
            type: 'postgres',
            host: 'database',
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            port: +process.env.POSTGRES_PORT,
            database: process.env.POSTGRES_DB,
            synchronize: true,
            logging: false,
            entities: [ ExchangeRate ]
        });

        await this.con.connect();
    }


    public static async disconnect() {
        await this.con.close();
    }
}

