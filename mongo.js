const mongoose = require('mongoose')
const path = process.env.MONGOPATH

module.exports = async () => {
  await mongoose.connect(path, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  return mongoose;
}