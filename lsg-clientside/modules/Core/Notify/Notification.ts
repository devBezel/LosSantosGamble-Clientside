import * as alt from 'alt';
import { ServerEvent } from 'client/modules/Constant/ServerEvent';
import { ClientEvent } from 'client/modules/Constant/ClientEvent';

export default async () => {
    const notify: any = {
        isLoaded: false,
        view: null,
      };

    alt.on('connectionComplete', async () => {
        notify.view = new alt.WebView('http://resource/assets/views/lsg_notify/index.html');
        notify.view.on('notify:loaded', async () => {
          notify.isLoaded = true;
        });
    });

    alt.on('consoleCommand', async (command: string, ...args: any) => {
        if (command === 'notify' && notify.isLoaded) {
          const texts = args.join(' ');
          notify.view.emit('notify:send', {
            text: texts,
            timeout: 5000,
            textColor: 'white',
            backgroundColor: 'hsla(0, 0%, 0%, 0.632)',
            lineColor: 'rgba(63, 155, 64, 0.5)',
          });
        }
    });

    alt.onServer(ServerEvent.NOTIFY_SUCCESS, async(args: string) => {
        alt.log(`wykonalo sie args: ${args}`);
        if (notify.isLoaded) {
            // const texts = args.join(' ');
            notify.view.emit('notify:send', {
              text: args,
              timeout: 5000,
              textColor: 'white',
              backgroundColor: 'hsla(0, 0%, 0%, 0.632)',
              lineColor: 'rgba(63, 155, 64, 0.5)',
            });
        }
    });

    alt.onServer(ServerEvent.NOTIFY_ERROR, async(args: string) => {
        if (notify.isLoaded) {
            // const texts = args.join(' ');
            notify.view.emit('notify:send', {
              text: args,
              timeout: 5000,
              textColor: 'white',
              backgroundColor: 'hsla(0, 0%, 0%, 0.632)',
              lineColor: 'rgba(87, 2, 6, 0.5);',
            });
        }
    });

    alt.on(ClientEvent.NOTIFY_SUCCESS, async (args: string) => {
        if (notify.isLoaded) {
            // const texts = args.join(' ');
            notify.view.emit('notify:send', {
              text: args,
              timeout: 5000,
              textColor: 'white',
              backgroundColor: 'hsla(0, 0%, 0%, 0.632)',
              lineColor: 'rgba(63, 155, 64, 0.5);',
            });
        }
    });

    alt.on(ClientEvent.NOTIFY_ERROR, async (args: string) => {
        if (notify.isLoaded) {
            // const texts = args.join(' ');
            notify.view.emit('notify:send', {
              text: args,
              timeout: 5000,
              textColor: 'white',
              backgroundColor: 'hsla(0, 0%, 0%, 0.632)',
              lineColor: 'rgba(87, 2, 6, 0.5);',
            });
        }
    });
};

export async function notificationSuccess(text: string) {
    alt.emit(ClientEvent.NOTIFY_SUCCESS, text);
}

// TODO: sprawdzić czemu nie działają kolory czerwone w errorach
export async function notificationError(text: string) {
    alt.emit(ClientEvent.NOTIFY_ERROR, text);
}



