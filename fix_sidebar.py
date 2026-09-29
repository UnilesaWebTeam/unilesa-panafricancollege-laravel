import glob
import re

html_files = glob.glob('/home/sir-p/Documents/Coding/unilesa-panafrican-college-laravel/*/*.html')

for path in html_files:
    with open(path, 'r') as f:
        content = f.read()
    
    # Replace the sidebar logo flex container
    old_string = '<a href="../landing-page/index.html" class="mb-5 flex items-center gap-3 px-2">'
    new_string = '<a href="../landing-page/index.html" class="mb-5 flex flex-col items-start gap-3 px-2">'
    
    if old_string in content:
        content = content.replace(old_string, new_string)
        with open(path, 'w') as f:
            f.write(content)
        print(f"Fixed {path}")

