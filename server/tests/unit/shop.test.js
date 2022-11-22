const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../../server');

afterAll(async () => {
  await new Promise(res => setTimeout(res, 500));
});

describe('GET /api/shops with id=10', () => {
  it('responds with the appropriate JSON', async () => {
    response = await supertest(app)
                      .get('/api/shops/10')
                      .expect('Content-Type', /json/)
                      .expect(200);

    expect(response.body.id).to.equal('10');
    expect(response.body.name).to.equal('Bobs Trucks');
    expect(response.body.address).to.equal('325 Yonge St.');
    expect(response.body.phone).to.equal('123-456-7890');
    expect(response.body.email).to.equal('bob@trucks.com');
    expect(response.body.time).to.deep.equal({'start': '9:00 AM', 'end': '5:00 PM'});
    expect(response.body.description).to.equal('This place sells trucks!');
  });
});

describe('POST /api/shops with shop data', () => {
  it('responds with the appropriate JSON', async () => {
    const shop_data = {
      name: 'Peters Planes',
      address: '123 Jane St.',
      phone: '123-456-7890',
      email: 'peter@planes.com',
      time: {start: '9:00 AM', 'end': '5:00 PM'},
      description: 'This place sells planes!'
    }
    
    response = await supertest(app)
                      .post('/api/shops')
                      .send(shop_data)
                      .set('Content-Type', 'application/json')
                      .set('Accept', 'application/json')
                      .expect('Content-Type', /json/)
                      .expect(200);

    expect(response.body).to.haveOwnProperty('createdAt');
    expect(response.body).to.haveOwnProperty('updatedAt');       
  });
});
