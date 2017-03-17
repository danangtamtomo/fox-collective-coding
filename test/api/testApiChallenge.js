var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
chai.use(chaiHttp)

describe('Testing route API Chalengge', function () {
  it('should store new question to database, and return the data back', function (done) {
    chai.request('http://localhost:3000')
      .post('/api/challenge')
      .send({
        title: "This is Title",
        question: "This is the question?",
        answer: "This is Answer"
      })
      .end(function (err,res) {
        res.should.be.json;
        res.should.have.status(200);
        res.body.title.should.equal('This is Title');
        res.body.question.should.equal('This is the question?');
        res.body.answer.should.equal('This is Answer')
        done()
      })
  })

  it('should return data of an challenge', function (done) {
    chai.request('http://localhost:3000')
      .get('/api/challenge/id')
      .end(function (err,res) {
        res.should.be.json;
        res.should.have.status(200);
        res.body.title.should.equal('This is Title');
        res.body.question.should.equal('This is the question?');
        res.body.answer.should.equal('This is Answer')
        done()
      })
  })

  it('shoul return data of challenges', function (done) {
    chai.request('http://localhost:3000')
      .get('/api/challenge')
      .end(function (err,res) {
        res.should.be.json;
        res.should.have.status(200);
        done()
      })
  })

  it('should return new data of updated data', function (done) {
    chai.request('http://localhost:3000')
      .put('/api/challenge/id')
      .send({
        question: "This is the new question"
      })
      .end(function (err,res) {
        res.should.be.json;
        res.should.have.status(200);
        res.body.title.should.equal('This is Title');
        res.body.question.should.equal('This is the new question');
        res.body.answer.should.equal('This is Answer')
        done()
      })
  })

  it('should return of deleted data', function (done) {
    chai.request('http://localhost:3000')
      .delete('/api/challenge/id')
      .end(function (err,res) {
        res.should.be.json;
        res.should.have.status(200);
        res.body.title.should.equal('This is Title');
        res.body.question.should.equal('This is the new question');
        res.body.answer.should.equal('This is Answer');
        done()
      })
  })

})
