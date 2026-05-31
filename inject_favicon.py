import os

files = ['index.html', 'about.html', 'contact.html', 'leadership.html', 'products.html']

favicon_tags = """    <!-- Favicons -->
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/images/favicon-32x32.png" type="image/png" sizes="32x32">
    <link rel="icon" href="/images/favicon-16x16.png" type="image/png" sizes="16x16">
    <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">

    <!-- Open Graph Tags -->"""

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        if '<!-- Favicons -->' not in content:
            new_content = content.replace('    <!-- Open Graph Tags -->', favicon_tags)
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Updated {file}')
