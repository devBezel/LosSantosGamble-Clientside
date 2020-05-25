import * as alt from 'alt';
import { WarehouseOrderModel } from 'client/modules/Models/warehouseOrderModel';
import { View } from '../../Utilities/View';

export default async () => {
    let webView: View;


    alt.onServer('job-courier:currentOrders', currentOrdersToBeDelivered);

    async function currentOrdersToBeDelivered(warehouseOrders: WarehouseOrderModel[]) {

        if (alt.Player.local.getMeta('viewOpen')) return;

        if (!webView) {
            webView = new View();
        }

        webView.open('', true, 'courier/orders', true);
        webView.emit('job-courier:currentOrders', warehouseOrders);
        webView.on('job-courier:startDelivery', startDeliveryOrder);
    }

    async function startDeliveryOrder(orderId: number) {
        webView.close();
        alt.emitServer('job-courier:startDelivery', orderId);
    }
};
