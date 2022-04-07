import express from 'express';
import 'reflect-metadata';
import { importData } from './data-importer';
import { router } from './routes/routes';
import { LiveConnection } from './services/postgres.service';
import { LiveRedis } from './services/redis.service';



const app = express();


(async () => {
    try {
        LiveConnection.createAndConnect();
        LiveRedis.connect();
    }
    catch(exception) {
        throw new Error('Connecting to database has failed.');
    }

    //await importData();
})();


app.use(express.json());
app.use('/api', router);

app.listen(process.env.PORT);


export { app };
