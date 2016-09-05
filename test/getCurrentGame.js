process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

chai.use(chaiHttp);


describe('Get Current Game', () => {

    describe('GET /getCurrentGame/na/a#$^#^$#', () => {
        it('Nonexistent player returns special 404', (done) => {
            chai.request(server)
                .get('/api/getCurrentGame/na/a#$^#^$#')
                .end((err,res) => {
                    res.text.should.equal('This summoner does not exist.');
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('GET /getCurrentGame/na/vanila', () => {
        it('Existing not-in-game player returns special 404', (done) => {
            chai.request(server)
                .get('/api/getCurrentGame/na/vanila')
                .end((err,res) => {
                    res.text.should.equal('This summoner is currently not in-game.');
                    res.should.have.status(404);
                    done();
                });
        });
    });

});
