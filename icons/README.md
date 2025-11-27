# 图标文件说明

本目录需要包含以下图标文件：

- `icon16.png` - 16x16 像素图标
- `icon48.png` - 48x48 像素图标
- `icon128.png` - 128x128 像素图标

## 创建图标

你可以使用任何图片编辑工具创建这些图标，建议使用相机或截图相关的图标设计。

### 快速生成图标（使用在线工具）

1. 访问 https://www.favicon-generator.org/
2. 上传一个图片或创建一个简单的图标设计
3. 下载不同尺寸的图标
4. 将图标重命名为 icon16.png, icon48.png, icon128.png
5. 放置到此目录

### 使用 ImageMagick 快速生成（如果已安装）

```bash
# 从一个大图标生成多个尺寸
convert source.png -resize 16x16 icon16.png
convert source.png -resize 48x48 icon48.png
convert source.png -resize 128x128 icon128.png
```

## 临时解决方案

如果暂时没有图标，可以注释掉 manifest.json 中的图标相关配置，扩展仍然可以正常工作。
