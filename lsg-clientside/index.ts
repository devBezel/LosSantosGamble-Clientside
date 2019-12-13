import * as alt from 'alt';
import * as game from 'natives';

game.freezeEntityPosition(alt.Player.local.scriptID, false);
game.setPedDefaultComponentVariation(alt.Player.local.scriptID);

// tslint:disable-next-line:import-name
import LSG from 'client/modules/init';

const init = async() => {
	await LSG();
};

init();
