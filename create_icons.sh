#!/bin/bash
# 使用 ImageMagick 或 rsvg-convert 从 SVG 生成 PNG 图标

echo "正在生成图标..."

# 检查是否安装了转换工具
if command -v rsvg-convert &> /dev/null; then
    echo "使用 rsvg-convert..."
    rsvg-convert -w 16 -h 16 icon.svg -o icons/icon16.png
    rsvg-convert -w 48 -h 48 icon.svg -o icons/icon48.png
    rsvg-convert -w 128 -h 128 icon.svg -o icons/icon128.png
    echo "✅ 图标生成成功！"
elif command -v convert &> /dev/null; then
    echo "使用 ImageMagick convert..."
    convert -background none icon.svg -resize 16x16 icons/icon16.png
    convert -background none icon.svg -resize 48x48 icons/icon48.png
    convert -background none icon.svg -resize 128x128 icons/icon128.png
    echo "✅ 图标生成成功！"
elif command -v inkscape &> /dev/null; then
    echo "使用 Inkscape..."
    inkscape icon.svg -w 16 -h 16 -o icons/icon16.png
    inkscape icon.svg -w 48 -h 48 -o icons/icon48.png
    inkscape icon.svg -w 128 -h 128 -o icons/icon128.png
    echo "✅ 图标生成成功！"
else
    echo "❌ 未找到图标转换工具"
    echo ""
    echo "请安装以下工具之一："
    echo "  - librsvg (rsvg-convert): sudo apt install librsvg2-bin"
    echo "  - ImageMagick (convert): sudo apt install imagemagick"
    echo "  - Inkscape: sudo apt install inkscape"
    echo ""
    echo "或者使用在线工具："
    echo "  1. 使用 https://cloudconvert.com/svg-to-png 转换 icon.svg"
    echo "  2. 下载 16x16, 48x48, 128x128 三种尺寸"
    echo "  3. 重命名并放入 icons/ 目录"
    exit 1
fi
