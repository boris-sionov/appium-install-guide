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

## The UiAutomator2 driver is missing

Appium does not include Android drivers automatically. Check the installed drivers and add UiAutomator2 if necessary:

```bash
appium driver list --installed
appium driver install uiautomator2
appium driver doctor uiautomator2
```

## The application does not open

For an APK, make sure `appium:app` is an absolute path on your own computer, not a path copied from this guide. Alternatively, install the application first and set `appium:appPackage` together with `appium:appActivity`.

```bash
adb install -r /absolute/path/to/ApiDemos-debug.apk
```

Use `appium:noReset` only when you deliberately want to preserve the installed app and its data between runs.

## A locator cannot find an element

Open the current screen in Appium Inspector and try the locator there first. Prefer an accessibility ID or resource ID; use XPath only when the app offers no stable identifier. Also check that the test waits for the screen to finish loading before it searches.

## Capture useful logs

Keep the terminal running the Appium server open while you test. For an Android-side error, save recent device logs too:

```bash
adb logcat -d
```

<p class="guide-next"><a href="{{ '/index.html' | relative_url }}">← Back to the overview</a></p>
