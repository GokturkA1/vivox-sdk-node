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

## Connection Flow

Vivox requires a specific sequence of operations. You **must** create a connector before attempting to login.

1.  **Initialize:** Call `vivox.initialize()`.
2.  **Setup Listeners:** Listen for `connectorCreated`, `loginSuccess`, and `joinSuccess`.
3.  **Create Connector:** Call `vivox.connectorCreate(serverUrl)`.
4.  **Login:** Inside the `connectorCreated` event, call `vivox.login()` or `vivox.loginAnonymous()`.
5.  **Join:** Inside the `loginSuccess` event, call `vivox.joinChannel()`.

## Quick Start

```javascript
const vivox = require('vivox-sdk-node');
const { VivoxUtils, VivoxError } = require('vivox-sdk-node');

vivox.initialize();

// Step 1: Wait for connector
vivox.on('connectorCreated', (event) => {
    if (event.status === VivoxError.VX_E_SUCCESS) {
        // Step 2: Login
        vivox.loginAnonymous("main_connector", accountUri, LOGIN_TOKEN);
    }
});

vivox.on('loginSuccess', (event) => {
    // Step 3: Join Channel
    vivox.joinChannel(accountUri, channelUri, CHANNEL_TOKEN);
});

// Start the flow
vivox.connectorCreate("https://your-vivox-server.com/app", "main_connector");
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

## Troubleshooting

### `gyp ERR! find VS` or Visual Studio errors
This error occurs when `node-gyp` cannot find the C++ build tools on your system. To fix this:

1.  **Install Build Tools:** Run the following command in an Administrator PowerShell/Command Prompt:
    ```bash
    npm install --global windows-build-tools
    ```
    *Alternatively, install "Desktop development with C++" via the Visual Studio Installer.*

2.  **Manually Set VS Version:** If you have Visual Studio installed but still get the error, pass the version directly during installation (Modern NPM way):
    ```bash
    # Replace 2022 with your installed VS version (e.g., 2019, 2022, 2026)
    npm install vivox-sdk-node --msvs_version=2022
    ```
    Alternatively, set the environment variable:
    ```powershell
    # PowerShell
    $env:GYP_MSVS_VERSION="2022"
    npm install vivox-sdk-node
    ```
    ```cmd
    # Windows CMD
    set GYP_MSVS_VERSION=2022
    npm install vivox-sdk-node
    ```

3.  **Check Python:** Ensure Python 3.x is installed and added to your PATH.

### `module not found` after installation
If you see an error about the native module not being found, ensure you have run `npm install` inside the project to trigger the native build process.

## License

This project is licensed under the MIT License.
Vivox SDK is a trademark of Unity Technologies.
