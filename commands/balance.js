const db = require("quick.db");

exports.run = async(client, message, args) => { 
  if(message.author.bot) return;
  if (!db.get(`${message.author.id}_money`)) return message.channel.send("You don't have an account yet! To make one say **$start**!")
    message.channel.send({
        "embed": {
          "title": ":bank: Bank Details",
          "description": `**Balance: ${db.get(`${message.author.id}_money`)}**`,
          "color": 16127
        }
      })


}