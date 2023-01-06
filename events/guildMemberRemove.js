/**
 * @author Luna Nekomimi
 * @description
 *      This event is used to track member who is kick.
 */


const { GuildMember } = require( "discord.js" );
const { kickLogs } = require("../modules/logs");


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Function called when the event 'guildMemberRemove' is emitted.
 * @param {GuildMember} member The new member object.
 */
async function execute( member, client ) {
	kickLogs(member, client)
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "guildMemberRemove",
	execute
}