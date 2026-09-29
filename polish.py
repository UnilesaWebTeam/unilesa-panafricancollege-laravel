import os
import re

root_dir = '/home/sir-p/Documents/Coding/unilesa-panafrican-college-laravel'

# Walk through all directories
for dirpath, dirnames, filenames in os.walk(root_dir):
    for filename in filenames:
        if filename.endswith('.html'):
            filepath = os.path.join(dirpath, filename)
            with open(filepath, 'r') as f:
                content = f.read()

            # Fix table overflows: if <table is not wrapped in overflow-x-auto
            # (Simple regex replace for common patterns)
            content = content.replace('class="table-container"', 'class="table-container overflow-x-auto w-full"')
            
            # Ensure Logout links go to landing page
            content = re.sub(r'href="#"([^>]*)>([^<]*Logout[^<]*)</a>', r'href="../landing-page/index.html"\1>\2</a>', content)
            
            # Fix mobile menu logic consistency (some might be missing the overlay)
            # Make sure all buttons have transition
            content = content.replace('class="btn ', 'class="btn transition-all duration-200 ')
            content = content.replace('class="ui-button ', 'class="ui-button transition-all duration-200 ')

            with open(filepath, 'w') as f:
                f.write(content)

        elif filename.endswith('.js'):
            filepath = os.path.join(dirpath, filename)
            with open(filepath, 'r') as f:
                content = f.read()
            
            # Fix any empty hrefs in JS rendering
            content = content.replace('to: "#"', 'to: "../landing-page/index.html"')
            
            with open(filepath, 'w') as f:
                f.write(content)

print("Polish script completed.")
