import * as fs from 'fs';
import * as csv from 'fast-csv';
import { LiveConnection } from './services/postgres.service'
import { ExchangeRate } from './models/ExchangeRate.entity';
import { LiveRedis } from './services/redis.service';



async function importData() {
    let files = fs.readdirSync(__dirname + '/../fxdata', { encoding: 'utf8', withFileTypes: true });   
    let data = [];

    for(let file of files) {
        await new Promise(resolve => {
            csv.parseFile(
                __dirname + '/../fxdata/' + file.name,
                { headers: true }
            ).on('data', row => {

                if(row[Object.keys(row)[1]] == '.') {
                    row[Object.keys(row)[1]] = data[data.length - 1][Object.keys(row)[1]];
                }

                data.push(row);
            }).on('end', () => resolve(true));
        });
    };



    for(let row of data) {
        await LiveConnection.con.getRepository(ExchangeRate).save({
            date: row[Object.keys(row)[0]],
            exchange_type: Object.keys(row)[1],
            rate: row[Object.keys(row)[1]]
        });

        await LiveRedis.con.zadd(
            Object.keys(row)[1],
            { [String(new Date(row[Object.keys(row)[0]]).getTime()) + ',' + String(row[Object.keys(row)[1]])]:
                new Date(row[Object.keys(row)[0]]).getTime() },
            { nxxx: 'NX' }
        );
    }
}



export { importData };
