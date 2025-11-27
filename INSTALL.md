# 📦 ScrollSnap 安装指南

## 快速安装（3 分钟）

### 1️⃣ 获取代码

```bash
git clone https://github.com/yourusername/ScrollSnap.git
cd ScrollSnap
```

### 2️⃣ 准备图标（可选）

ScrollSnap 需要三个图标文件。你有两个选择：

#### 选项 A: 临时跳过图标

如果你想快速测试，可以暂时注释掉 manifest.json 中的图标配置：

```json
// 注释掉这些行：
// "default_icon": {
//   "16": "icons/icon16.png",
//   "48": "icons/icon48.png",
//   "128": "icons/icon128.png"
// }
```

#### 选项 B: 使用在线工具生成图标

1. 访问 [Favicon Generator](https://www.favicon-generator.org/)
2. 上传一张图片（建议：📸相机图标）
3. 下载生成的图标包
4. 将图标重命名为 `icon16.png`, `icon48.png`, `icon128.png`
5. 放入 `icons/` 目录

### 3️⃣ 加载到 Chrome

1. 打开 Chrome 浏览器
2. 在地址栏输入: `chrome://extensions/`
3. 在右上角开启 **"开发者模式"**
4. 点击 **"加载已解压的扩展程序"**
5. 选择 ScrollSnap 文件夹
6. 完成！你会看到扩展图标出现在工具栏

## 🎯 验证安装

安装成功后，你应该能看到：
- ✅ 工具栏上的 ScrollSnap 图标
- ✅ 点击图标后弹出的控制面板
- ✅ 在任意网页点击"选择区域"可以正常工作

## 🔧 故障排除

### 问题：扩展无法加载

**解决方案**:
- 确保所有文件都在正确的位置
- 检查 manifest.json 语法是否正确
- 查看 Chrome 扩展页面的错误提示

### 问题：图标不显示

**解决方案**:
- 暂时注释掉 manifest.json 中的图标配置
- 或者按照上面的指南添加图标文件

### 问题：选择区域后没有反应

**解决方案**:
- 按 F12 打开开发者工具，查看 Console 是否有错误
- 刷新页面后重试
- 确保网站允许扩展运行（某些网站如 chrome:// 页面不支持扩展）

### 问题：截图功能不工作

**解决方案**:
- 确保授予了 "activeTab" 权限
- 在扩展管理页面检查权限设置
- 尝试在其他网站上使用

## 🚀 开始使用

安装完成后，查看 [README.md](README.md) 了解详细的使用说明。

## 💡 开发模式

如果你想修改代码：

1. 修改任何 `.js` 或 `.html` 文件
2. 回到 `chrome://extensions/`
3. 点击 ScrollSnap 卡片上的 **刷新图标** 🔄
4. 刷新你要测试的网页

## 📞 需要帮助？

- 📖 查看完整文档: [README.md](README.md)
- 🐛 报告问题: [GitHub Issues](../../issues)
- 💬 讨论交流: [GitHub Discussions](../../discussions)

---

祝你使用愉快！ 📸✨
