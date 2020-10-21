const Discord = require('discord.js')
const userSchema = require('../schemas/user-schema')
const mongo = require('../mongo.js')

module.exports = async(client, member) => {
  async function regcode() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 20; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  try {
    member.send(`Thanks for joining CampFire! You must register using the form below before you can access the whole server. Here is your code: \`${result}\`\nForm Link: <https://forms.gle/Uo98KMC2NuS4Lmth8>\n**NOTE:** Anyone who has access to that code can register under your name. Do not share your code with anyone.`)
  } catch(e) {

  }

  await new userSchema({
    userId: member.id,
    regCode: result,
    registered: false,
    groupNum: 0,
    sentConfMsg: false,
  }).save()
  }
  regcode()
}