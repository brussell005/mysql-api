const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Inventory API Service', function() {
    it('should GET all items', function (done) {
        chai
            .request('http://localhost:3000')
            .get('/api/inventory')
            .end(function(err, resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.be.a('array');
                expect(resp.body.length).to.not.be.eql(0);
                done();
            });
    });

    it('should GET a single item', function(done) {
        const expected = [
            {
                id: 1,
                name: "Tomatoes",
                definition: "veg",
                quantity: 1,
            },
        ];
        chai
            .request('http://localhost:3000')
            .get('/api/inventory')
            .end(function(err, resp) {
            expect(resp.status).to.be.eql(200);
            expect(resp.body).to.be.a('array');
            expect(resp.body.length).to.not.be.eql(0);
            expect(resp.body).to.be.eql(expected);
            done();
            });
    });
});