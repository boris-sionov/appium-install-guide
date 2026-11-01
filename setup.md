---
layout: default
title: Device Setup
---

# Device setup

<p class="guide-byline">Step 2 · Choose your platform</p>

Prepare the phone, tablet, emulator, or simulator that Appium will automate. Check the shared preparation first, then follow the guide for your platform.

## Follow the guide for your platform

| Guide | Computer | Devices |
| --- | --- | --- |
| [Android setup](android-setup.md) | Windows or macOS | Real phone or tablet, or Android Emulator |
| [iOS setup](ios-setup.md) | macOS only | Real iPhone or iPad, or iOS Simulator |

## Preparation for both

| Must have | Details |
| --- | --- |
| **Appium installed and checked** | Finish [Installation](installation.md). `appium --version` prints `3.x`. |
| **Appium Inspector** | Installed with the [Windows](install-windows.md) or [macOS](install-macos.md) guide. |
| **The Appium server running** | Run `appium` and keep the window open. Inspector and tests connect to `http://127.0.0.1:4723`. |
| **A device to test on** | A real device, or a virtual one (emulator or simulator). A real device is lighter on your computer. |
| **For a real device: a data USB cable** | Some cables only charge. Use the one that came with the phone if you can. |
| **For a real device: unlocked and trusted** | Unlock the screen and accept the trust prompt the first time you connect. |
| **For a virtual device: enough resources** | 16 GB RAM recommended and 10–40 GB free disk, depending on the platform. |
| **The device ID (UDID)** | Needed in `appium:udid` when more than one device is connected, and always for real iPhones. |
| **The app under test** | Either the full path to the app file, or the ID of an app already installed on the device. |

## What each platform needs

| | Android | iOS |
| --- | --- | --- |
| Computer | Windows or macOS | macOS only |
| Developer tools | Android Studio (SDK, ADB, Emulator) | Full Xcode app |
| Java | Java 11+ (included with Android Studio) | Not needed |
| Environment variables | `JAVA_HOME`, `ANDROID_HOME` | None |
| Appium driver | `appium driver install uiautomator2` | `appium driver install xcuitest` |
| `appium:automationName` | `UiAutomator2` | `XCUITest` |
| Virtual device | Android Emulator; CPU virtualization must be on | iOS Simulator, included with Xcode |
| Developer setting on the device | **Developer options → USB debugging** | **Developer Mode** and **Enable UI Automation** |
| Trust prompt | **Allow USB debugging?** | **Trust This Computer?** |
| Account needed | None | Apple Account (free or paid Apple Developer) |
| Signing | Not needed | WebDriverAgent must be signed with your account. A free account must re-sign it every 7 days |
| Find the device ID | `adb devices -l` | `xcrun xctrace list devices` |
| Minimum OS version | Android 8.0 (API 26) | An iOS version your Xcode supports |
| App file | `.apk` | `.app` (Simulator) or signed `.ipa` (real device) |
| Installed app ID | `appium:appPackage` + `appium:appActivity` | `appium:bundleId` |
| Practice app | ApiDemos (`ApiDemos-debug.apk`) | Built-in Settings app (`com.apple.Preferences`) |

## Next

Continue with [Android setup](android-setup.md) or [iOS setup](ios-setup.md).
