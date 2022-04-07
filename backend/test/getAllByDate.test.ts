import { agent as request } from 'supertest';
import { app } from '../src/server';
import { expect } from 'chai';


describe('GET ALL CURRENCIES\' RATES FOR A PARTICULAR DAY', () => {

    it('Exchange rates on 2016-02-24', async () => {
        const res = await request(app).get('/api/currencyExchange/all/2016-02-24');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;

        let map = new Map();

        for(let element of res.body.result) {
            map.set(element.currencyPair, element.rate);
        }

        expect(map.get('CHFUSD')).to.equal(0.986);
        expect(map.get('JPYUSD')).to.equal(111.36);
        expect(map.get('NOKUSD')).to.equal(8.6713);
        expect(map.get('THBUSD')).to.equal(35.68);
        expect(map.get('TWDUSD')).to.equal(33.3);
        expect(map.get('SEKUSD')).to.equal(8.4859);
        expect(map.get('KRWUSD')).to.equal(1234.6);
        return expect(map.get('CNYUSD')).to.equal(6.529);
    });

});
