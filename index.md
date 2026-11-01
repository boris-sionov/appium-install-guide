---
layout: default
title: Appium Automation Guide
---

# Appium Automation Guide

<p class="guide-byline">Written by Boris Sionov</p>

A practical, step-by-step guide to mobile test automation using **Appium, Python, and pytest**.

---

<aside class="guide-callout">
  <strong>Practice app</strong>
  <p>Use a sample Android application while you learn. ApiDemos is a good place to start because its screens and controls are predictable.</p>
  <a href="https://github.com/appium/android-apidemos/releases/latest" target="_blank" rel="noopener noreferrer">Download ApiDemos-debug.apk ↗</a>
</aside>

## Welcome

Welcome to the Appium Automation Guide!

This documentation is designed to help QA Engineers and Automation Developers set up, configure, and work with Appium for mobile application testing.

The guide covers everything from installing the required development tools on Windows or macOS to connecting Android and iOS devices, inspecting UI elements, and building automated tests using Python.

## What You'll Learn

- Install and configure Appium on Windows or macOS.
- Set up Android SDK, Java JDK, and ADB.
- Connect and manage physical Android devices.
- Set up iOS simulators and real iPhones on macOS.
- Configure Appium Inspector and desired capabilities.
- Locate and interact with mobile UI elements.
- Write automated tests using Python and pytest.
- Troubleshoot common Appium installation and connection issues.

## Documentation

| Section | Description |
|---|---|
| [Installation Guide](installation.md) | Choose your operating system and see what gets installed. |
| [Install on Windows](install-windows.md) | Node.js, Android Studio, Java, environment variables, Appium, and Inspector on Windows with PowerShell. |
| [Install on macOS](install-macos.md) | The same setup on a Mac with Terminal. |
| [Device Setup](setup.md) | What every device needs, and what Android and iOS each need. |
| [Android Setup](android-setup.md) | Real devices, USB debugging, and the Android Emulator. |
| [iOS Setup](ios-setup.md) | Preconditions, Xcode, Simulator, and real iPhone signing (macOS only). |
| [Appium Inspector](appium-inspector.md) | Connect to devices and inspect UI elements. |
| [Desired Capabilities](capabilities.md) | Configure Appium sessions for Android. |
| [Python Automation](python-automation.md) | Create and execute automated tests. |
| [Troubleshooting](troubleshooting.md) | Resolve common Appium errors. |

## Prerequisites

Before getting started, make sure you have:

- A Windows or macOS computer.
- An Android device or emulator, or an iPhone or iOS Simulator (iOS needs a Mac).
- Basic knowledge of Python.
- Basic familiarity with Terminal or PowerShell commands.

No previous Appium experience is required.

## Quick Start

Once Appium and its dependencies are installed, start the Appium server:

```bash
appium
```

Verify that your Android device is connected:

```bash
adb devices -l
```

Open Appium Inspector, configure your Android capabilities, and start your first session.

---

**Technologies:** Appium, Python, pytest, Android, UiAutomator2, iOS, XCUITest

## References

[Appium quickstart](https://appium.io/docs/en/latest/quickstart/) · [UiAutomator2 setup](https://github.com/appium/appium/blob/master/packages/appium/docs/en/quickstart/uiauto2-driver.md) · [XCUITest driver](https://appium.github.io/appium-xcuitest-driver/latest/) · [Android Studio](https://developer.android.com/studio) · [Appium Python Client](https://github.com/appium/python-client)

<footer class="guide-credit">
  <span>Written by Boris Sionov</span>
</footer>
