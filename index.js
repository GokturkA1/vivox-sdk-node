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
    VivoxError[VivoxError["VX_E_ALREADY_LOGGED_OUT"] = 1006] = "VX_E_ALREADY_LOGGED_OUT";
    VivoxError[VivoxError["VX_E_NOT_LOGGED_IN"] = 1007] = "VX_E_NOT_LOGGED_IN";
    VivoxError[VivoxError["VX_E_INVALID_ARGUMENT"] = 1008] = "VX_E_INVALID_ARGUMENT";
    VivoxError[VivoxError["VX_E_INVALID_USERNAME_OR_PASSWORD"] = 1009] = "VX_E_INVALID_USERNAME_OR_PASSWORD";
    VivoxError[VivoxError["VX_E_INSUFFICIENT_PRIVILEGE"] = 1010] = "VX_E_INSUFFICIENT_PRIVILEGE";
    VivoxError[VivoxError["VX_E_NO_SUCH_SESSION"] = 1011] = "VX_E_NO_SUCH_SESSION";
    VivoxError[VivoxError["VX_E_NOT_INITIALIZED"] = 1012] = "VX_E_NOT_INITIALIZED";
    VivoxError[VivoxError["VX_E_REQUESTCONTEXT_NOT_FOUND"] = 1013] = "VX_E_REQUESTCONTEXT_NOT_FOUND";
    VivoxError[VivoxError["VX_E_LOGIN_FAILED"] = 1014] = "VX_E_LOGIN_FAILED";
    VivoxError[VivoxError["VX_E_SESSION_MAX"] = 1015] = "VX_E_SESSION_MAX";
    VivoxError[VivoxError["VX_E_WRONG_CONNECTOR"] = 1016] = "VX_E_WRONG_CONNECTOR";
    VivoxError[VivoxError["VX_E_NOT_IMPL"] = 1017] = "VX_E_NOT_IMPL";
    VivoxError[VivoxError["VX_E_REQUEST_CANCELLED"] = 1018] = "VX_E_REQUEST_CANCELLED";
    VivoxError[VivoxError["VX_E_INVALID_SESSION_STATE"] = 1019] = "VX_E_INVALID_SESSION_STATE";
    VivoxError[VivoxError["VX_E_SESSION_CREATE_PENDING"] = 1020] = "VX_E_SESSION_CREATE_PENDING";
    VivoxError[VivoxError["VX_E_SESSION_TERMINATE_PENDING"] = 1021] = "VX_E_SESSION_TERMINATE_PENDING";
    VivoxError[VivoxError["VX_E_SESSION_CHANNEL_TEXT_DENIED"] = 1022] = "VX_E_SESSION_CHANNEL_TEXT_DENIED";
    VivoxError[VivoxError["VX_E_SESSION_TEXT_DENIED"] = 1023] = "VX_E_SESSION_TEXT_DENIED";
    VivoxError[VivoxError["VX_E_SESSION_MESSAGE_BUILD_FAILED"] = 1024] = "VX_E_SESSION_MESSAGE_BUILD_FAILED";
    VivoxError[VivoxError["VX_E_SESSION_MSG_CONTENT_TYPE_FAILED"] = 1025] = "VX_E_SESSION_MSG_CONTENT_TYPE_FAILED";
    VivoxError[VivoxError["VX_E_SESSION_MEDIA_CONNECT_FAILED"] = 1026] = "VX_E_SESSION_MEDIA_CONNECT_FAILED";
    VivoxError[VivoxError["VX_E_SESSION_DOES_NOT_HAVE_TEXT"] = 1027] = "VX_E_SESSION_DOES_NOT_HAVE_TEXT";
    VivoxError[VivoxError["VX_E_SESSION_DOES_NOT_HAVE_AUDIO"] = 1028] = "VX_E_SESSION_DOES_NOT_HAVE_AUDIO";
    VivoxError[VivoxError["VX_E_SESSION_MUST_HAVE_MEDIA"] = 1029] = "VX_E_SESSION_MUST_HAVE_MEDIA";
    VivoxError[VivoxError["VX_E_SESSION_IS_NOT_3D"] = 1030] = "VX_E_SESSION_IS_NOT_3D";
    VivoxError[VivoxError["VX_E_SESSIONGROUP_NOT_FOUND"] = 1031] = "VX_E_SESSIONGROUP_NOT_FOUND";
    VivoxError[VivoxError["VX_E_REQUEST_TYPE_NOT_SUPPORTED"] = 1032] = "VX_E_REQUEST_TYPE_NOT_SUPPORTED";
    VivoxError[VivoxError["VX_E_REQUEST_NOT_SUPPORTED"] = 1033] = "VX_E_REQUEST_NOT_SUPPORTED";
    VivoxError[VivoxError["VX_E_MULTI_CHANNEL_DENIED"] = 1034] = "VX_E_MULTI_CHANNEL_DENIED";
    VivoxError[VivoxError["VX_E_MEDIA_DISCONNECT_NOT_ALLOWED"] = 1035] = "VX_E_MEDIA_DISCONNECT_NOT_ALLOWED";
    VivoxError[VivoxError["VX_E_PRELOGIN_INFO_NOT_RETURNED"] = 1036] = "VX_E_PRELOGIN_INFO_NOT_RETURNED";
    VivoxError[VivoxError["VX_E_SUBSCRIPTION_NOT_FOUND"] = 1037] = "VX_E_SUBSCRIPTION_NOT_FOUND";
    VivoxError[VivoxError["VX_E_INVALID_SUBSCRIPTION_RULE_TYPE"] = 1038] = "VX_E_INVALID_SUBSCRIPTION_RULE_TYPE";
    VivoxError[VivoxError["VX_E_INVALID_MASK"] = 1040] = "VX_E_INVALID_MASK";
    VivoxError[VivoxError["VX_E_INVALID_CONNECTOR_STATE"] = 1041] = "VX_E_INVALID_CONNECTOR_STATE";
    VivoxError[VivoxError["VX_E_BUFSIZE"] = 1042] = "VX_E_BUFSIZE";
    VivoxError[VivoxError["VX_E_FILE_OPEN_FAILED"] = 1043] = "VX_E_FILE_OPEN_FAILED";
    VivoxError[VivoxError["VX_E_FILE_CORRUPT"] = 1044] = "VX_E_FILE_CORRUPT";
    VivoxError[VivoxError["VX_E_FILE_WRITE_FAILED"] = 1045] = "VX_E_FILE_WRITE_FAILED";
    VivoxError[VivoxError["VX_E_INVALID_FILE_OPERATION"] = 1046] = "VX_E_INVALID_FILE_OPERATION";
    VivoxError[VivoxError["VX_E_NO_MORE_FRAMES"] = 1047] = "VX_E_NO_MORE_FRAMES";
    VivoxError[VivoxError["VX_E_UNEXPECTED_END_OF_FILE"] = 1048] = "VX_E_UNEXPECTED_END_OF_FILE";
    VivoxError[VivoxError["VX_E_FILE_WRITE_FAILED_REACHED_MAX_FILESIZE"] = 1049] = "VX_E_FILE_WRITE_FAILED_REACHED_MAX_FILESIZE";
    VivoxError[VivoxError["VX_E_TERMINATESESSION_NOT_VALID"] = 1050] = "VX_E_TERMINATESESSION_NOT_VALID";
    VivoxError[VivoxError["VX_E_MAX_PLAYBACK_SESSIONGROUPS_EXCEEDED"] = 1051] = "VX_E_MAX_PLAYBACK_SESSIONGROUPS_EXCEEDED";
    VivoxError[VivoxError["VX_E_TEXT_DISCONNECT_NOT_ALLOWED"] = 1052] = "VX_E_TEXT_DISCONNECT_NOT_ALLOWED";
    VivoxError[VivoxError["VX_E_TEXT_CONNECT_NOT_ALLOWED"] = 1053] = "VX_E_TEXT_CONNECT_NOT_ALLOWED";
    VivoxError[VivoxError["VX_E_SESSION_TEXT_DISABLED"] = 1055] = "VX_E_SESSION_TEXT_DISABLED";
    VivoxError[VivoxError["VX_E_SESSIONGROUP_TRANSMIT_NOT_ALLOWED"] = 1056] = "VX_E_SESSIONGROUP_TRANSMIT_NOT_ALLOWED";
    VivoxError[VivoxError["VX_E_CALL_CREATION_FAILED"] = 1057] = "VX_E_CALL_CREATION_FAILED";
    VivoxError[VivoxError["VX_E_RTP_TIMEOUT"] = 1058] = "VX_E_RTP_TIMEOUT";
    VivoxError[VivoxError["VX_E_ACCOUNT_MISCONFIGURED"] = 1059] = "VX_E_ACCOUNT_MISCONFIGURED";
    VivoxError[VivoxError["VX_E_MAXIMUM_NUMBER_OF_CALLS_EXCEEEDED"] = 1060] = "VX_E_MAXIMUM_NUMBER_OF_CALLS_EXCEEEDED";
    VivoxError[VivoxError["VX_E_NO_SESSION_PORTS_AVAILABLE"] = 1061] = "VX_E_NO_SESSION_PORTS_AVAILABLE";
    VivoxError[VivoxError["VX_E_INVALID_MEDIA_FORMAT"] = 1062] = "VX_E_INVALID_MEDIA_FORMAT";
    VivoxError[VivoxError["VX_E_INVALID_CODEC_TYPE"] = 1063] = "VX_E_INVALID_CODEC_TYPE";
    VivoxError[VivoxError["VX_E_RENDER_DEVICE_DOES_NOT_EXIST"] = 1064] = "VX_E_RENDER_DEVICE_DOES_NOT_EXIST";
    VivoxError[VivoxError["VX_E_RENDER_CONTEXT_DOES_NOT_EXIST"] = 1065] = "VX_E_RENDER_CONTEXT_DOES_NOT_EXIST";
    VivoxError[VivoxError["VX_E_RENDER_SOURCE_DOES_NOT_EXIST"] = 1067] = "VX_E_RENDER_SOURCE_DOES_NOT_EXIST";
    VivoxError[VivoxError["VX_E_RECORDING_ALREADY_ACTIVE"] = 1068] = "VX_E_RECORDING_ALREADY_ACTIVE";
    VivoxError[VivoxError["VX_E_RECORDING_LOOP_BUFFER_EMPTY"] = 1069] = "VX_E_RECORDING_LOOP_BUFFER_EMPTY";
    VivoxError[VivoxError["VX_E_STREAM_READ_FAILED"] = 1070] = "VX_E_STREAM_READ_FAILED";
    VivoxError[VivoxError["VX_E_INVALID_SDK_HANDLE"] = 1071] = "VX_E_INVALID_SDK_HANDLE";
    VivoxError[VivoxError["VX_E_FAILED_TO_CONNECT_TO_VOICE_SERVICE"] = 1072] = "VX_E_FAILED_TO_CONNECT_TO_VOICE_SERVICE";
    VivoxError[VivoxError["VX_E_FAILED_TO_SEND_REQUEST_TO_VOICE_SERVICE"] = 1073] = "VX_E_FAILED_TO_SEND_REQUEST_TO_VOICE_SERVICE";
    VivoxError[VivoxError["VX_E_MAX_LOGINS_PER_USER_EXCEEDED"] = 1074] = "VX_E_MAX_LOGINS_PER_USER_EXCEEDED";
    VivoxError[VivoxError["VX_E_MAX_HTTP_DATA_RESPONSE_SIZE_EXCEEDED"] = 1075] = "VX_E_MAX_HTTP_DATA_RESPONSE_SIZE_EXCEEDED";
    VivoxError[VivoxError["VX_E_CHANNEL_URI_REQUIRED"] = 1076] = "VX_E_CHANNEL_URI_REQUIRED";
    VivoxError[VivoxError["VX_E_INVALID_CAPTURE_DEVICE_FOR_REQUESTED_OPERATION"] = 1077] = "VX_E_INVALID_CAPTURE_DEVICE_FOR_REQUESTED_OPERATION";
    VivoxError[VivoxError["VX_E_LOOP_MODE_RECORDING_NOT_ENABLED"] = 1078] = "VX_E_LOOP_MODE_RECORDING_NOT_ENABLED";
    VivoxError[VivoxError["VX_E_TEXT_DISABLED"] = 1079] = "VX_E_TEXT_DISABLED";
    VivoxError[VivoxError["VX_E_VOICE_FONT_NOT_FOUND"] = 1080] = "VX_E_VOICE_FONT_NOT_FOUND";
    VivoxError[VivoxError["VX_E_CROSS_DOMAIN_LOGINS_DISABLED"] = 1081] = "VX_E_CROSS_DOMAIN_LOGINS_DISABLED";
    VivoxError[VivoxError["VX_E_INVALID_AUTH_TOKEN"] = 1082] = "VX_E_INVALID_AUTH_TOKEN";
    VivoxError[VivoxError["VX_E_INVALID_APP_TOKEN"] = 1083] = "VX_E_INVALID_APP_TOKEN";
    VivoxError[VivoxError["VX_E_CAPACITY_EXCEEDED"] = 1084] = "VX_E_CAPACITY_EXCEEDED";
    VivoxError[VivoxError["VX_E_ALREADY_INITIALIZED"] = 1085] = "VX_E_ALREADY_INITIALIZED";
    VivoxError[VivoxError["VX_E_NOT_UNINITIALIZED_YET"] = 1086] = "VX_E_NOT_UNINITIALIZED_YET";
    VivoxError[VivoxError["VX_E_NETWORK_ADDRESS_CHANGE"] = 1087] = "VX_E_NETWORK_ADDRESS_CHANGE";
    VivoxError[VivoxError["VX_E_NETWORK_DOWN"] = 1088] = "VX_E_NETWORK_DOWN";
    VivoxError[VivoxError["VX_E_POWER_STATE_CHANGE"] = 1089] = "VX_E_POWER_STATE_CHANGE";
    VivoxError[VivoxError["VX_E_HANDLE_ALREADY_TAKEN"] = 1090] = "VX_E_HANDLE_ALREADY_TAKEN";
    VivoxError[VivoxError["VX_E_HANDLE_IS_RESERVED"] = 1091] = "VX_E_HANDLE_IS_RESERVED";
    VivoxError[VivoxError["VX_E_XNETCONNECT_FAILED"] = 1093] = "VX_E_XNETCONNECT_FAILED";
    VivoxError[VivoxError["VX_E_REQUEST_CANCELED"] = 1094] = "VX_E_REQUEST_CANCELED";
    VivoxError[VivoxError["VX_E_CALL_TERMINATED_NO_RTP_RXED"] = 1095] = "VX_E_CALL_TERMINATED_NO_RTP_RXED";
    VivoxError[VivoxError["VX_E_CALL_TERMINATED_NO_ANSWER_LOCAL"] = 1096] = "VX_E_CALL_TERMINATED_NO_ANSWER_LOCAL";
    VivoxError[VivoxError["VX_E_CHANNEL_URI_TOO_LONG"] = 1097] = "VX_E_CHANNEL_URI_TOO_LONG";
    VivoxError[VivoxError["VX_E_CALL_TERMINATED_BAN"] = 1098] = "VX_E_CALL_TERMINATED_BAN";
    VivoxError[VivoxError["VX_E_CALL_TERMINATED_KICK"] = 1099] = "VX_E_CALL_TERMINATED_KICK";
    VivoxError[VivoxError["VX_E_CALL_TERMINATED_BY_SERVER"] = 1100] = "VX_E_CALL_TERMINATED_BY_SERVER";
    VivoxError[VivoxError["VX_E_ALREADY_EXIST"] = 1101] = "VX_E_ALREADY_EXIST";
    VivoxError[VivoxError["VX_E_FEATURE_DISABLED"] = 1102] = "VX_E_FEATURE_DISABLED";
    VivoxError[VivoxError["VX_E_SIZE_LIMIT_EXCEEDED"] = 1103] = "VX_E_SIZE_LIMIT_EXCEEDED";
    VivoxError[VivoxError["VX_E_RTP_SESSION_SOCKET_ERROR"] = 1104] = "VX_E_RTP_SESSION_SOCKET_ERROR";
    VivoxError[VivoxError["VX_E_SIP_BACKEND_REQUIRED"] = 1105] = "VX_E_SIP_BACKEND_REQUIRED";
    VivoxError[VivoxError["VX_E_DEPRECATED"] = 1106] = "VX_E_DEPRECATED";
    VivoxError[VivoxError["VX_E_NO_RENDER_DEVICES_FOUND"] = 7001] = "VX_E_NO_RENDER_DEVICES_FOUND";
    VivoxError[VivoxError["VX_E_NO_CAPTURE_DEVICES_FOUND"] = 7002] = "VX_E_NO_CAPTURE_DEVICES_FOUND";
    VivoxError[VivoxError["VX_E_INVALID_RENDER_DEVICE_SPECIFIER"] = 7003] = "VX_E_INVALID_RENDER_DEVICE_SPECIFIER";
    VivoxError[VivoxError["VX_E_RENDER_DEVICE_IN_USE"] = 7004] = "VX_E_RENDER_DEVICE_IN_USE";
    VivoxError[VivoxError["VX_E_INVALID_CAPTURE_DEVICE_SPECIFIER"] = 7005] = "VX_E_INVALID_CAPTURE_DEVICE_SPECIFIER";
    VivoxError[VivoxError["VX_E_CAPTURE_DEVICE_IN_USE"] = 7006] = "VX_E_CAPTURE_DEVICE_IN_USE";
    VivoxError[VivoxError["VX_E_UNABLE_TO_OPEN_CAPTURE_DEVICE"] = 7009] = "VX_E_UNABLE_TO_OPEN_CAPTURE_DEVICE";
    VivoxError[VivoxError["VX_E_FAILED_TO_CONNECT_TO_SERVER"] = 10007] = "VX_E_FAILED_TO_CONNECT_TO_SERVER";
    VivoxError[VivoxError["VX_E_ACCESSTOKEN_ALREADY_USED"] = 20120] = "VX_E_ACCESSTOKEN_ALREADY_USED";
    VivoxError[VivoxError["VX_E_ACCESSTOKEN_EXPIRED"] = 20121] = "VX_E_ACCESSTOKEN_EXPIRED";
    VivoxError[VivoxError["VX_E_ACCESSTOKEN_INVALID_SIGNATURE"] = 20122] = "VX_E_ACCESSTOKEN_INVALID_SIGNATURE";
    VivoxError[VivoxError["VX_E_ACCESSTOKEN_CLAIMS_MISMATCH"] = 20123] = "VX_E_ACCESSTOKEN_CLAIMS_MISMATCH";
    VivoxError[VivoxError["VX_E_ACCESSTOKEN_MALFORMED"] = 20124] = "VX_E_ACCESSTOKEN_MALFORMED";
    VivoxError[VivoxError["VX_E_ACCESSTOKEN_INTERNAL_ERROR"] = 20125] = "VX_E_ACCESSTOKEN_INTERNAL_ERROR";
    VivoxError[VivoxError["VX_E_ACCESSTOKEN_SERVICE_UNAVAILABLE"] = 20127] = "VX_E_ACCESSTOKEN_SERVICE_UNAVAILABLE";
    VivoxError[VivoxError["VX_E_ACCESSTOKEN_ISSUER_MISMATCH"] = 20128] = "VX_E_ACCESSTOKEN_ISSUER_MISMATCH";
    // V5 Error Aliases & New Codes
    VivoxError[VivoxError["VxErrorSuccess"] = 0] = "VxErrorSuccess";
    VivoxError[VivoxError["VxErrorFailed"] = 1004] = "VxErrorFailed";
    VivoxError[VivoxError["VxErrorAsyncOperationCanceled"] = 5001] = "VxErrorAsyncOperationCanceled";
    VivoxError[VivoxError["VxErrorCaptureDeviceInUse"] = 5002] = "VxErrorCaptureDeviceInUse";
    VivoxError[VivoxError["VxErrorConnectionTerminated"] = 5003] = "VxErrorConnectionTerminated";
    VivoxError[VivoxError["VxErrorHandleReserved"] = 5005] = "VxErrorHandleReserved";
    VivoxError[VivoxError["VxErrorHandleTaken"] = 5006] = "VxErrorHandleTaken";
    VivoxError[VivoxError["VxErrorInvalidArgument"] = 1008] = "VxErrorInvalidArgument";
    VivoxError[VivoxError["VxErrorInvalidFormat"] = 5009] = "VxErrorInvalidFormat";
    VivoxError[VivoxError["VxErrorInvalidOperation"] = 5010] = "VxErrorInvalidOperation";
    VivoxError[VivoxError["VxErrorInvalidState"] = 1019] = "VxErrorInvalidState";
    VivoxError[VivoxError["VxErrorNoMemory"] = 5015] = "VxErrorNoMemory";
    VivoxError[VivoxError["VxErrorNoMoreData"] = 5016] = "VxErrorNoMoreData";
    VivoxError[VivoxError["VxErrorNotSupported"] = 5018] = "VxErrorNotSupported";
    VivoxError[VivoxError["VxErrorPortNotAvailable"] = 5019] = "VxErrorPortNotAvailable";
    VivoxError[VivoxError["VxErrorUnableToOpenCaptureDevice"] = 5021] = "VxErrorUnableToOpenCaptureDevice";
    VivoxError[VivoxError["VxErrorXmppBackEndRequired"] = 5023] = "VxErrorXmppBackEndRequired";
    VivoxError[VivoxError["VxErrorPreloginDownloadFailed"] = 5024] = "VxErrorPreloginDownloadFailed";
    VivoxError[VivoxError["VxErrorNotLoggedIn"] = 5025] = "VxErrorNotLoggedIn";
    VivoxError[VivoxError["VxErrorPresenceMustBeEnabled"] = 5026] = "VxErrorPresenceMustBeEnabled";
    VivoxError[VivoxError["VxErrorConnectorLimitExceeded"] = 5027] = "VxErrorConnectorLimitExceeded";
    VivoxError[VivoxError["VxErrorTargetObjectNotRelated"] = 5028] = "VxErrorTargetObjectNotRelated";
    VivoxError[VivoxError["VxErrorTargetObjectDoesNotExist"] = 1001] = "VxErrorTargetObjectDoesNotExist";
    VivoxError[VivoxError["VxErrorMaxLoginsPerUserExceeded"] = 5030] = "VxErrorMaxLoginsPerUserExceeded";
    VivoxError[VivoxError["VxErrorRequestCanceled"] = 5031] = "VxErrorRequestCanceled";
    VivoxError[VivoxError["VxErrorBuddyDoesNotExist"] = 5032] = "VxErrorBuddyDoesNotExist";
    VivoxError[VivoxError["VxErrorChannelUriRequired"] = 5033] = "VxErrorChannelUriRequired";
    VivoxError[VivoxError["VxErrorTargetObjectAlreadyExists"] = 5034] = "VxErrorTargetObjectAlreadyExists";
    VivoxError[VivoxError["VxErrorInvalidCaptureDeviceForRequestedOperation"] = 5035] = "VxErrorInvalidCaptureDeviceForRequestedOperation";
    VivoxError[VivoxError["VxErrorInvalidCaptureDeviceSpecifier"] = 5036] = "VxErrorInvalidCaptureDeviceSpecifier";
    VivoxError[VivoxError["VxErrorInvalidRenderDeviceSpecifier"] = 5037] = "VxErrorInvalidRenderDeviceSpecifier";
    VivoxError[VivoxError["VxErrorDeviceLimitReached"] = 5038] = "VxErrorDeviceLimitReached";
    VivoxError[VivoxError["VxErrorInvalidEventType"] = 5039] = "VxErrorInvalidEventType";
    VivoxError[VivoxError["VxErrorNotInitialized"] = 1012] = "VxErrorNotInitialized";
    VivoxError[VivoxError["VxErrorAlreadyInitialized"] = 1085] = "VxErrorAlreadyInitialized";
    VivoxError[VivoxError["VxErrorNotImplemented"] = 1017] = "VxErrorNotImplemented";
    VivoxError[VivoxError["VxErrorTimeout"] = 5043] = "VxErrorTimeout";
    VivoxError[VivoxError["VxErrorUserOffLineOrDoesNotExist"] = 5047] = "VxErrorUserOffLineOrDoesNotExist";
    VivoxError[VivoxError["VxErrorCaptureDeviceInvalidated"] = 5048] = "VxErrorCaptureDeviceInvalidated";
    VivoxError[VivoxError["VxErrorMaxEtherChannelLimitReached"] = 5049] = "VxErrorMaxEtherChannelLimitReached";
    VivoxError[VivoxError["VxErrorHostUnknown"] = 5050] = "VxErrorHostUnknown";
    VivoxError[VivoxError["VxErrorChannelUriTooLong"] = 5051] = "VxErrorChannelUriTooLong";
    VivoxError[VivoxError["VxErrorUserUriTooLong"] = 5052] = "VxErrorUserUriTooLong";
    VivoxError[VivoxError["VxErrorInvalidChannelUri"] = 5053] = "VxErrorInvalidChannelUri";
    VivoxError[VivoxError["VxErrorCrossDomainLoginDisabled"] = 5054] = "VxErrorCrossDomainLoginDisabled";
    VivoxError[VivoxError["VxErrorSipRegistrationAuthorizationFailure"] = 5055] = "VxErrorSipRegistrationAuthorizationFailure";
    VivoxError[VivoxError["VxErrorUserAlreadyLoggingOut"] = 5056] = "VxErrorUserAlreadyLoggingOut";
    VivoxError[VivoxError["VxErrorBuddyGroupDoesNotExist"] = 5057] = "VxErrorBuddyGroupDoesNotExist";
    VivoxError[VivoxError["VxErrorPowerEvent"] = 5058] = "VxErrorPowerEvent";
    VivoxError[VivoxError["VxErrorNetworkAddressChanged"] = 5059] = "VxErrorNetworkAddressChanged";
    VivoxError[VivoxError["VxErrorNetworkDown"] = 5060] = "VxErrorNetworkDown";
    VivoxError[VivoxError["VxErrorNotUninitializedYet"] = 1086] = "VxErrorNotUninitializedYet";
    VivoxError[VivoxError["VxErrorCallTerminatedBanned"] = 5098] = "VxErrorCallTerminatedBanned";
    VivoxError[VivoxError["VxErrorCallTerminatedKick"] = 5099] = "VxErrorCallTerminatedKick";
    VivoxError[VivoxError["VxErrorCallTerminatedByServer"] = 5100] = "VxErrorCallTerminatedByServer";
    VivoxError[VivoxError["VxErrorUserBlocked"] = 5102] = "VxErrorUserBlocked";
    VivoxError[VivoxError["VxErrorMessageTextTooLong"] = 5103] = "VxErrorMessageTextTooLong";
    VivoxError[VivoxError["VxErrorNoMicrophonePermission"] = 5104] = "VxErrorNoMicrophonePermission";
    VivoxError[VivoxError["VxErrorMessageTextRateExceeded"] = 5105] = "VxErrorMessageTextRateExceeded";
    VivoxError[VivoxError["VxErrorJobDependencyFailed"] = 5111] = "VxErrorJobDependencyFailed";
    VivoxError[VivoxError["VxErrorTitleDisabled"] = 20129] = "VxErrorTitleDisabled";
    VivoxError[VivoxError["VxErrorXmppServerResponseMalformed"] = 21000] = "VxErrorXmppServerResponseMalformed";
    VivoxError[VivoxError["VxErrorXmppServerResponseBadSdp"] = 21001] = "VxErrorXmppServerResponseBadSdp";
    VivoxError[VivoxError["VxErrorXmppServerResponseInviteMissing"] = 21002] = "VxErrorXmppServerResponseInviteMissing";
    VivoxError[VivoxError["VxErrorXmppServerResponseChanAddMissing"] = 21003] = "VxErrorXmppServerResponseChanAddMissing";
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
