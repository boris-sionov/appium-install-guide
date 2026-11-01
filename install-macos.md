---
layout: default
title: Install on macOS
---

# Install on macOS

<p class="guide-byline">Step 1 · macOS (Apple Silicon or Intel)</p>

Copy each block, paste it into Terminal, press **Return**, and wait until it finishes before the next one. Each step says what you should see. Only step 4 needs clicks in a window.

| You will install | Direct download (if you prefer clicking) |
| --- | --- |
| Homebrew | [Homebrew website](https://brew.sh/) |
| Node.js LTS | [Node.js downloads](https://nodejs.org/en/download) |
| Android Studio (includes Java) | [Android Studio downloads](https://developer.android.com/studio): pick **Mac with Apple chip** or **Mac with Intel chip** |
| Appium Inspector | [Inspector releases](https://github.com/appium/appium-inspector/releases/latest), file `mac-arm64.dmg` (Apple chip) or `mac-x64.dmg` (Intel) |
| Appium + UiAutomator2 | Installed by commands in steps 6–7 |

## 1. Open Terminal

Press **Command + Space**, type `Terminal`, and press **Return**. All commands on this page go there.

## 2. Install Homebrew

Homebrew installs developer tools with one command each. Skip this step if `brew --version` already prints a version.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Type your Mac password when asked (nothing appears while you type) and press **Return** to continue. It can take several minutes.

On an Apple chip Mac, add Homebrew to your PATH. This is safe to run on Intel Macs too:

```bash
[ -x /opt/homebrew/bin/brew ] && { grep -q 'brew shellenv' ~/.zprofile 2>/dev/null || echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile; eval "$(/opt/homebrew/bin/brew shellenv)"; }
brew --version
```

**You should see:** `Homebrew` followed by a version number.

## 3. Install Node.js

```bash
brew install node
node --version
```

**You should see:** a version starting with `v24` or higher. Appium 3 needs Node.js 20.19+, 22.12+, or 24+. Installing Node with Homebrew also avoids the `EACCES` permission errors that the `.pkg` installer can cause with `npm install -g`.

## 4. Install Android Studio

```bash
brew install --cask android-studio
```

Homebrew picks the right version for your Mac's chip. Or [download Android Studio](https://developer.android.com/studio) and drag it into **Applications**.

Now the only clicking step:

1. Open **Android Studio** from **Applications**.
2. In the setup wizard, click **Next**, choose **Standard**, and click **Next**.
3. Accept every license (select each one on the left, then **Accept**), and click **Finish**.
4. Wait until the downloads finish (several minutes), then click **Finish** and quit Android Studio.

The wizard installs the Android SDK, Platform-Tools, Build-Tools, and the Emulator. Android Studio also includes Java (version 21 or newer), so you don't need to install Java separately. Appium needs Java 11 or newer.

## 5. Set JAVA_HOME and ANDROID_HOME

Paste this whole block at once. It adds the settings to `~/.zshrc` only if they aren't there yet, so it is safe to run again:

```bash
grep -q '# Java and Android SDK for Appium' ~/.zshrc 2>/dev/null || cat >> ~/.zshrc <<'EOF'

# Java and Android SDK for Appium
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export ANDROID_HOME="$HOME/Library/Android/sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"
EOF
source ~/.zshrc
```

**You should see:** nothing, or a new prompt line.

This assumes the default Terminal shell, zsh. If `echo $SHELL` prints `/bin/bash`, replace `~/.zshrc` with `~/.bash_profile` in both places.

**Close Terminal and open a new window**, then check:

```bash
java -version
adb version
ls "$ANDROID_HOME/build-tools"
```

**You should see:** `openjdk version "21` (or a newer number), `Android Debug Bridge version ...`, and at least one Build-Tools folder such as `36.0.0`.

No Build-Tools folder? Open Android Studio → **More Actions → SDK Manager → SDK Tools**, tick **Android SDK Build-Tools**, and click **Apply**.

## 6. Install Appium

```bash
npm install -g appium
appium --version
```

**You should see:** `3.` followed by more numbers. Warnings about deprecated packages during the install are normal.

## 7. Install the Android driver

```bash
appium driver install uiautomator2
```

**You should see:** `Driver uiautomator2@... successfully installed`.

```bash
appium driver doctor uiautomator2
```

**You should see:** `0 required fixes needed`. Optional fixes such as `bundletool.jar` or GStreamer can be ignored.

## 8. Install Appium Inspector

```bash
brew install --cask appium-inspector
xattr -cr "/Applications/Appium Inspector.app"
```

The second command removes the macOS "can't be opened" warning, because the app isn't notarized by Apple. Prefer clicking? [Download the latest release](https://github.com/appium/appium-inspector/releases/latest), open the `.dmg`, drag the app into **Applications**, then run only the `xattr` command above.

## 9. Start the server

```bash
appium
```

**You should see:** `Appium REST http interface listener started on http://0.0.0.0:4723`. Keep this window open while you use Inspector or run tests. Press **Control + C** to stop it.

## Next

Continue with [Device setup](setup.md) to prepare an Android or iOS device.
