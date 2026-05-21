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
    VX_E_ALREADY_LOGGED_OUT = 1006,
    VX_E_NOT_LOGGED_IN = 1007,
    VX_E_INVALID_ARGUMENT = 1008,
    VX_E_INVALID_USERNAME_OR_PASSWORD = 1009,
    VX_E_INSUFFICIENT_PRIVILEGE = 1010,
    VX_E_NO_SUCH_SESSION = 1011,
    VX_E_NOT_INITIALIZED = 1012,
    VX_E_REQUESTCONTEXT_NOT_FOUND = 1013,
    VX_E_LOGIN_FAILED = 1014,
    VX_E_SESSION_MAX = 1015,
    VX_E_WRONG_CONNECTOR = 1016,
    VX_E_NOT_IMPL = 1017,
    VX_E_REQUEST_CANCELLED = 1018,
    VX_E_INVALID_SESSION_STATE = 1019,
    VX_E_SESSION_CREATE_PENDING = 1020,
    VX_E_SESSION_TERMINATE_PENDING = 1021,
    VX_E_SESSION_CHANNEL_TEXT_DENIED = 1022,
    VX_E_SESSION_TEXT_DENIED = 1023,
    VX_E_SESSION_MESSAGE_BUILD_FAILED = 1024,
    VX_E_SESSION_MSG_CONTENT_TYPE_FAILED = 1025,
    VX_E_SESSION_MEDIA_CONNECT_FAILED = 1026,
    VX_E_SESSION_DOES_NOT_HAVE_TEXT = 1027,
    VX_E_SESSION_DOES_NOT_HAVE_AUDIO = 1028,
    VX_E_SESSION_MUST_HAVE_MEDIA = 1029,
    VX_E_SESSION_IS_NOT_3D = 1030,
    VX_E_SESSIONGROUP_NOT_FOUND = 1031,
    VX_E_REQUEST_TYPE_NOT_SUPPORTED = 1032,
    VX_E_REQUEST_NOT_SUPPORTED = 1033,
    VX_E_MULTI_CHANNEL_DENIED = 1034,
    VX_E_MEDIA_DISCONNECT_NOT_ALLOWED = 1035,
    VX_E_PRELOGIN_INFO_NOT_RETURNED = 1036,
    VX_E_SUBSCRIPTION_NOT_FOUND = 1037,
    VX_E_INVALID_SUBSCRIPTION_RULE_TYPE = 1038,
    VX_E_INVALID_MASK = 1040,
    VX_E_INVALID_CONNECTOR_STATE = 1041,
    VX_E_BUFSIZE = 1042,
    VX_E_FILE_OPEN_FAILED = 1043,
    VX_E_FILE_CORRUPT = 1044,
    VX_E_FILE_WRITE_FAILED = 1045,
    VX_E_INVALID_FILE_OPERATION = 1046,
    VX_E_NO_MORE_FRAMES = 1047,
    VX_E_UNEXPECTED_END_OF_FILE = 1048,
    VX_E_FILE_WRITE_FAILED_REACHED_MAX_FILESIZE = 1049,
    VX_E_TERMINATESESSION_NOT_VALID = 1050,
    VX_E_MAX_PLAYBACK_SESSIONGROUPS_EXCEEDED = 1051,
    VX_E_TEXT_DISCONNECT_NOT_ALLOWED = 1052,
    VX_E_TEXT_CONNECT_NOT_ALLOWED = 1053,
    VX_E_SESSION_TEXT_DISABLED = 1055,
    VX_E_SESSIONGROUP_TRANSMIT_NOT_ALLOWED = 1056,
    VX_E_CALL_CREATION_FAILED = 1057,
    VX_E_RTP_TIMEOUT = 1058,
    VX_E_ACCOUNT_MISCONFIGURED = 1059,
    VX_E_MAXIMUM_NUMBER_OF_CALLS_EXCEEEDED = 1060,
    VX_E_NO_SESSION_PORTS_AVAILABLE = 1061,
    VX_E_INVALID_MEDIA_FORMAT = 1062,
    VX_E_INVALID_CODEC_TYPE = 1063,
    VX_E_RENDER_DEVICE_DOES_NOT_EXIST = 1064,
    VX_E_RENDER_CONTEXT_DOES_NOT_EXIST = 1065,
    VX_E_RENDER_SOURCE_DOES_NOT_EXIST = 1067,
    VX_E_RECORDING_ALREADY_ACTIVE = 1068,
    VX_E_RECORDING_LOOP_BUFFER_EMPTY = 1069,
    VX_E_STREAM_READ_FAILED = 1070,
    VX_E_INVALID_SDK_HANDLE = 1071,
    VX_E_FAILED_TO_CONNECT_TO_VOICE_SERVICE = 1072,
    VX_E_FAILED_TO_SEND_REQUEST_TO_VOICE_SERVICE = 1073,
    VX_E_MAX_LOGINS_PER_USER_EXCEEDED = 1074,
    VX_E_MAX_HTTP_DATA_RESPONSE_SIZE_EXCEEDED = 1075,
    VX_E_CHANNEL_URI_REQUIRED = 1076,
    VX_E_INVALID_CAPTURE_DEVICE_FOR_REQUESTED_OPERATION = 1077,
    VX_E_LOOP_MODE_RECORDING_NOT_ENABLED = 1078,
    VX_E_TEXT_DISABLED = 1079,
    VX_E_VOICE_FONT_NOT_FOUND = 1080,
    VX_E_CROSS_DOMAIN_LOGINS_DISABLED = 1081,
    VX_E_INVALID_AUTH_TOKEN = 1082,
    VX_E_INVALID_APP_TOKEN = 1083,
    VX_E_CAPACITY_EXCEEDED = 1084,
    VX_E_ALREADY_INITIALIZED = 1085,
    VX_E_NOT_UNINITIALIZED_YET = 1086,
    VX_E_NETWORK_ADDRESS_CHANGE = 1087,
    VX_E_NETWORK_DOWN = 1088,
    VX_E_POWER_STATE_CHANGE = 1089,
    VX_E_HANDLE_ALREADY_TAKEN = 1090,
    VX_E_HANDLE_IS_RESERVED = 1091,
    VX_E_XNETCONNECT_FAILED = 1093,
    VX_E_REQUEST_CANCELED = 1094,
    VX_E_CALL_TERMINATED_NO_RTP_RXED = 1095,
    VX_E_CALL_TERMINATED_NO_ANSWER_LOCAL = 1096,
    VX_E_CHANNEL_URI_TOO_LONG = 1097,
    VX_E_CALL_TERMINATED_BAN = 1098,
    VX_E_CALL_TERMINATED_KICK = 1099,
    VX_E_CALL_TERMINATED_BY_SERVER = 1100,
    VX_E_ALREADY_EXIST = 1101,
    VX_E_FEATURE_DISABLED = 1102,
    VX_E_SIZE_LIMIT_EXCEEDED = 1103,
    VX_E_RTP_SESSION_SOCKET_ERROR = 1104,
    VX_E_SIP_BACKEND_REQUIRED = 1105,
    VX_E_DEPRECATED = 1106,

    VX_E_NO_RENDER_DEVICES_FOUND = 7001,
    VX_E_NO_CAPTURE_DEVICES_FOUND = 7002,
    VX_E_INVALID_RENDER_DEVICE_SPECIFIER = 7003,
    VX_E_RENDER_DEVICE_IN_USE = 7004,
    VX_E_INVALID_CAPTURE_DEVICE_SPECIFIER = 7005,
    VX_E_CAPTURE_DEVICE_IN_USE = 7006,
    VX_E_UNABLE_TO_OPEN_CAPTURE_DEVICE = 7009,

    VX_E_FAILED_TO_CONNECT_TO_SERVER = 10007,

    VX_E_ACCESSTOKEN_ALREADY_USED = 20120,
    VX_E_ACCESSTOKEN_EXPIRED = 20121,
    VX_E_ACCESSTOKEN_INVALID_SIGNATURE = 20122,
    VX_E_ACCESSTOKEN_CLAIMS_MISMATCH = 20123,
    VX_E_ACCESSTOKEN_MALFORMED = 20124,
    VX_E_ACCESSTOKEN_INTERNAL_ERROR = 20125,
    VX_E_ACCESSTOKEN_SERVICE_UNAVAILABLE = 20127,
    VX_E_ACCESSTOKEN_ISSUER_MISMATCH = 20128,

    // V5 Error Aliases & New Codes
    VxErrorSuccess = 0,
    VxErrorFailed = 1004,
    VxErrorAsyncOperationCanceled = 5001,
    VxErrorCaptureDeviceInUse = 5002,
    VxErrorConnectionTerminated = 5003,
    VxErrorHandleReserved = 5005,
    VxErrorHandleTaken = 5006,
    VxErrorInvalidArgument = 1008,
    VxErrorInvalidFormat = 5009,
    VxErrorInvalidOperation = 5010,
    VxErrorInvalidState = 1019,
    VxErrorNoMemory = 5015,
    VxErrorNoMoreData = 5016,
    VxErrorNotSupported = 5018,
    VxErrorPortNotAvailable = 5019,
    VxErrorUnableToOpenCaptureDevice = 5021,
    VxErrorXmppBackEndRequired = 5023,
    VxErrorPreloginDownloadFailed = 5024,
    VxErrorNotLoggedIn = 5025,
    VxErrorPresenceMustBeEnabled = 5026,
    VxErrorConnectorLimitExceeded = 5027,
    VxErrorTargetObjectNotRelated = 5028,
    VxErrorTargetObjectDoesNotExist = 1001,
    VxErrorMaxLoginsPerUserExceeded = 5030,
    VxErrorRequestCanceled = 5031,
    VxErrorBuddyDoesNotExist = 5032,
    VxErrorChannelUriRequired = 5033,
    VxErrorTargetObjectAlreadyExists = 5034,
    VxErrorInvalidCaptureDeviceForRequestedOperation = 5035,
    VxErrorInvalidCaptureDeviceSpecifier = 5036,
    VxErrorInvalidRenderDeviceSpecifier = 5037,
    VxErrorDeviceLimitReached = 5038,
    VxErrorInvalidEventType = 5039,
    VxErrorNotInitialized = 1012,
    VxErrorAlreadyInitialized = 1085,
    VxErrorNotImplemented = 1017,
    VxErrorTimeout = 5043,
    VxErrorUserOffLineOrDoesNotExist = 5047,
    VxErrorCaptureDeviceInvalidated = 5048,
    VxErrorMaxEtherChannelLimitReached = 5049,
    VxErrorHostUnknown = 5050,
    VxErrorChannelUriTooLong = 5051,
    VxErrorUserUriTooLong = 5052,
    VxErrorInvalidChannelUri = 5053,
    VxErrorCrossDomainLoginDisabled = 5054,
    VxErrorSipRegistrationAuthorizationFailure = 5055,
    VxErrorUserAlreadyLoggingOut = 5056,
    VxErrorBuddyGroupDoesNotExist = 5057,
    VxErrorPowerEvent = 5058,
    VxErrorNetworkAddressChanged = 5059,
    VxErrorNetworkDown = 5060,
    VxErrorNotUninitializedYet = 1086,
    VxErrorCallTerminatedBanned = 5098,
    VxErrorCallTerminatedKick = 5099,
    VxErrorCallTerminatedByServer = 5100,
    VxErrorUserBlocked = 5102,
    VxErrorMessageTextTooLong = 5103,
    VxErrorNoMicrophonePermission = 5104,
    VxErrorMessageTextRateExceeded = 5105,
    VxErrorJobDependencyFailed = 5111,
    VxErrorTitleDisabled = 20129,
    VxErrorXmppServerResponseMalformed = 21000,
    VxErrorXmppServerResponseBadSdp = 21001,
    VxErrorXmppServerResponseInviteMissing = 21002,
    VxErrorXmppServerResponseChanAddMissing = 21003
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
 * Noise suppression levels
 */
export enum VivoxNoiseSuppressionLevel {
    Low = 0,
    Moderate = 1,
    High = 2,
    VeryHigh = 3
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
     * Mutes or unmutes all incoming audio (Deafen).
     */
    public muteLocalSpeaker(connectorHandle: string, mute: boolean): number {
        return this.addon.muteLocalSpeaker(connectorHandle, mute ? 1 : 0);
    }

    /**
     * Enables or disables noise suppression.
     */
    public setNoiseSuppression(enabled: boolean, level: VivoxNoiseSuppressionLevel = VivoxNoiseSuppressionLevel.Moderate): number {
        this.addon.setNoiseSuppressionLevel(level);
        return this.addon.setNoiseSuppressionEnabled(enabled ? 1 : 0);
    }

    /**
     * Enables or disables Acoustic Echo Cancellation (AEC).
     */
    public setAec(enabled: boolean): number {
        return this.addon.setAecEnabled(enabled ? 1 : 0);
    }

    /**
     * Enables or disables Automatic Gain Control (AGC).
     */
    public setAgc(enabled: boolean): number {
        return this.addon.setAgcEnabled(enabled ? 1 : 0);
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
     * Globally mutes ALL users in the channel - Requires Admin Token!
     */
    public muteAllUsers(accountHandle: string, channelUri: string, mute: boolean, token: string): number {
        return this.addon.muteAllUsers(accountHandle, channelUri, mute ? 1 : 0, token);
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
module.exports.VivoxNoiseSuppressionLevel = VivoxNoiseSuppressionLevel;
