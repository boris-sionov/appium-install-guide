---
layout: default
title: Desired Capabilities
---

# Desired capabilities

<p class="guide-byline">Step 4 · Describe the session</p>

Capabilities tell Appium which platform, driver, device, and app to use. With Appium 2 and newer, vendor-specific capability names use the `appium:` prefix.

## A practical Android configuration

```json
{
  "platformName": "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "Android Emulator",
  "appium:app": "/absolute/path/to/ApiDemos-debug.apk",
  "appium:noReset": true
}
```

## What each capability does

| Capability | Why you need it |
| --- | --- |
| `platformName` | Selects Android. |
| `appium:automationName` | Selects the UiAutomator2 driver. |
| `appium:deviceName` | A readable device label; use the actual emulator name when needed. |
| `appium:app` | Gives Appium the local APK path to install or launch. |
| `appium:noReset` | Keeps app data between sessions; remove it when you need a clean state. |

## When the app is already installed

Instead of `appium:app`, you can open an installed app by using its package and activity:

```json
{
  "platformName": "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "Android Emulator",
  "appium:appPackage": "io.appium.android.apis",
  "appium:appActivity": ".ApiDemos"
}
```

Use one approach at a time while learning: either the APK path or the installed-app package/activity.

## Next

Create a first automated check with [Python and pytest](python-automation.md).
