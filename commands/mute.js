const Discord = require('discord.js');

exports.run = async(client, message, args) => {
    const accessdenied = new Discord.MessageEmbed()
    .setTitle('Error')
    .setColor('#FF1654')
    .setDescription('You do not have the required permissions to execute this command, \`manage_roles\`')
    
    const nouser = new Discord.MessageEmbed()
    .setTitle("Error")
    .setColor('#FF1654')
    .setDescription('Please specify a user to mute')
    
    const cantmutemod = new Discord.MessageEmbed()
    .setTitle('Error')
    .setColor('#FF1654')
    .setDescription('You cannot mute this user, because they are a moderator')

    const needrole = new Discord.MessageEmbed()
    .setTitle('Error')
    .setColor('#09fff2')
    .setDescription('A role named **Muted** is required to run this command')

    if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(accessdenied);

    var user = message.mentions.users.first();
    if(!user) return message.channel.send(nouser);

    if(user.id === message.author.id) return message.channel.send('This command isn\'t broken, but why would you want to mute yourself?')

    var member;
    
    try {
        member = await message.guild.members.fetch(user);
    } catch (err) {
        member = null
    }

    if(message.member.roles.highest.position ==  message.guild.member(user.id).roles.highest.position || message.member.roles.highest.position < message.guild.member(user.id).roles.highest.position) {
    
    var cannotmute = new Discord.MessageEmbed()
    .setTitle('Error')
    .setColor('#FF1654')
    .setDescription('You cannot mute this user because your highest role is either the same or lower as them')

    message.channel.send(cannotmute)
    return;
  }
          
    if(member) {
        if(member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(cantmutemod))
    }

    var reason = args.splice(1).join(' ');
    if(!reason) {
        var reason = 'Unspecified'
    }

    var role = message.guild.roles.cache.find(r => r.name === 'Muted');

    if(!role) return message.channel.send(needrole)
    member.roles.add(role);

    var date = new Date();
    date = date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear();

    const mutemsg = new Discord.MessageEmbed()
    .setDescription(`<a:ok:767131603851804672> Successfully warned **${user.username}**`)
    .setColor('#4BCC85');

    const mutemsgdm = new Discord.MessageEmbed()
    .setColor('#09fff2')
    .addField('Date', date)
    .addField('Reason', reason)
    .addField('Duration', 'permanent')
    .addField('Problem?', 'Please report any false or abusive punishments to our Camp Superintendent.',false)
    .setTimestamp();

    try {
      member.send(mutemsgdm)
    } catch(err) {
    }

    message.channel.send(mutemsg);

}
