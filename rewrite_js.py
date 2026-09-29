import os

filepaths = [
    'payment/index.js',
    'components/Header/index.js',
    'components/Footer/index.js',
    'components/StepProgress/index.js'
]

for filepath in filepaths:
    if os.path.exists(filepath):
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

