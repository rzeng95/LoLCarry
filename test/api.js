process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);


describe('API Status', () => {

    describe('GET /api/test', () => {
        it('assert that API is online', (done) => {
            chai.request(server)
                .get('/api/test')
                .end((err,res) => {
                    res.should.have.status(200);
                    res.text.should.equal('Hello!');
                    done();
                });
        });
    });

});
