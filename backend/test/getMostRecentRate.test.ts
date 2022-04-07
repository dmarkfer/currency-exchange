import { agent as request } from 'supertest';
import { app } from '../src/server';
import { expect } from 'chai';


describe('GET MOST RECENT EXCHANGE RATE', () => {

    it('CHFUSD', async () => {
        const res = await request(app).get('/api/currencyExchange/CHFUSD');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.currencyPair).to.equal('CHFUSD');
        expect(res.body.date).to.equal('2021-01-29');
        return expect(res.body.rate).to.equal(0.8905);
    });

    it('CNYUSD', async () => {
        const res = await request(app).get('/api/currencyExchange/CNYUSD');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.currencyPair).to.equal('CNYUSD');
        expect(res.body.date).to.equal('2021-01-29');
        return expect(res.body.rate).to.equal(6.4282);
    });

    it('JPYUSD', async () => {
        const res = await request(app).get('/api/currencyExchange/JPYUSD');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.currencyPair).to.equal('JPYUSD');
        expect(res.body.date).to.equal('2021-01-29');
        return expect(res.body.rate).to.equal(104.64);
    });

    it('KRWUSD', async () => {
        const res = await request(app).get('/api/currencyExchange/KRWUSD');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.currencyPair).to.equal('KRWUSD');
        expect(res.body.date).to.equal('2021-01-29');
        return expect(res.body.rate).to.equal(1118.35);
    });

    it('NOKUSD', async () => {
        const res = await request(app).get('/api/currencyExchange/NOKUSD');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.currencyPair).to.equal('NOKUSD');
        expect(res.body.date).to.equal('2021-01-29');
        return expect(res.body.rate).to.equal(8.5454);
    });

    it('SEKUSD', async () => {
        const res = await request(app).get('/api/currencyExchange/SEKUSD');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.currencyPair).to.equal('SEKUSD');
        expect(res.body.date).to.equal('2021-01-29');
        return expect(res.body.rate).to.equal(8.3357);
    });

    it('THBUSD', async () => {
        const res = await request(app).get('/api/currencyExchange/THBUSD');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.currencyPair).to.equal('THBUSD');
        expect(res.body.date).to.equal('2021-01-29');
        return expect(res.body.rate).to.equal(29.89);
    });

    it('TWDUSD', async () => {
        const res = await request(app).get('/api/currencyExchange/TWDUSD');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.currencyPair).to.equal('TWDUSD');
        expect(res.body.date).to.equal('2021-01-29');
        return expect(res.body.rate).to.equal(28.01);
    });

});
