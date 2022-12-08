const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../../server');

afterAll(async () => {
  await new Promise(res => setTimeout(res, 500));
});

describe('GET /api/ratings with id=100', () => {
  it('responds with the appropriate JSON', async () => {
    response = await supertest(app)
                      .get('/api/ratings/100')
                      .expect('Content-Type', /json/)
                      .expect(200);

    expect(response.body.id).to.equal('100');
    expect(response.body.user_id).to.equal('1');
    expect(response.body.shop_id).to.equal('10');
    expect(response.body.comment).to.equal('Good price, place was welcoming.');
    expect(response.body.star).to.equal(5);
    expect(response.body.price).to.equal(300);
  });
});

describe('POST /api/ratings with rating data', () => {
  it('responds with the appropriate JSON', async () => {
    const rating_data = {
      user_id: '2',
      shop_id: '30',
      comment: 'Lost my socks here!',
      star: 2,
      price: 300
    }
    
    response = await supertest(app)
                      .post('/api/ratings')
                      .send(rating_data)
                      .set('Content-Type', 'application/json')
                      .set('Accept', 'application/json')
                      .expect('Content-Type', /json/)
                      .expect(200);

    expect(response.body).to.haveOwnProperty('createdAt');
    expect(response.body).to.haveOwnProperty('updatedAt');       
  });
});
