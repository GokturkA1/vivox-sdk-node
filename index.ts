import { EventEmitter } from 'events';

// Load the C++ Addon
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vivoxsdk = require('./build/Release/vivoxsdk.node');

/**
 * Vivox SDK Error Codes
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
    
    // V5 Aliases
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
export enum VivoxLoginState {
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
export enum VivoxConnectionState {
    Disconnected = 0,
    Connected = 1,
    Recovering = 3,
    FailedToRecover = 4,
    Recovered = 5
}

/**
 * Participant removal reasons
 */
export enum VivoxParticipantRemovedReason {
    Left = 0,
    Timeout = 1,
    Kicked = 2,
    Banned = 3
}

/**
 * Session media (audio) states
 */
export enum VivoxSessionMediaState {
    Disconnected = 1,
    Connected = 2,
    Ringing = 3,
    Connecting = 6,
    Disconnecting = 7
}

/**
 * Session text states
 */
export enum VivoxSessionTextState {
    Disconnected = 0,
    Connected = 1,
    Connecting = 2,
    Disconnecting = 3
}

/**
 * SDK Message Types
 */
export enum VivoxMessageType {
    None = 0,
    Request = 1,
    Response = 2,
    Event = 3
}

/**
 * SDK Log Levels
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
 * STUN attempt settings
 */
export enum VivoxAttemptStun {
    Unspecified = 0,
    On = 1,
    Off = 2
}

/**
 * Connector modes
 */
export enum VivoxConnectorMode {
    Normal = 0,
    Legacy = 1
}

/**
 * Session handle types
 */
export enum VivoxSessionHandleType {
    Unique = 0,
    Legacy = 1,
    HierarchicalNumeric = 2,
    HierarchicalUnique = 3
}

/**
 * Log types
 */
export enum VivoxLogType {
    None = 0,
    File = 1,
    Callback = 2,
    FileAndCallback = 3
}

/**
 * Recording control types
 */
export enum VivoxRecordingControlType {
    Stop = 0,
    Start = 1,
    FlushToFile = 2
}

/**
 * Audio injection control types
 */
export enum VivoxAudioInjectionControlType {
    Stop = 0,
    Start = 1,
    Restart = 2
}

/**
 * Change types (for buddy/group events)
 */
export enum VivoxChangeType {
    Set = 1,
    Delete = 2
}

/**
 * Participant diagnostic states
 */
export enum VivoxParticipantDiagnosticState {
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
export enum VivoxNetworkMessageType {
    OfflineMessage = 1,
    AdminMessage = 2,
    SessionlessMessage = 3
}

/**
 * Audio device hot swap event types
 */
export enum VivoxAudioDeviceHotSwapEventType {
    DisabledDueToPlatformConstraints = 0,
    ActiveRenderDeviceChanged = 1,
    ActiveCaptureDeviceChanged = 2,
    AudioDeviceAdded = 3,
    AudioDeviceRemoved = 4
}

/**
 * Password hash algorithms
 */
export enum VivoxPasswordHashAlgorithm {
    Cleartext = 0,
    Sha1UsernameHash = 1
}

/**
 * Request disposition types
 */
export enum VivoxReqDispositionType {
    ReplyRequired = 0,
    NoReplyRequired = 1
}

/**
 * Backend types
 */
export enum VivoxBackendType {
    Unknown = -1,
    SIP = 0,
    XMPP = 1
}

/**
 * UDP frame types
 */
export enum VivoxUDPFrameType {
    RTP = 0,
    RTCP = 1,
    SIPMessage = 2,
    SIPKeepalive = 3
}

/**
 * Bluetooth profiles
 */
export enum VivoxBluetoothProfile {
    A2DP = 0,
    HFP = 1
}

/**
 * Audio stream categories
 */
export enum VivoxAudioStreamCategory {
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
export class Vivox extends EventEmitter {
    private addon: any;
    private initialized: boolean;

    constructor() {
        super();
        this.addon = vivoxsdk;
        this.initialized = false;
    }

    /**
     * Returns the current Vivox SDK version info.
     */
    public getVersion(): string {
        return this.addon.getVersion();
    }

    /**
     * Initializes the Vivox SDK.
     * Must be called before any other functions.
     * @returns {number} 0 on success, otherwise an error code.
     */
    public initialize(): number {
        const status = this.addon.initialize();
        if (status === 0 && !this.initialized) {
            this.initialized = true;
            this._setupInternalCallback();
        }
        return status;
    }

    /**
     * Internal: Main bridge listening for messages from C++.
     */
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
            case 1: // resp_connector_create
                this.emit('connectorCreated', payload);
                break;
            case 131: // resp_account_anonymous_login
            case 132: // resp_account_authtoken_login
                if (status === 0) this.emit('loginSuccess', payload);
                else this.emit('loginFailure', payload);
                break;
            case 8: // resp_sessiongroup_add_session
                if (status === 0) this.emit('joinSuccess', payload);
                else this.emit('joinFailure', payload);
                break;
            case 87: // resp_aux_get_render_devices
                this.emit('renderDevices', event.devices || []);
                break;
            case 88: // resp_aux_get_capture_devices
                this.emit('captureDevices', event.devices || []);
                break;
            default:
                this.emit('response', event);
        }
    }

    private _handleEvent(event: VivoxRawEvent): void {
        switch (event.evt_type) {
            case 2: // evt_account_login_state_change
                this.emit('loginStateChange', {
                    state: event.state ?? VivoxLoginState.LoggedOut,
                    handle: event.account_handle ?? ''
                });
                break;
            case 26: // evt_participant_added
                this.emit('participantAdded', {
                    participant_uri: event.participant_uri ?? '',
                    is_current_user: event.is_current_user === 1
                });
                break;
            case 27: // evt_participant_removed
                this.emit('participantRemoved', {
                    participant_uri: event.participant_uri ?? '',
                    reason: event.reason ?? VivoxParticipantRemovedReason.Left
                });
                break;
            case 28: // evt_participant_updated
                this.emit('participantUpdated', {
                    participant_uri: event.participant_uri ?? '',
                    is_speaking: event.is_speaking === 1,
                    energy: event.energy ?? 0
                });
                break;
            case 53: // evt_connection_state_changed
                this.emit('connectionStateChanged', event.connection_state ?? VivoxConnectionState.Disconnected);
                break;
            case 10: // evt_message
                this.emit('message', {
                    participant_uri: event.participant_uri ?? '',
                    message: event.message ?? '',
                    session_handle: event.session_handle ?? ''
                });
                break;
            default:
                this.emit('event', event);
        }
    }

    // --- SDK Methods ---

    /**
     * Creates a new connection (connector).
     */
    public connectorCreate(server: string, handle: string = "default"): number {
        return this.addon.connectorCreate(server, handle);
    }

    /**
     * Log in with an AuthToken.
     */
    public login(connectorHandle: string, accountUri: string, token: string): number {
        return this.addon.login(connectorHandle, accountUri, token);
    }

    /**
     * Log in with an Anonymous (guest) token.
     */
    public loginAnonymous(connectorHandle: string, accountUri: string, token: string): number {
        return this.addon.loginAnonymous(connectorHandle, accountUri, token);
    }

    /**
     * Joins a voice/text channel.
     */
    public joinChannel(accountHandle: string, channelUri: string, token: string): number {
        return this.addon.joinChannel(accountHandle, channelUri, token);
    }

    /**
     * Sends a text message to the channel.
     */
    public sendMessage(sessionHandle: string, message: string): number {
        return this.addon.sendMessage(sessionHandle, message);
    }

    /**
     * Queries capture (microphone) devices.
     */
    public getCaptureDevices(): number {
        return this.addon.getCaptureDevices();
    }

    /**
     * Activates the target capture device.
     */
    public setCaptureDevice(deviceId: string): number {
        return this.addon.setCaptureDevice(deviceId);
    }

    /**
     * Queries render (speaker) devices.
     */
    public getRenderDevices(): number {
        return this.addon.getRenderDevices();
    }

    /**
     * Activates the target render device.
     */
    public setRenderDevice(deviceId: string): number {
        return this.addon.setRenderDevice(deviceId);
    }

    /**
     * Sets local microphone volume (0-100).
     */
    public setLocalMicVolume(volume: number): number {
        return this.addon.setLocalMicVolume(volume);
    }

    /**
     * Sets local speaker volume (0-100).
     */
    public setLocalSpeakerVolume(volume: number): number {
        return this.addon.setLocalSpeakerVolume(volume);
    }

    /**
     * Mutes or unmutes your own microphone. (Others won't hear you)
     */
    public muteLocalMic(connectorHandle: string, mute: boolean): number {
        return this.addon.muteLocalMic(connectorHandle, mute ? 1 : 0);
    }

    /**
     * Locally mutes or unmutes a specific participant for you.
     */
    public setParticipantMute(sessionHandle: string, participantUri: string, mute: boolean): number {
        return this.addon.setParticipantMuteForMe(sessionHandle, participantUri, mute ? 1 : 0);
    }

    /**
     * Sets the local volume (0-100) for a specific participant.
     */
    public setParticipantVolume(sessionHandle: string, participantUri: string, volume: number): number {
        return this.addon.setParticipantVolumeForMe(sessionHandle, participantUri, volume);
    }

    /**
     * Globally mutes a user in the channel - Requires Admin Token!
     */
    public muteUser(accountHandle: string, channelUri: string, participantUri: string, mute: boolean): number {
        return this.addon.channelMuteUser(accountHandle, channelUri, participantUri, mute ? 1 : 0);
    }

    /**
     * Globally kicks a user from the channel - Requires Admin Token!
     */
    public kickUser(accountHandle: string, channelUri: string, participantUri: string): number {
        return this.addon.kickUser(accountHandle, channelUri, participantUri);
    }

    /**
     * Injects a .wav file into the channel (simulates your mic).
     */
    public injectAudio(accountHandle: string, filename: string): number {
        return this.addon.startAudioInjection(accountHandle, filename);
    }

    /**
     * Stops audio injection.
     */
    public stopAudioInjection(accountHandle: string): number {
        return this.addon.stopAudioInjection(accountHandle);
    }

    /**
     * Updates your or a participant's 3D position (X, Y, Z).
     */
    public set3DPosition(accountHandle: string, posX: number, posY: number, posZ: number, channelUri: string): number {
        const sessionHandle = VivoxUtils.generateSessionHandle(channelUri);
        return this.addon.set3DPosition(accountHandle, posX, posY, posZ, sessionHandle);
    }

    /**
     * Shuts down and cleans up the SDK.
     */
    public uninitialize(): void {
        this.initialized = false;
        this.addon.uninitialize();
    }
}

/**
 * Vivox Utility Functions
 */
export const VivoxUtils = {
    /**
     * Translates a status code to a readable name.
     */
    getErrorName(statusCode: number): string {
        for (const [key, value] of Object.entries(VivoxError)) {
            if (value === statusCode) return key;
        }
        return `UNKNOWN_ERROR_${statusCode}`;
    },

    /**
     * Translates a login state code to a readable name.
     */
    getLoginStateName(state: number): string {
        for (const [key, value] of Object.entries(VivoxLoginState)) {
            if (value === state) return key;
        }
        return `UNKNOWN_STATE_${state}`;
    },

    /**
     * Translates a connection state code to a readable name.
     */
    getConnectionStateName(state: number): string {
        for (const [key, value] of Object.entries(VivoxConnectionState)) {
            if (value === state) return key;
        }
        return `UNKNOWN_CONNECTION_STATE_${state}`;
    },

    /**
     * Generates an account URI (SIP format).
     */
    generateAccountUri(domain: string, userId: string, environmentDomain: string): string {
        return `sip:.${domain}.${userId}.@${environmentDomain}`;
    },

    /**
     * Generates a channel URI (SIP format).
     */
    generateChannelUri(domain: string, channelId: string, environmentDomain: string): string {
        return `sip:confctl-g-${domain}.${channelId}@${environmentDomain}`;
    },
    
    /**
     * Generates a Session Handle for a channel.
     */
    generateSessionHandle(channelUri: string): string {
        return `${channelUri}_sess`;
    }
};

const defaultInstance = new Vivox();
export default defaultInstance;
module.exports = defaultInstance; // CommonJS backward compatibility
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
module.exports.VivoxAttemptStun = VivoxAttemptStun;
module.exports.VivoxConnectorMode = VivoxConnectorMode;
module.exports.VivoxSessionHandleType = VivoxSessionHandleType;
module.exports.VivoxLogType = VivoxLogType;
module.exports.VivoxRecordingControlType = VivoxRecordingControlType;
module.exports.VivoxAudioInjectionControlType = VivoxAudioInjectionControlType;
module.exports.VivoxChangeType = VivoxChangeType;
module.exports.VivoxParticipantDiagnosticState = VivoxParticipantDiagnosticState;
module.exports.VivoxNetworkMessageType = VivoxNetworkMessageType;
module.exports.VivoxAudioDeviceHotSwapEventType = VivoxAudioDeviceHotSwapEventType;
module.exports.VivoxPasswordHashAlgorithm = VivoxPasswordHashAlgorithm;
module.exports.VivoxReqDispositionType = VivoxReqDispositionType;
module.exports.VivoxBackendType = VivoxBackendType;
module.exports.VivoxUDPFrameType = VivoxUDPFrameType;
module.exports.VivoxBluetoothProfile = VivoxBluetoothProfile;
module.exports.VivoxAudioStreamCategory = VivoxAudioStreamCategory;
