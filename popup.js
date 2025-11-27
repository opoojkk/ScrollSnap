const selectAreaBtn = document.getElementById('selectAreaBtn');
const startCaptureBtn = document.getElementById('startCaptureBtn');
const stopCaptureBtn = document.getElementById('stopCaptureBtn');
const downloadBtn = document.getElementById('downloadBtn');
const statusDiv = document.getElementById('status');

function showStatus(message, type = 'info') {
  statusDiv.textContent = message;
  statusDiv.className = `status status-${type}`;
  statusDiv.style.display = 'block';
}

// 选择区域
selectAreaBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.tabs.sendMessage(tab.id, { action: 'startSelection' });
  showStatus('请在页面上拖动鼠标选择区域', 'info');
  window.close();
});

// 开始截图
startCaptureBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const response = await chrome.tabs.sendMessage(tab.id, { action: 'startCapture' });
  if (response.success) {
    showStatus('滚动截图已开启', 'success');
    startCaptureBtn.disabled = true;
    stopCaptureBtn.disabled = false;
  }
});

// 停止截图
stopCaptureBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const response = await chrome.tabs.sendMessage(tab.id, { action: 'stopCapture' });
  if (response.success) {
    showStatus(`已捕获 ${response.count} 张截图`, 'success');
    stopCaptureBtn.disabled = true;
    downloadBtn.disabled = false;
  }
});

// 下载截图
downloadBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const response = await chrome.tabs.sendMessage(tab.id, { action: 'downloadCaptures' });
  if (response.success) {
    showStatus('截图已开始下载', 'success');
    downloadBtn.disabled = true;
  }
});

// 检查当前状态
async function checkState() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'getState' });

    if (response.hasSelection) {
      startCaptureBtn.disabled = false;
      showStatus('已选择区域，可以开始截图', 'success');
    }

    if (response.isCapturing) {
      startCaptureBtn.disabled = true;
      stopCaptureBtn.disabled = false;
      showStatus('正在捕获中...', 'info');
    }

    if (response.captureCount > 0 && !response.isCapturing) {
      downloadBtn.disabled = false;
      showStatus(`已捕获 ${response.captureCount} 张截图`, 'success');
    }
  } catch (error) {
    console.log('Content script not ready:', error);
  }
}

checkState();
