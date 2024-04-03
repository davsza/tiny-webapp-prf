const mongoose = require('mongoose');
const Termek = mongoose.model('termek');

async function generateTermekek() {
    console.log('generatetermek running')
    const termekek = await Termek.find();
    size = termekek.length;
    console.log(size);
    if (size < 20) {
        for(let i = 0; i < 20; i++) {
            const newTermek = new Termek({
                name: 'termek_' + i,
                description: 'sample description for termek_' + i
              });
              await newTermek.save();
        }
    }
}

module.exports = generateTermekek;