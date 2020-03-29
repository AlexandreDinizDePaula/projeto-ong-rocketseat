const app = require('../../src/app')
const superTest = require('supertest');
const connection = require('../../src/database/connection')

describe('ong', ()=> {

    beforeEach( async () =>{
        await connection.migrate.rollback()
       await connection.migrate.latest()
    });

    afterAll( ()=>{
        connection.destroy();
    })

    it('should be create a new ONG', async () =>{

        const response = await superTest(app)
        .post('/ongs')
        .send({
                name: "Elisa",
                email: "Elisa@alex.com",
                whatsapp: 1440000000000,
                city: "Belo Horizonte",
                uf: "MG"
        })
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8)
    })
})