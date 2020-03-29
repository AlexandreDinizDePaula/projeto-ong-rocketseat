const connection = require('../database/connection');
const generateUniqueid = require('../utils/generateUniqueId')

module.exports = {

    async index(req,res){
        const ongs = await connection('ongs').select('*');
    
        res.json(ongs)
    },
    
    async create(req,res) {
        
        const { name, email, whatsapp, city, uf } = req.body;

        const id = generateUniqueid()

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
        res.json({ id })
    }
}
