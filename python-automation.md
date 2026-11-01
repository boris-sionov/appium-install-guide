---
layout: default
title: Python Automation
---

# Python automation

<p class="guide-byline">Step 5 · First pytest test</p>

This example opens the ApiDemos application and verifies that the **Accessibility** screen can be opened.

## 1. Install Python

The Appium Python client needs **Python 3.10 or newer**. Skip this if `py --version` (Windows) or `python3 --version` (macOS) already prints 3.10 or higher.

```powershell
winget install -e --id Python.Python.3.13 --accept-source-agreements --accept-package-agreements
```

```bash
brew install python@3.13
```

Prefer clicking? [Download Python](https://www.python.org/downloads/). Open a new terminal window afterwards. On Windows, the commands below use `py`, the Python launcher, because the installer doesn't add `python` to PATH by default.

## 2. Create a project and install the packages

Packages go into a virtual environment, a private folder for this project. That keeps them separate from the system Python. macOS refuses a plain `pip install` without one.

Windows (PowerShell):

```powershell
mkdir appium-tests; cd appium-tests
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install Appium-Python-Client pytest
```

macOS (Terminal):

```bash
mkdir appium-tests && cd appium-tests
python3 -m venv .venv
source .venv/bin/activate
pip install Appium-Python-Client pytest
```

**You should see:** `Successfully installed Appium-Python-Client-...`. Your prompt now starts with `(.venv)`. In every new terminal window, `cd` into the folder and run the activate line again before running tests.

Start Appium in another terminal before running the test:

```bash
appium
```

## 3. Create `test_first_appium.py`

```python
from appium import webdriver
from appium.options.android import UiAutomator2Options
from appium.webdriver.common.appiumby import AppiumBy


def test_open_accessibility():
    options = UiAutomator2Options()
    options.platform_name = "Android"
    options.automation_name = "UiAutomator2"
    options.device_name = "Android Emulator"
    options.app = "/absolute/path/to/ApiDemos-debug.apk"

    driver = webdriver.Remote("http://127.0.0.1:4723", options=options)
    try:
        driver.find_element(AppiumBy.ACCESSIBILITY_ID, "Accessibility").click()
        assert driver.find_element(AppiumBy.ACCESSIBILITY_ID, "Accessibility Node Querying").is_displayed()
    finally:
        driver.quit()
```

Replace the APK path before running it.

## 4. Run the test

```bash
pytest -v test_first_appium.py
```

If the session starts but an element is not found, open the same screen in Appium Inspector and verify the locator.

## 5. Organize a small test project

When you have more than one test, move the driver setup into a shared fixture. A practical layout:

```text
appium-tests/
├── conftest.py
├── pytest.ini
└── tests/
    └── test_api_demos.py
```

## 6. Share the driver with `conftest.py`

pytest loads `conftest.py` automatically, so every test in the folder can request the `driver` fixture by name. The APK path is read from an environment variable instead of being hard-coded, and a screenshot is saved when a test fails.

```python
import os

import pytest
from appium import webdriver
from appium.options.android import UiAutomator2Options

APPIUM_SERVER = os.getenv("APPIUM_SERVER", "http://127.0.0.1:4723")


@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    # Store each phase's result on the test item so fixtures can check it.
    outcome = yield
    report = outcome.get_result()
    setattr(item, f"rep_{report.when}", report)


@pytest.fixture
def driver(request):
    options = UiAutomator2Options()
    options.platform_name = "Android"
    options.automation_name = "UiAutomator2"
    options.device_name = os.getenv("ANDROID_DEVICE", "Android Emulator")
    options.app = os.environ["APIDEMOS_APK"]
    options.new_command_timeout = 120

    driver = webdriver.Remote(APPIUM_SERVER, options=options)
    driver.implicitly_wait(0)  # use explicit waits instead
    yield driver

    report = getattr(request.node, "rep_call", None)
    if report and report.failed:
        os.makedirs("screenshots", exist_ok=True)
        driver.save_screenshot(f"screenshots/{request.node.name}.png")
    driver.quit()
```

Everything before `yield` is setup; everything after it is teardown and runs even when the test fails.

## 7. Write tests against ApiDemos

Create `tests/test_api_demos.py`. Each test starts a fresh session on the ApiDemos home screen.

```python
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


def wait_for(driver, by, value, timeout=10):
    return WebDriverWait(driver, timeout).until(
        EC.presence_of_element_located((by, value))
    )


def tap(driver, accessibility_id):
    wait_for(driver, AppiumBy.ACCESSIBILITY_ID, accessibility_id).click()


def test_open_accessibility_screen(driver):
    tap(driver, "Accessibility")

    item = wait_for(driver, AppiumBy.ACCESSIBILITY_ID, "Accessibility Node Querying")
    assert item.is_displayed()


def test_type_into_text_field(driver):
    tap(driver, "Views")
    tap(driver, "Controls")
    tap(driver, "1. Light Theme")

    field = wait_for(driver, AppiumBy.ID, "io.appium.android.apis:id/edit")
    field.send_keys("Hello Appium")

    assert field.text == "Hello Appium"


def test_enable_wifi_preference(driver):
    tap(driver, "Preference")
    tap(driver, "3. Preference dependencies")

    checkbox = wait_for(driver, AppiumBy.ID, "android:id/checkbox")
    if checkbox.get_attribute("checked") != "true":
        checkbox.click()

    wait_for(driver, AppiumBy.XPATH, '//*[@text="WiFi settings"]').click()
    wait_for(driver, AppiumBy.ID, "android:id/edit").send_keys("Office WiFi")
    driver.find_element(AppiumBy.ID, "android:id/button1").click()

    checkbox = wait_for(driver, AppiumBy.ID, "android:id/checkbox")
    assert checkbox.get_attribute("checked") == "true"


def test_scroll_to_item(driver):
    tap(driver, "Views")

    driver.find_element(
        AppiumBy.ANDROID_UIAUTOMATOR,
        'new UiScrollable(new UiSelector().scrollable(true))'
        '.scrollIntoView(new UiSelector().text("WebView"))',
    ).click()

    assert wait_for(driver, AppiumBy.CLASS_NAME, "android.webkit.WebView")
```

A few habits shown here:

- **Explicit waits** — `WebDriverWait` waits only as long as needed, so tests stay fast and stable. Avoid `time.sleep()`.
- **Stable locators first** — prefer accessibility IDs and resource IDs; use XPath only when nothing better exists.
- **One behavior per test** — each test reads like a short user story and fails for a single reason.

## 8. Configure and run the suite

Create `pytest.ini` so pytest finds the tests and prints readable output:

```ini
[pytest]
testpaths = tests
addopts = -v
```

Set the APK path once, then run the suite from the project folder:

```bash
# macOS / Linux
export APIDEMOS_APK=/absolute/path/to/ApiDemos-debug.apk
pytest
```

```powershell
# Windows PowerShell
$env:APIDEMOS_APK = "C:\path\to\ApiDemos-debug.apk"
pytest
```

Useful variations:

```bash
pytest -k preference                 # run tests whose name matches
pytest tests/test_api_demos.py::test_scroll_to_item
pytest -x                            # stop at the first failure
```

Failed tests leave a screenshot in `screenshots/`. Open it alongside the error message to see what was on screen.

## Next

When a test fails in a way you don't understand, check [Troubleshooting](troubleshooting.md).
