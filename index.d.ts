import { EventEmitter } from 'events';
/**
 * Vivox SDK Hata Kodları
 */
export declare enum VivoxError {
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
export declare enum VivoxLoginState {
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
export declare enum VivoxConnectionState {
    Disconnected = 0,
    Connected = 1,
    Recovering = 3,
    FailedToRecover = 4,
    Recovered = 5
}
/**
 * Katılımcının kanaldan ayrılma nedenleri
 */
export declare enum VivoxParticipantRemovedReason {
    Left = 0,
    Timeout = 1,
    Kicked = 2,
    Banned = 3
}
/**
 * Kanal medya (ses) durumları
 */
export declare enum VivoxSessionMediaState {
    Disconnected = 1,
    Connected = 2,
    Ringing = 3,
    Connecting = 6,
    Disconnecting = 7
}
/**
 * Kanal metin (text) durumları
 */
export declare enum VivoxSessionTextState {
    Disconnected = 0,
    Connected = 1,
    Connecting = 2,
    Disconnecting = 3
}
/**
 * SDK Mesaj Tipleri
 */
export declare enum VivoxMessageType {
    None = 0,
    Request = 1,
    Response = 2,
    Event = 3
}
/**
 * SDK Log Seviyeleri
 */
export declare enum VivoxLogLevel {
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
export declare class Vivox extends EventEmitter {
    private addon;
    private initialized;
    constructor();
    getVersion(): string;
    initialize(): number;
    private _setupInternalCallback;
    private _handleResponse;
    private _handleEvent;
    connectorCreate(server: string, handle?: string): number;
    login(connectorHandle: string, accountUri: string, token: string): number;
    loginAnonymous(connectorHandle: string, accountUri: string, token: string): number;
    joinChannel(accountHandle: string, channelUri: string, token: string): number;
    sendMessage(sessionHandle: string, message: string): number;
    getCaptureDevices(): number;
    setCaptureDevice(deviceId: string): number;
    getRenderDevices(): number;
    setRenderDevice(deviceId: string): number;
    setLocalMicVolume(volume: number): number;
    setLocalSpeakerVolume(volume: number): number;
    muteLocalMic(connectorHandle: string, mute: boolean): number;
    setParticipantMute(sessionHandle: string, participantUri: string, mute: boolean): number;
    setParticipantVolume(sessionHandle: string, participantUri: string, volume: number): number;
    muteUser(accountHandle: string, channelUri: string, participantUri: string, mute: boolean): number;
    kickUser(accountHandle: string, channelUri: string, participantUri: string): number;
    injectAudio(accountHandle: string, filename: string): number;
    stopAudioInjection(accountHandle: string): number;
    set3DPosition(accountHandle: string, posX: number, posY: number, posZ: number, channelUri: string): number;
    uninitialize(): void;
}
/**
 * Vivox Utility Fonksiyonları
 */
export declare const VivoxUtils: {
    getErrorName(statusCode: number): string;
    getLoginStateName(state: number): string;
    getConnectionStateName(state: number): string;
    generateAccountUri(domain: string, userId: string, environmentDomain: string): string;
    generateChannelUri(domain: string, channelId: string, environmentDomain: string): string;
    generateSessionHandle(channelUri: string): string;
};
declare const defaultInstance: Vivox;
export default defaultInstance;
