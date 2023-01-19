const request = require('supertest');
const faker = require('faker');
const app = require('../../server');

describe('Musical works integration tests', () => {        
    it('should try to create a new musical work', async () => {
        const res = await request(app)
        .post('/api/v1/musical-work')
        .send({   
            title: faker.datatype.string(),
            type: faker.datatype.string(),
            author: {
                name: faker.datatype.string(),
            }
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('type');
        expect(res.body).toHaveProperty('author');
    })    
});

