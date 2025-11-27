// 状态管理
let state = {
  isSelecting: false,
  hasSelection: false,
  isCapturing: false,
  selectionBox: null,
  selectedArea: null,
  captures: [],
  selectionOverlay: null,
  resizeHandles: []
};

// 创建选择覆盖层
function createSelectionOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'scrollsnap-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999999;
    cursor: crosshair;
  `;
  document.body.appendChild(overlay);
  return overlay;
}

// 创建选择框
function createSelectionBox() {
  const box = document.createElement('div');
  box.id = 'scrollsnap-selection-box';
  box.style.cssText = `
    position: fixed;
    border: 2px solid #4CAF50;
    background: rgba(76, 175, 80, 0.1);
    z-index: 1000000;
    pointer-events: none;
  `;
  document.body.appendChild(box);
  return box;
}

// 创建固定区域框（截图时显示）
function createFixedBox(area) {
  const box = document.createElement('div');
  box.id = 'scrollsnap-fixed-box';
  box.style.cssText = `
    position: fixed;
    left: ${area.left}px;
    top: ${area.top}px;
    width: ${area.width}px;
    height: ${area.height}px;
    border: 2px solid #2196F3;
    background: rgba(33, 150, 243, 0.05);
    z-index: 1000000;
    pointer-events: none;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.3);
  `;

  // 添加提示文本
  const label = document.createElement('div');
  label.style.cssText = `
    position: absolute;
    top: -30px;
    left: 0;
    background: #2196F3;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-family: Arial, sans-serif;
    white-space: nowrap;
  `;
  label.textContent = '📸 滚动截图中... (滚动页面进行截图)';
  box.appendChild(label);

  document.body.appendChild(box);
  return box;
}

// 显示提示消息
function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #323232;
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    z-index: 1000003;
    font-family: Arial, sans-serif;
    font-size: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    animation: slideDown 0.3s ease-out;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideUp 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// 开始选择区域
function startSelection() {
  if (state.isSelecting) {
    showToast('⚠️ 已经在选择模式中');
    return { success: false };
  }

  console.log('ScrollSnap: 启动选择模式');
  state.isSelecting = true;
  state.hasSelection = false;

  // 移除旧的元素
  cleanupSelection();

  state.selectionOverlay = createSelectionOverlay();
  state.selectionBox = createSelectionBox();

  // 显示提示
  showToast('📌 拖动鼠标选择要截图的区域', 3000);

  let startX, startY;

  const onMouseDown = (e) => {
    startX = e.clientX;
    startY = e.clientY;
    state.selectionBox.style.left = startX + 'px';
    state.selectionBox.style.top = startY + 'px';
    state.selectionBox.style.width = '0px';
    state.selectionBox.style.height = '0px';
    state.selectionBox.style.display = 'block';
  };

  const onMouseMove = (e) => {
    if (!startX) return;

    const currentX = e.clientX;
    const currentY = e.clientY;

    const left = Math.min(startX, currentX);
    const top = Math.min(startY, currentY);
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);

    state.selectionBox.style.left = left + 'px';
    state.selectionBox.style.top = top + 'px';
    state.selectionBox.style.width = width + 'px';
    state.selectionBox.style.height = height + 'px';
  };

  const onMouseUp = (e) => {
    if (!startX) return;

    const left = parseInt(state.selectionBox.style.left);
    const top = parseInt(state.selectionBox.style.top);
    const width = parseInt(state.selectionBox.style.width);
    const height = parseInt(state.selectionBox.style.height);

    if (width > 20 && height > 20) {
      state.selectedArea = { left, top, width, height };
      state.hasSelection = true;
      showConfirmation();
    } else {
      cleanupSelection();
    }

    state.isSelecting = false;
    state.selectionOverlay.removeEventListener('mousedown', onMouseDown);
    state.selectionOverlay.removeEventListener('mousemove', onMouseMove);
    state.selectionOverlay.removeEventListener('mouseup', onMouseUp);
  };

  state.selectionOverlay.addEventListener('mousedown', onMouseDown);
  state.selectionOverlay.addEventListener('mousemove', onMouseMove);
  state.selectionOverlay.addEventListener('mouseup', onMouseUp);

  return { success: true };
}

// 显示确认界面
function showConfirmation() {
  if (state.selectionOverlay) {
    state.selectionOverlay.remove();
    state.selectionOverlay = null;
  }

  // 显示提示
  showToast('✓ 区域已选择，点击确认或取消', 5000);

  // 添加确认按钮
  const confirmBtn = document.createElement('div');
  confirmBtn.id = 'scrollsnap-confirm-btn';
  confirmBtn.style.cssText = `
    position: fixed;
    left: ${state.selectedArea.left}px;
    top: ${state.selectedArea.top - 40}px;
    background: #4CAF50;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    z-index: 1000001;
    font-family: Arial, sans-serif;
    font-size: 14px;
    user-select: none;
  `;
  confirmBtn.textContent = '✓ 确认选择';
  confirmBtn.onclick = confirmSelection;

  const cancelBtn = document.createElement('div');
  cancelBtn.id = 'scrollsnap-cancel-btn';
  cancelBtn.style.cssText = `
    position: fixed;
    left: ${state.selectedArea.left + 110}px;
    top: ${state.selectedArea.top - 40}px;
    background: #f44336;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    z-index: 1000001;
    font-family: Arial, sans-serif;
    font-size: 14px;
    user-select: none;
  `;
  cancelBtn.textContent = '✗ 取消';
  cancelBtn.onclick = () => {
    cleanupSelection();
    state.hasSelection = false;
  };

  document.body.appendChild(confirmBtn);
  document.body.appendChild(cancelBtn);
}

// 确认选择
function confirmSelection() {
  document.getElementById('scrollsnap-confirm-btn')?.remove();
  document.getElementById('scrollsnap-cancel-btn')?.remove();
  if (state.selectionBox) {
    state.selectionBox.remove();
    state.selectionBox = null;
  }
  showToast('✓ 区域已确认！现在可以开始截图', 2000);
}

// 清理选择相关元素
function cleanupSelection() {
  state.selectionOverlay?.remove();
  state.selectionBox?.remove();
  document.getElementById('scrollsnap-confirm-btn')?.remove();
  document.getElementById('scrollsnap-cancel-btn')?.remove();
  document.getElementById('scrollsnap-fixed-box')?.remove();
  state.selectionOverlay = null;
  state.selectionBox = null;
}

// 开始捕获
function startCapture() {
  if (!state.hasSelection) {
    showToast('⚠️ 请先选择区域', 2000);
    return { success: false, error: 'No selection' };
  }

  if (state.isCapturing) {
    showToast('⚠️ 已经在捕获模式中', 2000);
    return { success: false, error: 'Already capturing' };
  }

  console.log('ScrollSnap: 开始捕获');
  state.isCapturing = true;
  state.captures = [];

  // 显示固定的选择框
  const fixedBox = createFixedBox(state.selectedArea);

  // 显示提示
  showToast('📸 截图模式已开启，滚动页面进行捕获', 3000);

  // 监听滚动事件
  let scrollTimeout;
  state.scrollHandler = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      captureArea();
    }, 100); // 防抖100ms
  };

  window.addEventListener('scroll', state.scrollHandler);

  // 立即捕获第一张
  captureArea();

  return { success: true };
}

// 停止捕获
function stopCapture() {
  if (!state.isCapturing) {
    showToast('⚠️ 当前没有在捕获', 2000);
    return { success: false };
  }

  console.log('ScrollSnap: 停止捕获，共捕获', state.captures.length, '张');
  state.isCapturing = false;
  window.removeEventListener('scroll', state.scrollHandler);
  document.getElementById('scrollsnap-fixed-box')?.remove();

  showToast(`✓ 已停止捕获，共 ${state.captures.length} 张截图`, 3000);

  return { success: true, count: state.captures.length };
}

// 捕获选定区域
async function captureArea() {
  if (!state.selectedArea) return;

  try {
    const area = state.selectedArea;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 设置canvas尺寸
    canvas.width = area.width;
    canvas.height = area.height;

    // 使用html2canvas捕获区域（需要引入库，或使用原生方法）
    // 这里使用简化的方法：通过截取viewport的方式
    const dataUrl = await captureScreenshot(area);

    state.captures.push({
      dataUrl,
      timestamp: Date.now(),
      scrollY: window.scrollY,
      scrollX: window.scrollX
    });

    // 显示捕获提示
    showCaptureIndicator();
  } catch (error) {
    console.error('Capture error:', error);
  }
}

// 截图（使用Chrome API）
async function captureScreenshot(area) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { action: 'captureVisibleTab' },
      (response) => {
        if (response && response.dataUrl) {
          // 裁剪图片到选定区域
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = area.width;
            canvas.height = area.height;

            // 考虑设备像素比
            const dpr = window.devicePixelRatio || 1;
            ctx.drawImage(
              img,
              area.left * dpr,
              area.top * dpr,
              area.width * dpr,
              area.height * dpr,
              0,
              0,
              area.width,
              area.height
            );

            resolve(canvas.toDataURL('image/png'));
          };
          img.src = response.dataUrl;
        }
      }
    );
  });
}

// 显示捕获指示器
function showCaptureIndicator() {
  const indicator = document.createElement('div');
  indicator.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 12px 20px;
    border-radius: 4px;
    z-index: 1000002;
    font-family: Arial, sans-serif;
    font-size: 14px;
    animation: slideIn 0.3s ease-out;
  `;
  indicator.textContent = `✓ 已捕获 ${state.captures.length} 张截图`;

  document.body.appendChild(indicator);

  setTimeout(() => {
    indicator.remove();
  }, 1000);
}

// 下载截图
function downloadCaptures() {
  if (state.captures.length === 0) {
    showToast('⚠️ 没有可下载的截图', 2000);
    return { success: false };
  }

  console.log('ScrollSnap: 下载', state.captures.length, '张截图');
  const count = state.captures.length;
  const timestamp = Date.now();

  state.captures.forEach((capture, index) => {
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = capture.dataUrl;
      link.download = `scrollsnap_${timestamp}_${index + 1}.png`;
      link.click();
    }, index * 100); // 延迟下载避免浏览器阻止
  });

  // 清空captures
  state.captures = [];

  showToast(`✓ 正在下载 ${count} 张截图...`, 2000);

  return { success: true };
}

// 监听来自popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'startSelection':
      startSelection();
      sendResponse({ success: true });
      break;

    case 'startCapture':
      sendResponse(startCapture());
      break;

    case 'stopCapture':
      sendResponse(stopCapture());
      break;

    case 'downloadCaptures':
      sendResponse(downloadCaptures());
      break;

    case 'getState':
      sendResponse({
        hasSelection: state.hasSelection,
        isCapturing: state.isCapturing,
        captureCount: state.captures.length
      });
      break;

    default:
      sendResponse({ success: false });
  }

  return true; // 保持消息通道开放
});

// 添加样式动画
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      transform: translate(-50%, -20px);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translate(-50%, 0);
      opacity: 1;
    }
    to {
      transform: translate(-50%, -20px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

console.log('✓ ScrollSnap content script loaded and ready');
