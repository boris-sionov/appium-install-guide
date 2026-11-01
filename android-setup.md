---
layout: default
title: Android Device Setup
---

# Android device setup

<p class="guide-byline">Step 2 · Android</p>

Check the [preparation for both platforms](setup.md#preparation-for-both) first.

Appium talks to Android through the Android SDK and ADB. You can use a physical Android device or an emulator from Android Studio. A real device is the lighter option; an emulator needs a more powerful computer.

The UiAutomator2 driver supports **Android 8.0 (API 26) and newer**, on both real devices and emulators.

## 1. Install Android SDK tools

The **Standard** Android Studio setup from the install guide already installs what Appium needs. To check or add tools later, open **More Actions → SDK Manager**. On the **SDK Platforms** tab, make sure at least one recent Android version is installed. On the **SDK Tools** tab, make sure these are installed:

- Android SDK Build-Tools — UiAutomator2 uses its signing tools
- Android SDK Platform-Tools — includes `adb`
- Android Emulator — only needed for virtual devices
- Android SDK Command-line Tools (optional) — adds `sdkmanager` and `avdmanager`

Set `ANDROID_HOME` to your SDK location and add the SDK's `platform-tools` and `emulator` folders to your PATH. The [Windows](install-windows.md) and [macOS](install-macos.md) guides show exactly how. The SDK Manager window shows the SDK location at the top.

Default SDK locations:

| Platform | Default location |
| --- | --- |
| Windows | `C:\Users\YOUR_NAME\AppData\Local\Android\Sdk` |
| macOS | `~/Library/Android/sdk` |

## 2a. Use a real device

1. Open **Settings → About phone** and tap **Build number** seven times to unlock **Developer options**. The exact menu names vary by manufacturer.
2. In **Developer options**, turn on **USB debugging**.
3. Connect the USB cable. When the **Allow USB debugging?** prompt appears, tick **Always allow from this computer** and tap **Allow**.

On Windows, a Pixel phone needs the **Google USB Driver** from the SDK Manager; other brands need the manufacturer's USB driver if Windows does not install one automatically.

### Optional: see the phone screen on your computer

[scrcpy](https://github.com/Genymobile/scrcpy) mirrors and controls the device over the same USB debugging connection, which is handy while you write tests:

```powershell
winget install Genymobile.scrcpy
```

```bash
brew install scrcpy
```

Then run `scrcpy` with the device connected.

## 2b. Use an emulator

### Check your computer first

| Requirement | Why |
| --- | --- |
| 16 GB RAM recommended (8 GB minimum) | Each running emulator uses several GB of memory. |
| About 10 GB free disk per virtual device | System images and device data are large. |
| CPU virtualization enabled | Without it the emulator is very slow or won't start. |

**Windows:** virtualization (Intel VT-x or AMD-V) must be enabled in the BIOS/UEFI settings. Task Manager → Performance → CPU shows **Virtualization: Enabled** when it is. Also turn on **Windows Hypervisor Platform** under **Turn Windows features on or off**, which the emulator uses for acceleration. Company laptops sometimes have virtualization disabled; ask IT to enable it.

**macOS:** nothing extra is needed. Apple Silicon and Intel Macs use the built-in macOS hypervisor.

### Create the virtual device

1. In Android Studio, open **More Actions → Virtual Device Manager** and click **Create device** (the **+** button).
2. Choose **Phone** and a recent Pixel model.
3. Pick a system image with a recent Android version and **Google APIs**, and click the download icon next to it. On an Apple Silicon Mac, choose an **arm64-v8a** image; on Intel or AMD computers, choose **x86_64**.
4. Give the device a name, finish, and press the **▶** button to start it.

## 3. Verify the connection

```bash
adb devices -l
```

You should see one device with the state `device`. If you see `unauthorized`, unlock the phone and approve the USB debugging prompt. Emulators are listed as `emulator-5554`, `emulator-5556`, and so on.

## 4. Get the practice app

Download `ApiDemos-debug.apk` from the [official Appium ApiDemos release](https://github.com/appium/android-apidemos/releases/latest) and save it somewhere permanent, such as an `apps` folder in your home directory. Note its full path: Appium Inspector and your Python tests both use it in the `appium:app` capability, and Appium installs the app on the device for you.

To install it manually and check that the device accepts it:

```bash
adb install -r /absolute/path/to/ApiDemos-debug.apk
```

## Next

Open [Appium Inspector](appium-inspector.md) and create your first Android session.
