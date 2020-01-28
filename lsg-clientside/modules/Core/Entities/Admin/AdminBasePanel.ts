import * as alt from 'alt';
import * as game from 'natives';
import * as nativeUI from '../../../Includes/nativeui/NativeUi';
import { Key } from 'client/modules/Constant/Keys/Key';
import { RankParser } from '../../Helpers/RankParser';
import { NativeExtenstion } from 'client/modules/Extenstion/NativeExtenstion';

export default async () => {


    alt.onServer('admin:openBasePanel', openBasePanelWindow);

    async function openBasePanelWindow() {
        menu.Open();
    }


    const menu = new nativeUI.Menu('ADMIN PANEL', 'Opcje główne', new nativeUI.Point(50, 50));
    // menu.AddItem(new nativeUI.UIMenuItem(`Administrator: ${alt.Player.local.accountData().username}`));
    // menu.AddItem(new nativeUI.UIMenuItem(`Ranga: ${RankParser.parse(alt.Player.local.accountData().rank)}`));
    // menu.AddItem(new nativeUI.UIMenuItem('____________________'));

    const menuPlayers = new nativeUI.Menu('Gracze', `Ilość graczy: ${alt.Player.all.length}`, new nativeUI.Point(50, 50));
    const menuPlayersItem = new nativeUI.UIMenuItem('Gracze', '');
    menu.AddSubMenu(menuPlayers, menuPlayersItem);

    menu.ItemSelect.on((selectedItem: nativeUI.UIMenuItem) => {
        if (selectedItem instanceof nativeUI.UIMenuItem) {
            alt.Player.all.forEach((player: alt.Player) => {
                const serverID = player.getSyncedMeta('account:id');
                const accountData = player.getSyncedMeta('account:dataAccount');
                const characterData = player.getSyncedMeta('character:dataCharacter');

                menuPlayers.Clear();

                const playerItem = new nativeUI.UIMenuItem(`[${serverID}]${characterData.name} ${characterData.surname} (${RankParser.parse(accountData.rank)})`, 'Gracz', player);
                menuPlayers.AddItem(playerItem);
            });
        }
    });

    menuPlayers.ItemSelect.on((selectedItem: nativeUI.UIMenuItem) => {
        if (selectedItem instanceof nativeUI.UIMenuItem) {
            if (selectedItem.Data instanceof alt.Player) {
                characterMenu(selectedItem, selectedItem.Data);
            }
        }
    });


    const menuPlayerOptions = new nativeUI.Menu('OPCJE', 'Wybierz interesującą Cię opcje', new nativeUI.Point(50, 50));
    async function characterMenu(selectedItem: nativeUI.UIMenuItem, player: alt.Player) {
        menuPlayerOptions.Clear();
        menuPlayers.AddSubMenu(menuPlayerOptions, selectedItem);

        menuPlayerOptions.AddItem(new nativeUI.UIMenuItem('Informacje gracza', '', { action: 'player_information', entity: player }));
        menuPlayerOptions.AddItem(new nativeUI.UIMenuItem('Teleporuj gracza', '', { action: 'player_teleport_to_admin', entity: player }));
        menuPlayerOptions.AddItem(new nativeUI.UIMenuItem('Teleporuj do gracza', '', { action: 'admin_teleport_to_player', entity: player }));
        menuPlayerOptions.AddItem(new nativeUI.UIMenuItem('Utwórz item', '', { action: 'create_item', entity: player }));
    }

    menuPlayerOptions.ItemSelect.on((selectedItem: nativeUI.UIMenuItem) => {
        if (selectedItem instanceof nativeUI.UIMenuItem) {
            if (selectedItem.Data.entity instanceof alt.Player) {
                switch (selectedItem.Data.action) {
                    case 'player_information':
                        characterInformation(selectedItem, selectedItem.Data.entity);
                        break;
                    case 'player_teleport_to_admin':
                        playerTeleportToAdmin(selectedItem.Data.entity);
                        break;
                    case 'admin_teleport_to_player':
                        adminTeleportToPlayer(selectedItem.Data.entity);
                        break;
                    case 'create_item':
                        createItemForPlayer(selectedItem, selectedItem.Data.entity);
                    default:
                        break;
                }
            }
        }
    });


    async function characterInformation(selectedItem: nativeUI.UIMenuItem, player: alt.Player) {
        const accountData = player.getSyncedMeta('account:dataAccount');
        const characterData = player.getSyncedMeta('character:dataCharacter');
        const serverID = player.getSyncedMeta('account:id');
        const hasPremium = player.getSyncedMeta('account:hasPremium');

        const characterInformationMenu = new nativeUI.Menu(`${characterData.name} ${characterData.surname}`, 'Informacje', new nativeUI.Point(50, 50));
        menuPlayerOptions.AddSubMenu(characterInformationMenu, selectedItem);

        characterInformationMenu.AddItem(new nativeUI.UIMenuItem(`ID: ${serverID}`));
        characterInformationMenu.AddItem(new nativeUI.UIMenuItem(`CID: ${characterData.id}`));
        characterInformationMenu.AddItem(new nativeUI.UIMenuItem(`UID: ${accountData.id}`));
        characterInformationMenu.AddItem(new nativeUI.UIMenuItem(`Konto: ${accountData.username}`));
        characterInformationMenu.AddItem(new nativeUI.UIMenuItem(`Premium: ${hasPremium ? '~g~Tak' : '~r~Nie'}`));
        characterInformationMenu.AddItem(new nativeUI.UIMenuItem('________________'));

        characterInformationMenu.AddItem(new nativeUI.UIMenuItem(`Płeć: ${characterData.gender  ? 'Kobieta' : 'Mężczyzna'}`, 'Płeć gracza'));
        characterInformationMenu.AddItem(new nativeUI.UIMenuItem(`Wiek: ${characterData.age} lat`));
        characterInformationMenu.AddItem(new nativeUI.UIMenuItem(`Gotówka: ${characterData.money}$`));
        characterInformationMenu.AddItem(new nativeUI.UIMenuItem(`Bank: ${characterData.bank}$`));
        characterInformationMenu.AddItem(new nativeUI.UIMenuItem(`HP: ${NativeExtenstion.getPlayerHealth(player)}`, 'Gracz'));
    }

    async function playerTeleportToAdmin(player: alt.Player) {
        alt.emitServer('admin-panel:teleportToAdmin', player);
    }

    async function adminTeleportToPlayer(player: alt.Player) {
        alt.emitServer('admin-panel:teleportToPlayer', player);
    }

    const creatorItemMenu = new nativeUI.Menu('Tworzenie itemu', 'Uzupełnij poniższe rzeczy', new nativeUI.Point(50, 50));
    async function createItemForPlayer(selectedItem: nativeUI.UIMenuItem, player: alt.Player) {

        menuPlayerOptions.AddSubMenu(creatorItemMenu, selectedItem);

        // Dorobić item creator
    }
};
