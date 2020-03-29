const genarateUniqueId = require('../../src/utils/generateUniqueId')

describe('Genarate Unique ID', () =>{
    it('should genarate a unique ID', ()=> {
        const id = genarateUniqueId();

        expect(id).toHaveLength(8);
    })
})