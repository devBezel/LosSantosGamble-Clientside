import * as alt from 'alt';
import { View } from '../Utilities/View';
import { NativeNotification } from './NativeNotification';


export default async () => {

  let webView: View;

  alt.on('notify:success', showSuccessNotify);
  alt.on('notify:error', showErrorNotify);
  alt.on('notify:warning', showWarningNotify);

  alt.onServer('notify:success', showSuccessNotify);
  alt.onServer('notify:error', showErrorNotify);
  alt.onServer('notify:warning', showWarningNotify);
  alt.onServer('notify:native', showNativeNotify);

  async function showSuccessNotify(title: string, message: string) {
    if (!webView) {
      alt.log('tworze nowe okno');
      webView = new View();
    }

    // if (alt.Player.local.getMeta('viewOpen')) return;
    webView.emit('notify:success', title, message);
  }

  async function showErrorNotify(title: string, message: string) {
    if (!webView) {
      webView = new View();
    }

    // if (alt.Player.local.getMeta('viewOpen')) return;

    webView.emit('notify:error', title, message);
  }

  async function showWarningNotify(title: string, message: string) {
    if (!webView) {
      webView = new View();
    }

    // if (alt.Player.local.getMeta('viewOpen')) return;

    webView.emit('notify:warning', title, message);
  }

  async function showNativeNotify(backgroundColor: number = null, notifyImage: string, iconType: number = 0,
                                  title: string, subtitle:string, message: string, durationMult: number) {
                                  NativeNotification.showNotification(backgroundColor, notifyImage, iconType, title, subtitle, message, durationMult);
  }

};


