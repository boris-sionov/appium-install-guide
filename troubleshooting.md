---
layout: default
title: Troubleshooting
---

# Troubleshooting

<p class="guide-byline">Step 6 · Solve the common setup problems before they slow down your test.</p>

## Appium server will not start

First, confirm that Node.js and Appium are available in the same terminal window:

```bash
node --version
appium --version
```

If Appium is not found, install it again with `npm install -g appium`. Start the server with `appium`, then use `http://127.0.0.1:4723` in Appium Inspector or your Python test.

## Android device is not detected

Check whether ADB can see the device or emulator:

```bash
adb devices
```

If the list is empty, open the emulator in Android Studio or reconnect the USB device and accept the debugging prompt on the phone. If the device shows `unauthorized`, unlock it and accept that prompt. Restarting ADB often helps:

```bash
adb kill-server
adb start-server
adb devices
```

## The emulator is very slow or will not start

Emulators need CPU virtualization. On Windows, check **Task Manager → Performance → CPU** for **Virtualization: Enabled**. If it is disabled, enable Intel VT-x or AMD-V in the BIOS/UEFI settings, and turn on **Windows Hypervisor Platform** under **Turn Windows features on or off**. On an Apple Silicon Mac, make sure the virtual device uses an **arm64-v8a** system image, because x86 images will not run.

Older tutorials tell you to install Intel HAXM and turn Hyper-V off. HAXM is discontinued, and current Android emulators use the Windows hypervisor instead.

If the computer has less than 16 GB of RAM, close other heavy apps, run one emulator at a time, or test on a real device.

## The UiAutomator2 driver is missing

Appium does not include Android drivers automatically. Check the installed drivers and add UiAutomator2 if necessary:

```bash
appium driver list --installed
appium driver install uiautomator2
appium driver doctor uiautomator2
```

## ERESOLVE error when installing a driver

```text
npm error code ERESOLVE
npm error Could not resolve dependency:
npm error peer appium@"^2.0.0-beta.40" from appium-lg-webos-driver@0.5.0
```

Another installed driver was built for a different Appium version. Appium installs every driver into one folder, so one incompatible driver blocks new installs. List the drivers, then uninstall the one named in the error:

```bash
appium driver list --installed
appium driver uninstall webos
```

Avoid `--force` and `--legacy-peer-deps`: they hide the conflict and can leave a driver that breaks at runtime. If you need a driver that only supports an older Appium, run that Appium version separately with its own `APPIUM_HOME` folder.

## JAVA_HOME or ANDROID_HOME is not set

If `appium driver doctor uiautomator2` reports either variable as missing, follow the environment-variable step in the [Windows](install-windows.md) or [macOS](install-macos.md) guide. Then open a **new** terminal window, because existing windows keep their old settings.

## Windows: running scripts is disabled

PowerShell blocks the `npm` and `appium` scripts by default on some computers. Allow locally installed scripts for your user account:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

## The application does not open

For an APK, make sure `appium:app` is an absolute path on your own computer, not a path copied from this guide. Alternatively, install the application first and set `appium:appPackage` together with `appium:appActivity`.

```bash
adb install -r /absolute/path/to/ApiDemos-debug.apk
```

Use `appium:noReset` only when you deliberately want to preserve the installed app and its data between runs.

## A locator cannot find an element

Open the current screen in Appium Inspector and try the locator there first. Prefer an accessibility ID or resource ID; use XPath only when the app offers no stable identifier. Also check that the test waits for the screen to finish loading before it searches.

## iOS errors

For WebDriverAgent, signing, and Xcode errors, see [Common iOS errors](ios-setup.md#common-ios-errors).

## Capture useful logs

Keep the terminal running the Appium server open while you test. For an Android-side error, save recent device logs too:

```bash
adb logcat -d
```

<p class="guide-next"><a href="{{ '/index.html' | relative_url }}">← Back to the overview</a></p>
