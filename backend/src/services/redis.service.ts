import { Tedis, TedisPool } from 'tedis';



export class LiveRedis {

    private static redispool = new TedisPool({
        host: 'redis',
        port: +process.env.REDIS_PORT
    });

    public static con: Tedis;



    public static async connect() {
        this.con = await this.redispool.getTedis();
    }

    public static disconnect() {
        this.redispool.putTedis(this.con);
    }

}
