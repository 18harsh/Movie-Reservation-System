// /Users/harsh/mongodb/bin/mongod.exe --dbpath=/Users/harsh/mongodb-data
const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true); 

mongoose.connect('mongodb://127.0.0.1:27017/apnaShow')



// const me = new User({
//     fname: 'Harsh',
//     lname: 'Gandhi',
//     email: '18harshgandhi@gmail.com',
//     password: '12345678'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!',error)
// })