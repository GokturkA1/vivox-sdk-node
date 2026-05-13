# Vivox SDK Node.js Wrapper

A high-performance, fully type-safe Node.js C++ addon for the Vivox SDK. This wrapper provides an asynchronous, EventEmitter-based API to integrate Vivox voice and text chat into your Node.js applications.

## Features

- **Asynchronous Event Loop:** Native C++ thread handles Vivox messages and dispatches them to Node.js via `ThreadSafeFunction`.
- **Full TypeScript Support:** Includes comprehensive interfaces for all events, status codes, and SDK enums.
- **Strict Error Handling:** Automatically resolves numerical status codes into official Vivox SDK error names (e.g., `VX_E_ACCESSTOKEN_ALREADY_USED`).
- **Memory Safe:** Implements proper lifecycle management for requests and internal SDK messages to prevent leaks.
- **Local Moderation:** Built-in methods for local muting, user volume control, and microphone muting.
- **Audio Injection:** Support for streaming mono 16-bit PCM WAV files into channels.
- **Positional Audio:** Simple 3D spatial audio positioning support.

## Project Structure

The project has been optimized to be lightweight. The core SDK binaries and headers are stored locally within the package, making it portable and easy to install.

## Installation

```bash
npm install vivox-sdk-node
```

*Note: The native addon will automatically compile during installation if build tools (Python, Visual Studio/C++) are available.*

## Quick Start

```javascript
const vivox = require('vivox-sdk-node');
const { VivoxUtils, VivoxError, VivoxLoginState } = require('vivox-sdk-node');

// 1. Initialize the SDK
vivox.initialize();

// 2. Setup Event Listeners
vivox.on('loginStateChange', (data) => {
    console.log(`Login State: ${VivoxUtils.getLoginStateName(data.state)}`);
});

vivox.on('joinSuccess', (event) => {
    console.log('Successfully joined the channel!');
    
    // Set local mic volume to 100%
    vivox.setLocalMicVolume(100);
});

vivox.on('message', (m) => {
    console.log(`[CHAT] ${m.participant_uri}: ${m.message}`);
});

// 3. Create Connector and Start Flow
vivox.connectorCreate("https://your-vivox-server.com/app", "main_connector");
// After connectorCreated event, call vivox.loginAnonymous() or vivox.login()
```

## Local Moderation Examples

```javascript
// Mute yourself (other players won't hear you)
vivox.muteLocalMic("main_connector", true);

// Mute a specific participant locally (for you only)
vivox.setParticipantMute(sessionHandle, "sip:target-user@domain", true);

// Adjust volume of a specific participant
vivox.setParticipantVolume(sessionHandle, "sip:target-user@domain", 50);
```

## Audio Injection

Inject a `.wav` file (must be 16-bit PCM, Mono, matching channel sample rate):

```javascript
vivox.injectAudio(accountHandle, "path/to/audio.wav");
```

## Scripts

- `npm run build`: Rebuild the native C++ addon.
- `npm run compile`: Recompile the TypeScript wrapper.
- `npm test`: Run the standard connection example.

## License

This project is licensed under the MIT License.
Vivox SDK is a trademark of Unity Technologies.
