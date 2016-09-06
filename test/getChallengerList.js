process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);


describe('Get Challenger List', () => {

    describe('GET /api/getChallengerList/na', () => {
        it('Get list of challenger names', (done) => {
            chai.request(server)
                .get('/api/getChallengerList/na')
                .end((err,res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});
