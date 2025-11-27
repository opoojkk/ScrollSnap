const selectAreaBtn = document.getElementById('selectAreaBtn');
const startCaptureBtn = document.getElementById('startCaptureBtn');
const stopCaptureBtn = document.getElementById('stopCaptureBtn');
const downloadBtn = document.getElementById('downloadBtn');
const statusDiv = document.getElementById('status');
const exportFormat = document.getElementById('exportFormat');

function showStatus(message, type = 'info') {
  statusDiv.textContent = message;
  statusDiv.className = `status status-${type}`;
  statusDiv.style.display = 'block';
}

// 选择区域
selectAreaBtn.addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // 检查是否是受限页面
    if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://') || tab.url.startsWith('edge://')) {
      showStatus('⚠️ 此页面不支持扩展功能', 'info');
      return;
    }

    showStatus('正在启动选择模式...', 'info');

    // 发送消息到content script
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'startSelection' });

    if (response && response.success) {
      showStatus('✓ 已进入选择模式，请在页面上拖动鼠标', 'success');
      // 延迟关闭以便用户看到提示
      setTimeout(() => window.close(), 800);
    } else {
      showStatus('✗ 启动失败，请刷新页面后重试', 'info');
    }
  } catch (error) {
    console.error('启动选择模式失败:', error);
    showStatus('✗ 无法连接到页面，请刷新后重试', 'info');
  }
});

// 开始截图
startCaptureBtn.addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    showStatus('正在启动截图模式...', 'info');
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'startCapture' });

    if (response && response.success) {
      showStatus('✓ 长图模式已开启，滚动将自动拼接', 'success');
      startCaptureBtn.disabled = true;
      stopCaptureBtn.disabled = false;
    } else {
      showStatus('✗ 请先选择区域', 'info');
    }
  } catch (error) {
    console.error('启动截图失败:', error);
    showStatus('✗ 操作失败，请重试', 'info');
  }
});

// 停止截图
stopCaptureBtn.addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const response = await chrome.tabs.sendMessage(tab.id, { action: 'stopCapture' });

    if (response && response.success) {
      showStatus(`✓ 已捕获 ${response.count} 帧，准备拼接长图`, 'success');
      stopCaptureBtn.disabled = true;
      downloadBtn.disabled = false;
    } else {
      showStatus('✗ 停止失败', 'info');
    }
  } catch (error) {
    console.error('停止截图失败:', error);
    showStatus('✗ 操作失败', 'info');
  }
});

// 更新下载按钮文本
exportFormat.addEventListener('change', () => {
  const format = exportFormat.value.toUpperCase();
  downloadBtn.textContent = `📥 下载长图 (${format})`;

  const formatInfo = document.querySelector('.format-info');
  switch(exportFormat.value) {
    case 'png':
      formatInfo.textContent = '💡 PNG格式质量最佳，适合长图';
      break;
    case 'jpeg':
      formatInfo.textContent = '💡 JPEG文件更小，但有轻微压缩';
      break;
    case 'webp':
      formatInfo.textContent = '💡 WebP平衡质量和大小，Chrome支持';
      break;
  }
});

// 下载截图
downloadBtn.addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const format = exportFormat.value;

    showStatus(`🔄 正在拼接长图 (${format.toUpperCase()})...`, 'info');
    const response = await chrome.tabs.sendMessage(tab.id, {
      action: 'downloadCaptures',
      format: format
    });

    if (response && response.success) {
      showStatus(`✓ ${format.toUpperCase()} 长图已生成并下载！`, 'success');
      downloadBtn.disabled = true;
      setTimeout(() => {
        downloadBtn.disabled = false;
        showStatus('可以重新开始截图', 'info');
      }, 2000);
    } else {
      showStatus('✗ 没有可下载的内容', 'info');
    }
  } catch (error) {
    console.error('下载截图失败:', error);
    showStatus('✗ 下载失败', 'info');
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
      showStatus(`已捕获 ${response.captureCount} 帧，可下载长图`, 'success');
    }
  } catch (error) {
    console.log('Content script not ready:', error);
  }
}

checkState();
