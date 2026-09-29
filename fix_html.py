import glob
import re

files_to_fix = [
    '/home/sir-p/Documents/Coding/unilesa-panafrican-college-laravel/application/index.html',
    '/home/sir-p/Documents/Coding/unilesa-panafrican-college-laravel/dashboard/index.html',
    '/home/sir-p/Documents/Coding/unilesa-panafrican-college-laravel/document/index.html'
]

tailwind_block = """
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700&display=swap" rel="stylesheet">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            display: ['Outfit', 'sans-serif'],
          },
          colors: {
            primary: {
              DEFAULT: '#0ea5e9',
              foreground: '#ffffff'
            },
            foreground: '#0f172a',
            success: '#16a34a',
            destructive: '#dc2626',
            brand: '#0ea5e9',
          }
        }
      }
    }
  </script>
"""

for path in files_to_fix:
    with open(path, 'r') as f:
        content = f.read()
    
    if "tailwindcss.com" not in content:
        # Insert before <link rel="stylesheet" href="index.css">
        content = re.sub(r'(<link rel="stylesheet" href="index.css">)', lambda m: tailwind_block.strip("\n") + "\n  " + m.group(1), content)
        
        # Replace <body> with <body class="bg-slate-50 antialiased text-foreground">
        content = content.replace("<body>", '<body class="bg-slate-50 antialiased text-foreground">')
        
        with open(path, 'w') as f:
            f.write(content)
        print(f"Fixed {path}")
