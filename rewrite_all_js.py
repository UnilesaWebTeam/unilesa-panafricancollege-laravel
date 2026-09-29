import os

root_dir = '/home/sir-p/Documents/Coding/unilesa-panafrican-college-laravel'

for dirpath, dirnames, filenames in os.walk(root_dir):
    for filename in filenames:
        if filename.endswith('.js'):
            filepath = os.path.join(dirpath, filename)
            with open(filepath, 'r') as f:
                content = f.read()
            
            # Remove DOMContentLoaded
            if "document.addEventListener('DOMContentLoaded', () => {" in content:
                content = content.replace("document.addEventListener('DOMContentLoaded', () => {", "// Removed DOMContentLoaded wrapper")
                # Remove the last });
                content = content.rsplit("});", 1)[0] + "\n// End of file\n"
                
                with open(filepath, 'w') as f:
                    f.write(content)
                print(f"Rewrote {filepath}")

