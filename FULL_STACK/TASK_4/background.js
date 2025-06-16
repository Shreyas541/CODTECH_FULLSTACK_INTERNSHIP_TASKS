let siteTimes = {};
let currentTab = null;
let lastSwitch = Date.now();

chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    if (currentTab) {
      const timeSpent = Date.now() - lastSwitch;
      siteTimes[currentTab] = (siteTimes[currentTab] || 0) + timeSpent;
    }
    currentTab = new URL(tab.url).hostname;
    lastSwitch = Date.now();
    chrome.storage.local.set({ siteTimes });
  });
});

setInterval(() => {
  chrome.storage.local.set({ siteTimes });
}, 60000);
