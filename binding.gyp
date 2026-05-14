{
  "targets": [
    {
      "target_name": "vivoxsdk",
      "sources": [ "src/vivox_addon.cpp" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "vivox_sdk/include"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "defines": [ 
        "NAPI_DISABLE_CPP_EXCEPTIONS",
        "BUILD_SHARED"
      ],
      "conditions": [
        ['OS=="win"', {
          "msvs_settings": {
            "VCCLCompilerTool": {
              "ExceptionHandling": 1
            }
          },
          "conditions": [
            ['target_arch=="x64"', {
              "libraries": [ "<(module_root_dir)/vivox_sdk/lib/vivoxsdk.lib" ],
              "copies": [
                {
                  "destination": "<(PRODUCT_DIR)",
                  "files": [ "<(module_root_dir)/vivox_sdk/lib/vivoxsdk.dll" ]
                }
              ]
            }],
            ['target_arch=="ia32"', {
              "libraries": [ "<(module_root_dir)/vivox_sdk/lib/vivoxsdk.lib" ],
              "copies": [
                {
                  "destination": "<(PRODUCT_DIR)",
                  "files": [ "<(module_root_dir)/vivox_sdk/lib/vivoxsdk.dll" ]
                }
              ]
            }],
            ['target_arch=="arm64"', {
              "libraries": [ "<(module_root_dir)/vivox_sdk/lib/vivoxsdk.lib" ],
              "copies": [
                {
                  "destination": "<(PRODUCT_DIR)",
                  "files": [ "<(module_root_dir)/vivox_sdk/lib/vivoxsdk.dll" ]
                }
              ]
            }]
          ]
        }]
      ]
    }
  ]
}
