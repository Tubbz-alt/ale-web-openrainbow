import { RainbowService } from "../Services/RainbowService";

export class RainbowServiceFactory {

    private _appId: string = '';
    get appId() { return this._appId; }
    set appId(appId) { this._appId = appId; }

    private _appSecret: string = '';
    get appSecret() { return this._appSecret; }
    set appSecret(appSecret) { this._appSecret = appSecret; }

    private _verbose = false;
    set verbose(verbose) { this._verbose = verbose; }
    

    constructor() {

    }

    make() {
        return new RainbowService(this._appId, this._appSecret);
    }
}