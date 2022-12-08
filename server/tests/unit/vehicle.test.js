const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../../server');

afterAll(async () => {
    await new Promise(res => setTimeout(res, 500));
});

describe('GET /api/vehicles with id=10000', () => {
  it('responds with the appropriate JSON', async () => {
    response = await supertest(app)
                        .get('/api/vehicles/10000')
                        .expect('Content-Type', /json/)
                        .expect(200);

    expect(response.body.id).to.equal('10000');
    expect(response.body.user_id).to.equal('1');
    expect(response.body.plate).to.equal('G3C W11');
    expect(response.body.model).to.equal('Corolla');
    expect(response.body.vin).to.equal('12kj4hkf');
    expect(response.body.mileage).to.equal('100,000 km');
    expect(response.body.type).to.equal('Hybrid');
  });
});

describe('POST /api/shops with vehicle data', () => {
  it('responds with the appropriate JSON', async () => {
    const vehicle_data = {
      user_id: '3',
      plate: 'YR3 T4G',
      model: 'GLC 300',
      vin: 'afdu39d',
      mileage: '75,000 km',
      type: 'Gas'
    }
    
    response = await supertest(app)
                      .post('/api/vehicles')
                      .send(vehicle_data)
                      .set('Content-Type', 'application/json')
                      .set('Accept', 'application/json')
                      .expect('Content-Type', /json/)
                      .expect(200);

    expect(response.body).to.haveOwnProperty('createdAt');
    expect(response.body).to.haveOwnProperty('updatedAt');       
  });
});
