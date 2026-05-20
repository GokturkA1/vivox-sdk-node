"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VivoxUtils = exports.Vivox = exports.VivoxAudioStreamCategory = exports.VivoxBluetoothProfile = exports.VivoxUDPFrameType = exports.VivoxBackendType = exports.VivoxReqDispositionType = exports.VivoxPasswordHashAlgorithm = exports.VivoxAudioDeviceHotSwapEventType = exports.VivoxNetworkMessageType = exports.VivoxParticipantDiagnosticState = exports.VivoxChangeType = exports.VivoxAudioInjectionControlType = exports.VivoxRecordingControlType = exports.VivoxLogType = exports.VivoxSessionHandleType = exports.VivoxConnectorMode = exports.VivoxAttemptStun = exports.VivoxLogLevel = exports.VivoxMessageType = exports.VivoxSessionTextState = exports.VivoxSessionMediaState = exports.VivoxParticipantRemovedReason = exports.VivoxConnectionState = exports.VivoxLoginState = exports.VivoxError = void 0;
const events_1 = require("events");
// Load the C++ Addon
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vivoxsdk = require('./build/Release/vivoxsdk.node');
/**
 * Vivox SDK Error Codes
 */
var VivoxError;
(function (VivoxError) {
    VivoxError[VivoxError["VX_E_SUCCESS"] = 0] = "VX_E_SUCCESS";
    VivoxError[VivoxError["VX_E_NO_MESSAGE_AVAILABLE"] = -1] = "VX_E_NO_MESSAGE_AVAILABLE";
    VivoxError[VivoxError["VX_E_INVALID_XML"] = 1000] = "VX_E_INVALID_XML";
    VivoxError[VivoxError["VX_E_NO_EXIST"] = 1001] = "VX_E_NO_EXIST";
    VivoxError[VivoxError["VX_E_MAX_CONNECTOR_LIMIT_EXCEEDED"] = 1002] = "VX_E_MAX_CONNECTOR_LIMIT_EXCEEDED";
    VivoxError[VivoxError["VX_E_MAX_SESSION_LIMIT_EXCEEDED"] = 1003] = "VX_E_MAX_SESSION_LIMIT_EXCEEDED";
    VivoxError[VivoxError["VX_E_FAILED"] = 1004] = "VX_E_FAILED";
    VivoxError[VivoxError["VX_E_ALREADY_LOGGED_IN"] = 1005] = "VX_E_ALREADY_LOGGED_IN";
    VivoxError[VivoxError["VX_E_INVALID_ARGUMENT"] = 1008] = "VX_E_INVALID_ARGUMENT";
    VivoxError[VivoxError["VX_E_INVALID_USERNAME_OR_PASSWORD"] = 1009] = "VX_E_INVALID_USERNAME_OR_PASSWORD";
    VivoxError[VivoxError["VX_E_INSUFFICIENT_PRIVILEGE"] = 1010] = "VX_E_INSUFFICIENT_PRIVILEGE";
    VivoxError[VivoxError["VX_E_NO_SUCH_SESSION"] = 1011] = "VX_E_NO_SUCH_SESSION";
    VivoxError[VivoxError["VX_E_NOT_INITIALIZED"] = 1012] = "VX_E_NOT_INITIALIZED";
    VivoxError[VivoxError["VX_E_LOGIN_FAILED"] = 1014] = "VX_E_LOGIN_FAILED";
    VivoxError[VivoxError["VX_E_WRONG_CONNECTOR"] = 1016] = "VX_E_WRONG_CONNECTOR";
    VivoxError[VivoxError["VX_E_RTP_TIMEOUT"] = 1058] = "VX_E_RTP_TIMEOUT";
    VivoxError[VivoxError["VX_E_INVALID_AUTH_TOKEN"] = 1082] = "VX_E_INVALID_AUTH_TOKEN";
    VivoxError[VivoxError["VX_E_ACCESSTOKEN_ALREADY_USED"] = 20120] = "VX_E_ACCESSTOKEN_ALREADY_USED";
    VivoxError[VivoxError["VX_E_ACCESSTOKEN_EXPIRED"] = 20121] = "VX_E_ACCESSTOKEN_EXPIRED";
    VivoxError[VivoxError["VX_E_ACCESSTOKEN_INVALID_SIGNATURE"] = 20122] = "VX_E_ACCESSTOKEN_INVALID_SIGNATURE";
    VivoxError[VivoxError["VX_E_ACCESSTOKEN_CLAIMS_MISMATCH"] = 20123] = "VX_E_ACCESSTOKEN_CLAIMS_MISMATCH";
    VivoxError[VivoxError["VX_E_ACCESSTOKEN_MALFORMED"] = 20124] = "VX_E_ACCESSTOKEN_MALFORMED";
    // V5 Aliases
    VivoxError[VivoxError["VxErrorSuccess"] = 0] = "VxErrorSuccess";
    VivoxError[VivoxError["VxErrorFailed"] = 1004] = "VxErrorFailed";
    VivoxError[VivoxError["VxErrorInvalidArgument"] = 1008] = "VxErrorInvalidArgument";
    VivoxError[VivoxError["VxErrorNotLoggedIn"] = 5025] = "VxErrorNotLoggedIn";
    VivoxError[VivoxError["VxErrorTargetObjectDoesNotExist"] = 1001] = "VxErrorTargetObjectDoesNotExist";
    VivoxError[VivoxError["VxErrorNotInitialized"] = 1012] = "VxErrorNotInitialized";
    VivoxError[VivoxError["VxErrorAlreadyInitialized"] = 1085] = "VxErrorAlreadyInitialized";
})(VivoxError || (exports.VivoxError = VivoxError = {}));
/**
 * Login states
 */
var VivoxLoginState;
(function (VivoxLoginState) {
    VivoxLoginState[VivoxLoginState["LoggedOut"] = 0] = "LoggedOut";
    VivoxLoginState[VivoxLoginState["LoggedIn"] = 1] = "LoggedIn";
    VivoxLoginState[VivoxLoginState["LoggingIn"] = 2] = "LoggingIn";
    VivoxLoginState[VivoxLoginState["LoggingOut"] = 3] = "LoggingOut";
    VivoxLoginState[VivoxLoginState["Resetting"] = 4] = "Resetting";
    VivoxLoginState[VivoxLoginState["Error"] = 100] = "Error";
})(VivoxLoginState || (exports.VivoxLoginState = VivoxLoginState = {}));
/**
 * Network connection states
 */
var VivoxConnectionState;
(function (VivoxConnectionState) {
    VivoxConnectionState[VivoxConnectionState["Disconnected"] = 0] = "Disconnected";
    VivoxConnectionState[VivoxConnectionState["Connected"] = 1] = "Connected";
    VivoxConnectionState[VivoxConnectionState["Recovering"] = 3] = "Recovering";
    VivoxConnectionState[VivoxConnectionState["FailedToRecover"] = 4] = "FailedToRecover";
    VivoxConnectionState[VivoxConnectionState["Recovered"] = 5] = "Recovered";
})(VivoxConnectionState || (exports.VivoxConnectionState = VivoxConnectionState = {}));
/**
 * Participant removal reasons
 */
var VivoxParticipantRemovedReason;
(function (VivoxParticipantRemovedReason) {
    VivoxParticipantRemovedReason[VivoxParticipantRemovedReason["Left"] = 0] = "Left";
    VivoxParticipantRemovedReason[VivoxParticipantRemovedReason["Timeout"] = 1] = "Timeout";
    VivoxParticipantRemovedReason[VivoxParticipantRemovedReason["Kicked"] = 2] = "Kicked";
    VivoxParticipantRemovedReason[VivoxParticipantRemovedReason["Banned"] = 3] = "Banned";
})(VivoxParticipantRemovedReason || (exports.VivoxParticipantRemovedReason = VivoxParticipantRemovedReason = {}));
/**
 * Session media (audio) states
 */
var VivoxSessionMediaState;
(function (VivoxSessionMediaState) {
    VivoxSessionMediaState[VivoxSessionMediaState["Disconnected"] = 1] = "Disconnected";
    VivoxSessionMediaState[VivoxSessionMediaState["Connected"] = 2] = "Connected";
    VivoxSessionMediaState[VivoxSessionMediaState["Ringing"] = 3] = "Ringing";
    VivoxSessionMediaState[VivoxSessionMediaState["Connecting"] = 6] = "Connecting";
    VivoxSessionMediaState[VivoxSessionMediaState["Disconnecting"] = 7] = "Disconnecting";
})(VivoxSessionMediaState || (exports.VivoxSessionMediaState = VivoxSessionMediaState = {}));
/**
 * Session text states
 */
var VivoxSessionTextState;
(function (VivoxSessionTextState) {
    VivoxSessionTextState[VivoxSessionTextState["Disconnected"] = 0] = "Disconnected";
    VivoxSessionTextState[VivoxSessionTextState["Connected"] = 1] = "Connected";
    VivoxSessionTextState[VivoxSessionTextState["Connecting"] = 2] = "Connecting";
    VivoxSessionTextState[VivoxSessionTextState["Disconnecting"] = 3] = "Disconnecting";
})(VivoxSessionTextState || (exports.VivoxSessionTextState = VivoxSessionTextState = {}));
/**
 * SDK Message Types
 */
var VivoxMessageType;
(function (VivoxMessageType) {
    VivoxMessageType[VivoxMessageType["None"] = 0] = "None";
    VivoxMessageType[VivoxMessageType["Request"] = 1] = "Request";
    VivoxMessageType[VivoxMessageType["Response"] = 2] = "Response";
    VivoxMessageType[VivoxMessageType["Event"] = 3] = "Event";
})(VivoxMessageType || (exports.VivoxMessageType = VivoxMessageType = {}));
/**
 * SDK Log Levels
 */
var VivoxLogLevel;
(function (VivoxLogLevel) {
    VivoxLogLevel[VivoxLogLevel["None"] = -1] = "None";
    VivoxLogLevel[VivoxLogLevel["Error"] = 0] = "Error";
    VivoxLogLevel[VivoxLogLevel["Warning"] = 1] = "Warning";
    VivoxLogLevel[VivoxLogLevel["Info"] = 2] = "Info";
    VivoxLogLevel[VivoxLogLevel["Debug"] = 3] = "Debug";
    VivoxLogLevel[VivoxLogLevel["Trace"] = 4] = "Trace";
    VivoxLogLevel[VivoxLogLevel["All"] = 5] = "All";
})(VivoxLogLevel || (exports.VivoxLogLevel = VivoxLogLevel = {}));
/**
 * STUN attempt settings
 */
var VivoxAttemptStun;
(function (VivoxAttemptStun) {
    VivoxAttemptStun[VivoxAttemptStun["Unspecified"] = 0] = "Unspecified";
    VivoxAttemptStun[VivoxAttemptStun["On"] = 1] = "On";
    VivoxAttemptStun[VivoxAttemptStun["Off"] = 2] = "Off";
})(VivoxAttemptStun || (exports.VivoxAttemptStun = VivoxAttemptStun = {}));
/**
 * Connector modes
 */
var VivoxConnectorMode;
(function (VivoxConnectorMode) {
    VivoxConnectorMode[VivoxConnectorMode["Normal"] = 0] = "Normal";
    VivoxConnectorMode[VivoxConnectorMode["Legacy"] = 1] = "Legacy";
})(VivoxConnectorMode || (exports.VivoxConnectorMode = VivoxConnectorMode = {}));
/**
 * Session handle types
 */
var VivoxSessionHandleType;
(function (VivoxSessionHandleType) {
    VivoxSessionHandleType[VivoxSessionHandleType["Unique"] = 0] = "Unique";
    VivoxSessionHandleType[VivoxSessionHandleType["Legacy"] = 1] = "Legacy";
    VivoxSessionHandleType[VivoxSessionHandleType["HierarchicalNumeric"] = 2] = "HierarchicalNumeric";
    VivoxSessionHandleType[VivoxSessionHandleType["HierarchicalUnique"] = 3] = "HierarchicalUnique";
})(VivoxSessionHandleType || (exports.VivoxSessionHandleType = VivoxSessionHandleType = {}));
/**
 * Log types
 */
var VivoxLogType;
(function (VivoxLogType) {
    VivoxLogType[VivoxLogType["None"] = 0] = "None";
    VivoxLogType[VivoxLogType["File"] = 1] = "File";
    VivoxLogType[VivoxLogType["Callback"] = 2] = "Callback";
    VivoxLogType[VivoxLogType["FileAndCallback"] = 3] = "FileAndCallback";
})(VivoxLogType || (exports.VivoxLogType = VivoxLogType = {}));
/**
 * Recording control types
 */
var VivoxRecordingControlType;
(function (VivoxRecordingControlType) {
    VivoxRecordingControlType[VivoxRecordingControlType["Stop"] = 0] = "Stop";
    VivoxRecordingControlType[VivoxRecordingControlType["Start"] = 1] = "Start";
    VivoxRecordingControlType[VivoxRecordingControlType["FlushToFile"] = 2] = "FlushToFile";
})(VivoxRecordingControlType || (exports.VivoxRecordingControlType = VivoxRecordingControlType = {}));
/**
 * Audio injection control types
 */
var VivoxAudioInjectionControlType;
(function (VivoxAudioInjectionControlType) {
    VivoxAudioInjectionControlType[VivoxAudioInjectionControlType["Stop"] = 0] = "Stop";
    VivoxAudioInjectionControlType[VivoxAudioInjectionControlType["Start"] = 1] = "Start";
    VivoxAudioInjectionControlType[VivoxAudioInjectionControlType["Restart"] = 2] = "Restart";
})(VivoxAudioInjectionControlType || (exports.VivoxAudioInjectionControlType = VivoxAudioInjectionControlType = {}));
/**
 * Change types (for buddy/group events)
 */
var VivoxChangeType;
(function (VivoxChangeType) {
    VivoxChangeType[VivoxChangeType["Set"] = 1] = "Set";
    VivoxChangeType[VivoxChangeType["Delete"] = 2] = "Delete";
})(VivoxChangeType || (exports.VivoxChangeType = VivoxChangeType = {}));
/**
 * Participant diagnostic states
 */
var VivoxParticipantDiagnosticState;
(function (VivoxParticipantDiagnosticState) {
    VivoxParticipantDiagnosticState[VivoxParticipantDiagnosticState["SpeakingWhileMicMuted"] = 1] = "SpeakingWhileMicMuted";
    VivoxParticipantDiagnosticState[VivoxParticipantDiagnosticState["SpeakingWhileMicVolumeZero"] = 2] = "SpeakingWhileMicVolumeZero";
    VivoxParticipantDiagnosticState[VivoxParticipantDiagnosticState["NoCaptureDevice"] = 3] = "NoCaptureDevice";
    VivoxParticipantDiagnosticState[VivoxParticipantDiagnosticState["NoRenderDevice"] = 4] = "NoRenderDevice";
    VivoxParticipantDiagnosticState[VivoxParticipantDiagnosticState["CaptureDeviceReadErrors"] = 5] = "CaptureDeviceReadErrors";
    VivoxParticipantDiagnosticState[VivoxParticipantDiagnosticState["RenderDeviceWriteErrors"] = 6] = "RenderDeviceWriteErrors";
})(VivoxParticipantDiagnosticState || (exports.VivoxParticipantDiagnosticState = VivoxParticipantDiagnosticState = {}));
/**
 * Network message types
 */
var VivoxNetworkMessageType;
(function (VivoxNetworkMessageType) {
    VivoxNetworkMessageType[VivoxNetworkMessageType["OfflineMessage"] = 1] = "OfflineMessage";
    VivoxNetworkMessageType[VivoxNetworkMessageType["AdminMessage"] = 2] = "AdminMessage";
    VivoxNetworkMessageType[VivoxNetworkMessageType["SessionlessMessage"] = 3] = "SessionlessMessage";
})(VivoxNetworkMessageType || (exports.VivoxNetworkMessageType = VivoxNetworkMessageType = {}));
/**
 * Audio device hot swap event types
 */
var VivoxAudioDeviceHotSwapEventType;
(function (VivoxAudioDeviceHotSwapEventType) {
    VivoxAudioDeviceHotSwapEventType[VivoxAudioDeviceHotSwapEventType["DisabledDueToPlatformConstraints"] = 0] = "DisabledDueToPlatformConstraints";
    VivoxAudioDeviceHotSwapEventType[VivoxAudioDeviceHotSwapEventType["ActiveRenderDeviceChanged"] = 1] = "ActiveRenderDeviceChanged";
    VivoxAudioDeviceHotSwapEventType[VivoxAudioDeviceHotSwapEventType["ActiveCaptureDeviceChanged"] = 2] = "ActiveCaptureDeviceChanged";
    VivoxAudioDeviceHotSwapEventType[VivoxAudioDeviceHotSwapEventType["AudioDeviceAdded"] = 3] = "AudioDeviceAdded";
    VivoxAudioDeviceHotSwapEventType[VivoxAudioDeviceHotSwapEventType["AudioDeviceRemoved"] = 4] = "AudioDeviceRemoved";
})(VivoxAudioDeviceHotSwapEventType || (exports.VivoxAudioDeviceHotSwapEventType = VivoxAudioDeviceHotSwapEventType = {}));
/**
 * Password hash algorithms
 */
var VivoxPasswordHashAlgorithm;
(function (VivoxPasswordHashAlgorithm) {
    VivoxPasswordHashAlgorithm[VivoxPasswordHashAlgorithm["Cleartext"] = 0] = "Cleartext";
    VivoxPasswordHashAlgorithm[VivoxPasswordHashAlgorithm["Sha1UsernameHash"] = 1] = "Sha1UsernameHash";
})(VivoxPasswordHashAlgorithm || (exports.VivoxPasswordHashAlgorithm = VivoxPasswordHashAlgorithm = {}));
/**
 * Request disposition types
 */
var VivoxReqDispositionType;
(function (VivoxReqDispositionType) {
    VivoxReqDispositionType[VivoxReqDispositionType["ReplyRequired"] = 0] = "ReplyRequired";
    VivoxReqDispositionType[VivoxReqDispositionType["NoReplyRequired"] = 1] = "NoReplyRequired";
})(VivoxReqDispositionType || (exports.VivoxReqDispositionType = VivoxReqDispositionType = {}));
/**
 * Backend types
 */
var VivoxBackendType;
(function (VivoxBackendType) {
    VivoxBackendType[VivoxBackendType["Unknown"] = -1] = "Unknown";
    VivoxBackendType[VivoxBackendType["SIP"] = 0] = "SIP";
    VivoxBackendType[VivoxBackendType["XMPP"] = 1] = "XMPP";
})(VivoxBackendType || (exports.VivoxBackendType = VivoxBackendType = {}));
/**
 * UDP frame types
 */
var VivoxUDPFrameType;
(function (VivoxUDPFrameType) {
    VivoxUDPFrameType[VivoxUDPFrameType["RTP"] = 0] = "RTP";
    VivoxUDPFrameType[VivoxUDPFrameType["RTCP"] = 1] = "RTCP";
    VivoxUDPFrameType[VivoxUDPFrameType["SIPMessage"] = 2] = "SIPMessage";
    VivoxUDPFrameType[VivoxUDPFrameType["SIPKeepalive"] = 3] = "SIPKeepalive";
})(VivoxUDPFrameType || (exports.VivoxUDPFrameType = VivoxUDPFrameType = {}));
/**
 * Bluetooth profiles
 */
var VivoxBluetoothProfile;
(function (VivoxBluetoothProfile) {
    VivoxBluetoothProfile[VivoxBluetoothProfile["A2DP"] = 0] = "A2DP";
    VivoxBluetoothProfile[VivoxBluetoothProfile["HFP"] = 1] = "HFP";
})(VivoxBluetoothProfile || (exports.VivoxBluetoothProfile = VivoxBluetoothProfile = {}));
/**
 * Audio stream categories
 */
var VivoxAudioStreamCategory;
(function (VivoxAudioStreamCategory) {
    VivoxAudioStreamCategory[VivoxAudioStreamCategory["Normal"] = 0] = "Normal";
    VivoxAudioStreamCategory[VivoxAudioStreamCategory["GameChat"] = 1] = "GameChat";
    VivoxAudioStreamCategory[VivoxAudioStreamCategory["Communications"] = 2] = "Communications";
    VivoxAudioStreamCategory[VivoxAudioStreamCategory["Max"] = 3] = "Max";
})(VivoxAudioStreamCategory || (exports.VivoxAudioStreamCategory = VivoxAudioStreamCategory = {}));
/**
 * Vivox SDK Node.js Wrapper
 * Wraps the C++ addon and provides a user-friendly, asynchronous, EventEmitter-based API.
 */
class Vivox extends events_1.EventEmitter {
    constructor() {
        super();
        this.addon = vivoxsdk;
        this.initialized = false;
    }
    /**
     * Returns the current Vivox SDK version info.
     */
    getVersion() {
        return this.addon.getVersion();
    }
    /**
     * Initializes the Vivox SDK.
     * Must be called before any other functions.
     * @returns {number} 0 on success, otherwise an error code.
     */
    initialize() {
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
    _setupInternalCallback() {
        this.addon.setEventCallback((event) => {
            this.emit('raw', event);
            if (event.type === VivoxMessageType.Response)
                this._handleResponse(event);
            else if (event.type === VivoxMessageType.Event)
                this._handleEvent(event);
        });
    }
    _handleResponse(event) {
        const status = event.status ?? -1;
        const payload = {
            status,
            status_name: exports.VivoxUtils.getErrorName(status),
            status_string: event.status_string
        };
        switch (event.resp_type) {
            case 1: // resp_connector_create
                this.emit('connectorCreated', payload);
                break;
            case 131: // resp_account_anonymous_login
            case 132: // resp_account_authtoken_login
                if (status === 0)
                    this.emit('loginSuccess', payload);
                else
                    this.emit('loginFailure', payload);
                break;
            case 8: // resp_sessiongroup_add_session
                if (status === 0)
                    this.emit('joinSuccess', payload);
                else
                    this.emit('joinFailure', payload);
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
    _handleEvent(event) {
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
    connectorCreate(server, handle = "default") {
        return this.addon.connectorCreate(server, handle);
    }
    /**
     * Log in with an AuthToken.
     */
    login(connectorHandle, accountUri, token) {
        return this.addon.login(connectorHandle, accountUri, token);
    }
    /**
     * Log in with an Anonymous (guest) token.
     */
    loginAnonymous(connectorHandle, accountUri, token) {
        return this.addon.loginAnonymous(connectorHandle, accountUri, token);
    }
    /**
     * Joins a voice/text channel.
     */
    joinChannel(accountHandle, channelUri, token) {
        return this.addon.joinChannel(accountHandle, channelUri, token);
    }
    /**
     * Sends a text message to the channel.
     */
    sendMessage(sessionHandle, message) {
        return this.addon.sendMessage(sessionHandle, message);
    }
    /**
     * Queries capture (microphone) devices.
     */
    getCaptureDevices() {
        return this.addon.getCaptureDevices();
    }
    /**
     * Activates the target capture device.
     */
    setCaptureDevice(deviceId) {
        return this.addon.setCaptureDevice(deviceId);
    }
    /**
     * Queries render (speaker) devices.
     */
    getRenderDevices() {
        return this.addon.getRenderDevices();
    }
    /**
     * Activates the target render device.
     */
    setRenderDevice(deviceId) {
        return this.addon.setRenderDevice(deviceId);
    }
    /**
     * Sets local microphone volume (0-100).
     */
    setLocalMicVolume(volume) {
        return this.addon.setLocalMicVolume(volume);
    }
    /**
     * Sets local speaker volume (0-100).
     */
    setLocalSpeakerVolume(volume) {
        return this.addon.setLocalSpeakerVolume(volume);
    }
    /**
     * Mutes or unmutes your own microphone. (Others won't hear you)
     */
    muteLocalMic(connectorHandle, mute) {
        return this.addon.muteLocalMic(connectorHandle, mute ? 1 : 0);
    }
    /**
     * Locally mutes or unmutes a specific participant for you.
     */
    setParticipantMute(sessionHandle, participantUri, mute) {
        return this.addon.setParticipantMuteForMe(sessionHandle, participantUri, mute ? 1 : 0);
    }
    /**
     * Sets the local volume (0-100) for a specific participant.
     */
    setParticipantVolume(sessionHandle, participantUri, volume) {
        return this.addon.setParticipantVolumeForMe(sessionHandle, participantUri, volume);
    }
    /**
     * Globally mutes a user in the channel - Requires Admin Token!
     */
    muteUser(accountHandle, channelUri, participantUri, mute) {
        return this.addon.channelMuteUser(accountHandle, channelUri, participantUri, mute ? 1 : 0);
    }
    /**
     * Globally kicks a user from the channel - Requires Admin Token!
     */
    kickUser(accountHandle, channelUri, participantUri) {
        return this.addon.kickUser(accountHandle, channelUri, participantUri);
    }
    /**
     * Injects a .wav file into the channel (simulates your mic).
     */
    injectAudio(accountHandle, filename) {
        return this.addon.startAudioInjection(accountHandle, filename);
    }
    /**
     * Stops audio injection.
     */
    stopAudioInjection(accountHandle) {
        return this.addon.stopAudioInjection(accountHandle);
    }
    /**
     * Updates your or a participant's 3D position (X, Y, Z).
     */
    set3DPosition(accountHandle, posX, posY, posZ, channelUri) {
        const sessionHandle = exports.VivoxUtils.generateSessionHandle(channelUri);
        return this.addon.set3DPosition(accountHandle, posX, posY, posZ, sessionHandle);
    }
    /**
     * Shuts down and cleans up the SDK.
     */
    uninitialize() {
        this.initialized = false;
        this.addon.uninitialize();
    }
}
exports.Vivox = Vivox;
/**
 * Vivox Utility Functions
 */
exports.VivoxUtils = {
    /**
     * Translates a status code to a readable name.
     */
    getErrorName(statusCode) {
        for (const [key, value] of Object.entries(VivoxError)) {
            if (value === statusCode)
                return key;
        }
        return `UNKNOWN_ERROR_${statusCode}`;
    },
    /**
     * Translates a login state code to a readable name.
     */
    getLoginStateName(state) {
        for (const [key, value] of Object.entries(VivoxLoginState)) {
            if (value === state)
                return key;
        }
        return `UNKNOWN_STATE_${state}`;
    },
    /**
     * Translates a connection state code to a readable name.
     */
    getConnectionStateName(state) {
        for (const [key, value] of Object.entries(VivoxConnectionState)) {
            if (value === state)
                return key;
        }
        return `UNKNOWN_CONNECTION_STATE_${state}`;
    },
    /**
     * Generates an account URI (SIP format).
     */
    generateAccountUri(domain, userId, environmentDomain) {
        return `sip:.${domain}.${userId}.@${environmentDomain}`;
    },
    /**
     * Generates a channel URI (SIP format).
     */
    generateChannelUri(domain, channelId, environmentDomain) {
        return `sip:confctl-g-${domain}.${channelId}@${environmentDomain}`;
    },
    /**
     * Generates a Session Handle for a channel.
     */
    generateSessionHandle(channelUri) {
        return `${channelUri}_sess`;
    }
};
const defaultInstance = new Vivox();
exports.default = defaultInstance;
module.exports = defaultInstance; // CommonJS backward compatibility
module.exports.Vivox = Vivox;
module.exports.VivoxUtils = exports.VivoxUtils;
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
