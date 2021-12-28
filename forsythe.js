const { Client, MessageEmbed, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const { readdir } = require("fs");
const config = require("./config.json");
const db = require("quick.db");
const moment = require('moment');
const ms = require("ms");
require("moment-duration-format");
const buttons = require('discord-buttons');
buttons(client)
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();
client.cooldown = new Map();
client.commandblocked = [];



require("./src/helpers/function")(client);

readdir("./src/commands/", (err, files) => {
    if (err) console.error(err)
    files.forEach(f => {
        readdir("./src/commands/" + f, (err2, files2) => {
            if (err2) console.log(err2)
            files2.forEach(file => {
                let prop = require(`./src/commands/${f}/` + file);
                console.log(`[FORSYTHE-COMMAND] ${prop.name} yüklendi!`);
                commands.set(prop.name, prop);
                prop.aliases.forEach(alias => {
                    aliases.set(alias, prop.name);
                });
            });
        });
    });
});

readdir("./src/events", (err, files) => {
    if (err) return console.error(err);
    files.filter((file) => file.endsWith(".js")).forEach((file) => {
        let prop = require(`./src/events/${file}`);
        if (!prop.conf) return;
        client.on(prop.conf.name, prop)
        console.log(`[FORSYTHE-EVENT] ${prop.conf.name} yüklendi!`);
    });
});

client.on("message", async message => {
    if (message.content === "!buton-rol" && message.author.id === config.bot.owner) {
        const Giveaway = new buttons.MessageButton()
            .setStyle("green")
            .setLabel("🎁 Çekiliş Katılımcısı")
            .setID("Giveaway");
        const Activity = new buttons.MessageButton()
            .setStyle("green")
            .setLabel("🎉 Etkinlik Katılımcısı")
            .setID("Activity");

        message.channel.send(`Merhaba!
 
Çekiliş Katılımcısı Alarak **Nitro, Spotify, Netflix, Tasarım ve Benzeri Çekilişlere Katılıp Ödül Sahibi** Olabilirsiniz.

Etkinlik Katılımcısı Alarak **Konserlerimizden, Oyunlarımızdan ve Etkinliklerimizden** Faydalanabilirsiniz.

\`NOT:\` Bu sunucumuzda everyone here atılmayacağından dolayı rollerinizi almayı unutmayın.
`,
            {
                buttons: [Giveaway, Activity]
            });
    }

    if (message.content === "!buton-bilgi" && message.author.id === config.bot.owner) {

        const one = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("I")
            .setID("one");

        const two = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("II")
            .setID("two");

        const three = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("III")
            .setID("three");

        const four = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("IV")
            .setID("four");

        const five = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("V")
            .setID("five");
        message.channel.send("**Merhaba!** \n\n Aşşağıdaki butonlarla etkileşime girerek **sunucumuzdaki durumunuz hakkında bilgi edinebilirsiniz.** \n\n **1 -** `Sunucumuza daha önceden hangi isimlerle kayıt olduğunuzu kontrol edersiniz.` \n **2 -** `Sunucumuza daha önceden kayıt olup olmadığınızı kontrol edersiniz.` \n **3 -** `Sunucumuzda daha önceden ceza alıp almadığınızı kontrol edersiniz.` \n **4 -** `Sunucumuzdaki rollerinizi kontrol edersiniz.` \n **5 -** `Sunucumuza ne zaman katıldığınızı kontrol edersiniz.`", { buttons: [one, two, three, four, five] })
    }
});

client.login(config.token).then(x => console.log(`Bot ${client.user.username} olarak giriş yaptı!`)).catch(err => console.log(`Bot Giriş yapamadı sebep: ${err}`));

client.on('message', async message => {
if (message.content === 'matthe!fakekatıl') { 
  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});

//-----------------------TAG-ROL----------------------\\

//TAG ALANA ROL
//TAG ALANA ROL
client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    const tag = ["২" , "ᶠᵒʳˢʸᵗʰᵉ"]; //Tagınızı Koyun
    const sunucu = "903269313904017479"; //Sunucu İD
    const kanal = "903269313904017482"; //Log Kanal İD
    const rol = "903271286669738045"; //Rol İd

    try {
      if (
        newUser.username.includes(tag) &&
        !client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(rol)
      ) {
        await client.channels.cache
          .get(kanal)
          .send(
            new MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`
              )
          );
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.add(rol);
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .send(
            `Selam ${
              newUser.username
            }, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${
              client.guilds.cache.get(sunucu).roles.cache.get(rol).name
            } Rolünü Sana Verdim!`
          );
      }
      if (
        !newUser.username.includes(tag) &&
        client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(rol)
      ) {
        await client.channels.cache
          .get(kanal)
          .send(
            new MessageEmbed()
              .setColor("RED")
              .setDescription(
                `${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım!`
              )
          );
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(rol);
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .send(
            `Selam **${
              newUser.username
            }**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${
              client.guilds.cache.get(sunucu).roles.cache.get(rol).name
            } Rolünü Senden Aldım!`
          );
      }
    } catch (e) {
      console.log(`Bir hata oluştu! ${e}`);
    }
  }
});
//-----------------------TAG-KONTROL----------------------\\
//-----------------------TAG-KONTROL----------------------\\