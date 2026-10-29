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
  <a href="https://github.com/AppiumGuide/AppiumGuide/tree/main/APK_Files" target="_blank" rel="noopener noreferrer">Open the external APK folder ↗</a>
</aside>

## Welcome

Welcome to the Appium Automation Guide!

This documentation is designed to help QA Engineers and Automation Developers set up, configure, and work with Appium for mobile application testing.

The guide covers everything from installing the required development tools on macOS or Windows to connecting Android devices, inspecting UI elements, and building automated tests using Python.

## What You'll Learn

- Install and configure Appium on macOS or Windows.
- Set up Android SDK, Java JDK, and ADB.
- Connect and manage physical Android devices.
- Configure Appium Inspector and desired capabilities.
- Locate and interact with mobile UI elements.
- Write automated tests using Python and pytest.
- Troubleshoot common Appium installation and connection issues.

## Documentation

| Section | Description |
|---|---|
| [Installation Guide](installation.md) | Install all required tools and dependencies. |
| [Android Device Setup](android-setup.md) | Configure Android devices and USB debugging. |
| [Appium Inspector](appium-inspector.md) | Connect to devices and inspect UI elements. |
| [Desired Capabilities](capabilities.md) | Configure Appium sessions for Android. |
| [Python Automation](python-automation.md) | Create and execute automated tests. |
| [Troubleshooting](troubleshooting.md) | Resolve common Appium errors. |

## Prerequisites

Before getting started, make sure you have:

- A macOS or Windows computer.
- An Android device or emulator.
- Basic knowledge of Python.
- Basic familiarity with Terminal commands.

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

**Technologies:** Appium, Python, pytest, Android, UiAutomator2

## References

[Appium quickstart](https://appium.io/docs/en/latest/quickstart/) · [UiAutomator2 setup](https://github.com/appium/appium/blob/master/packages/appium/docs/en/quickstart/uiauto2-driver.md) · [Android Studio](https://developer.android.com/studio) · [Appium Python Client](https://github.com/appium/python-client)

<footer class="guide-credit">
  <span>Written by Boris Sionov</span>
  <span><a href="https://boris-sionov.github.io/boris-sionov-portfolio/" target="_blank" rel="noopener noreferrer">Portfolio</a> · <a href="https://github.com/boris-sionov" target="_blank" rel="noopener noreferrer">GitHub</a> · <a href="https://il.linkedin.com/in/boris-sionov" target="_blank" rel="noopener noreferrer">LinkedIn</a></span>
</footer>
