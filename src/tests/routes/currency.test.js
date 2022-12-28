// const request = require('supertest');
// const app = require('../../app');
// const {MongoClient} = require('mongodb');
const axios = require('axios')
const { BASE_URL, fetchTransactions } = require('../utils')

jest.mock('axios');

describe('fetchTransactions', () => {
    describe('when API call is successful', () => {
      it('should return transactions list', async () => {
        // given
        const transaction = [
            {
                transaction_id: '63a9591b748cd83f68fe07e1',
                user_id: 1,
                origin_currency: 'BRL',
                origin_value: 10,
                destination_currency: 'USD',
                destination_value: 1.93566,
                conversion_rate: 0.193566,
                date: '2022-12-26T00:00:00.000Z'
            }
        ];
        axios.get.mockResolvedValueOnce(transaction);
  
        // when
        const result = await fetchTransactions();
  
        // then
        expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/converter?from=BRL&to=USD&amount=10&user_id=1`);
        expect(result).toEqual(transaction);
      });
    });
});

// describe('Test the currency path', () => {
//   let connection;
//   let db;

//   beforeAll(async () => {
//     connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     db = await connection.db(globalThis.__MONGO_DB_NAME__);
//   });

//   afterAll(async () => {
//     await connection.close();
//   });

//   test('should do a currency conversion', done => {
//     request(app)
//       .get('/currency/converter?from=USD&to=BRL&amount=5&user_id=1')
//       .then(response => {
//           expect(response.statusCode).toBe(200)
//           expect(response.body.transaction_id.length).toBeGreaterThan(0)
//     expect(response.body.user_id).toEqual(1)
//     expect(response.body.origin_currency).toEqual('USD')
//     expect(response.body.destination_currency).toEqual('BRL')
//     expect(response.body.destination_value).toBeGreaterThan(0)
//     done();
//   });
//   });

//   test('should not accept an invalid user_id', done => {
//     request(app)
//       .get('/currency/converter?from=USD&to=BRL&amount=5&user_id=a')
//       .then(response => {
//         expect(response.statusCode).toBe(400)
//         done();
//       });
//   });

//   test('should not accept an amount that is not a number', done => {
//     request(app)
//       .get('/currency/converter?from=USD&to=BRL&amount=a&user_id=1')
//       .then(response => {
//         expect(response.statusCode).toBe(400)
//         done();
//       });
//   });

//   const parameters = [
//     ['x', 'BRL'],
//     ['USD', 'x'],
//   ];

//   test.each(parameters)('should not accept a non-existent currency', (from, to, done) => {
//     request(app)
//       .get(`/currency/converter?from=${from}&to=${to}&amount=5&user_id=1`)
//       .then(response => {
//         expect(response.statusCode).toBe(400)
//         done();
//       });
//   });

//   it('should insert a doc into collection', async () => {

//     const mockUser = {
//       user_id: 1,
//       origin_currency: 'USD',
//       origin_value: 3,
//       destination_currency: 'BRL',
//       destination_value: 15.497412,
//       conversion_rate: 5.165804
//   };
//     // await models.transactions.create(mockUser);
//     const transactions = db.collection('transactions')
//     await transactions.insertOne(mockUser)
//     const a = await transactions.findOne({user_id: 1})
//     await request(app)
//       .get(`/currency/list-transactions?user_id=1`)
//       .then(response => {
//         expect(response.statusCode).toBe(200)
//       });
//   });
// });