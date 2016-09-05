process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

chai.use(chaiHttp);

describe('API', () => {

    describe('GET /test', () => {
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
