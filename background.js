// Background Service Worker for ScrollSnap

// 监听来自content script的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureVisibleTab') {
    // 捕获当前可见标签页
    chrome.tabs.captureVisibleTab(
      null,
      { format: 'png' },
      (dataUrl) => {
        if (chrome.runtime.lastError) {
          console.error('Capture error:', chrome.runtime.lastError);
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
        } else {
          sendResponse({ success: true, dataUrl: dataUrl });
        }
      }
    );
    return true; // 保持消息通道开放以进行异步响应
  }
});

// 扩展安装或更新时
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('ScrollSnap extension installed');
  } else if (details.reason === 'update') {
    console.log('ScrollSnap extension updated');
  }
});

console.log('ScrollSnap background service worker loaded');
