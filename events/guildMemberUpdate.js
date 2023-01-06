/**
 * @author Luna Nekomimi
 * @description
 *      Pour voir qui est mute (olala une bétise). 
 */

const { timeoutLogs } = require("../modules/logs")




/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Function called when the event 'guildBanAdd' is emitted.
 * @param oldMember Le membre avant
 * @param newMember Le membre après
 * @param client Le bot !!!!!!!!!!!!!!!!
 */
async function execute( oldMember, newMember, client ) { 
	timeoutLogs(oldMember, newMember, client)
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "guildMemberUpdate",
	execute
}