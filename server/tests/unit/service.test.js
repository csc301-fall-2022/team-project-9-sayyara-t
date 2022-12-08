const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../../server');

afterAll(async () => {
  await new Promise(res => setTimeout(res, 500));
});

describe('GET /api/services with id=abc1', () => {
  it('responds with the appropriate JSON', async () => {
    response = await supertest(app)
                      .get('/api/services/abc1')
                      .expect('Content-Type', /json/)
                      .expect(200);

    expect(response.body.id).to.equal('abc1');
    expect(response.body.type).to.equal('test');
    expect(response.body.name).to.equal('test service 1');
  });
});

describe('POST /api/services with service data', () => {
  it('responds with the appropriate JSON', async () => {
    const service_data = {
      type: 'maintenance',
      name: 'Brake Fluid Check',
    },
    
    response = await supertest(app)
                      .post('/api/services')
                      .send(service_data)
                      .set('Content-Type', 'application/json')
                      .set('Accept', 'application/json')
                      .expect('Content-Type', /json/)
                      .expect(200);

    expect(response.body).to.haveOwnProperty('createdAt');
    expect(response.body).to.haveOwnProperty('updatedAt');       
  });
});
