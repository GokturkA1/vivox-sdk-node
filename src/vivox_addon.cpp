#include <napi.h>
#include <Vxc.h>
#include <VxcRequests.h>
#include <VxcResponses.h>
#include <VxcEvents.h>
#include <thread>
#include <atomic>
#include <string>
#include <vector>

class VivoxAddon : public Napi::Addon<VivoxAddon> {
public:
    VivoxAddon(Napi::Env env, Napi::Object exports) {
        DefineAddon(exports, {
            InstanceMethod("initialize", &VivoxAddon::Initialize),
            InstanceMethod("uninitialize", &VivoxAddon::Uninitialize),
            InstanceMethod("getVersion", &VivoxAddon::GetVersion),
            InstanceMethod("setEventCallback", &VivoxAddon::SetEventCallback),
            InstanceMethod("connectorCreate", &VivoxAddon::ConnectorCreate),
            InstanceMethod("login", &VivoxAddon::Login),
            InstanceMethod("joinChannel", &VivoxAddon::JoinChannel),
            InstanceMethod("setCaptureDevice", &VivoxAddon::SetCaptureDevice),
            InstanceMethod("getCaptureDevices", &VivoxAddon::GetCaptureDevices),
            InstanceMethod("setRenderDevice", &VivoxAddon::SetRenderDevice),
            InstanceMethod("getRenderDevices", &VivoxAddon::GetRenderDevices),
            InstanceMethod("loginAnonymous", &VivoxAddon::LoginAnonymous),
            InstanceMethod("setLocalMicVolume", &VivoxAddon::SetLocalMicVolume),
            InstanceMethod("setLocalSpeakerVolume", &VivoxAddon::SetLocalSpeakerVolume),
            InstanceMethod("set3DPosition", &VivoxAddon::Set3DPosition),
            InstanceMethod("sendMessage", &VivoxAddon::SendMessage),
            InstanceMethod("setParticipantMuteForMe", &VivoxAddon::SetParticipantMuteForMe),
            InstanceMethod("setParticipantVolumeForMe", &VivoxAddon::SetParticipantVolumeForMe),
            InstanceMethod("kickUser", &VivoxAddon::KickUser),
            InstanceMethod("channelMuteUser", &VivoxAddon::ChannelMuteUser),
            InstanceMethod("startAudioInjection", &VivoxAddon::StartAudioInjection),
            InstanceMethod("stopAudioInjection", &VivoxAddon::StopAudioInjection),
            InstanceMethod("muteLocalMic", &VivoxAddon::MuteLocalMic)
        });
        m_running = false;
    }

private:
    std::atomic<bool> m_running;
    std::thread m_messageThread;
    Napi::ThreadSafeFunction m_tsfn;

    Napi::Value MuteLocalMic(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        std::string connectorHandle = info[0].As<Napi::String>();
        int mute = info[1].As<Napi::Number>().Int32Value();

        vx_req_connector_mute_local_mic_t *req;
        vx_req_connector_mute_local_mic_create(&req);
        req->connector_handle = vx_strdup(connectorHandle.c_str());
        req->mute_level = mute;

        return Napi::Number::New(env, vx_issue_request(&req->base));
    }

    Napi::Value StartAudioInjection(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        std::string accountHandle = info[0].As<Napi::String>();
        std::string filename = info[1].As<Napi::String>();

        vx_req_sessiongroup_control_audio_injection_t *req;
        vx_req_sessiongroup_control_audio_injection_create(&req);
        
        req->sessiongroup_handle = vx_strdup((accountHandle + "_group").c_str());
        req->audio_injection_control_type = vx_sessiongroup_audio_injection_control_start;
        req->filename = vx_strdup(filename.c_str());

        return Napi::Number::New(env, vx_issue_request(&req->base));
    }

    Napi::Value StopAudioInjection(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        std::string accountHandle = info[0].As<Napi::String>();

        vx_req_sessiongroup_control_audio_injection_t *req;
        vx_req_sessiongroup_control_audio_injection_create(&req);
        
        req->sessiongroup_handle = vx_strdup((accountHandle + "_group").c_str());
        req->audio_injection_control_type = vx_sessiongroup_audio_injection_control_stop;

        return Napi::Number::New(env, vx_issue_request(&req->base));
    }

    Napi::Value KickUser(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        std::string accountHandle = info[0].As<Napi::String>();
        std::string channelUri = info[1].As<Napi::String>();
        std::string participantUri = info[2].As<Napi::String>();

        vx_req_channel_kick_user_t *req;
        vx_req_channel_kick_user_create(&req);
        req->account_handle = vx_strdup(accountHandle.c_str());
        req->channel_uri = vx_strdup(channelUri.c_str());
        req->participant_uri = vx_strdup(participantUri.c_str());

        return Napi::Number::New(env, vx_issue_request(&req->base));
    }

    Napi::Value ChannelMuteUser(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        std::string accountHandle = info[0].As<Napi::String>();
        std::string channelUri = info[1].As<Napi::String>();
        std::string participantUri = info[2].As<Napi::String>();
        int mute = info[3].As<Napi::Number>().Int32Value();

        vx_req_channel_mute_user_t *req;
        vx_req_channel_mute_user_create(&req);
        req->account_handle = vx_strdup(accountHandle.c_str());
        req->channel_uri = vx_strdup(channelUri.c_str());
        req->participant_uri = vx_strdup(participantUri.c_str());
        req->set_muted = mute;

        return Napi::Number::New(env, vx_issue_request(&req->base));
    }

    Napi::Value SendMessage(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        std::string sessionHandle = info[0].As<Napi::String>();
        std::string messageBody = info[1].As<Napi::String>();

        vx_req_session_send_message_t *req;
        vx_req_session_send_message_create(&req);
        req->session_handle = vx_strdup(sessionHandle.c_str());
        req->message_body = vx_strdup(messageBody.c_str());

        int status = vx_issue_request(&req->base);
        return Napi::Number::New(env, status);
    }

    Napi::Value SetParticipantMuteForMe(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        std::string sessionHandle = info[0].As<Napi::String>();
        std::string participantUri = info[1].As<Napi::String>();
        int mute = info[2].As<Napi::Number>().Int32Value();

        vx_req_session_set_participant_mute_for_me_t *req;
        vx_req_session_set_participant_mute_for_me_create(&req);
        req->session_handle = vx_strdup(sessionHandle.c_str());
        req->participant_uri = vx_strdup(participantUri.c_str());
        req->mute = mute;

        int status = vx_issue_request(&req->base);
        return Napi::Number::New(env, status);
    }

    Napi::Value SetParticipantVolumeForMe(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        std::string sessionHandle = info[0].As<Napi::String>();
        std::string participantUri = info[1].As<Napi::String>();
        int volume = info[2].As<Napi::Number>().Int32Value();

        vx_req_session_set_participant_volume_for_me_t *req;
        vx_req_session_set_participant_volume_for_me_create(&req);
        req->session_handle = vx_strdup(sessionHandle.c_str());
        req->participant_uri = vx_strdup(participantUri.c_str());
        req->volume = volume;

        int status = vx_issue_request(&req->base);
        return Napi::Number::New(env, status);
    }

    Napi::Value GetVersion(const Napi::CallbackInfo& info) {
        return Napi::String::New(info.Env(), vx_get_sdk_version_info_ex());
    }

    Napi::Value Initialize(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        vx_sdk_config_t config;
        vx_get_default_config3(&config, sizeof(config));
        
        config.use_access_tokens = 1;
        config.never_rtp_timeout_ms = 15000;
        config.lost_rtp_timeout_ms = 40000;
        
        int status = vx_initialize3(&config, sizeof(config));
        if (status == 0 && !m_running) {
            m_running = true;
            m_messageThread = std::thread(&VivoxAddon::MessageLoop, this);
        }
        return Napi::Number::New(env, status);
    }

    Napi::Value ConnectorCreate(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        std::string server = info[0].As<Napi::String>();
        std::string handle = info.Length() > 1 ? info[1].As<Napi::String>().Utf8Value() : "";

        vx_req_connector_create_t *req;
        vx_req_connector_create_create(&req);
        req->acct_mgmt_server = vx_strdup(server.c_str());
        if (!handle.empty()) {
            req->connector_handle = vx_strdup(handle.c_str());
        }

        int status = vx_issue_request(&req->base);
        return Napi::Number::New(env, status);
    }

    Napi::Value Login(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        std::string connectorHandle = info[0].As<Napi::String>();
        std::string accountUri = info[1].As<Napi::String>();
        std::string token = info[2].As<Napi::String>();

        vx_req_account_authtoken_login_t *req;
        vx_req_account_authtoken_login_create(&req);

        req->connector_handle = vx_strdup(connectorHandle.c_str());
        req->authtoken = vx_strdup(token.c_str());
        req->account_handle = vx_strdup(accountUri.c_str());

        int status = vx_issue_request(&req->base);
        return Napi::Number::New(env, status);
    }

    Napi::Value LoginAnonymous(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        std::string connectorHandle = info[0].As<Napi::String>();
        std::string accountUri = info[1].As<Napi::String>();
        std::string token = info[2].As<Napi::String>();

        vx_req_account_anonymous_login_t *req;
        vx_req_account_anonymous_login_create(&req);

        req->connector_handle = vx_strdup(connectorHandle.c_str());
        req->access_token = vx_strdup(token.c_str());
        req->account_handle = vx_strdup(accountUri.c_str());

        size_t sipPos = accountUri.find("sip:");
        size_t atPos = accountUri.find("@");
        if (sipPos != std::string::npos && atPos != std::string::npos) {
            std::string acctName = accountUri.substr(sipPos + 4, atPos - (sipPos + 4));
            req->acct_name = vx_strdup(acctName.c_str());
        }

        int status = vx_issue_request(&req->base);
        return Napi::Number::New(env, status);
    }

    Napi::Value JoinChannel(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        std::string accountHandle = info[0].As<Napi::String>();
        std::string channelUri = info[1].As<Napi::String>();
        std::string token = info[2].As<Napi::String>();

        vx_req_sessiongroup_add_session_t *req;
        vx_req_sessiongroup_add_session_create(&req);

        req->account_handle = vx_strdup(accountHandle.c_str());
        req->sessiongroup_handle = vx_strdup((accountHandle + "_group").c_str());
        req->session_handle = vx_strdup((channelUri + "_sess").c_str());
        req->uri = vx_strdup(channelUri.c_str());
        req->access_token = vx_strdup(token.c_str());
        
        req->connect_audio = 1;
        req->connect_text = 1;

        int status = vx_issue_request(&req->base);
        return Napi::Number::New(env, status);
    }

    Napi::Value SetCaptureDevice(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        std::string deviceId = info[0].As<Napi::String>();
        vx_req_aux_set_capture_device_t *req;
        vx_req_aux_set_capture_device_create(&req);
        req->capture_device_specifier = vx_strdup(deviceId.c_str());
        return Napi::Number::New(env, vx_issue_request(&req->base));
    }

    Napi::Value GetCaptureDevices(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        vx_req_aux_get_capture_devices_t *req;
        vx_req_aux_get_capture_devices_create(&req);
        return Napi::Number::New(env, vx_issue_request(&req->base));
    }

    Napi::Value SetRenderDevice(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        std::string deviceId = info[0].As<Napi::String>();
        vx_req_aux_set_render_device_t *req;
        vx_req_aux_set_render_device_create(&req);
        req->render_device_specifier = vx_strdup(deviceId.c_str());
        return Napi::Number::New(env, vx_issue_request(&req->base));
    }

    Napi::Value GetRenderDevices(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        vx_req_aux_get_render_devices_t *req;
        vx_req_aux_get_render_devices_create(&req);
        return Napi::Number::New(env, vx_issue_request(&req->base));
    }

    Napi::Value SetLocalMicVolume(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        int volume = info[0].As<Napi::Number>().Int32Value();
        vx_req_connector_set_local_mic_volume_t *req;
        vx_req_connector_set_local_mic_volume_create(&req);
        req->volume = volume;
        return Napi::Number::New(env, vx_issue_request(&req->base));
    }

    Napi::Value SetLocalSpeakerVolume(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        int volume = info[0].As<Napi::Number>().Int32Value();
        vx_req_connector_set_local_speaker_volume_t *req;
        vx_req_connector_set_local_speaker_volume_create(&req);
        req->volume = volume;
        return Napi::Number::New(env, vx_issue_request(&req->base));
    }

    Napi::Value Set3DPosition(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        double posX = info[1].As<Napi::Number>().DoubleValue();
        double posY = info[2].As<Napi::Number>().DoubleValue();
        double posZ = info[3].As<Napi::Number>().DoubleValue();
        std::string sessionHandle = info[4].As<Napi::String>();

        vx_req_session_set_3d_position_t *req;
        vx_req_session_set_3d_position_create(&req);
        req->session_handle = vx_strdup(sessionHandle.c_str());

        req->speaker_position[0] = posX;
        req->speaker_position[1] = posY;
        req->speaker_position[2] = posZ;
        
        req->listener_position[0] = posX;
        req->listener_position[1] = posY;
        req->listener_position[2] = posZ;

        req->speaker_at_orientation[2] = -1.0;
        req->speaker_up_orientation[1] = 1.0;
        req->speaker_left_orientation[0] = -1.0;
        
        req->listener_at_orientation[2] = -1.0;
        req->listener_up_orientation[1] = 1.0;
        req->listener_left_orientation[0] = -1.0;

        return Napi::Number::New(env, vx_issue_request(&req->base));
    }

    Napi::Value Uninitialize(const Napi::CallbackInfo& info) {
        m_running = false;
        if (m_messageThread.joinable()) m_messageThread.join();
        vx_uninitialize();
        if (m_tsfn) {
            m_tsfn.Release();
            m_tsfn = nullptr;
        }
        return info.Env().Undefined();
    }

    Napi::Value SetEventCallback(const Napi::CallbackInfo& info) {
        if (m_tsfn) {
            m_tsfn.Release();
        }
        m_tsfn = Napi::ThreadSafeFunction::New(info.Env(), info[0].As<Napi::Function>(), "VivoxCB", 0, 1);
        return info.Env().Undefined();
    }

    void MessageLoop() {
        while (m_running) {
            vx_message_base_t *msg = nullptr;
            if (vx_get_message(&msg) == 0 && msg != nullptr) {
                m_tsfn.BlockingCall(msg, [](Napi::Env env, Napi::Function jsCb, vx_message_base_t* m) {
                    Napi::HandleScope scope(env);
                    Napi::Object obj = Napi::Object::New(env);
                    obj.Set("type", (double)m->type);
                    
                    if (m->type == msg_response) {
                        vx_resp_base_t *resp = (vx_resp_base_t*)m;
                        obj.Set("resp_type", (double)resp->type);
                        obj.Set("status", (double)resp->status_code);
                        if (resp->status_string) obj.Set("status_string", resp->status_string);

                        if (resp->type == resp_aux_get_capture_devices) {
                            vx_resp_aux_get_capture_devices_t *dResp = (vx_resp_aux_get_capture_devices_t*)m;
                            Napi::Array devices = Napi::Array::New(env, dResp->count);
                            for (int i = 0; i < dResp->count; ++i) {
                                Napi::Object dev = Napi::Object::New(env);
                                if (dResp->capture_devices[i]->display_name) dev.Set("name", dResp->capture_devices[i]->display_name);
                                if (dResp->capture_devices[i]->device) dev.Set("id", dResp->capture_devices[i]->device);
                                devices.Set(i, dev);
                            }
                            obj.Set("devices", devices);
                        } else if (resp->type == resp_aux_get_render_devices) {
                            vx_resp_aux_get_render_devices_t *dResp = (vx_resp_aux_get_render_devices_t*)m;
                            Napi::Array devices = Napi::Array::New(env, dResp->count);
                            for (int i = 0; i < dResp->count; ++i) {
                                Napi::Object dev = Napi::Object::New(env);
                                if (dResp->render_devices[i]->display_name) dev.Set("name", dResp->render_devices[i]->display_name);
                                if (dResp->render_devices[i]->device) dev.Set("id", dResp->render_devices[i]->device);
                                devices.Set(i, dev);
                            }
                            obj.Set("devices", devices);
                        }
                    } else if (m->type == msg_event) {
                        vx_evt_base_t *evt = (vx_evt_base_t*)m;
                        obj.Set("evt_type", (double)evt->type);

                        if (evt->type == evt_account_login_state_change) {
                            vx_evt_account_login_state_change_t *lEvt = (vx_evt_account_login_state_change_t*)m;
                            obj.Set("state", (double)lEvt->state);
                            if (lEvt->account_handle) obj.Set("account_handle", lEvt->account_handle);
                        } else if (evt->type == evt_participant_added) {
                            vx_evt_participant_added_t *pEvt = (vx_evt_participant_added_t*)m;
                            if (pEvt->participant_uri) obj.Set("participant_uri", pEvt->participant_uri);
                            obj.Set("is_current_user", (double)pEvt->is_current_user);
                        } else if (evt->type == evt_participant_removed) {
                            vx_evt_participant_removed_t *pEvt = (vx_evt_participant_removed_t*)m;
                            if (pEvt->participant_uri) obj.Set("participant_uri", pEvt->participant_uri);
                            obj.Set("reason", (double)pEvt->reason);
                        } else if (evt->type == evt_participant_updated) {
                            vx_evt_participant_updated_t *pEvt = (vx_evt_participant_updated_t*)m;
                            if (pEvt->participant_uri) obj.Set("participant_uri", pEvt->participant_uri);
                            obj.Set("is_speaking", (double)pEvt->is_speaking);
                            obj.Set("energy", pEvt->energy);
                        } else if (evt->type == evt_connection_state_changed) {
                            vx_evt_connection_state_changed_t *cEvt = (vx_evt_connection_state_changed_t*)m;
                            obj.Set("connection_state", (double)cEvt->connection_state);
                        } else if (evt->type == evt_message) {
                            vx_evt_message_t *mEvt = (vx_evt_message_t*)m;
                            if (mEvt->participant_uri) obj.Set("participant_uri", mEvt->participant_uri);
                            if (mEvt->message_body) obj.Set("message", mEvt->message_body);
                            if (mEvt->session_handle) obj.Set("session_handle", mEvt->session_handle);
                        }
                    }
                    
                    jsCb.Call({obj});
                    vx_destroy_message(m);
                });
            } else {
                std::this_thread::sleep_for(std::chrono::milliseconds(10));
            }
        }
    }
};

NODE_API_ADDON(VivoxAddon)
