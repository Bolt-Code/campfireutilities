const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has('768865009920376853')) {
    return message.channel.send(`Permission Missing...`)
  }

  var info = {
    channel: null,
    what: null,
    winners: 1,
    time: null
  }

  var e = new Discord.MessageEmbed()
  e.setDescription(`What channel do you want to start the giveaway?`)
  e.setColor(client.defaultColor)

  await message.channel.send(e)
  message.channel.awaitMessages(m => m.author.id === message.author.id, {
    max: 1,
    time: 10000,
    errors: ['time']
  }).then(async (c) => {
    var m = c.first()
    var channel = m.content.split(' ')[0].replace('#', '').replace('<', '').replace('>', '')
    var c = message.guild.channels.cache.get(channel)

    if (!c) {
      message.channel.send(client.embed.error(`Invalid channel. Please use command again!`))
      return
    }

    info.channel = channel

    var e = new Discord.MessageEmbed()
    e.setDescription(`What are you giving away?`)
    e.setColor(client.defaultColor)

    await message.channel.send(e)
    message.channel.awaitMessages(m => m.author.id === message.author.id, {
      max: 1,
      time: 10000,
      errors: ['time']
    }).then(async (c) => {
      var m = c.first()
      info.what = m.content

      var e = new Discord.MessageEmbed()
      e.setDescription(`How many winners?`)
      e.setColor(client.defaultColor)

      await message.channel.send(e)
      message.channel.awaitMessages(m => m.author.id === message.author.id, {
        max: 1,
        time: 10000,
        errors: ['time']
      }).then(async (c) => {
        var m = c.first()
        var int = parseInt(m.content.split(' ')[0])
        if (isNaN(int)) {
          message.channel.send(client.embed.error(`Invalid int, please use the command again.`))
          return
        }

        info.winners = int

        var e = new Discord.MessageEmbed()
        e.setDescription(`When does it end? (example 1s, 2m, 2h, 9h, 10d)`)
        e.setColor(client.defaultColor)

        await message.channel.send(e)
        message.channel.awaitMessages(m => m.author.id === message.author.id, {
          max: 1,
          time: 20000,
          errors: ['time']
        }).then(async (c) => {
          var m = c.first()
          var t = m.content.split(' ')[0]

          if (t.endsWith(`s`)) {
            t = parseInt(t.replace('s', '')) * 1000
          } else if (t.endsWith(`m`)) {
            t = parseInt(t.replace('s', '')) * 60000
          } else if (t.endsWith('h')) {
            t = parseInt(t.replace('s', '')) * 3.6e+6
          } else if (t.endsWith('d')) {
            t = parseInt(t.replace('s', '')) * 8.64e+7
          }

          if (isNaN(t) || typeof t != 'number') {
            message.channel.send(`Invalid time. Please use the command again`)
            return
          }

          if(t < 300000){
            return message.channel.send(`You cannot make a giveaway less than 5 minutes. Make the prize a drop instead.`)
          }

          endsAt = new Date().getTime() + t

          client.giveawaysManager.start(client.channels.cache.get(info.channel), {
            time: t,
            prize: info.what,
            winnerCount: info.winners,
            hostedBy: `<@${message.author.id}>`,
            messages: {
              giveaway: "🎉 **GIVEAWAY** 🎉",
              giveawayEnded: "🕑 **GIVEAWAY ENDED** 🕑",
              timeRemaining: "Time remaining: **{duration}**!",
              inviteToParticipate: "React with 🎉 to join!",
              winMessage: "Congratulations, {winners}! You won the **{prize}** giveaway!",
              embedFooter: "Giveaways",
              noWinner: "Giveaway cancelled, no valid participations.",
              hostedBy: "Hosted by: {user}",
              winners: "winner(s)",
              endedAt: "Ended at",
              units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false
              }
            }
          }).then((gData) => {
            // console.log(gData)
          })
        })

      })
        .catch((err) => {
          message.channel.send(`You were too slow, please use the command again.`)
        })
    })
      .catch((err) => {
        message.channel.send(`You were too slow, please use the command again.`)
      })

  })
    .catch((err) => {
      message.channel.send(`You were too slow, please use the command again.`)
    })
}