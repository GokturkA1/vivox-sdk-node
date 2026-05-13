/**
 * Vivox Node.js SDK - Standard Connection Example
 * 
 * Flow:
 * 1. SDK Initialization
 * 2. Connector Creation (Required for connection to Vivox)
 * 3. Anonymous/Auth Login
 * 4. Joining a Channel
 */

const vivox = require('./index');
const { VivoxUtils, VivoxError } = require('./index');

// Note: Ensure you have a valid test_data.json or replace these with your actual credentials
let testData;
try {
    testData = require('./test_data.json')[1];
} catch (e) {
    console.warn('Warning: test_data.json not found. Using dummy placeholders.');
    testData = {
        userId: "test_user",
        channelId: "lobby",
        loginToken: "YOUR_LOGIN_TOKEN",
        channelToken: "YOUR_CHANNEL_TOKEN",
        environmentApiEndpoint: "https://example.vivox.com/app",
        environmentDomain: "v98.vivox.com",
        domain: "example.vivox.com"
    };
}

const { userId, channelId, loginToken, channelToken, environmentApiEndpoint, environmentDomain, domain } = testData;

const accountUri = VivoxUtils.generateAccountUri(domain, userId, environmentDomain);
const channelUri = VivoxUtils.generateChannelUri(domain, channelId, environmentDomain);
const connectorHandle = "main_connector";

console.log('Vivox SDK Version:', vivox.getVersion());

// --- Setup Event Listeners ---

vivox.on('connectorCreated', (event) => {
    if (event.status === VivoxError.VX_E_SUCCESS) {
        console.log('>> Connector created successfully. Logging in...');
        vivox.loginAnonymous(connectorHandle, accountUri, loginToken);
    } else {
        console.error(`>> Connector creation failed: ${event.status_name} (${event.status})`);
    }
});

vivox.on('loginSuccess', (event) => {
    console.log('>> Login successful. Joining channel...');
    vivox.joinChannel(accountUri, channelUri, channelToken);
});

vivox.on('loginFailure', (event) => {
    console.error(`>> Login failed: ${event.status_name} - ${event.status_string || ''}`);
});

vivox.on('joinSuccess', (event) => {
    console.log('>> Successfully joined channel!');
    console.log('>> Channel URI:', channelUri);
    
    // Set local mic/speaker volume
    vivox.setLocalMicVolume(100);
    vivox.setLocalSpeakerVolume(100);
    
    // Mute/Unmute microphone
    vivox.muteLocalMic(connectorHandle, false);

    // Fetch and assign audio devices (Scan)
    vivox.getCaptureDevices();
    vivox.getRenderDevices();

    // Send a text message after 2 seconds
    const sessHandle = VivoxUtils.generateSessionHandle(channelUri);
    setTimeout(() => {
        console.log('>> Sending test message...');
        vivox.sendMessage(sessHandle, "Hello from the typed Vivox Node.js wrapper!");
    }, 2000);
});

vivox.on('joinFailure', (event) => {
    console.error(`>> Failed to join channel: ${event.status_name} (${event.status})`);
});

// Device management
vivox.on('captureDevices', (devices) => {
    console.log(`>> Found ${devices.length} capture devices.`);
    // Example: Auto-select a device containing "Voicemeeter"
    const target = devices.find(d => d.name.includes('Voicemeeter'));
    if (target) {
        console.log('>> Assigning capture device:', target.name);
        vivox.setCaptureDevice(target.id);
    }
});

vivox.on('renderDevices', (devices) => {
    console.log(`>> Found ${devices.length} render devices.`);
    const target = devices.find(d => d.name.includes('Voicemeeter'));
    if (target) {
        console.log('>> Assigning render device:', target.name);
        vivox.setRenderDevice(target.id);
    }
});

// Participant and Message events
vivox.on('participantAdded', (p) => {
    console.log(`[EVENT] Participant Joined: ${p.participant_uri}`);
});

vivox.on('message', (m) => {
    console.log(`[CHAT] ${m.participant_uri}: ${m.message}`);
});

// --- Execution ---

const status = vivox.initialize();
if (status === 0) {
    console.log('Vivox SDK Initialized. Creating connector...');
    vivox.connectorCreate(environmentApiEndpoint, connectorHandle);
} else {
    console.error('Failed to initialize Vivox SDK. Status code:', status);
}

// Keep active for 60 seconds
setTimeout(() => {
    console.log('Shutting down...');
    vivox.uninitialize();
    process.exit(0);
}, 60000);
