import * as alt from 'alt';
import Login from './Core/Player/Login';
import DescriptionScript from './Core/Player/Scripts/DescriptionScript';
import ScaleformScript from './Core/Player/Scripts/ScaleformScript';
import ClothesScript from './Core/Player/Scripts/ClothesScript';
import Notification from './Core/Notify/Notification';
import PlayerExtenstion from './Extenstion/PlayerExtenstion';
import VehicleScript from './Core/Vehicle/VehicleScript';
import BlipScript from './Core/Map/BlipScript';
import MarkerScript from './Core/Map/MarkerScript';
import AtmScript from './Economy/Bank/AtmScript';
import BusScript from './Core/Bus/BusScript';
import BwScript from './Core/Player/Scripts/BwScript';
import VehicleDamage from './Core/Vehicle/VehicleDamage';
import VehicleInteraction from './Core/Vehicle/VehicleInteraction';
import PlayerDamageScript from './Core/Player/Scripts/PlayerDamageScript';
import PlayerInteraction from './Core/Player/Scripts/PlayerInteraction';
import VehicleSpeedometr from './Core/Vehicle/VehicleSpeedometr';
import StreetLabel from './Core/Player/Scripts/StreetLabel';
import VersionScript from './Core/Version/VersionScript';

export default async () => {
	 await Login();
	 await StreetLabel();
	 await DescriptionScript();
	 await ScaleformScript();
	 await ClothesScript();
	 await Notification();
	 await PlayerExtenstion();
	 await VehicleScript();
	 await BlipScript();
	 await MarkerScript();
	 await AtmScript();
	 await BusScript();
	 await BwScript();
	 await VehicleDamage();
	 await VehicleInteraction();
	 await PlayerDamageScript();
	 await PlayerInteraction();
	 await VehicleSpeedometr();
	 await VersionScript();


	 alt.requestIpl('gr_heist_yacht2');
	 alt.requestIpl('gr_heist_yacht2_bar');
	 alt.requestIpl('gr_heist_yacht2_bedrm');
	 alt.requestIpl('gr_heist_yacht2_bridge');
	 alt.requestIpl('gr_heist_yacht2_enginrm');
	 alt.requestIpl('gr_heist_yacht2_lounge');
};
