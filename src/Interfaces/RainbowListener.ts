export interface RainbowListener {
    onReady();
    onLoaded();
    onSigned();
    onStarted(event : Event, account : any) ;
    onConnectionStateChangeEvent();
    onWebRTCCallChanged();
}