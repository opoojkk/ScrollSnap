# 📸 ScrollSnap - 浏览器滚动截图工具

ScrollSnap 是一个强大的 Chrome 浏览器扩展，允许你选择页面上的任意区域，并在滚动时自动捕获该区域的截图。

## ✨ 功能特性

- 🎯 **自由选择区域**: 在页面上拖动鼠标，选择任意矩形区域
- 📸 **自动截图**: 页面滚动时自动捕获选定区域的内容
- 💾 **批量下载**: 一键下载所有捕获的截图
- 🎨 **直观界面**: 简洁美观的用户界面
- ⚡ **轻量高效**: 使用原生 Chrome API，性能优秀

## 🚀 安装方法

### 开发者模式安装

1. 克隆或下载此仓库到本地
   ```bash
   git clone https://github.com/yourusername/ScrollSnap.git
   ```

2. 打开 Chrome 浏览器，访问 `chrome://extensions/`

3. 在右上角开启"开发者模式"

4. 点击"加载已解压的扩展程序"

5. 选择 ScrollSnap 项目文件夹

6. 扩展安装完成！

### 准备图标（可选）

在 `icons/` 目录下添加以下图标文件：
- `icon16.png` (16x16 像素)
- `icon48.png` (48x48 像素)
- `icon128.png` (128x128 像素)

详见 `icons/README.md` 说明。

## 📖 使用说明

### 第一步：选择区域

1. 点击浏览器工具栏中的 ScrollSnap 图标
2. 在弹出窗口中点击"**选择区域**"按钮
3. 页面会出现半透明遮罩层
4. 按住鼠标左键拖动，选择你想要截图的区域
5. 松开鼠标后，点击"**✓ 确认选择**"

### 第二步：开始截图

1. 再次点击 ScrollSnap 图标
2. 点击"**开始截图**"按钮
3. 选定的区域会高亮显示，并带有蓝色边框

### 第三步：滚动页面

- 正常滚动页面（使用鼠标滚轮、触摸板或键盘）
- 每次滚动停止后，插件会自动捕获选定区域的当前内容
- 右上角会显示已捕获的截图数量

### 第四步：停止并下载

1. 滚动完成后，点击"**停止截图**"按钮
2. 点击"**下载截图**"按钮
3. 所有截图将自动下载到你的默认下载文件夹

## 🎬 使用场景

- 📚 捕获长文章或文档的特定列
- 🎨 记录网页设计的滚动效果
- 📊 截取数据表格的连续部分
- 💬 保存聊天记录或评论区内容
- 🔍 研究网页布局和视觉变化

## 🛠️ 技术栈

- **Manifest V3**: 使用最新的 Chrome 扩展规范
- **原生 JavaScript**: 无需外部依赖
- **Chrome APIs**:
  - `chrome.tabs.captureVisibleTab` - 截图功能
  - `chrome.runtime.sendMessage` - 消息通信
  - `chrome.storage` - 状态持久化

## 📁 项目结构

```
ScrollSnap/
├── manifest.json          # 扩展配置文件
├── popup.html            # 弹出窗口界面
├── popup.js              # 弹出窗口逻辑
├── content.js            # 内容脚本（核心功能）
├── content.css           # 内容脚本样式
├── background.js         # 后台服务工作线程
├── icons/                # 图标文件目录
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── LICENSE               # 开源许可证
└── README.md             # 说明文档
```

## 🔧 开发说明

### 核心功能实现

1. **区域选择** (`content.js`)
   - 创建全屏覆盖层
   - 监听鼠标事件绘制选择框
   - 保存选定区域坐标

2. **滚动截图** (`content.js` + `background.js`)
   - 监听页面滚动事件
   - 使用防抖优化性能
   - 调用 Chrome API 捕获可见区域
   - 裁剪图片到选定区域

3. **图片管理**
   - 内存中存储截图数据
   - 支持批量下载
   - 自动生成带时间戳的文件名

### 调试技巧

- 查看 content script 日志: 在页面上按 F12，查看 Console
- 查看 background script 日志: 访问 `chrome://extensions/`，点击扩展的"检查视图"
- 查看 popup 日志: 右键点击扩展图标，选择"检查弹出内容"

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📝 待办事项

- [ ] 添加截图拼接功能（自动合并为长图）
- [ ] 支持区域大小调整和移动
- [ ] 添加截图历史记录
- [ ] 支持导出为 PDF
- [ ] 添加快捷键支持
- [ ] 国际化支持（多语言）

## 📄 许可证

本项目基于 MIT 许可证开源 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

## 📮 联系方式

如有问题或建议，欢迎：
- 提交 [Issue](../../issues)
- 发起 [Discussion](../../discussions)

---

**享受截图的乐趣！** 📸✨
