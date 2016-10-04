process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

const REDIS_URL = process.env.REDIS_URL || require('../SECRET').REDIS_URL;


describe('Get Current Game', () => {
    before((done) => {
        const cache = require('express-redis-cache')({
            client: require('redis').createClient(REDIS_URL)
        })

        cache.on('connected', () => {
            console.log('Successfully connected to redis cache\n');
            done();
        });
    })

    // API STATUS
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

    // CHALLENGER LIST TEST
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
