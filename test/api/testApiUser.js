var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
chai.use(chaiHttp)

describe('Testing route API User', function () {
  it('should store new user to database, and return the data back', function (done) {
    chai.request('http://localhost:3000')
      .post('/api/user')
      .send({
        facebook_id: "fb01895056784653",
        email: "didietsuryadi@gmail.com",
        username: "didietsuryadi"
      })
      .end(function (err,res) {
        res.should.be.json;
        res.should.have.status(200);
        res.body.facebook_id.should.equal('fb01895056784653');
        res.body.email.should.equal('didietsuryadi@gmail.com');
        res.body.username.should.equal('didietsuryadi')
        done()
      })
  })

  it('should return data of an user', function (done) {
    chai.request('http://localhost:3000')
      .get('/api/user/id')
      .end(function (err,res) {
        res.should.be.json;
        res.should.have.status(200);
        res.body.facebook_id.should.equal('fb01895056784653');
        res.body.email.should.equal('didietsuryadi@gmail.com');
        res.body.username.should.equal('didietsuryadi')
        done()
      })
  })

  it('shoul return data of users', function (done) {
    chai.request('http://localhost:3000')
      .get('/api/user')
      .end(function (err,res) {
        res.should.be.json;
        res.should.have.status(200);
        done()
      })
  })

  it('should return new data of updated data', function (done) {
    chai.request('http://localhost:3000')
      .put('/api/user/id')
      .send({
        email: "didietsuryadi@yahoo.com"
      })
      .end(function (err,res) {
        res.should.be.json;
        res.should.have.status(200);
        res.body.facebook_id.should.equal('fb01895056784653');
        res.body.user.should.equal('didietsuryadi@yahoo.com');
        res.body.username.should.equal('didietsuryadi')
        done()
      })
  })

  it('should return of deleted data', function (done) {
    chai.request('http://localhost:3000')
      .delete('/api/user/id')
      .end(function (err,res) {
        res.should.be.json;
        res.should.have.status(200);
        res.body.facebook_id.should.equal('fb01895056784653');
        res.body.user.should.equal('didietsuryadi@yahoo.com');
        res.body.username.should.equal('didietsuryadi');
        done()
      })
  })

})
