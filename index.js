"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VivoxUtils = exports.Vivox = exports.VivoxLogLevel = exports.VivoxMessageType = exports.VivoxSessionTextState = exports.VivoxSessionMediaState = exports.VivoxParticipantRemovedReason = exports.VivoxConnectionState = exports.VivoxLoginState = exports.VivoxError = void 0;
const events_1 = require("events");
// C++ Eklentisini yüklüyoruz
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vivoxsdk = require('./build/Release/vivoxsdk.node');
/**
 * Vivox SDK Hata Kodları
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
    // V5 Aliasları
    VivoxError[VivoxError["VxErrorSuccess"] = 0] = "VxErrorSuccess";
    VivoxError[VivoxError["VxErrorFailed"] = 1004] = "VxErrorFailed";
    VivoxError[VivoxError["VxErrorInvalidArgument"] = 1008] = "VxErrorInvalidArgument";
    VivoxError[VivoxError["VxErrorNotLoggedIn"] = 5025] = "VxErrorNotLoggedIn";
    VivoxError[VivoxError["VxErrorTargetObjectDoesNotExist"] = 1001] = "VxErrorTargetObjectDoesNotExist";
    VivoxError[VivoxError["VxErrorNotInitialized"] = 1012] = "VxErrorNotInitialized";
    VivoxError[VivoxError["VxErrorAlreadyInitialized"] = 1085] = "VxErrorAlreadyInitialized";
})(VivoxError || (exports.VivoxError = VivoxError = {}));
/**
 * Giriş (Login) durumları
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
 * Ağ bağlantı durumları
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
 * Katılımcının kanaldan ayrılma nedenleri
 */
var VivoxParticipantRemovedReason;
(function (VivoxParticipantRemovedReason) {
    VivoxParticipantRemovedReason[VivoxParticipantRemovedReason["Left"] = 0] = "Left";
    VivoxParticipantRemovedReason[VivoxParticipantRemovedReason["Timeout"] = 1] = "Timeout";
    VivoxParticipantRemovedReason[VivoxParticipantRemovedReason["Kicked"] = 2] = "Kicked";
    VivoxParticipantRemovedReason[VivoxParticipantRemovedReason["Banned"] = 3] = "Banned";
})(VivoxParticipantRemovedReason || (exports.VivoxParticipantRemovedReason = VivoxParticipantRemovedReason = {}));
/**
 * Kanal medya (ses) durumları
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
 * Kanal metin (text) durumları
 */
var VivoxSessionTextState;
(function (VivoxSessionTextState) {
    VivoxSessionTextState[VivoxSessionTextState["Disconnected"] = 0] = "Disconnected";
    VivoxSessionTextState[VivoxSessionTextState["Connected"] = 1] = "Connected";
    VivoxSessionTextState[VivoxSessionTextState["Connecting"] = 2] = "Connecting";
    VivoxSessionTextState[VivoxSessionTextState["Disconnecting"] = 3] = "Disconnecting";
})(VivoxSessionTextState || (exports.VivoxSessionTextState = VivoxSessionTextState = {}));
/**
 * SDK Mesaj Tipleri
 */
var VivoxMessageType;
(function (VivoxMessageType) {
    VivoxMessageType[VivoxMessageType["None"] = 0] = "None";
    VivoxMessageType[VivoxMessageType["Request"] = 1] = "Request";
    VivoxMessageType[VivoxMessageType["Response"] = 2] = "Response";
    VivoxMessageType[VivoxMessageType["Event"] = 3] = "Event";
})(VivoxMessageType || (exports.VivoxMessageType = VivoxMessageType = {}));
/**
 * SDK Log Seviyeleri
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
 * Vivox SDK Node.js Wrapper
 */
class Vivox extends events_1.EventEmitter {
    constructor() {
        super();
        this.addon = vivoxsdk;
        this.initialized = false;
    }
    getVersion() {
        return this.addon.getVersion();
    }
    initialize() {
        const status = this.addon.initialize();
        if (status === 0 && !this.initialized) {
            this.initialized = true;
            this._setupInternalCallback();
        }
        return status;
    }
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
            case 1:
                this.emit('connectorCreated', payload);
                break;
            case 131:
            case 132:
                if (status === 0)
                    this.emit('loginSuccess', payload);
                else
                    this.emit('loginFailure', payload);
                break;
            case 8:
                if (status === 0)
                    this.emit('joinSuccess', payload);
                else
                    this.emit('joinFailure', payload);
                break;
            case 87:
                this.emit('renderDevices', event.devices || []);
                break;
            case 88:
                this.emit('captureDevices', event.devices || []);
                break;
            default: this.emit('response', event);
        }
    }
    _handleEvent(event) {
        switch (event.evt_type) {
            case 2:
                this.emit('loginStateChange', { state: event.state ?? 0, handle: event.account_handle ?? '' });
                break;
            case 26:
                this.emit('participantAdded', { participant_uri: event.participant_uri ?? '', is_current_user: event.is_current_user === 1 });
                break;
            case 27:
                this.emit('participantRemoved', { participant_uri: event.participant_uri ?? '', reason: event.reason ?? 0 });
                break;
            case 28:
                this.emit('participantUpdated', { participant_uri: event.participant_uri ?? '', is_speaking: event.is_speaking === 1, energy: event.energy ?? 0 });
                break;
            case 53:
                this.emit('connectionStateChanged', event.connection_state ?? 0);
                break;
            case 10:
                this.emit('message', { participant_uri: event.participant_uri ?? '', message: event.message ?? '', session_handle: event.session_handle ?? '' });
                break;
            default: this.emit('event', event);
        }
    }
    // --- SDK Methods ---
    connectorCreate(server, handle = "default") { return this.addon.connectorCreate(server, handle); }
    login(connectorHandle, accountUri, token) { return this.addon.login(connectorHandle, accountUri, token); }
    loginAnonymous(connectorHandle, accountUri, token) { return this.addon.loginAnonymous(connectorHandle, accountUri, token); }
    joinChannel(accountHandle, channelUri, token) { return this.addon.joinChannel(accountHandle, channelUri, token); }
    sendMessage(sessionHandle, message) { return this.addon.sendMessage(sessionHandle, message); }
    getCaptureDevices() { return this.addon.getCaptureDevices(); }
    setCaptureDevice(deviceId) { return this.addon.setCaptureDevice(deviceId); }
    getRenderDevices() { return this.addon.getRenderDevices(); }
    setRenderDevice(deviceId) { return this.addon.setRenderDevice(deviceId); }
    setLocalMicVolume(volume) { return this.addon.setLocalMicVolume(volume); }
    setLocalSpeakerVolume(volume) { return this.addon.setLocalSpeakerVolume(volume); }
    muteLocalMic(connectorHandle, mute) { return this.addon.muteLocalMic(connectorHandle, mute ? 1 : 0); }
    setParticipantMute(sessionHandle, participantUri, mute) { return this.addon.setParticipantMuteForMe(sessionHandle, participantUri, mute ? 1 : 0); }
    setParticipantVolume(sessionHandle, participantUri, volume) { return this.addon.setParticipantVolumeForMe(sessionHandle, participantUri, volume); }
    muteUser(accountHandle, channelUri, participantUri, mute) { return this.addon.channelMuteUser(accountHandle, channelUri, participantUri, mute ? 1 : 0); }
    kickUser(accountHandle, channelUri, participantUri) { return this.addon.kickUser(accountHandle, channelUri, participantUri); }
    injectAudio(accountHandle, filename) { return this.addon.startAudioInjection(accountHandle, filename); }
    stopAudioInjection(accountHandle) { return this.addon.stopAudioInjection(accountHandle); }
    set3DPosition(accountHandle, posX, posY, posZ, channelUri) {
        const sessionHandle = `${channelUri}_sess`;
        return this.addon.set3DPosition(accountHandle, posX, posY, posZ, sessionHandle);
    }
    uninitialize() { this.initialized = false; this.addon.uninitialize(); }
}
exports.Vivox = Vivox;
/**
 * Vivox Utility Fonksiyonları
 */
exports.VivoxUtils = {
    getErrorName(statusCode) {
        for (const [key, value] of Object.entries(VivoxError)) {
            if (value === statusCode)
                return key;
        }
        return `UNKNOWN_ERROR_${statusCode}`;
    },
    getLoginStateName(state) {
        for (const [key, value] of Object.entries(VivoxLoginState)) {
            if (value === state)
                return key;
        }
        return `UNKNOWN_STATE_${state}`;
    },
    getConnectionStateName(state) {
        for (const [key, value] of Object.entries(VivoxConnectionState)) {
            if (value === state)
                return key;
        }
        return `UNKNOWN_CONNECTION_STATE_${state}`;
    },
    generateAccountUri(domain, userId, environmentDomain) {
        return `sip:.${domain}.${userId}.@${environmentDomain}`;
    },
    generateChannelUri(domain, channelId, environmentDomain) {
        return `sip:confctl-g-${domain}.${channelId}@${environmentDomain}`;
    },
    generateSessionHandle(channelUri) {
        return `${channelUri}_sess`;
    }
};
const defaultInstance = new Vivox();
exports.default = defaultInstance;
module.exports = defaultInstance;
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
