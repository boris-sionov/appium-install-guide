document.querySelectorAll(".markdown-body pre").forEach((block) => {
  const code = block.querySelector("code");
  if (!code) return;

  const languageClass = [...code.classList].find((name) => name.startsWith("language-"));
  const source = code.innerText.trim();
  const detectedLanguage = source.startsWith("{")
    ? "json"
    : /^(from |import |def |class )/m.test(source)
      ? "python"
      : /^(adb|appium|npm|node|python|pytest)\b/m.test(source)
        ? "bash"
        : "text";
  block.dataset.language = languageClass?.replace("language-", "") || detectedLanguage;

  const button = document.createElement("button");
  button.className = "copy-button";
  button.type = "button";
  button.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M8 8h10v12H8zM6 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg><span>Copy</span>';
  button.setAttribute("aria-label", "Copy code");

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(code.innerText);
      button.querySelector("span").textContent = "Copied";
      button.setAttribute("aria-label", "Copied");
      button.classList.add("is-copied");
    } catch {
      button.querySelector("span").textContent = "Copy failed";
      button.setAttribute("aria-label", "Copy failed");
    }

    window.setTimeout(() => {
      button.querySelector("span").textContent = "Copy";
      button.setAttribute("aria-label", "Copy code");
      button.classList.remove("is-copied");
    }, 1800);
  });

  block.append(button);
});
