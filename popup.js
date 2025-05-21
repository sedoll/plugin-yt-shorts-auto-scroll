const button = document.getElementById("toggleBtn");

chrome.storage.sync.get("autoScrollEnabled", (data) => {
  const isEnabled = data.autoScrollEnabled ?? true;
  updateButton(isEnabled);
});

button.addEventListener("click", () => {
  chrome.storage.sync.get("autoScrollEnabled", (data) => {
    const newState = !(data.autoScrollEnabled ?? true);
    chrome.storage.sync.set({ autoScrollEnabled: newState }, () => {
      updateButton(newState);
    });
  });
});

function updateButton(isEnabled) {
  button.textContent = isEnabled ? "ON" : "OFF";
}
