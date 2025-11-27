# 🚀 快速开始

## 立即使用（无需图标）

如果你想立即测试扩展而不创建图标，可以暂时修改配置：

### 修改 manifest.json

打开 `manifest.json`，找到两处图标配置并注释掉：

```json
{
  "manifest_version": 3,
  "name": "ScrollSnap - 滚动截图工具",
  "version": "1.0.0",
  "description": "选择页面区域，实现滚动时自动截图",
  "permissions": [
    "activeTab",
    "scripting",
    "storage",
    "downloads"
  ],
  "host_permissions": [
    "<all_urls>"
  ],
  "action": {
    "default_popup": "popup.html"
    // 暂时注释掉图标配置
    // "default_icon": {
    //   "16": "icons/icon16.png",
    //   "48": "icons/icon48.png",
    //   "128": "icons/icon128.png"
    // }
  },
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "css": ["content.css"],
      "run_at": "document_idle"
    }
  ]
  // 也注释掉这个
  // "icons": {
  //   "16": "icons/icon16.png",
  //   "48": "icons/icon48.png",
  //   "128": "icons/icon128.png"
  // }
}
```

### 加载扩展

1. 打开 Chrome: `chrome://extensions/`
2. 开启右上角的"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择 ScrollSnap 目录
5. 完成！

## 添加图标（可选）

### 方法 1: 使用在线工具（推荐）

1. 访问 [SVG to PNG Converter](https://cloudconvert.com/svg-to-png)
2. 上传项目中的 `icon.svg` 文件
3. 转换为以下尺寸：
   - 16x16 像素 → 保存为 `icons/icon16.png`
   - 48x48 像素 → 保存为 `icons/icon48.png`
   - 128x128 像素 → 保存为 `icons/icon128.png`
4. 取消 manifest.json 中图标配置的注释
5. 在 Chrome 扩展页面刷新扩展

### 方法 2: 使用命令行工具

如果你的系统已安装 ImageMagick 或 librsvg：

```bash
./create_icons.sh
```

### 方法 3: 使用 Python

```bash
pip install Pillow
python3 generate_icons.py
```

## 使用教程

### 1. 选择区域
- 点击扩展图标
- 点击"选择区域"
- 在页面上拖动鼠标框选区域
- 点击"✓ 确认选择"

### 2. 开始截图
- 再次点击扩展图标
- 点击"开始截图"
- 滚动页面，自动捕获选定区域

### 3. 下载截图
- 点击"停止截图"
- 点击"下载截图"
- 所有截图将保存到下载文件夹

## 测试建议

可以在以下网站测试：
- https://zh.wikipedia.org (维基百科长文章)
- https://github.com (代码仓库页面)
- https://news.ycombinator.com (Hacker News)
- 任何你喜欢的长页面

## 常见问题

**Q: 扩展图标显示为拼图块？**
A: 这是正常的，表示没有自定义图标。功能完全正常。

**Q: 选择区域后看不到效果？**
A: 确保点击了"开始截图"按钮，然后滚动页面。

**Q: 截图是空白的？**
A: 某些网站可能有安全限制。尝试在其他网站使用。

---

享受截图！📸
