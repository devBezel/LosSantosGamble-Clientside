import * as alt from 'alt';
import { Key } from 'client/modules/Constant/Keys/Key';
import { View } from '../Utilities/View';

export default async () => {
    let webView: View;

    alt.on('keyup', async (key: any) => {
        if (key === Key.END) {
            if (!webView) {
                webView = new View();
            }

            webView.open('', true, 'smartphone/menu', true);
        }
    });
};
