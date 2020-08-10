const assert = require('assert');
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();
chai.use(chaiHttp);

describe('API', function () {
  this.timeout(10000);
  this.slow(300);
  describe('Hello World', function () {
    it('should display \'Hello World\'', (done) => {
      chai.request(server)
        .get('/')
        .send({})
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.message.should.eq('Hello World');
          done();
        });
    });
  });

  describe('Hello MongoDB', function () {
    it('should display \'Hello MongoDB\'', (done) => {
      chai.request(server)
        .get('/mongo')
        .send({})
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.message.should.eq('Hello MongoDB');
          done();
        });
    });

    it('should display \'Hello MongoDB\'', (done) => {
      chai.request(server)
        .get('/mongo')
        .send({})
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.message.should.eq('Hello MongoDB');
          done();
        });
    });
  });
})
