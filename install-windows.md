---
layout: default
title: Install on Windows
---

# Install on Windows

<p class="guide-byline">Step 1 · Windows 10 and 11</p>

Copy each block, paste it into PowerShell, press **Enter**, and wait until it finishes before the next one. Each step says what you should see. Only step 4 needs clicks in a window.

| You will install | Direct download (if you prefer clicking) |
| --- | --- |
| Node.js LTS | [nodejs.org/en/download](https://nodejs.org/en/download) |
| Android Studio (includes Java) | [developer.android.com/studio](https://developer.android.com/studio) |
| Appium Inspector | [Latest Inspector release](https://github.com/appium/appium-inspector/releases/latest) — `win-x64.exe` |
| Appium + UiAutomator2 | Installed by commands in steps 6–7 |

## 1. Open PowerShell

Press the **Windows** key, type `PowerShell`, and press **Enter**. A blue or black window opens. All commands on this page go there.

## 2. Allow npm commands to run

PowerShell blocks `npm` and `appium` on many computers. Allow scripts you install yourself:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Force
```

**You should see:** nothing. No message means it worked.

## 3. Install Node.js

```powershell
winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
```

Click **Yes** if Windows asks for permission. **You should see:** `Successfully installed`.

`winget` not recognized? Install **App Installer** from the Microsoft Store, or [download Node.js LTS](https://nodejs.org/en/download) and run the installer with the default options.

**Close PowerShell and open a new window**, then check:

```powershell
node --version
```

**You should see:** a version starting with `v24` or higher (the current LTS is `v26`). Appium 3 needs Node.js 20.19+, 22.12+, or 24+.

## 4. Install Android Studio

```powershell
winget install -e --id Google.AndroidStudio --accept-source-agreements --accept-package-agreements
```

Or [download Android Studio](https://developer.android.com/studio) and run the installer with the default options.

Now the only clicking step:

1. Open **Android Studio** from the Start menu.
2. In the setup wizard, click **Next**, choose **Standard**, and click **Next**.
3. Accept every license (select each one on the left, then **Accept**), and click **Finish**.
4. Wait until the downloads finish (several minutes), then click **Finish** and close Android Studio.

The wizard installs the Android SDK, Platform-Tools, Build-Tools, and the Emulator. Android Studio also includes Java (version 21 or newer), so you don't need to install Java separately. Appium needs Java 11 or newer.

## 5. Set JAVA_HOME and ANDROID_HOME

Paste this whole block at once. It saves the settings for your Windows account, and it is safe to run again:

```powershell
$javaHome = "C:\Program Files\Android\Android Studio\jbr"
$sdk = "$env:LOCALAPPDATA\Android\Sdk"
if (!(Test-Path "$javaHome\bin\java.exe")) { Write-Host "Java not found: is Android Studio installed in the default folder?" -ForegroundColor Red }
if (!(Test-Path "$sdk\platform-tools")) { Write-Host "Android SDK not found: finish step 4 first." -ForegroundColor Red }

[Environment]::SetEnvironmentVariable("JAVA_HOME", $javaHome, "User")
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $sdk, "User")
[Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", $sdk, "User")

$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
foreach ($p in "$javaHome\bin", "$sdk\platform-tools", "$sdk\emulator") {
  if (($userPath -split ";") -notcontains $p) { $userPath = "$userPath;$p" }
}
[Environment]::SetEnvironmentVariable("Path", $userPath, "User")
Write-Host "Done. Close every PowerShell window and open a new one." -ForegroundColor Green
```

**You should see:** `Done.` in green. A red line means a step above isn't finished.

**Close every PowerShell window and open a new one**, then check:

```powershell
java -version
adb version
Get-ChildItem "$env:ANDROID_HOME\build-tools"
```

**You should see:** `openjdk version "21` (or a newer number), `Android Debug Bridge version ...`, and at least one Build-Tools folder such as `36.0.0`.

No Build-Tools folder? Open Android Studio → **More Actions → SDK Manager → SDK Tools**, tick **Android SDK Build-Tools**, and click **Apply**.

## 6. Install Appium

```powershell
npm install -g appium
```

**You should see:** `added ... packages`. Warnings about deprecated packages are normal.

```powershell
appium --version
```

**You should see:** `3.` followed by more numbers.

## 7. Install the Android driver

```powershell
appium driver install uiautomator2
```

**You should see:** `Driver uiautomator2@... successfully installed`.

```powershell
appium driver doctor uiautomator2
```

**You should see:** `0 required fixes needed`. Optional fixes such as `bundletool.jar` or GStreamer can be ignored.

## 8. Install Appium Inspector

```powershell
winget install -e --id AppiumDevelopers.AppiumInspector --accept-source-agreements --accept-package-agreements
```

This winget package is community-maintained. If it fails, [download the latest release](https://github.com/appium/appium-inspector/releases/latest), run the `win-x64.exe` file, and if Windows shows **Windows protected your PC**, click **More info → Run anyway**.

## 9. Only for the emulator: check acceleration

Skip this step if you will test on a real phone.

```powershell
& "$env:ANDROID_HOME\emulator\emulator.exe" -accel-check
```

**You should see:** `WHPX ... is installed and usable` (or `AEHD`). If it says acceleration is not available, open PowerShell **as administrator** (right-click PowerShell → **Run as administrator**), run this, and restart the computer:

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName HypervisorPlatform -All
```

If it still fails, virtualization is turned off in the BIOS. See [Android setup](android-setup.md#2b-use-an-emulator).

## 10. Start the server

```powershell
appium
```

**You should see:** `Appium REST http interface listener started on http://0.0.0.0:4723`. Keep this window open while you use Inspector or run tests. If Windows Firewall asks about Node.js, allowing **Private networks** is enough.

## Next

Continue with [Device setup](setup.md), then [Android setup](android-setup.md). iOS automation needs a Mac.
