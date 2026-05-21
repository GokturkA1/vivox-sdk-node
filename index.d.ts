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
 * Noise suppression levels
 */
export declare enum VivoxNoiseSuppressionLevel {
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
     * Mutes or unmutes all incoming audio (Deafen).
     */
    muteLocalSpeaker(connectorHandle: string, mute: boolean): number;
    /**
     * Enables or disables noise suppression.
     */
    setNoiseSuppression(enabled: boolean, level?: VivoxNoiseSuppressionLevel): number;
    /**
     * Enables or disables Acoustic Echo Cancellation (AEC).
     */
    setAec(enabled: boolean): number;
    /**
     * Enables or disables Automatic Gain Control (AGC).
     */
    setAgc(enabled: boolean): number;
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
     * Globally mutes ALL users in the channel - Requires Admin Token!
     */
    muteAllUsers(accountHandle: string, channelUri: string, mute: boolean, token: string): number;
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
