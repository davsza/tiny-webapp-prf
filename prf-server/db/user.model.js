const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true, lowercase: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    accessLevel: {type: String}
}, {collection: 'users'});

userSchema.pre('save', function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.accessLevel = 'basic';
        bcryptjs.genSalt(10, function(err, salt) {
            if (err) {
                console.log('error during salt generation');
                return next(err);
            }
            bcryptjs.hash(user.password, salt, function(error, hash) {
                if(error) {
                    console.log('error durint hashing');
                    return next(error);
                }
                user.password = hash;
                return next();
            })
        })
    } else {
        return next();
    }
});

userSchema.methods.comparePasswords = function(password, nx) {
    bcryptjs.compare(password, this.password, function(err, isMatch) {
        nx(err, isMatch);
    });
}

mongoose.model('user', userSchema);