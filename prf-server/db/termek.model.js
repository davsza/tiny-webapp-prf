const mongoose = require('mongoose');

var termrkSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    description: {type: String, required: true}
}, {collection: 'termekek'});

mongoose.model('termek', termrkSchema);