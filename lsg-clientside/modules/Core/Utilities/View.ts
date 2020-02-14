import * as alt from 'alt';
import * as natives from 'natives';
import { baseConfig } from 'client/modules/Configs/BaseConfig';
import { Environment } from '../Version/Environment';

export let currentView: any;

export class View {

    constructor() {
        if (currentView === undefined) {
            currentView = this;
        }

        return currentView;
    }

    open(url: string = Environment.getUrl, gameControls: boolean = true, route: string = '', displayRadar: boolean = false) {
        if (alt.Player.local.getMeta('chatOpen')) return;

        if (!currentView.view) {
            currentView.view = new alt.WebView(url);
            currentView.events = [];
        }

        alt.Player.local.setMeta('viewOpen', true);
        currentView.on('close', currentView.close);
        // currentView.view.url = url;
        currentView.emit('change:route', route);
        currentView.isVisible = true;
        currentView.view.focus();
        currentView.view.ready = true;
        alt.showCursor(true);

        if (!displayRadar) {
            natives.displayRadar(false);
        }


        if (gameControls) {
            currentView.gameControls = this.toggleGameControls.bind(this);
            currentView.interval = alt.setInterval(currentView.gameControls, 0);
        }
    }

    close() {
        currentView.ready = false;

        currentView.events.forEach((event: { name: any; func: any; }) => {
            currentView.view.off(event.name, event.func);
        });

        currentView.view.off('close', currentView.close);
        // currentView.view.url = 'http://localhost:4000/';
        currentView.emit('change:route', '');
        currentView.view.unfocus();

        currentView.events = [];

        alt.showCursor(false);
        natives.displayRadar(true);
        alt.Player.local.setMeta('viewOpen', false);
        if (currentView.interval !== undefined) {
            alt.clearInterval(currentView.interval);
            currentView.interval = undefined;
        }
    }

    on(name: string, func: any) {
        if (currentView.view === undefined) return;
        // @ts-ignore
        if (currentView.events.includes(event => event.name === name)) return;
        const event = {
            name,
            func,
        };

        currentView.events.push(event);
        currentView.view.on(name, func);
    }

    emit(name: string, ...args: any[]) {
        if (!currentView.view) return;
        currentView.view.emit(name, ...args);
    }

    toggleGameControls() {
        natives.disableAllControlActions(0);
        natives.disableAllControlActions(1);
    }
}
