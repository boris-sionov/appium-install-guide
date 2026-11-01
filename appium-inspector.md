---
layout: default
title: Appium Inspector
---

# Appium Inspector

<p class="guide-byline">Step 3 · Explore the app</p>

Appium Inspector lets you create a session, inspect the app hierarchy, and try locator strategies before writing a test. Install it from the [Windows](install-windows.md) or [macOS](install-macos.md) guide if you haven't yet.

## How the pieces fit together

Inspector is an Appium **client**, just like your Python tests will be:

1. Inspector sends an HTTP request with your capabilities to the Appium **server**.
2. The server uses the platform's driver (**UiAutomator2** for Android, **XCUITest** for iOS) to open the app on the device.
3. The server sends back a screenshot and the screen's XML hierarchy.
4. Inspector shows both and suggests a locator for each element you click.

## 1. Start the server and Inspector

Start Appium in a terminal and keep it visible:

```bash
appium
```

Open Appium Inspector and start a device or emulator. Fill in the server fields:

| Field | Value |
| --- | --- |
| Remote Host | `127.0.0.1` |
| Remote Port | `4723` |
| Remote Path | `/` (leave the default) |

Keep **Automatically add necessary Appium vendor prefixes** turned on. It adds the `appium:` prefix for you.

## 2. Use this starter capability set

This example is for Android. For iOS capabilities, see [iOS setup](ios-setup.md#4-start-a-simulator-session).

Paste this into the **JSON Representation** box, or add the same entries one by one. Replace the path with the real location of your APK.

```json
{
  "platformName": "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "Android Emulator",
  "appium:app": "/absolute/path/to/ApiDemos-debug.apk"
}
```

Click **Start Session**. Appium installs the APK when needed and opens the application.

Getting the APK path right avoids most first-session failures:

- Include the full file name with the `.apk` extension.
- Remove any space at the end of the path. Copy-paste often adds one.
- On macOS, drag the APK file into a Terminal window to print its full path.

If the session fails, read the **Appium server terminal**, not just Inspector's error pop-up. The server log shows the real cause, and it's what to share when you ask for help.

## 3. Choose locators deliberately

In the Inspector hierarchy, prefer locators in this order:

1. **Accessibility ID** — stable and readable when the app provides a content description.
2. **ID** — reliable when it is a real resource ID.
3. **Android UIAutomator** — useful for scrollable Android screens.
4. **XPath** — use only when the other options are unavailable.

Click an element, copy its suggested locator, and validate it with **Search for element** before using it in Python.

## Next

Learn what each setting means in [Desired Capabilities](capabilities.md).
