---
layout: default
title: Android Device Setup
---

# Android device setup

<p class="guide-byline">Step 2 · Device or emulator</p>

Appium talks to Android through the Android SDK and ADB. You can use a physical Android device or an emulator from Android Studio.

## 1. Install Android SDK tools

In Android Studio, open **SDK Manager** and install:

- Android SDK Platform-Tools
- Android SDK Command-line Tools
- Android Emulator
- At least one Android SDK Platform and system image

Set `ANDROID_HOME` or `ANDROID_SDK_ROOT` to your SDK location. Add the SDK's `platform-tools` and `emulator` folders to your PATH.

Typical SDK locations:

| Platform | Default location |
| --- | --- |
| macOS | `~/Library/Android/sdk` |
| Windows | `C:\Users\YOUR_NAME\AppData\Local\Android\Sdk` |

## 2. Connect a device

For a physical device, enable **Developer options** and **USB debugging**, then accept the computer authorization prompt on the device.

For an emulator, create and start an Android Virtual Device from Android Studio's **Device Manager**.

Verify the connection:

```bash
adb devices -l
```

You should see one device with the state `device`. If you see `unauthorized`, unlock the device and approve the USB debugging prompt.

## 3. Install the practice app

Download a sample APK such as ApiDemos from the [external practice-app folder](https://github.com/AppiumGuide/AppiumGuide/tree/main/APK_Files), then install it locally:

```bash
adb install /absolute/path/to/ApiDemos-debug.apk
```

Use the complete local path. This makes the same APK available to Appium Inspector and your Python tests.

## Next

Open [Appium Inspector](appium-inspector.md) and create your first Android session.
