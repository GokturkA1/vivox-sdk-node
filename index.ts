import { EventEmitter } from 'events';

// C++ Eklentisini yüklüyoruz
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vivoxsdk = require('./build/Release/vivoxsdk.node');

/**
 * Vivox SDK Hata Kodları
 */
export enum VivoxError {
    VX_E_SUCCESS = 0,
    VX_E_NO_MESSAGE_AVAILABLE = -1,
    VX_E_INVALID_XML = 1000,
    VX_E_NO_EXIST = 1001,
    VX_E_MAX_CONNECTOR_LIMIT_EXCEEDED = 1002,
    VX_E_MAX_SESSION_LIMIT_EXCEEDED = 1003,
    VX_E_FAILED = 1004,
    VX_E_ALREADY_LOGGED_IN = 1005,
    VX_E_INVALID_ARGUMENT = 1008,
    VX_E_INVALID_USERNAME_OR_PASSWORD = 1009,
    VX_E_INSUFFICIENT_PRIVILEGE = 1010,
    VX_E_NO_SUCH_SESSION = 1011,
    VX_E_NOT_INITIALIZED = 1012,
    VX_E_LOGIN_FAILED = 1014,
    VX_E_WRONG_CONNECTOR = 1016,
    VX_E_RTP_TIMEOUT = 1058,
    VX_E_INVALID_AUTH_TOKEN = 1082,
    VX_E_ACCESSTOKEN_ALREADY_USED = 20120,
    VX_E_ACCESSTOKEN_EXPIRED = 20121,
    VX_E_ACCESSTOKEN_INVALID_SIGNATURE = 20122,
    VX_E_ACCESSTOKEN_CLAIMS_MISMATCH = 20123,
    VX_E_ACCESSTOKEN_MALFORMED = 20124,
    
    // V5 Aliasları
    VxErrorSuccess = 0,
    VxErrorFailed = 1004,
    VxErrorInvalidArgument = 1008,
    VxErrorNotLoggedIn = 5025,
    VxErrorTargetObjectDoesNotExist = 1001,
    VxErrorNotInitialized = 1012,
    VxErrorAlreadyInitialized = 1085
}

/**
 * Giriş (Login) durumları
 */
export enum VivoxLoginState {
    LoggedOut = 0,
    LoggedIn = 1,
    LoggingIn = 2,
    LoggingOut = 3,
    Resetting = 4,
    Error = 100
}

/**
 * Ağ bağlantı durumları
 */
export enum VivoxConnectionState {
    Disconnected = 0,
    Connected = 1,
    Recovering = 3,
    FailedToRecover = 4,
    Recovered = 5
}

/**
 * Katılımcının kanaldan ayrılma nedenleri
 */
export enum VivoxParticipantRemovedReason {
    Left = 0,
    Timeout = 1,
    Kicked = 2,
    Banned = 3
}

/**
 * Kanal medya (ses) durumları
 */
export enum VivoxSessionMediaState {
    Disconnected = 1,
    Connected = 2,
    Ringing = 3,
    Connecting = 6,
    Disconnecting = 7
}

/**
 * Kanal metin (text) durumları
 */
export enum VivoxSessionTextState {
    Disconnected = 0,
    Connected = 1,
    Connecting = 2,
    Disconnecting = 3
}

/**
 * SDK Mesaj Tipleri
 */
export enum VivoxMessageType {
    None = 0,
    Request = 1,
    Response = 2,
    Event = 3
}

/**
 * SDK Log Seviyeleri
 */
export enum VivoxLogLevel {
    None = -1,
    Error = 0,
    Warning = 1,
    Info = 2,
    Debug = 3,
    Trace = 4,
    All = 5
}

/**
 * Vivox SDK'nın desteklediği temel bir cihaz yapısı.
 */
export interface VivoxDevice {
    name: string;
    id: string;
}

/**
 * C++ tarafından gelen ham olay (raw event) formatı.
 */
export interface VivoxRawEvent {
    type: VivoxMessageType;
    resp_type?: number;
    evt_type?: number;
    status?: number;
    status_string?: string;
    participant_uri?: string;
    message?: string;
    session_handle?: string;
    state?: number;
    account_handle?: string;
    is_current_user?: number;
    reason?: number;
    is_speaking?: number;
    energy?: number;
    connection_state?: number;
    devices?: VivoxDevice[];
}

/**
 * Giriş (Login) durumundaki değişiklikleri belirten olay.
 */
export interface VivoxLoginStateEvent {
    state: VivoxLoginState;
    handle: string;
}

/**
 * Kanala yeni bir katılımcının girdiğini belirten olay.
 */
export interface VivoxParticipantAddedEvent {
    participant_uri: string;
    is_current_user: boolean;
}

/**
 * Kanaldan bir katılımcının ayrıldığını belirten olay.
 */
export interface VivoxParticipantRemovedEvent {
    participant_uri: string;
    reason: VivoxParticipantRemovedReason;
}

/**
 * Bir katılımcının anlık konuşma (ses) aktivitesini belirten olay.
 */
export interface VivoxParticipantUpdatedEvent {
    participant_uri: string;
    is_speaking: boolean;
    energy: number;
}

/**
 * Kanal içindeki bir yazılı mesaj olayını belirtir.
 */
export interface VivoxMessageEvent {
    participant_uri: string;
    message: string;
    session_handle: string;
}

/**
 * Standart bir SDK yanıt olayını belirtir.
 */
export interface VivoxResponseEvent {
    status: number;
    status_name: string;
    status_string?: string;
}

/**
 * Vivox sınıfı tarafından fırlatılan tüm olayların tür haritası.
 */
export interface VivoxEvents {
    'raw': (event: VivoxRawEvent) => void;
    'response': (event: VivoxRawEvent) => void;
    'event': (event: VivoxRawEvent) => void;
    
    'connectorCreated': (event: VivoxResponseEvent) => void;
    'loginSuccess': (event: VivoxResponseEvent) => void;
    'loginFailure': (event: VivoxResponseEvent) => void;
    'joinSuccess': (event: VivoxResponseEvent) => void;
    'joinFailure': (event: VivoxResponseEvent) => void;
    
    'renderDevices': (devices: VivoxDevice[]) => void;
    'captureDevices': (devices: VivoxDevice[]) => void;
    
    'loginStateChange': (data: VivoxLoginStateEvent) => void;
    'participantAdded': (event: VivoxParticipantAddedEvent) => void;
    'participantRemoved': (event: VivoxParticipantRemovedEvent) => void;
    'participantUpdated': (event: VivoxParticipantUpdatedEvent) => void;
    'connectionStateChanged': (state: VivoxConnectionState) => void;
    'message': (event: VivoxMessageEvent) => void;
}

export declare interface Vivox {
    on<U extends keyof VivoxEvents>(event: U, listener: VivoxEvents[U]): this;
    emit<U extends keyof VivoxEvents>(event: U, ...args: Parameters<VivoxEvents[U]>): boolean;
}

/**
 * Vivox SDK Node.js Wrapper
 */
export class Vivox extends EventEmitter {
    private addon: any;
    private initialized: boolean;

    constructor() {
        super();
        this.addon = vivoxsdk;
        this.initialized = false;
    }

    public getVersion(): string {
        return this.addon.getVersion();
    }

    public initialize(): number {
        const status = this.addon.initialize();
        if (status === 0 && !this.initialized) {
            this.initialized = true;
            this._setupInternalCallback();
        }
        return status;
    }

    private _setupInternalCallback(): void {
        this.addon.setEventCallback((event: VivoxRawEvent) => {
            this.emit('raw', event);
            if (event.type === VivoxMessageType.Response) this._handleResponse(event);
            else if (event.type === VivoxMessageType.Event) this._handleEvent(event);
        });
    }

    private _handleResponse(event: VivoxRawEvent): void {
        const status = event.status ?? -1;
        const payload: VivoxResponseEvent = { 
            status, 
            status_name: VivoxUtils.getErrorName(status),
            status_string: event.status_string 
        };
        
        switch (event.resp_type) {
            case 1: this.emit('connectorCreated', payload); break;
            case 131: case 132:
                if (status === 0) this.emit('loginSuccess', payload);
                else this.emit('loginFailure', payload);
                break;
            case 8:
                if (status === 0) this.emit('joinSuccess', payload);
                else this.emit('joinFailure', payload);
                break;
            case 87: this.emit('renderDevices', event.devices || []); break;
            case 88: this.emit('captureDevices', event.devices || []); break;
            default: this.emit('response', event);
        }
    }

    private _handleEvent(event: VivoxRawEvent): void {
        switch (event.evt_type) {
            case 2: this.emit('loginStateChange', { state: event.state ?? 0, handle: event.account_handle ?? '' }); break;
            case 26: this.emit('participantAdded', { participant_uri: event.participant_uri ?? '', is_current_user: event.is_current_user === 1 }); break;
            case 27: this.emit('participantRemoved', { participant_uri: event.participant_uri ?? '', reason: event.reason ?? 0 }); break;
            case 28: this.emit('participantUpdated', { participant_uri: event.participant_uri ?? '', is_speaking: event.is_speaking === 1, energy: event.energy ?? 0 }); break;
            case 53: this.emit('connectionStateChanged', event.connection_state ?? 0); break;
            case 10: this.emit('message', { participant_uri: event.participant_uri ?? '', message: event.message ?? '', session_handle: event.session_handle ?? '' }); break;
            default: this.emit('event', event);
        }
    }

    // --- SDK Methods ---
    public connectorCreate(server: string, handle: string = "default"): number { return this.addon.connectorCreate(server, handle); }
    public login(connectorHandle: string, accountUri: string, token: string): number { return this.addon.login(connectorHandle, accountUri, token); }
    public loginAnonymous(connectorHandle: string, accountUri: string, token: string): number { return this.addon.loginAnonymous(connectorHandle, accountUri, token); }
    public joinChannel(accountHandle: string, channelUri: string, token: string): number { return this.addon.joinChannel(accountHandle, channelUri, token); }
    public sendMessage(sessionHandle: string, message: string): number { return this.addon.sendMessage(sessionHandle, message); }
    public getCaptureDevices(): number { return this.addon.getCaptureDevices(); }
    public setCaptureDevice(deviceId: string): number { return this.addon.setCaptureDevice(deviceId); }
    public getRenderDevices(): number { return this.addon.getRenderDevices(); }
    public setRenderDevice(deviceId: string): number { return this.addon.setRenderDevice(deviceId); }
    public setLocalMicVolume(volume: number): number { return this.addon.setLocalMicVolume(volume); }
    public setLocalSpeakerVolume(volume: number): number { return this.addon.setLocalSpeakerVolume(volume); }
    public muteLocalMic(connectorHandle: string, mute: boolean): number { return this.addon.muteLocalMic(connectorHandle, mute ? 1 : 0); }
    public setParticipantMute(sessionHandle: string, participantUri: string, mute: boolean): number { return this.addon.setParticipantMuteForMe(sessionHandle, participantUri, mute ? 1 : 0); }
    public setParticipantVolume(sessionHandle: string, participantUri: string, volume: number): number { return this.addon.setParticipantVolumeForMe(sessionHandle, participantUri, volume); }
    public muteUser(accountHandle: string, channelUri: string, participantUri: string, mute: boolean): number { return this.addon.channelMuteUser(accountHandle, channelUri, participantUri, mute ? 1 : 0); }
    public kickUser(accountHandle: string, channelUri: string, participantUri: string): number { return this.addon.kickUser(accountHandle, channelUri, participantUri); }
    public injectAudio(accountHandle: string, filename: string): number { return this.addon.startAudioInjection(accountHandle, filename); }
    public stopAudioInjection(accountHandle: string): number { return this.addon.stopAudioInjection(accountHandle); }
    public set3DPosition(accountHandle: string, posX: number, posY: number, posZ: number, channelUri: string): number {
        const sessionHandle = `${channelUri}_sess`;
        return this.addon.set3DPosition(accountHandle, posX, posY, posZ, sessionHandle);
    }
    public uninitialize(): void { this.initialized = false; this.addon.uninitialize(); }
}

/**
 * Vivox Utility Fonksiyonları
 */
export const VivoxUtils = {
    getErrorName(statusCode: number): string {
        for (const [key, value] of Object.entries(VivoxError)) {
            if (value === statusCode) return key;
        }
        return `UNKNOWN_ERROR_${statusCode}`;
    },

    getLoginStateName(state: number): string {
        for (const [key, value] of Object.entries(VivoxLoginState)) {
            if (value === state) return key;
        }
        return `UNKNOWN_STATE_${state}`;
    },

    getConnectionStateName(state: number): string {
        for (const [key, value] of Object.entries(VivoxConnectionState)) {
            if (value === state) return key;
        }
        return `UNKNOWN_CONNECTION_STATE_${state}`;
    },

    generateAccountUri(domain: string, userId: string, environmentDomain: string): string {
        return `sip:.${domain}.${userId}.@${environmentDomain}`;
    },

    generateChannelUri(domain: string, channelId: string, environmentDomain: string): string {
        return `sip:confctl-g-${domain}.${channelId}@${environmentDomain}`;
    },
    
    generateSessionHandle(channelUri: string): string {
        return `${channelUri}_sess`;
    }
};

const defaultInstance = new Vivox();
export default defaultInstance;
module.exports = defaultInstance;
module.exports.Vivox = Vivox;
module.exports.VivoxUtils = VivoxUtils;
module.exports.VivoxError = VivoxError;
module.exports.VivoxLoginState = VivoxLoginState;
module.exports.VivoxConnectionState = VivoxConnectionState;
module.exports.VivoxParticipantRemovedReason = VivoxParticipantRemovedReason;
module.exports.VivoxSessionMediaState = VivoxSessionMediaState;
module.exports.VivoxSessionTextState = VivoxSessionTextState;
module.exports.VivoxMessageType = VivoxMessageType;
module.exports.VivoxLogLevel = VivoxLogLevel;
