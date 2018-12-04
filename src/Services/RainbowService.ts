import { is_scalar } from "../polyfill";
import { DomHelper } from "../Helpers/DomHelper";
import { RainbowListener } from "../Interfaces/RainbowListener";
import { DatabaseService } from "./DatabaseService";

declare var rainbowSDK: any;
declare var angular: any;

export class RainbowService {

    private _domHelper = new DomHelper();
    private _db = new DatabaseService();

    private _isLogged: boolean = false;
    get isLogged() { return this._isLogged; }
    set isLogged(isLogged) { this._isLogged = isLogged }

    private _isStarted: boolean = false;
    get isStarted() { return this._isStarted; }
    set isStarted(isStarted) { this._isStarted = isStarted; }

    private _verbose = false;
    set verbose(verbose) { this._verbose = verbose; }

    private _listener: RainbowListener | null;

    constructor(private _appId, private _appSecret) {
        this._listener = null;
    }

    init() {

        // Listen to the SDK event RAINBOW_ONREADY 
        $(document).on(rainbowSDK.RAINBOW_ONREADY, this._onReady.bind(this));
        // Listen to the SDK event RAINBOW_ONLOADED 
        $(document).on(rainbowSDK.RAINBOW_ONLOADED, this._onLoaded.bind(this));
        // Listen when the SDK is signed
        $(document).on(rainbowSDK.connection.RAINBOW_ONSIGNED, this._onSigned.bind(this));
        // Listen when the SDK is started
        $(document).on(rainbowSDK.connection.RAINBOW_ONSTARTED, this._onStarted.bind(this));
        //Subscribe to Rainbow connection change
        $(document).on(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, this._onConnectionStateChangeEvent.bind(this));
        // Subscribe to WebRTC call change
        $(document).on(rainbowSDK.webRTC.RAINBOW_ONWEBRTCCALLSTATECHANGED, this._onWebRTCCallChanged.bind(this));

        $(document).on(rainbowSDK.webRTC.RAINBOW_ONWEBRTCERRORHANDLED, this._onWebRTCErrorHandled.bind(this));
    }

    _onStarted(event : Event, account : any) {

        this.logInfo('[ServiceRainbow][_onStarted]', account);

        if (this._listener != null)
            this._listener.onStarted(event, account);
    }

    /**
     * Callback for handling the event 'RAINBOW_ONREADY' 
     */
    _onReady() {
        this.logInfo('[ServiceRainbow][_onReady] :: On SDK Ready !');
        
        this.isStarted = true;

        //let acesso = this._serviceDatabase.getAcesso();
        //if (acesso) {
        //    this.signout();
        //}

        if (this._listener != null)
            this._listener.onReady();

    }

    /**
     * Callback for handling the event 'RAINBOW_ONCONNECTIONSTATECHANGED'
     */
    _onLoaded() {
        this.logInfo('[ServiceRainbow][_onLoaded] :: On SDK Loaded !');
        
        // Activate full SDK log
        rainbowSDK.setVerboseLog(this.verbose);

        rainbowSDK
            .initialize(this._appId, this._appSecret)
            .then(() => {
                this.logInfo('[ServiceRainbow][_onLoaded][rainbowSDK - initialize] :: Rainbow SDK is initialized!');
                if (this._listener != null)
                    this._listener.onLoaded();
            })
            .catch((err) => {
                this.logInfo('[ServiceRainbow][_onLoaded][rainbowSDK - initialize] :: Something went wrong with the SDK...');
                console.error('[ERROR] :: Something went wrong with the SDK...', err);
                throw err;
            });
    }

    _onSigned(event : Event, account : any) {
        this.logInfo('[ServiceRainbow][_onSigned]', account);
        if (this._listener != null)
            this._listener.onSigned(event, account);
    }

    _onConnectionStateChangeEvent(event, status) {
        switch (status) {
            case rainbowSDK.connection.RAINBOW_CONNECTIONCONNECTED:
                // The state of the connection has changed to "connected" which means that your application is now connected to Rainbow
                console.log('[ServiceRainbow][_onConnectionStateChangeEvent][RAINBOW_CONNECTIONCONNECTED]');
                break;
            case rainbowSDK.connection.RAINBOW_CONNECTIONINPROGRESS:
                // The state of the connection is now in progress which means that your application try to connect to Rainbow
                console.log('[ServiceRainbow][_onConnectionStateChangeEvent][RAINBOW_CONNECTIONINPROGRESS]');
                break;
            case rainbowSDK.connection.RAINBOW_CONNECTIONDISCONNECTED:
                // The state of the connection changed to "disconnected" which means that your application is no more connected to Rainbow
                console.log('[ServiceRainbow][_onConnectionStateChangeEvent][RAINBOW_CONNECTIONDISCONNECTED]');
                break;
            default:
                break;
        };
    }

    _onWebRTCCallChanged() {
        
    }

    _onWebRTCErrorHandled(event : Event, error : any){
        console.error("[ServiceRainbow][rainbowSDK][RAINBOW_ONWEBRTCERRORHANDLED] - ", event, error);
    }

    logInfo(title: string, msg: any = undefined) {

        if (!this.verbose) {
            return;
        }

        let msgExibir = `${title}`;
        if (typeof msg == "undefined") {
            console.info(msgExibir);
            return;
        }
        if (is_scalar(msg)) {
            msgExibir = `${msgExibir} - ${msg}`;
            console.info(msgExibir);
        } else {
            console.info(title, msg);
        }
    }
}