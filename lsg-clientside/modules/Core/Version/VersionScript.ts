import * as alt from 'alt';
import { baseConfig } from 'client/modules/Configs/BaseConfig';
import { Draw } from '../Utilities/Draw';

export default async () => {
    const version = baseConfig.version;
    const branch = baseConfig.branch;


    const versionInterval = alt.setInterval(() => {
        Draw.drawTextConstant(0.633 + 0.8275 , 1.432 + 0.039, 1.0, 1.0, 0.25, `LosSantosGamble ${version}-${branch}`, 199, 195, 195, 255, false);
    },                                      2);

};
