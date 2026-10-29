---
layout: default
title: Python Automation
---

# Python automation

<p class="guide-byline">Step 5 · First pytest test</p>

This example opens the ApiDemos application and verifies that the **Accessibility** screen can be opened.

## 1. Install the Python packages

```bash
python -m pip install Appium-Python-Client pytest
```

Start Appium in another terminal before running the test:

```bash
appium
```

## 2. Create `test_first_appium.py`

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

## 3. Run the test

```bash
pytest -v test_first_appium.py
```

If the session starts but an element is not found, open the same screen in Appium Inspector and verify the locator.

## Build from here

Keep each test focused on one user behavior. Add fixtures later when you have more than one test and want to reuse the driver setup.
