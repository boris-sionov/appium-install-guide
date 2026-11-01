---
layout: default
title: iOS Setup
---

# iOS setup

<p class="guide-byline">Step 2 · iOS (macOS only)</p>

Appium automates iOS with the **XCUITest driver**. It installs a helper app called **WebDriverAgent (WDA)** on the simulator or device, and WDA performs the taps and reads the screen. On a real device, Apple only lets WDA run after it is signed with your Apple Account, which is the step most people get stuck on.

Finish [Install on macOS](install-macos.md) and check the [preparation for both platforms](setup.md#preparation-for-both) first. This page assumes Homebrew, Node.js, and Appium already work.

## Preconditions

Check every item before you start. If one is missing, the session will not start.

### For any iOS automation

| Must have | Why |
| --- | --- |
| **A Mac** | Xcode, and therefore iOS automation, runs only on macOS. Windows and Linux have very limited support. |
| **Full Xcode app**, not only the Command Line Tools | XCUITest builds WDA with `xcodebuild`, which needs the full Xcode. |
| **Xcode new enough for the device's iOS version** | Each Xcode version only supports iOS versions up to its own. The driver fully supports the latest two Xcode major versions. |
| **About 40 GB of free disk space** | Xcode plus one iOS simulator runtime is large. |
| **Appium 3 with XCUITest driver 10.x–12.x** | XCUITest 13 and newer require Appium 4. `appium driver install xcuitest` picks a compatible version for you. |

### Extra for a real iPhone or iPad

| Must have | Why / where |
| --- | --- |
| **USB cable that carries data**, and **Trust This Computer** accepted on the device | The Mac must be paired with the device. |
| **An Apple Account** added in **Xcode → Settings → Apple Accounts** | WDA must be signed by a development team. Free accounts work; paid Apple Developer accounts have fewer limits. |
| **Developer Mode** on (iOS 16+) | **Settings → Privacy & Security → Developer Mode**. The device restarts. |
| **Enable UI Automation** on | **Settings → Developer → Enable UI Automation**. The **Developer** menu appears after the device has been connected to Xcode. |
| **Your developer certificate trusted** on the device | **Settings → General → VPN & Device Management** → your Apple Account → **Trust**. Needs an internet connection. |
| **The device's UDID** | Used in the `appium:udid` capability. |
| **Zoom off** | **Settings → Accessibility → Zoom** off, or element coordinates are wrong. |
| **Internet on the device** | Since iOS 16, the device checks the developer signature online. |

**Free Apple Account limits:** the signing profile Xcode creates expires after **7 days**. When WDA stops installing, repeat [step 6](#6-real-device-sign-webdriveragent) to renew it.

### The app you test

| Target | What Appium needs |
| --- | --- |
| Simulator | A `.app` built for the simulator, or the `bundleId` of an app already installed |
| Real device | An `.ipa` signed for that device (development or ad-hoc), or the `bundleId` of an installed app |

This page uses the built-in **Settings** app (`com.apple.Preferences`) so you can practice without building or signing any app.

## 1. Install Xcode

Install Xcode from the [Mac App Store](https://apps.apple.com/app/xcode/id497799835). It's a large download. Other versions are on [developer.apple.com/xcode](https://developer.apple.com/xcode/). Open Xcode once and let it install its components.

Then point the command-line tools at the full Xcode and accept the license. Enter your Mac password when asked:

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -license accept
sudo xcodebuild -runFirstLaunch
xcodebuild -version
```

**You should see:** `Xcode` followed by a version number.

If you see `tool 'xcodebuild' requires Xcode, but active developer directory ... is a command line tools instance`, the first command wasn't run or Xcode isn't in **Applications**.

## 2. Install an iOS simulator runtime

```bash
xcodebuild -downloadPlatform iOS
xcrun simctl list devices available
```

**You should see:** a list of iPhone and iPad simulators, such as `iPhone 16 (…) (Shutdown)`. Note one simulator name and the iOS version in the heading above it.

## 3. Install the XCUITest driver

```bash
appium driver install xcuitest
appium driver doctor xcuitest
```

**You should see:** `Driver xcuitest@12.… successfully installed`, then `0 required fixes needed`. Optional fixes can be ignored.

## 4. Start a Simulator session

Start the server in one Terminal window:

```bash
appium
```

In Appium Inspector, use server `127.0.0.1`, port `4723`, and these capabilities. Replace the device name and version with the ones from step 2:

```json
{
  "platformName": "iOS",
  "appium:automationName": "XCUITest",
  "appium:deviceName": "iPhone 16",
  "appium:platformVersion": "18.5",
  "appium:bundleId": "com.apple.Preferences"
}
```

Click **Start Session**. The first start builds WDA and can take a few minutes. The simulator boots by itself and opens Settings.

## 5. Real device: prepare the iPhone

1. Connect the iPhone with a USB cable, unlock it, and tap **Trust** on **Trust This Computer?**.
2. Open Xcode → **Window → Devices and Simulators** and wait until the device finishes preparing.
3. On the iPhone, turn on **Settings → Privacy & Security → Developer Mode** and restart when asked.
4. Turn on **Settings → Developer → Enable UI Automation**.
5. Get the UDID:

```bash
xcrun xctrace list devices
```

**You should see:** your device's name, iOS version, and UDID in parentheses, for example `My iPhone (18.5) (00008110-001A2B3C4D5E6F78)`. The UDID is the last value.

## 6. Real device: sign WebDriverAgent

This uses a free Apple Account. You need to repeat it after updating the XCUITest driver, and every 7 days with a free account.

1. Add your account in Xcode → **Settings → Apple Accounts → +**.
2. Open the WDA project that came with the driver:

    ```bash
    appium driver run xcuitest open-wda
    ```

3. In Xcode's left panel, click **WebDriverAgent**. Under **Targets**, select **WebDriverAgentRunner** and open **Signing & Capabilities**.
4. Tick **Automatically manage signing** and choose your **Team** (your name, "Personal Team").
5. Change **Bundle Identifier** from `com.facebook.WebDriverAgentRunner` to something unique, such as `com.yourname.WebDriverAgentRunner`.
6. At the top, choose the scheme **WebDriverAgentRunner** and your iPhone as the destination, then select **Product → Test**.
7. If the iPhone says **Untrusted Developer**, open **Settings → General → VPN & Device Management**, tap your account, and tap **Trust**. Then run **Product → Test** again.

When the iPhone shows a blank screen with WDA running, signing works. Click **Stop** in Xcode.

**Paid Apple Developer account?** You can skip the Xcode clicks and let Appium sign WDA with `appium:xcodeOrgId` (your Team ID), `appium:xcodeSigningId` (`Apple Developer`), and `appium:updatedWDABundleId`.

## 7. Real device: start a session

**iOS 18 or newer:** in a separate Terminal window, start a device tunnel and keep it running. It's the recommended connection for iOS 18+:

```bash
sudo appium driver run xcuitest tunnel-creation
```

Start the server in another window:

```bash
appium
```

In Appium Inspector, use these capabilities. Put your UDID from step 5 and the bundle ID you chose in step 6:

```json
{
  "platformName": "iOS",
  "appium:automationName": "XCUITest",
  "appium:udid": "00008110-001A2B3C4D5E6F78",
  "appium:updatedWDABundleId": "com.yourname.WebDriverAgentRunner",
  "appium:bundleId": "com.apple.Preferences"
}
```

Click **Start Session**. Settings opens on the iPhone and appears in Inspector.

## 8. The same session in Python

The [Python setup](python-automation.md) works for iOS too. Only the options class changes:

```python
from appium import webdriver
from appium.options.ios import XCUITestOptions
from appium.webdriver.common.appiumby import AppiumBy

options = XCUITestOptions()
options.udid = "00008110-001A2B3C4D5E6F78"  # or set device_name + platform_version for a simulator
options.bundle_id = "com.apple.Preferences"
options.set_capability("appium:updatedWDABundleId", "com.yourname.WebDriverAgentRunner")

driver = webdriver.Remote("http://127.0.0.1:4723", options=options)
try:
    general = driver.find_element(AppiumBy.ACCESSIBILITY_ID, "General")
    assert general.is_displayed()
finally:
    driver.quit()
```

## Common iOS errors

| Error | Fix |
| --- | --- |
| `xcodebuild exited with code 65` | Signing isn't set up or the free profile expired. Repeat [step 6](#6-real-device-sign-webdriveragent). |
| `xcodebuild exited with code 70` | Signing or build settings are wrong, or Xcode doesn't support the device's iOS version. Update Xcode. |
| `Untrusted Developer` on the device | **Settings → General → VPN & Device Management** → Trust your account. |
| Device missing from `xctrace list devices` | Unlock it, accept **Trust This Computer**, and open Xcode → **Window → Devices and Simulators**. |
| Session hangs at WebDriverAgent startup | Turn on **Enable UI Automation**, keep the device unlocked, and add `"appium:showXcodeLog": true` to see the build output. |

Full reference: [XCUITest driver documentation](https://appium.github.io/appium-xcuitest-driver/latest/).
