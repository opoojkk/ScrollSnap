#!/usr/bin/env python3
"""
生成 ScrollSnap 扩展的图标
需要安装 Pillow: pip install Pillow
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os

    def create_icon(size, output_path):
        """创建一个相机图标"""
        # 创建图片
        img = Image.new('RGBA', (size, size), (255, 255, 255, 0))
        draw = ImageDraw.Draw(img)

        # 背景圆形
        padding = size // 10
        draw.ellipse(
            [padding, padding, size - padding, size - padding],
            fill='#4CAF50',
            outline='#2E7D32',
            width=max(1, size // 32)
        )

        # 相机图标（简化版）
        camera_padding = size // 3

        # 相机主体
        draw.rectangle(
            [camera_padding, camera_padding + size // 8,
             size - camera_padding, size - camera_padding],
            fill='white',
            outline='#2E7D32',
            width=max(1, size // 32)
        )

        # 相机镜头
        lens_center = size // 2
        lens_radius = size // 6
        draw.ellipse(
            [lens_center - lens_radius, lens_center - lens_radius,
             lens_center + lens_radius, lens_center + lens_radius],
            fill='#E0E0E0',
            outline='#2E7D32',
            width=max(1, size // 32)
        )

        # 闪光灯
        flash_size = size // 12
        draw.rectangle(
            [size // 2 - flash_size // 2, camera_padding - size // 16,
             size // 2 + flash_size // 2, camera_padding + size // 16],
            fill='white',
            outline='#2E7D32',
            width=1
        )

        # 保存图片
        img.save(output_path, 'PNG')
        print(f'✓ 已生成: {output_path} ({size}x{size})')

    # 创建图标目录
    icons_dir = 'icons'
    if not os.path.exists(icons_dir):
        os.makedirs(icons_dir)

    # 生成不同尺寸的图标
    create_icon(16, os.path.join(icons_dir, 'icon16.png'))
    create_icon(48, os.path.join(icons_dir, 'icon48.png'))
    create_icon(128, os.path.join(icons_dir, 'icon128.png'))

    print('\n✅ 所有图标已生成成功！')
    print('现在可以加载扩展到 Chrome 了。')

except ImportError:
    print('❌ 错误: 未安装 Pillow 库')
    print('\n请运行以下命令安装:')
    print('  pip install Pillow')
    print('\n或者手动创建图标文件，详见 icons/README.md')
