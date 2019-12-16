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
};
