/**
 * @author Luna Nekomimi
 * @description
 *      Traquer un gibier banni. 
 */

const { banLogs } = require("../modules/logs")
// const { banCommand } = require("../Commands/other/ban.js")





/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Function called when the event 'guildBanAdd' is emitted.
 * @param guildBan Le serveur auquel la personne est ban
 * @param client La personne bannis
 */
async function execute( guildBan, client ) { 
	banLogs(guildBan, client)
	// banCommand(guildBan, client)

}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "guildBanAdd",
	execute
}