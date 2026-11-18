"""Rebuild web previews (requires Pillow). Preserve original files for the lightbox."""
from pathlib import Path
import json
import re
from PIL import Image, ImageOps

root = Path(__file__).resolve().parent.parent
html = (root / 'gallery/index.html').read_text(encoding='utf-8')
metrics = []
for tag in re.findall(r'<img\b[^>]*data-full="[^\"]+"[^>]*>', html):
    original = re.search(r'data-full="([^\"]+)"', tag)[1]
    source = (root / 'gallery' / original).resolve()
    target = root / 'asset/gallery-preview' / (source.stem + '.webp')
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        preview = ImageOps.exif_transpose(image).convert('RGB')
        preview.thumbnail((640, 900))
        preview.save(target, 'WEBP', quality=72, method=6)
    metrics.append(dict(original=original, target=target.relative_to(root).as_posix(), before=source.stat().st_size, after=target.stat().st_size))
(root / 'scripts/asset-metrics-v34.json').write_text(json.dumps(metrics, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'{len(metrics)} previews: {sum(r["before"] for r in metrics):,} → {sum(r["after"] for r in metrics):,} bytes')
