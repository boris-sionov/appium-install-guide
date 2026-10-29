---
layout: default
title: Appium Inspector
---

# Appium Inspector

<p class="guide-byline">Step 3 · Explore the app</p>

Appium Inspector lets you create a session, inspect the app hierarchy, and try locator strategies before writing a test.

## 1. Start the server and Inspector

Start Appium in a terminal:

```bash
appium
```

Open Appium Inspector, choose **New Session**, and set the remote server URL to:

```text
http://127.0.0.1:4723
```

## 2. Use this starter capability set

Replace the path with the real location of your APK.

```json
{
  "platformName": "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "Android Emulator",
  "appium:app": "/absolute/path/to/ApiDemos-debug.apk"
}
```

Start the session. Appium installs the APK when needed and opens the application.

## 3. Choose locators deliberately

In the Inspector hierarchy, prefer locators in this order:

1. **Accessibility ID** — stable and readable when the app provides a content description.
2. **ID** — reliable when it is a real resource ID.
3. **Android UIAutomator** — useful for scrollable Android screens.
4. **XPath** — use only when the other options are unavailable.

Click an element, copy its suggested locator, and validate it with **Search for element** before using it in Python.

## Next

Learn what each setting means in [Desired Capabilities](capabilities.md).
