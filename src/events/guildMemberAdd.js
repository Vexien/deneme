const db = require("quick.db");
const config = require("../../config.json");
const moment = require("moment");
const client = global.client;
moment.locale("tr");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js")



///----------------------- HOŞGELDİN MESAJI KISMI -----------------------\\\\  
const invites = {};
const wait = require("util").promisify(setTimeout);
client.on("ready", () => {
  wait(1000);
  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});



client.on("guildMemberAdd", member => {
    
    if (member.user.bot) return;

    member.guild.fetchInvites().then(async guildInvites => {
      const ei = invites[member.guild.id];
  
      invites[member.guild.id] = guildInvites;
  
      const invite = await guildInvites.find(
        i => (ei.get(i.code) == null ? i.uses - 1 : ei.get(i.code).uses) < i.uses
      );
  
      const daveteden = member.guild.members.cache.get(invite.inviter.id);
  
      db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
  
      db.set(`bunudavet_${member.id}`, invite.inviter.id);
  
      let davetsayiv2 = await db.fetch(
        `davet_${invite.inviter.id}_${member.guild.id}`
      );
  
      let davetsayi;
  
      if (!davetsayiv2) davetsayi = 0;
      else
        davetsayi = await db.fetch(
          `davet_${invite.inviter.id}_${member.guild.id}`
        );
    let date = moment(member.user.createdAt)
       const startedAt = Date.parse(date);
       var msecs = Math.abs(new Date() - startedAt);
         
       const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
       msecs -= years * 1000 * 60 * 60 * 24 * 365;
       const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
       msecs -= months * 1000 * 60 * 60 * 24 * 30;
       const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
       msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
       const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
       msecs -= days * 1000 * 60 * 60 * 24;
       const hours = Math.floor(msecs / (1000 * 60 * 60));
       msecs -= hours * 1000 * 60 * 60;
       const mins = Math.floor((msecs / (1000 * 60)));
       msecs -= mins * 1000 * 60;
       const secs = Math.floor(msecs / 1000);
       msecs -= secs * 1000;
         
       var string = "";
       if (years > 0) string += `${years} yıl ${months} ay`
       else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
       else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
       else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
       else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
       else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
       else if (secs > 0) string += `${secs} saniye`
           
         
       string = string.trim();
   
       let guild = member.client.guilds.cache.get("758571120156213258")
       let log = guild.channels.cache.get("924347118527868978");
       let endAt = member.user.createdAt
       let gün = moment(new Date(endAt).toISOString()).format('DD')
       let ay = moment(new Date(endAt).toISOString()).format('MM').replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
       let yıl = moment(new Date(endAt).toISOString()).format('YYYY')
       let saat = moment(new Date(endAt).toISOString()).format('HH:mm')
       let kuruluş = `${gün} ${ay} ${yıl} ${saat}`;
 member.roles.add(config.registration.unregistered);
        member.roles.add(config.registration.unregistered);
        member.setNickname(config.registration.autonickname);       
log.send(`
:tada: ${member} Sunucumuza hoş geldin! 
   
Hesabın **${kuruluş} (${string})** önce oluşturulmuş.

Sunucumuza Kayıt Olmak İçin Soldaki **Confarmation** Odalarına Geçmeniz Yeterli.
<@&924347092657377332> rolündeki yetkililerimiz seninle ilgilenecektir. 

Sunucu kurallarımız <#924347122709586041> kanalında yazıyor okumayı unutma!
   
Seninle birlikte **${member.guild.memberCount}** üyeye ulaştık!
**Davet eden:** ${daveteden} \`${davetsayi}.\` davetini gerçekleştirdi.`)
})});
client.on("guildMemberRemove", async member => {
    let davetçi = await db.fetch(`bunudavet_${member.id}`);
  
    const daveteden = member.guild.members.cache.get(davetçi);
  
    db.add(`davet_${davetçi}_${member.guild.id}`, -1);
  })
    


////----------------------- HOŞGELDİN MESAJI KISMI -----------------------\\\\ 