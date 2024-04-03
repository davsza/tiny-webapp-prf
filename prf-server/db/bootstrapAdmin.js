const mongoose = require('mongoose');
const User = mongoose.model('user');
const Termek = mongoose.model('termek');

async function ensureAdminExists() {
    console.log('ensureadmin running')
  try {
    const admin = await User.findOne({ accessLevel: "advanced" });
    if (admin) {
      console.log('admin user already exits');
    } else {
      const newAdmin = new User({
        username: 'admin',
        password: 'admin123',
        email: 'admin@email.com',
        accessLevel: 3
      });
      await newAdmin.save();
      console.log('admin user successfully created');
    }
  } catch (error) {
    console.error('error occured: ', error);
  }
}

/*
async function generateTermekek() {
    console.log('generatetermek fut')
    const termekek = await Termek.find();
    size = termekek.size;
    if (size < 20) {
        for(let i = 0; i < size;i++) {
            const newTermek = new Termek({
                name: 'termek_' + i,
                description: 'sample description for termek_' + i
              });
              await newTermek.save();
        }
    }
}
*/

module.exports = ensureAdminExists;
//module.exports = generateTermekek;