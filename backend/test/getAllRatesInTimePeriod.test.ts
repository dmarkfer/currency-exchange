import { agent as request } from 'supertest';
import { app } from '../src/server';
import { expect } from 'chai';


describe('GET EXCHANGE RATES THROUGH PERIOD', () => {

    it('CNYUSD from 2016-02-12 to 2016-02-17', async () => {
        const res = await request(app).get('/api/currencyExchange/period/CNYUSD?beginDate=2016-02-12&endDate=2016-02-17');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.result[0].rate).to.equal(6.571);
        expect(res.body.result[1].rate).to.equal(6.571);
        expect(res.body.result[2].rate).to.equal(6.5154);
        return expect(res.body.result[3].rate).to.equal(6.527);
    });

});
