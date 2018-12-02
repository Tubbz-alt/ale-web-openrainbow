export interface RainbowListener {
    onReady();
    onLoaded();
    onSigned(event : Event, account : any);
    onStarted(event : Event, account : any) ;
    onConnectionStateChangeEvent();
    onWebRTCCallChanged();
}