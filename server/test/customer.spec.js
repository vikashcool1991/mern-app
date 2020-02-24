const chai = require('chai');
const path = require('path');

const label = { label: path.basename(__filename) };

const {
  expect,
} = chai;
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

setTimeout(() => {
  describe('Conviva tests.', () => {
    before(async () => {
      logger.info('Inside BeforeAll hook.', label);
    });

    it('Test GET all customers API.', async () => {
      const res = await chai.request(server)
        .get('/api/v1/customers')
        .set('Accept', 'application/json');
      expect(res).to.have.status(200);
      expect(res.body.data).to.have.lengthOf(100);
    });

    it('Test GET customers By Id API.', async () => {
      let res = await chai.request(server)
        .get('/api/v1/customers')
        .set('Accept', 'application/json');
      expect(res).to.have.status(200);
      const customerId = res.body.data[0]._id;
      res = await chai.request(server)
        .get(`/api/v1/customers/${customerId}`)
        .set('Accept', 'application/json');
      expect(res).to.have.status(200);
      expect(res.body.data).to.have.lengthOf(1);
      expect(res.body.data[0]._id).to.be.equal(customerId);
    });

    after(async () => {
      logger.info('Inside AfterAll hook.', label);
    });
  });
  run();
}, 5000);