from PIL import Image, ImageDraw

def make_icon(size, path):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # background rounded square with sunset gradient
    r = int(size * 0.22)
    top = (255, 126, 95)      # coral
    bottom = (61, 55, 143)    # deep indigo
    for y in range(size):
        t = y / max(1, size - 1)
        col = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        d.line([(0, y), (size, y)], fill=col + (255,))

    mask = Image.new("L", (size, size), 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle([0, 0, size - 1, size - 1], radius=r, fill=255)
    img.putalpha(mask)

    d = ImageDraw.Draw(img)

    # sun/globe circle
    cx, cy = size * 0.5, size * 0.48
    rad = size * 0.30
    d.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(255, 214, 92, 255))

    # simple "meridian" arcs to suggest a globe
    line_col = (255, 126, 95, 210)
    lw = max(1, int(size * 0.03))
    d.arc([cx - rad, cy - rad, cx + rad, cy + rad], start=0, end=360, fill=line_col, width=lw)
    d.line([(cx, cy - rad), (cx, cy + rad)], fill=line_col, width=lw)
    d.ellipse([cx - rad * 0.5, cy - rad, cx + rad * 0.5, cy + rad], outline=line_col, width=lw)

    img.save(path)

for s, name in [(16, "icon16.png"), (48, "icon48.png"), (128, "icon128.png")]:
    make_icon(s, f"icons/{name}")

print("done")
