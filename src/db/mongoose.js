// /Users/harsh/mongodb/bin/mongod.exe --dbpath=/Users/harsh/mongodb-data
const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true); 

mongoose.connect(process.env.MONGODB_URL)
