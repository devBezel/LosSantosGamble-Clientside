import * as alt from 'alt';
import Login from './Core/Player/Login';
import Description from './Core/Player/Scripts/Description';

export default async () => {
	 await Login();
	 await Description();
};
