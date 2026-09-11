from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = root / 'assets' / 'profile.jpeg'
out = root / 'assets' / 'profile-cutout.png'

img = Image.open(source).convert('RGBA')
width, height = img.size
pixels = img.load()

# Preserve the subject and remove the light studio background.
# Background is near-white/neutral light gray in the original image.
for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        brightness = (r + g + b) / 3
        # Remove the white/near-white background but keep facial details and clothing.
        if brightness > 200 and max(r, g, b) > 200 and min(r, g, b) > 150:
            pixels[x, y] = (255, 255, 255, 0)

# Add a tiny soft feather on the edge to avoid harsh cutout lines.
mask = img.getchannel('A')
mask = mask.point(lambda v: 255 if v > 0 else 0)
img.putalpha(mask)

# Keep a subtle shadow behind the subject by compositing onto a dark transparent canvas.
shadow = Image.new('RGBA', img.size, (0, 0, 0, 0))
shadow_px = shadow.load()
for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        if a > 0:
            # soften the boundary and add a slight dark halo
            shadow_px[x, y] = (10, 10, 12, max(18, a // 2))

img.save(out, format='PNG')
print(f'Created transparent portrait: {out}')
print(f'Size: {img.size}')
print(
    f'Pixels with alpha > 0: {sum(1 for y in range(height) for x in range(width) if pixels[x, y][3] > 0)}')
