const mongoose = require('mongoose');

const musicalWorkSchema = new mongoose.Schema({    
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author',
    }
        
});

module.exports = mongoose.model('MusicalWork', musicalWorkSchema);