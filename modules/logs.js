/**
 * @author Luna Nekomimi
 * @description
 * 		les logs pour savoir tout ce qu'on fait sur le serveur
 *
 */


/*      IMPORTS      */
const { getSetupData } = require("../utils/enmapUtils");
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

async function banLogs(guildBan , client){

    const LOGS_ID = await getSetupData(guildBan.guild.id, "logs")
    if(LOGS_ID == undefined || LOGS_ID == null) return;
    const logsChannel = await client.channels.cache.find(channel => channel.id === LOGS_ID)
    const logsBanEmbed = new EmbedBuilder()
    .setColor(0xFF0000)
    .setAuthor({ name: guildBan.user.tag, iconURL: guildBan.user.avatarURL() })
    .setDescription( `${guildBan.user.tag} a été banni de Neko Paradise`)
    .setTimestamp()
    .addFields({name: "Date :", value: `<t:${Date.now().toString().slice(0,-3)}:R>` });

    guildBan = await guildBan.fetch({force: true})
    if(guildBan.reason != undefined){
        logsBanEmbed.addFields({name: 'Raison :', value: guildBan.reason })
    }

    logsChannel.send({ embeds: [logsBanEmbed] })

}

async function kickLogs(member, client){
    if(await member.guild.bans.fetch(member.id)) return;

    const LOGS_ID = await getSetupData(member.guild.id, "logs")
    if(LOGS_ID == undefined || LOGS_ID == null) return;
    const logsChannel = await client.channels.cache.find(channel => channel.id === LOGS_ID)
   
    const logsKickEmbed = new EmbedBuilder()
    .setColor(0xFF0000)
    .setAuthor({ name: member.user.tag, iconURL: member.user.avatarURL() })
    .setDescription( `${member.user.tag} a quitté Neko Paradise`)
    .setTimestamp()
    .addFields({name: "Date :", value: `<t:${Date.now().toString().slice(0,-3)}:R>` });


    logsChannel.send({ embeds: [logsKickEmbed] })

    // fichier userLeaves 
    const path = process.cwd() + "/files/userLeaves.log"
    const memberLine = `${member.id} - ${new Date()} (${Date.now()})\n`;
    const startingFile =
    "╭――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――╮\n" +
    "|   ID MEMBER      |                   DATE                                            (timestamp)   |\n" +
    "╰――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――╯\n\n";
    var fs = require('fs');

    if (fs.existsSync(path)) {
        fs.appendFile(process.cwd() + "/files/userLeaves.log", `${memberLine}\n`, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
    
    }else {
        fs.appendFile(process.cwd() + "/files/userLeaves.log", `${startingFile}\n${memberLine}`, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file has been created!");
        }); 
    }
   
}

async function timeoutLogs(oldMember, newMember, client){

    const LOGS_ID = await getSetupData(oldMember.guild.id, "logs")
    if(LOGS_ID == undefined || LOGS_ID == null) return;
    const logsChannel = await client.channels.cache.find(channel => channel.id === LOGS_ID)

   

    if (oldMember.communicationDisabledUntilTimestamp != newMember.communicationDisabledUntilTimestamp || (newMember.communicationDisabledUntilTimestamp ?? Infinity) < Date.now()) {
        let auditLogs = await oldMember.guild.fetchAuditLogs({
            limit: 5,
            type: 24, // MEMBER_UPDATE
        });
        let timeoutFirst = auditLogs.entries.first();
        
        if (newMember.communicationDisabledUntilTimestamp != null && newMember.communicationDisabledUntilTimestamp > Date.now()) {  //si le membre est mute
            const logsTimeoutEmbed = new EmbedBuilder()
            .setColor(0xAD0182)
            .setAuthor({ name: oldMember.user.tag, iconURL: oldMember.user.avatarURL() })
            .setDescription( `${newMember.user.tag} a été mute de Neko Paradise (cheh)`)
            .setTimestamp()
            .addFields({name: "Date :", value: `<t:${Date.now().toString().slice(0,-3)}:R>` }, 
                {name: "jusqu'au :", value: `<t:${newMember.communicationDisabledUntilTimestamp.toString().slice(0,-3)}:f>
                 <t:${newMember.communicationDisabledUntilTimestamp.toString().slice(0,-3)}:R>` });
                if (timeoutFirst.reason){
                    logsTimeoutEmbed.addFields(
                        {name : "Raison :", value : `${timeoutFirst.reason}\n`}
                    );
                }    
            logsChannel.send({ embeds: [logsTimeoutEmbed] })
        
        } else if (oldMember.communicationDisabledUntilTimestamp != null && newMember.communicationDisabledUntilTimestamp == null) {  //si le membre est unmute
            const logsTimeoutEmbed = new EmbedBuilder()
            .setColor(0x01AD2C)
            .setAuthor({ name: oldMember.user.tag, iconURL: oldMember.user.avatarURL() })
            .setDescription( `${newMember.user.tag} a été démute de Neko Paradise le \n<t:${Date.now().toString().slice(0,-3)}:f> <t:${Date.now().toString().slice(0,-3)}:R>`)

            logsChannel.send({ embeds: [logsTimeoutEmbed] })

        }
    }
    


}

async function newMemberLogs(member, client){

    const LOGS_ID = await getSetupData(member.guild.id, "logs")
    if(LOGS_ID == undefined || LOGS_ID == null) return;
    const logsChannel = await client.channels.cache.find(channel => channel.id === LOGS_ID)
   
    const logsNewMemberEmbed = new EmbedBuilder()
    .setColor(0x00FF00)
    .setAuthor({ name: member.user.tag, iconURL: member.user.avatarURL() })
    .setDescription( `${member.user.tag} a rejoint Neko Paradise`)
    .setTimestamp()
    .addFields({name: "Date :", value: `<t:${Date.now().toString().slice(0,-3)}:R>` });


    logsChannel.send({ embeds: [logsNewMemberEmbed] })

    // fichier userEntries 
    const path = process.cwd() + "/files/userEntries.log"
    const memberLine = `${member.id} - ${new Date()} (${Date.now()})\n`;
    const startingFile =
    "╭――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――╮\n" +
    "|   ID MEMBER      |                   DATE                                            (timestamp)   |\n" +
    "╰――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――╯\n\n";
    var fs = require('fs');

    if (fs.existsSync(path)) {
        fs.appendFile(process.cwd() + "/files/userEntries.log", `${memberLine}\n`, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
    
    }else {
        fs.appendFile(process.cwd() + "/files/userEntries.log", `${startingFile}\n${memberLine}`, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file has been created!");
        }); 
    }
   
}


module.exports ={
    banLogs,
    kickLogs,
    newMemberLogs,
    timeoutLogs,
}