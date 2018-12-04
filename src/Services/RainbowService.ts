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

    private _deviceAudioInputIdSelected : string| null = null;
    private _deviceAudioOutputIdSelected : string| null = null;
    private _deviceVideoInputIdSelected : string| null= null;

    private _audioDevicesInputs: string[] = [];
    private _videoDevicesInputs: string[]= [];
    private _audioDevicesOutput: string[]= [];

    get audioDevicesInput()  {  return this._audioDevicesInputs;}
    get videoDevicesInputs() { return this._videoDevicesInputs; }
    get audioDevicesOutput() { return this._audioDevicesOutput; }

    private _modelCall : any = {};

    constructor(private _appId, private _appSecret) {
        this._listener = null;
    }

    public init() {

        /* Bootstrap the SDK */
        angular.bootstrap(document, ['sdk']).get('rainbowSDK');

        //set models
        this._modelCall = angular.element(document.querySelector('body')).injector().get('Call');

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

        /* Load the SDK */
        rainbowSDK.load();

        this._browserCheck();
    }

    private _onStarted(event: Event, account: any) {

        this.logInfo('[ServiceRainbow][_onStarted]', account);

        if (this._listener != null)
            this._listener.onStarted(event, account);
    }

    /**
     * Callback for handling the event 'RAINBOW_ONREADY' 
     */
    private _onReady() {
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
    private _onLoaded() {
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

    private _onSigned(event: Event, account: any) {
        this.logInfo('[ServiceRainbow][_onSigned]', account);
        if (this._listener != null)
            this._listener.onSigned(event, account);
    }

    private _onConnectionStateChangeEvent(event, status) {
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

    private _onWebRTCCallChanged(event : Event, call) {
             /* Listen to WebRTC call state change */
            switch (call.status.value) {
                case this._modelCall.Status.RINGING_INCOMMING.value:
                    /* Answer or reject the call */
                    debugger;
                    if (this._listener != null) {
                        this._listener.onIncomming(call);
                    } else {
                        this.releaseCall(call);
                    }
                    break;
                case this._modelCall.Status.ACTIVE.value:
                    debugger;
                    /* display the local and remote video */
                    rainbowSDK.webRTC.showLocalVideo();
                    rainbowSDK.webRTC.showRemoteVideo(call);
                    //this.rainbowDom.exibirVideo();
                    //this.rainbowDom.exibirBotoesChamadaAtiva();

                    break;
                case this._modelCall.Status.UNKNOWN.value:
                    debugger;
                    /* Hiding the local and remote video */
                    rainbowSDK.webRTC.hideLocalVideo();
                    rainbowSDK.webRTC.hideRemoteVideo(call);
                    //this.rainbowDom.ocultarVideo();
                    //this.rainbowDom.ocultarBotoesChamada();
                    //this._chamadaAtual = null;
                    break;
                default:
                    break;
            }
    }
    
    private _onWebRTCErrorHandled(event: Event, error: any) {
        console.error("[ServiceRainbow][rainbowSDK][RAINBOW_ONWEBRTCERRORHANDLED] - ", event, error);
    }

    private _onNewMessageReceived(event : Event, message : any, conversation : any)  {

    }

    private _browserCheck() {
        if (this._domHelper.isChrome()) {
            navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {

                /* Stream received which means that the user has authorized the application to access to the audio and video devices. Local stream can be stopped at this time */
                stream.getTracks().forEach(function (track) {
                    track.stop();
                });

                /*  Get the list of available devices */
                navigator.mediaDevices.enumerateDevices().then((devices) => {

                    /* Do something for each device (e.g. add it to a selector list) */
                    devices.forEach((device) => {
                        switch (device.kind) {
                            case "audioinput":
                                this._audioDevicesInputs.push(device.deviceId);
                                // This is a device of type 'microphone'
                                if (!this._deviceAudioInputIdSelected) {
                                    this._deviceAudioInputIdSelected = device.deviceId;
                                    rainbowSDK.webRTC.useMicrophone(device.deviceId);
                                }
                                break;
                            case "audiooutput":
                                this._audioDevicesOutput.push(device.deviceId);
                                // This is a device of type 'speaker'
                                if (this._deviceAudioOutputIdSelected) {
                                    this._deviceAudioOutputIdSelected = device.deviceId;
                                    rainbowSDK.webRTC.useSpeaker(device.deviceId);
                                }
                                break;
                            case "videoinput":
                                this._videoDevicesInputs.push(device.deviceId);
                                // This is a device of type 'camera'
                                if (!this._deviceVideoInputIdSelected) {
                                    this._deviceVideoInputIdSelected = device.deviceId;
                                    rainbowSDK.webRTC.useCamera(device.deviceId);
                                }
                                break;
                            default:
                                break;
                        }
                    });

                }).catch((error) => {
                    if (this._listener)
                        this._listener.onError(error);
                    console.error("[ServiceRainbow][_initChromeUser] - ", error)
                });
            }).catch((error) => {
                if (this._listener)
                        this._listener.onError(error);
                console.error("[ServiceRainbow][_initChromeUser] - ", error)
            });
        }
    }

    public login(user: string, pass: string) {
        if (!this.isStarted) {
            throw new Error("Aplicação ainda não está carregada!");
        }

        return rainbowSDK.connection.signin(user, pass, 'sandbox.openrainbow.com')
            .then((account) => {
                console.log('[ServiceRainbow][login] - OK', account);
                // Successfully signed to Rainbow and the SDK is started completely. Rainbow data could be retrieved.
                this.isLogged = true;

                $(document).on(rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED, this._onNewMessageReceived.bind(this));
            })
            .catch((err) => {
                console.error('[ServiceRainbow][login]', err);
                // An error occurs (e.g. bad credentials). Application could be informed that sign-in has failed
                this.isLogged = false;
            })
    }

    public answerInVideo(call : any) {

    }

    public releaseCall(call: any): any {
        throw new Error('Method not implemented.');
    }


    public logInfo(title: string, msg: any = undefined) {

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