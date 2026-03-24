import os
from PIL import Image

input_path = r"c:\Users\Alber\OneDrive\Desktop\AG\Clientes Control de Plagas\Baja Control de Plagas\Baja-Control-web\img\BCP-Logo-01.png"
output_path = r"c:\Users\Alber\OneDrive\Desktop\AG\Clientes Control de Plagas\Baja Control de Plagas\Baja-Control-web\img\logo-baja-control-de-plagas-mexicali.webp"

def optimize_logo():
    if not os.path.exists(input_path):
        print("Error: Input file does not exist.")
        return
    
    with Image.open(input_path) as img:
        # Resize to 300px width
        target_width = 300
        ratio = target_width / float(img.size[0])
        target_height = int(float(img.size[1]) * ratio)
        
        # We use RGBA to preserve transparency if it's a PNG
        resized_img = img.resize((target_width, target_height), Image.Resampling.LANCZOS)
        
        resized_img.save(output_path, "webp", quality=85, method=6)
        print(f"Success! Logo optimized. New size: {target_width}x{target_height}")
        print(f"Output saved to: {output_path}")

if __name__ == "__main__":
    optimize_logo()
