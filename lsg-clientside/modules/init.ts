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
import StreetLabel from './Core/Player/Scripts/StreetLabel';
import VersionScript from './Core/Version/VersionScript';
import ItemWeaponScript from './Core/Items/ItemWeaponScript';
import InventoryScript from './Core/Items/InventoryScript';
import ItemWeaponHolsterScript from './Core/Items/ItemWeaponHolsterScript';
import ItemMaskScript from './Core/Items/ItemMaskScript';
import ItemClothesScript from './Core/Items/ItemClothesScript';
import AdminBasePanel from './Core/Entities/Admin/AdminBasePanel';
import BuildingScript from './Core/Entities/Building/BuildingScript';
import InteractionScript from './Core/Interaction/InteractionScript';
import VoiceChatScript from './Core/VoiceChat/VoiceChatScript';
import HudScript from './Core/Player/Scripts/Hud/HudScript';
import HungerThirstyScript from './Core/Player/Scripts/HungerThirstyScript';
import ShopScript from './Core/Entities/Shop/ShopScript';
import VehicleTrunkScript from './Core/Vehicle/VehicleTrunkScript';
import Interaction2DScript from './Core/Interaction/Interaction2DScript';
import TextDrawScript from './Core/Map/TextDrawScript';
import GroupScript from './Economy/Group/GroupScript';
import ItemObjectScript from './Core/Items/ItemObjectScript';
import ObjectStreamer from './Streamers/ObjectSteamer/ObjectStreamer';
import ObjectStreamerScript from './Streamers/ObjectSteamer/ObjectStreamerScript';
import AfkScript from './Core/Player/Scripts/AfkScript';
import ScoreboardScript from './Core/Scoreboard/ScoreboardScript';
import VehicleSpeedometr from './Core/Vehicle/vehicle-speedometr/VehicleSpeedometr';
import NativeWrapperScript from './Wrappers/NativeWrapperScript';
import OfferScript from './Economy/Offers/OfferScript';
import { View, viewerShutdown } from './Core/Utilities/View';
import JobScript from './Core/Jobs/JobScript';
import CourierJobScript from './Core/Jobs/Base/CourierJobScript';
import JobCenterScript from './Core/Jobs/JobCenterScript';
import ItemSmartphoneScript from './Core/Items/ItemSmartphoneScript';


export default async () => {
	 await Login();
	 await HudScript();
	 await VoiceChatScript();
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
	 await ItemWeaponScript();
	 await ItemWeaponHolsterScript();
	 await InventoryScript();
	 await ItemMaskScript();
	 await ItemClothesScript();
	 await AdminBasePanel();
	 await BuildingScript();
	 await InteractionScript();
	 await HungerThirstyScript();
	 await ShopScript();
	 await VehicleTrunkScript();
	 await Interaction2DScript();
	 await TextDrawScript();
	 await GroupScript();
	 await ItemObjectScript();
	 await ObjectStreamer();
	 await ObjectStreamerScript();
	 await AfkScript();
	 await NativeWrapperScript();
	 await ScoreboardScript();
	 await OfferScript();
	 await viewerShutdown;
	 await JobScript();
	 await CourierJobScript();
	 await JobCenterScript();
	 await ItemSmartphoneScript();

	 alt.requestIpl('gr_heist_yacht2');
	 alt.requestIpl('gr_heist_yacht2_bar');
	 alt.requestIpl('gr_heist_yacht2_bedrm');
	 alt.requestIpl('gr_heist_yacht2_bridge');
	 alt.requestIpl('gr_heist_yacht2_enginrm');
	 alt.requestIpl('gr_heist_yacht2_lounge');
	 alt.requestIpl('lsg_house_entrance');
};
