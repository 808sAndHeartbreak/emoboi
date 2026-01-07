import os
import shutil

# 切换到 asset 目录
os.chdir(r'D:\code\mywebsite\asset')

# 重命名映射表
renames = {
    # Logo/品牌
    'Ecco2k-E.jpg': 'logo-e.jpg',
    
    # 特殊用途
    'drain-angel-gojuon-preview.jpg': 'gojuon-wallpaper-preview.jpg',
    
    # Death Note 系列
    'drained-pray.jpg': 'slowdamage-towa.jpg',
    'drained-yagami.jpg': 'deathnote-light-yagami-glitch.jpg',
    'light-yagami.jpg': 'deathnote-light-yagami.jpg',
    'L-hair.jpg': 'deathnote-l-hair.jpg',
    'L-misa-cafe.jpg': 'deathnote-l-misa-cafe.jpg',
    'L-iammusic.jpg': 'deathnote-l-iammusic.jpg',
    'misa-room.jpg': 'deathnote-misa-room.jpg',
    'misa-striped.jpg': 'deathnote-misa-striped.jpg',
    'misa-wings.png': 'deathnote-misa-wings.png',
    
    # 其他动漫角色
    'gaara-ai.jpg': 'naruto-gaara-ai.jpg',
    'gintoki.jpg': 'gintama-gintoki.jpg',
    'parasyte.jpg': 'parasyte-izumi.jpg',
    
    # 猫系列
    'goth-cat.jpg': 'cat-goth.jpg',
    'kitten.jpg': 'cat-kitten.jpg',
    'twin-cats.jpg': 'cat-twin.jpg',
    'drained-kitten.jpg': 'cat-kitten-glitch.jpg',
    
    # Glitch/艺术风格
    'glitchsittinggirl.jpg': 'glitch-girl-sitting.jpg',
    'pixelangel.jpg': 'pixel-angel.jpg',
    'punkboyglitch.jpg': 'punk-boy-glitch.jpg',
    'rockstarboy.jpg': 'rockstar-boy.jpg',
    'errorhead.jpg': 'glitch-error-head.jpg',
    'dizzygirl.jpg': 'glitch-girl-dizzy.jpg',
    
    # 艺术家
    'lil-peep.jpg': 'artist-lil-peep.jpg',
    
    # 其他
    'iammusic.jpg': 'opium-iammusic.jpg',
    'kanye&Ryuk.jpg': 'kanye-ryuk.jpg',
    'nakamura sawa.jpg': 'nakamura-sawa.jpg',
}

# 执行重命名
for old_name, new_name in renames.items():
    if os.path.exists(old_name):
        try:
            os.rename(old_name, new_name)
            print(f'✓ {old_name} -> {new_name}')
        except Exception as e:
            print(f'✗ 重命名失败 {old_name}: {e}')
    else:
        print(f'⚠ 文件不存在: {old_name}')

print('\n重命名完成！')

