---
layout: default
title: Installation Guide
---

# Install Appium

<p class="guide-byline">Step 1 · Choose your operating system</p>

Install the Appium server, the Android driver, and the tools they depend on before opening Appium Inspector or writing tests.

## Follow the guide for your computer

| Guide | Shell used |
| --- | --- |
| [Install on Windows](install-windows.md) | PowerShell |
| [Install on macOS](install-macos.md) | Terminal (zsh) |

## What you will install

| Tool | Why Appium needs it |
| --- | --- |
| [Node.js](https://nodejs.org/) 20.19+, 22.12+, or 24+ | Runs the Appium server and installs it with npm. |
| [Android Studio](https://developer.android.com/studio) | Provides the Android SDK, ADB, and the emulator. |
| Java JDK | Used by the Android tools. Android Studio includes one. |
| `JAVA_HOME` and `ANDROID_HOME` | Environment variables that tell Appium where Java and the SDK are. |
| Appium + UiAutomator2 | The server and the driver that automates Android. |
| [Appium Inspector](https://github.com/appium/appium-inspector/releases) | A desktop app for exploring screens and finding locators. |

## Check that everything works

Whichever guide you follow, finish with these commands:

```bash
appium --version
appium driver list --installed
appium driver doctor uiautomator2
```

The doctor should report **0 required fixes needed**. Then start the server and keep that window open:

```bash
appium
```

By default, Inspector and your tests connect to `http://127.0.0.1:4723`.

## Next

Continue with [Device setup](setup.md) to prepare an Android or iOS device.
