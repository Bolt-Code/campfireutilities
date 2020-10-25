const Discord = require('discord.js')
const userSchema = require('../schemas/user-schema')
const mongo = require('../mongo.js')

module.exports = async(client, member) => {
  if(!member.guild.id === '759385366531932160') return;

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

  var d = new Date()
  var day = d.getDate()
  var year = d.getFullYear()
  var month = d.getMonth() + 1
  var hour = d.getHours()
  var minute = d.getMinutes()
  var time = `${month}/${day}/${year} ${hour}:${minute}`
  const logchannel = member.guild.channels.cache.get('766808200837726208')
  logchannel.send(`<:join:768880799906660363> **${member.user.tag}** joined at \`${time}\` (${member.user.id})`)
}