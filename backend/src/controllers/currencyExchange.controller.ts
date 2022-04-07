import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ExchangeRate } from '../models/ExchangeRate.entity';
import { LiveConnection } from '../services/postgres.service';
import { LiveRedis } from '../services/redis.service';
import * as csv from 'fast-csv';
import { EOL } from 'os';



const getRecentExchangeRate = async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if(! errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let found: string[];
    try {
        found = await LiveRedis.con.zrevrangebyscore(
            req.params.currencyPair,
            '+inf', '-inf',
            { limit: { offset: 0, count: 1 } }
        );
    }
    catch(exception) {
        return res.status(500).json({ error: 'Error while reading from database.' });
    }


    let parsed = [];

    await new Promise(resolve => {
        csv.parseString(found[0])
           .on('data', row => parsed.push(row))
           .on('end', () => resolve(true))
    });

    return res.status(200).json({
        date: new Date(Number(parsed[0][0])).toISOString().split('T')[0],
        currencyPair: req.params.currencyPair,
        rate: Number(parsed[0][1])
    });
};



const getExchangeRatesFromPeriod = async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if(! errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    let dateBeginMilsec: number = new Date(String(req.query.beginDate)).getTime();
    let dateEndMilsec: number = new Date(String(req.query.endDate)).getTime();
    
    let found: string[]
    try {
        found = await LiveRedis.con.zrangebyscore(
            req.params.currencyPair,
            String(dateBeginMilsec), String(dateEndMilsec)
        );
    }
    catch(exception) {
        return res.status(500).json({ error: 'Error while reading from database.' });
    }


    let parsed = [];

    await new Promise(resolve => {
        csv.parseString(found.join(EOL))
           .on('data', row => parsed.push(row))
           .on('end', () => resolve(true))
    });

    let result = [];
    for(let element of parsed) {
        result.push({
            date: new Date(Number(element[0])).toISOString().split('T')[0],
            currencyPair: req.params.currencyPair,
            rate: Number(element[1])
        });
    }

    return res.status(200).json({ result: result });
};



const getAllExchangeRatesOnDate = async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if(! errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    let dateMilsec: number = new Date(req.params.date).getTime();

    let currPairs: string[];
    try {
        currPairs = await LiveRedis.con.keys('*');
    }
    catch(exception) {
        return res.status(500).json({ error: 'Error while reading from database.' });
    }
    
    let result: any = [];

    for(let currencyPair of currPairs) {
        let found: string[];
        try {
            found = await LiveRedis.con.zrangebyscore(
                currencyPair,
                String(dateMilsec), String(dateMilsec),
                { limit: { offset: 0, count: 1 } }
            );
        }
        catch(exception) {
            return res.status(500).json({ error: 'Error while reading from database.' });
        }

        if(! found.length) {
            continue;
        }

        let parsed = [];

        await new Promise(resolve => {
            csv.parseString(found[0])
                .on('data', row => parsed.push(row))
                .on('end', () => resolve(true))
        });

        result.push({
            date: new Date(Number(parsed[0][0])).toISOString().split('T')[0],
            currencyPair: currencyPair,
            rate: Number(parsed[0][1])
        });
    }

    return res.status(200).json({ result: result });
};



const postExchangeRate = async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if(! errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    let result: number;

    try {
        await LiveConnection.con.getRepository(ExchangeRate).save({
            date: req.body.date,
            exchange_type: req.body.currencyPair,
            rate: Number(req.body.rate)
        });

        result = await LiveRedis.con.zadd(
            req.body.currencyPair,
            { [String(new Date(req.body.date).getTime()) + ',' + String(req.body.rate)]: new Date(req.body.date).getTime() },
            { nxxx: 'NX' }
        );
    }
    catch(exception) {
        return res.status(500).json({ error: 'Error while inserting to database.' });
    }

    return res.status(200).json({ result: result });
};



export {
    getRecentExchangeRate,
    getExchangeRatesFromPeriod,
    getAllExchangeRatesOnDate,
    postExchangeRate
};
