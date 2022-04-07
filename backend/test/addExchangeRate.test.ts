import { agent as request } from 'supertest';
import { app } from '../src/server';
import { expect } from 'chai';


describe('ADDING EXCHANGE RATE', () => {

    it('USDEUR on 2016-06-15', async () => {
        const res = await request(app).post('/api/currencyExchange/addRate').send({
            'currencyPair': 'USDEUR',
            'date': '2016-06-15',
            'rate': 0.8879
        });
        expect(res.status).to.equal(200);
        return expect(res.body).not.to.be.empty;
    });

    it('USDEUR second on 2016-06-15', async () => {
        const res = await request(app).post('/api/currencyExchange/addRate').send({
            'currencyPair': 'USDEUR',
            'date': '2016-06-15',
            'rate': 0.8879
        });
        expect(res.status).to.equal(200);
        return expect(res.body).not.to.be.empty;
    });

});
