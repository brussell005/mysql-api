const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Auth API service', function() {
    it.skip('should POST a new user', function (done) {
        const testUser = {
            username: 'admin',
            password: 'password',
            email: 'admin@example.com',
        };
        const expectedUser = 
            {
                username: 'admin',
                email: 'admin@example.com',
            };
        chai
            .request('http://localhost:3000')
            .post('/api/auth/register')
            .send(testUser)
            .end(function(err, resp) {
                console.log(resp.body);
                expect(resp.body.username).to.eql(expectedUser.username);
                expect(resp.body.email).to.eql(expectedUser.email);
                done();
            });
        });
});
