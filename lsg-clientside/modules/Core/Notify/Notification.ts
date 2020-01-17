import * as alt from 'alt';
import { View } from '../Utilities/View';


export default async () => {

  let webView: View;

  alt.on('notify:success', showSuccessNotify);
  alt.on('notify:error', showErrorNotify);
  alt.on('notify:warning', showWarningNotify);

  alt.onServer('notify:success', showSuccessNotify);
  alt.onServer('notify:error', showErrorNotify);
  alt.onServer('notify:warning', showWarningNotify);

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

  async function showWarningNotify(title: string, message: string) {
    if (!webView) {
      webView = new View();
    }

    if (alt.Player.local.getMeta('viewOpen')) return;

    webView.emit('notify:warning', title, message);
  }

};


