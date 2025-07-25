from PIL import Image, ImageDraw, ImageFont
import math

# Create a new image with transparent background
width, height = 120, 120
img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Define color scheme
primary_color = (255, 255, 255, 255)    # White
accent_color = (0, 102, 204, 255)       # Deep blue
background_color = (0, 102, 204, 180)    # More opaque blue
highlight_color = (255, 255, 255, 150)  # White highlight

# Create a modern geometric design
radius = 80
outer_radius = radius + 10

# Draw background circle with gradient
draw.ellipse([(width//2-radius, height//2-radius), (width//2+radius, height//2+radius)], fill=background_color)

# Add a subtle border with gradient effect
for i in range(10):
    opacity = int(255 * (i/10))
    draw.ellipse([(width//2-radius-i, height//2-radius-i), 
                  (width//2+radius+i, height//2+radius+i)], 
                 fill=(0, 102, 204, opacity))

# Add a geometric pattern
pattern_size = 20
for i in range(4):
    angle = 45 * i
    x1 = width//2 + int(radius * 0.7 * math.cos(math.radians(angle)))
    y1 = height//2 + int(radius * 0.7 * math.sin(math.radians(angle)))
    x2 = width//2 + int(radius * 0.9 * math.cos(math.radians(angle)))
    y2 = height//2 + int(radius * 0.9 * math.sin(math.radians(angle)))
    draw.line([(x1, y1), (x2, y2)], fill=highlight_color, width=2)

# Add initials with custom styling
font_size = 100
font = ImageFont.truetype("arial.ttf", font_size)
text = "SN"

# Get text size using getbbox
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
x = (width - text_width) // 2
y = (height - text_height) // 2

# Create a custom text effect
# Add a subtle inner shadow
draw.text((x+2, y+2), text, font=font, fill=(0, 102, 204, 150))
# Add a subtle highlight
draw.text((x-1, y-1), text, font=font, fill=(255, 255, 255, 100))
# Draw main text
draw.text((x, y), text, font=font, fill=primary_color)

# Add a subtle glow effect
for i in range(5):
    opacity = int(255 * (1 - i/5))
    draw.ellipse([(width//2-radius-i, height//2-radius-i), 
                  (width//2+radius+i, height//2+radius+i)], 
                 fill=(0, 102, 204, opacity))

# Save the image with high quality
img.save('images/logo.png', format='PNG', quality=95)
