import * as alt from 'alt';
import { View } from '../Utilities/View';


export default async () => {

  let webView: View;

  alt.on('notify-client:success', showSuccessNotify);

  alt.onServer('notify-server:success', showSuccessNotify);
  alt.onServer('notify-server:error', showErrorNotify);

  async function showSuccessNotify(title: string, message: string) {
    if (!webView) {
      alt.log('tworze nowe okno');
      webView = new View();
    }

    if (alt.Player.local.getMeta('viewOpen')) return;
    webView.emit('notify:success', title, message);
  }

  async function showErrorNotify(title: string, message: string) {
    if (!webView) {
      webView = new View();
    }

    if (alt.Player.local.getMeta('viewOpen')) return;

    webView.emit('notify:error', title, message);
  }
};
