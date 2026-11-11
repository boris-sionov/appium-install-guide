# Appium Automation Guide

A practical, step-by-step guide to mobile test automation with **Appium, Python, and pytest**, written for QA engineers starting with mobile automation.

**Read it online:** https://boris-sionov.github.io/appium-install-guide/

## What the guide covers

| Step | Page | Topic |
| --- | --- | --- |
| 1 | [Installation](installation.md) | What gets installed, with copy-paste guides for [Windows](install-windows.md) and [macOS](install-macos.md) |
| 2 | [Device setup](setup.md) | What every device needs, then [Android](android-setup.md) and [iOS](ios-setup.md) setup |
| 3 | [Appium Inspector](appium-inspector.md) | Starting a session and choosing locators |
| 4 | [Capabilities](capabilities.md) | What each session setting does |
| 5 | [Python automation](python-automation.md) | A pytest project with fixtures, explicit waits, and screenshots on failure |
| 6 | [Troubleshooting](troubleshooting.md) | Fixes for common setup and connection errors |

## Tested with

Appium 3, UiAutomator2 driver 8.x, XCUITest driver 10.x–12.x, Node.js 24+, Python 3.10+.

## How the site is built

The site is plain Markdown published with [GitHub Pages](https://docs.github.com/en/pages) and the `jekyll-theme-primer` theme. Every push to `main` rebuilds the live site automatically, usually within a minute.

| Path | Purpose |
| --- | --- |
| `*.md` | Guide pages |
| `_layouts/default.html` | Page template and sidebar menu |
| `assets/css/style.scss` | Site styles |
| `assets/js/` | Code-block copy buttons and scrollable tables |

To add a page, create a Markdown file with the same front matter as the other pages, then add it to the sidebar in `_layouts/default.html`.

## Author

Boris Sionov
