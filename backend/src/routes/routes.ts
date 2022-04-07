import express from 'express';
import { body, param, query } from 'express-validator';
import { getRecentExchangeRate, getExchangeRatesFromPeriod, getAllExchangeRatesOnDate, postExchangeRate } from '../controllers/currencyExchange.controller';


const router = express.Router();


router.get(
    '/currencyExchange/:currencyPair',
    param('currencyPair').trim().isAlpha().withMessage('URI parameter \'currencyPair\' may only contain English alphabet letters.'),
    getRecentExchangeRate
);


router.get(
    '/currencyExchange/period/:currencyPair',
    param('currencyPair').trim().isAlpha().withMessage('URI parameter \'currencyPair\' may only contain English alphabet letters.'),
    query('beginDate').trim().isISO8601().withMessage('Query parameter \'beginDate\' has to satisfy ISO8601.'),
    query('endDate').trim().isISO8601().withMessage('Query parameter \'endDate\' has to satisfy ISO8601.'),
    getExchangeRatesFromPeriod
);


router.get(
    '/currencyExchange/all/:date',
    param('date').trim().isISO8601().withMessage('URI parameter \'date\' has to satisfy ISO8601.'),
    getAllExchangeRatesOnDate
);


router.post(
    '/currencyExchange/addRate',
    body('currencyPair').trim().isAlpha().withMessage('Body parameter \'currencyPair\' may only contain English alphabet letters.'),
    body('date').trim().isISO8601().withMessage('Body parameter \'date\' has to satisfy ISO8601.'),
    body('rate').trim().isNumeric().withMessage('Body parameter \'rate\' has to be of type Numeric.'),
    postExchangeRate
);



export { router };