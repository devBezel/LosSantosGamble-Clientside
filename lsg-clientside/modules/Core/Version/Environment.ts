import { baseConfig } from 'client/modules/Configs/BaseConfig';

export class Environment {

    static developerEnvironment: boolean = true;


    public static get getUrl(): string {
        return this.developerEnvironment ? baseConfig.cefLocalUrl : baseConfig.cefUrl;
    }

}
