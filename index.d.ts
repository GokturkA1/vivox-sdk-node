import { EventEmitter } from 'events';
/**
 * Vivox SDK Error Codes
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
 * Login states
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
 * Network connection states
 */
export declare enum VivoxConnectionState {
    Disconnected = 0,
    Connected = 1,
    Recovering = 3,
    FailedToRecover = 4,
    Recovered = 5
}
/**
 * Participant removal reasons
 */
export declare enum VivoxParticipantRemovedReason {
    Left = 0,
    Timeout = 1,
    Kicked = 2,
    Banned = 3
}
/**
 * Session media (audio) states
 */
export declare enum VivoxSessionMediaState {
    Disconnected = 1,
    Connected = 2,
    Ringing = 3,
    Connecting = 6,
    Disconnecting = 7
}
/**
 * Session text states
 */
export declare enum VivoxSessionTextState {
    Disconnected = 0,
    Connected = 1,
    Connecting = 2,
    Disconnecting = 3
}
/**
 * SDK Message Types
 */
export declare enum VivoxMessageType {
    None = 0,
    Request = 1,
    Response = 2,
    Event = 3
}
/**
 * SDK Log Levels
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
 * STUN attempt settings
 */
export declare enum VivoxAttemptStun {
    Unspecified = 0,
    On = 1,
    Off = 2
}
/**
 * Connector modes
 */
export declare enum VivoxConnectorMode {
    Normal = 0,
    Legacy = 1
}
/**
 * Session handle types
 */
export declare enum VivoxSessionHandleType {
    Unique = 0,
    Legacy = 1,
    HierarchicalNumeric = 2,
    HierarchicalUnique = 3
}
/**
 * Log types
 */
export declare enum VivoxLogType {
    None = 0,
    File = 1,
    Callback = 2,
    FileAndCallback = 3
}
/**
 * Recording control types
 */
export declare enum VivoxRecordingControlType {
    Stop = 0,
    Start = 1,
    FlushToFile = 2
}
/**
 * Audio injection control types
 */
export declare enum VivoxAudioInjectionControlType {
    Stop = 0,
    Start = 1,
    Restart = 2
}
/**
 * Change types (for buddy/group events)
 */
export declare enum VivoxChangeType {
    Set = 1,
    Delete = 2
}
/**
 * Participant diagnostic states
 */
export declare enum VivoxParticipantDiagnosticState {
    SpeakingWhileMicMuted = 1,
    SpeakingWhileMicVolumeZero = 2,
    NoCaptureDevice = 3,
    NoRenderDevice = 4,
    CaptureDeviceReadErrors = 5,
    RenderDeviceWriteErrors = 6
}
/**
 * Network message types
 */
export declare enum VivoxNetworkMessageType {
    OfflineMessage = 1,
    AdminMessage = 2,
    SessionlessMessage = 3
}
/**
 * Audio device hot swap event types
 */
export declare enum VivoxAudioDeviceHotSwapEventType {
    DisabledDueToPlatformConstraints = 0,
    ActiveRenderDeviceChanged = 1,
    ActiveCaptureDeviceChanged = 2,
    AudioDeviceAdded = 3,
    AudioDeviceRemoved = 4
}
/**
 * Password hash algorithms
 */
export declare enum VivoxPasswordHashAlgorithm {
    Cleartext = 0,
    Sha1UsernameHash = 1
}
/**
 * Request disposition types
 */
export declare enum VivoxReqDispositionType {
    ReplyRequired = 0,
    NoReplyRequired = 1
}
/**
 * Backend types
 */
export declare enum VivoxBackendType {
    Unknown = -1,
    SIP = 0,
    XMPP = 1
}
/**
 * UDP frame types
 */
export declare enum VivoxUDPFrameType {
    RTP = 0,
    RTCP = 1,
    SIPMessage = 2,
    SIPKeepalive = 3
}
/**
 * Bluetooth profiles
 */
export declare enum VivoxBluetoothProfile {
    A2DP = 0,
    HFP = 1
}
/**
 * Audio stream categories
 */
export declare enum VivoxAudioStreamCategory {
    Normal = 0,
    GameChat = 1,
    Communications = 2,
    Max = 3
}
/**
 * Basic device structure supported by Vivox SDK.
 */
export interface VivoxDevice {
    name: string;
    id: string;
}
/**
 * Raw event format coming from C++.
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
 * Event indicating a change in login state.
 */
export interface VivoxLoginStateEvent {
    state: VivoxLoginState;
    handle: string;
}
/**
 * Event indicating a new participant has joined the channel.
 */
export interface VivoxParticipantAddedEvent {
    participant_uri: string;
    is_current_user: boolean;
}
/**
 * Event indicating a participant has left the channel.
 */
export interface VivoxParticipantRemovedEvent {
    participant_uri: string;
    reason: VivoxParticipantRemovedReason;
}
/**
 * Event indicating a change in a participant's speech activity.
 */
export interface VivoxParticipantUpdatedEvent {
    participant_uri: string;
    is_speaking: boolean;
    energy: number;
}
/**
 * Represents a text message event in a channel.
 */
export interface VivoxMessageEvent {
    participant_uri: string;
    message: string;
    session_handle: string;
}
/**
 * Standard SDK response event.
 */
export interface VivoxResponseEvent {
    status: number;
    status_name: string;
    status_string?: string;
}
/**
 * Map of all events emitted by the Vivox class.
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
 * Wraps the C++ addon and provides a user-friendly, asynchronous, EventEmitter-based API.
 */
export declare class Vivox extends EventEmitter {
    private addon;
    private initialized;
    constructor();
    /**
     * Returns the current Vivox SDK version info.
     */
    getVersion(): string;
    /**
     * Initializes the Vivox SDK.
     * Must be called before any other functions.
     * @returns {number} 0 on success, otherwise an error code.
     */
    initialize(): number;
    /**
     * Internal: Main bridge listening for messages from C++.
     */
    private _setupInternalCallback;
    private _handleResponse;
    private _handleEvent;
    /**
     * Creates a new connection (connector).
     */
    connectorCreate(server: string, handle?: string): number;
    /**
     * Log in with an AuthToken.
     */
    login(connectorHandle: string, accountUri: string, token: string): number;
    /**
     * Log in with an Anonymous (guest) token.
     */
    loginAnonymous(connectorHandle: string, accountUri: string, token: string): number;
    /**
     * Joins a voice/text channel.
     */
    joinChannel(accountHandle: string, channelUri: string, token: string): number;
    /**
     * Sends a text message to the channel.
     */
    sendMessage(sessionHandle: string, message: string): number;
    /**
     * Queries capture (microphone) devices.
     */
    getCaptureDevices(): number;
    /**
     * Activates the target capture device.
     */
    setCaptureDevice(deviceId: string): number;
    /**
     * Queries render (speaker) devices.
     */
    getRenderDevices(): number;
    /**
     * Activates the target render device.
     */
    setRenderDevice(deviceId: string): number;
    /**
     * Sets local microphone volume (0-100).
     */
    setLocalMicVolume(volume: number): number;
    /**
     * Sets local speaker volume (0-100).
     */
    setLocalSpeakerVolume(volume: number): number;
    /**
     * Mutes or unmutes your own microphone. (Others won't hear you)
     */
    muteLocalMic(connectorHandle: string, mute: boolean): number;
    /**
     * Locally mutes or unmutes a specific participant for you.
     */
    setParticipantMute(sessionHandle: string, participantUri: string, mute: boolean): number;
    /**
     * Sets the local volume (0-100) for a specific participant.
     */
    setParticipantVolume(sessionHandle: string, participantUri: string, volume: number): number;
    /**
     * Globally mutes a user in the channel - Requires Admin Token!
     */
    muteUser(accountHandle: string, channelUri: string, participantUri: string, mute: boolean): number;
    /**
     * Globally kicks a user from the channel - Requires Admin Token!
     */
    kickUser(accountHandle: string, channelUri: string, participantUri: string): number;
    /**
     * Injects a .wav file into the channel (simulates your mic).
     */
    injectAudio(accountHandle: string, filename: string): number;
    /**
     * Stops audio injection.
     */
    stopAudioInjection(accountHandle: string): number;
    /**
     * Updates your or a participant's 3D position (X, Y, Z).
     */
    set3DPosition(accountHandle: string, posX: number, posY: number, posZ: number, channelUri: string): number;
    /**
     * Shuts down and cleans up the SDK.
     */
    uninitialize(): void;
}
/**
 * Vivox Utility Functions
 */
export declare const VivoxUtils: {
    /**
     * Translates a status code to a readable name.
     */
    getErrorName(statusCode: number): string;
    /**
     * Translates a login state code to a readable name.
     */
    getLoginStateName(state: number): string;
    /**
     * Translates a connection state code to a readable name.
     */
    getConnectionStateName(state: number): string;
    /**
     * Generates an account URI (SIP format).
     */
    generateAccountUri(domain: string, userId: string, environmentDomain: string): string;
    /**
     * Generates a channel URI (SIP format).
     */
    generateChannelUri(domain: string, channelId: string, environmentDomain: string): string;
    /**
     * Generates a Session Handle for a channel.
     */
    generateSessionHandle(channelUri: string): string;
};
declare const defaultInstance: Vivox;
export default defaultInstance;
