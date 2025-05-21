const ArrowDown = () => {
    const event = new KeyboardEvent("keydown", {
      key: "ArrowDown",
      code: "ArrowDown",
      keyCode: 40,
      which: 40,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };
  
  let hasScrolled = false;
  
  const observer = new MutationObserver(() => {
    chrome.storage.sync.get("autoScrollEnabled", (data) => {
      if (!data.autoScrollEnabled) return;
  
      const progressBar = document.querySelector('[class="ytPlayerProgressBarDragContainer"]');
      if (progressBar) {
        const valueNow = parseFloat(progressBar.getAttribute("aria-valuenow"));
        if (valueNow > 95 && !hasScrolled) {
          hasScrolled = true;
          ArrowDown();
  
          setTimeout(() => {
            hasScrolled = false;
          }, 2000);
        }
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });
  