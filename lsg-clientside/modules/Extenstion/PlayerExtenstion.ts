import * as alt from 'alt';

export default async () => {
    alt.Player.prototype.hasPremium = function hasPremium() {
        return alt.Player.local.getSyncedMeta('account-premium');
    };
};
