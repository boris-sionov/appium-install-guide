---
layout: default
title: Installation Guide
---

# Install Appium

<p class="guide-byline">Step 1 · Windows and macOS</p>

Install the Appium server and the Android driver before opening Appium Inspector or writing tests.

## 1. Install the prerequisites

Install these tools first:

- [Node.js](https://nodejs.org/) — use the current LTS release.
- [Android Studio](https://developer.android.com/studio) — it installs the Android SDK and emulator tools.
- A Java JDK — required by Android tooling.

Confirm that Node and npm are available:

```bash
node --version
npm --version
```

## 2. Install Appium and UiAutomator2

Appium installs the server, but Android automation also needs the UiAutomator2 driver.

```bash
npm install -g appium
appium driver install uiautomator2
```

Check the installation:

```bash
appium --version
appium driver list --installed
appium driver doctor uiautomator2
```

The doctor command should report no required fixes before you continue.

## 3. Start the server

Keep this terminal open while using Inspector or running tests.

```bash
appium
```

By default, local clients connect to `http://127.0.0.1:4723`.

## Next

Continue with [Android setup](android-setup.md) to connect a real device or create an emulator.
