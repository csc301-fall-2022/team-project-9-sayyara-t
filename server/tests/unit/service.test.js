// const { expect } = require('chai');
// const supertest = require('supertest');
// const app = require('../../server');

// afterAll(async () => {
//     await new Promise(res => setTimeout(res, 500));
// });

// describe('GET /api/services with id=1000', () => {
//     it('responds with the appropriate JSON', async () => {
//         response = await supertest(app)
//                             .get('/api/services/1000')
//                             .expect('Content-Type', /json/)
//                             .expect(200);

//         expect(response.body.id).to.equal('1000');
//         expect(response.body.shop_id).to.equal('20');
//         expect(response.body.name).to.equal('Oil Change');
//         expect(response.body.description).to.equal('Check oil health and change if required');
//         expect(response.body.price).to.equal(250);
//     });
//   });

//   describe('POST /api/services with service data', () => {
//     it('responds with the appropriate JSON', async () => {
//         const service_data = {
//             shop_id: '10',
//             name: 'Suspension Lift',
//             description: 'Lifted suspension and raised clearance',
//             price: 1500,
//         }
        
//         response = await supertest(app)
//                         .post('/api/services')
//                         .send(service_data)
//                         .set('Content-Type', 'application/json')
//                         .set('Accept', 'application/json')
//                         .expect('Content-Type', /json/)
//                         .expect(200);

//         expect(response.body).to.haveOwnProperty('createdAt');
//         expect(response.body).to.haveOwnProperty('updatedAt');       
//     });
//   });
