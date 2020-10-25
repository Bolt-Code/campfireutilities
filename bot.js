require('./keepalive')

const fs = require('fs')
const Discord = require('discord.js')
const readline = require('readline');
const {google} = require('googleapis');
const staffappSchema = require('./schemas/staffapp-schema')
const mongo = require('./mongo.js')
const userSchema = require('./schemas/user-schema')
const axios = require('axios')

const { GiveawaysManager } = require("discord-giveaways")
const client = new Discord.Client()


// GIVEAWAYS SECTIONS :)
const manager = new GiveawaysManager(client, {
    storage: "./db/giveaways.json",
    updateCountdownEvery: 10000,
    default: {
      botsCanWin: false,
      exemptPermissions: [],
      embedColor: "#FF1654",
      reaction: "🎉"
    }
})

client.defaultColor = `#FF1654`
client.giveawaysManager = manager

/*client.embed = {
  error: (a)=>{
    var e = new Discord.MessageEmbed()

    e.setColor(client.defaultColor)
    e.setDescription(a)

    message.channel.send(e)
  }
}*/
/*client.embed.error = (a)=>{
  var e = new Discord.MessageEmbed()

  e.setColor(client.defaultColor)
  e.setDescription(a)

  message.channel.send(e)
}*/

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    const event = require(`./events/${file}`)

    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client))
  })
})

client.login(process.env.TOKEN)

//GOOGLE API SECTION:

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

async function checkApps() {
  fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), checkStaffApps);
});
}

setInterval(checkApps, 10000)

async function checkForms() {
  fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), checkRegForms);
});
}

setInterval(checkForms, 10000)

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

async function checkStaffApps(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1BSQ-rqDDtBUY74Pjxq_1pXvLoaliJnlg3EMnscRJT0s',
    range: 'B2:G',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (!rows) return;
    if (rows.length) {
      rows.map(async(row) => {
        const result = await staffappSchema.findOne({
          userCode: row[1].replace(' ', '')
        }).catch(e => false)

        if(result) {
          const { userId, sentConfMsg } = result
          if(sentConfMsg == false) {
            const messageUser = client.users.cache.get(userId)
            messageUser.send(`Thanks for applying to be a staff member! We will reach out to you if we need more information or are thinking about accepting your application.`)

            await staffappSchema.updateOne({
              userCode: row[1].replace(' ', ''),
            },{
              sentConfMsg: true,
              status: 'Submitted',
              timezone: row[4],
              age: row[2],
              score: row[0],
            })
          } else return;
        } else return;
        //console.log(`Code: ${row[0]}, ID: ${row[1]}`);
      })
    } else {
      console.log('No data found.');
    }
  });
}

async function checkRegForms(auth) {
  const verifiedRoleId = '759397768497332246'
  const artId = '767219611958509578'
  const techId = '767219721262071819'
  const hikeId = '767219758256881684'
  const photoId = '767219882092658688'
  const cookId = '767219922173689877'
  const fishId = '767220040533409812'
  const nailId = '767220092546318397'
  const randomId = '767220143063302144'
  //ROLE IDS ^ (DON'T CHANGE)

  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1WDOiqUG_mc8L-V4FgVerHBn2ramsNyenORt8oB3vjyg',
    range: 'B2:F',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if(!rows) return;
    if (rows.length) {
      rows.map(async(row) => {

        const result = await userSchema.findOne({
          regCode: row[0].replace(' ', '')
        }).catch(e => false)

        if(result) {
          const { userId, sentConfMsg } = result
          if(sentConfMsg == false) {
            const messageUser = client.users.cache.get(userId)
            messageUser.send(`Thanks for registering! Your group/section roles along with your bunk number will automatically be assigned to you.`)

            await userSchema.updateOne({
              regCode: row[0].replace(' ', ''),
            },{
              sentConfMsg: true,
              registered: true,
            })

            const campfire = client.guilds.cache.get('759385366531932160')
            const newuser = client.users.cache.get(userId)
            if(!campfire.member(newuser)) return;

            await campfire.member(newuser).roles.add(verifiedRoleId)

            if(row[4].includes('Art Barn')) {
              await campfire.member(newuser).roles.add(artId)
            }
            if(row[4].includes('Tech Desk')) {
              await campfire.member(newuser).roles.add(techId)
            }
            if(row[4].includes('Hiking Hill')) {
              await campfire.member(newuser).roles.add(hikeId)
            }
            if(row[4].includes('Photography')) {
              await campfire.member(newuser).roles.add(photoId)
            }
            if(row[4].includes('Camp Kitchen')) {
              await campfire.member(newuser).roles.add(cookId)
            }
            if(row[4].includes('Fishing Pond')) {
              await campfire.member(newuser).roles.add(fishId)
            }
            if(row[4].includes('Tough as Nails')) {
              await campfire.member(newuser).roles.add(nailId)
            }
            if(row[4].includes('Other Events')) {
              await campfire.member(newuser).roles.add(randomId)
            }

          } else return;
        } else return;
      })
    } else {
      console.log('No data found.');
    }
  });
}

async function covidUpdate() {
  const url = 'https://api.covidtracking.com/v1/us/daily.json'

  const {data} = await axios.get(url)

  let stats1 = data[0].positive.toString()
  let stats2 = stats1.split('')
  let length1 = (stats2.length - 3)
  let stats3 = stats2.splice(length1, 0, ',')
  let length2 = (stats2.length - 7)
  let stats4 = stats2.splice(length2, 0, ',')
  let stats5 = stats2.join('')

  const server = client.guilds.cache.get('759385366531932160')
  const covidchannel = server.channels.cache.get('768581726682611762')

  covidchannel.edit({ name: `${stats5} million` })
}

setInterval(covidUpdate, 900000)