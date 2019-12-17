import * as alt from 'alt';
import Login from './Core/Player/Login';
import DescriptionScript from './Core/Player/Scripts/DescriptionScript';
import ScaleformScript from './Core/Player/Scripts/ScaleformScript';
import CharacterCreatorScript from './Core/Player/Scripts/CharacterCreatorScript';

export default async () => {
	 await Login();
	 await DescriptionScript();
	 await ScaleformScript();
	 await CharacterCreatorScript();


	 alt.requestIpl('gr_heist_yacht2');
	 alt.requestIpl('gr_heist_yacht2_bar');
	 alt.requestIpl('gr_heist_yacht2_bedrm');
	 alt.requestIpl('gr_heist_yacht2_bridge');
	 alt.requestIpl('gr_heist_yacht2_enginrm');
	 alt.requestIpl('gr_heist_yacht2_lounge');
};
