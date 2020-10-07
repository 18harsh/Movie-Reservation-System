const mongoose = require('mongoose')



const MoviesSchema = new mongoose.Schema({
    movieName: {
        type: String,
        trim: true
    },
    like: {
        type: Number,
        trim: true
    },
    review: {
        type: String,
        trim: true
    },
    language: {
        type: String,
        trim: true
    },
    genre: {
        type: String,
        trim: true
    },
    dateRelease: {
        type: String,
        trim: true
    }
})

const Movies = mongoose.model('Movies', MoviesSchema)

module.exports = Movies