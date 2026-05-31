import os

files = ['index.html', 'about.html', 'contact.html', 'leadership.html', 'products.html']

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        if 'apple-touch-icon' not in content:
            new_content = content.replace('href="/images/favicon-16x16.png">', 'href="/images/favicon-16x16.png">\n    <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">')
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Updated {file}')
