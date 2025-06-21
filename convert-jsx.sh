#!/bin/bash

# Rename .js files with likely JSX content to .jsx
echo "Renaming selected .js files to .jsx..."
for file in $(find src -type f -name "*.js"); do
  if grep -q "<" "$file"; then
    mv "$file" "${file%.js}.jsx"
    echo "Renamed: $file -> ${file%.js}.jsx"
  fi
done

# Update all import paths to .jsx in src/
echo "Updating import paths..."
find src -type f \( -name "*.js" -o -name "*.jsx" \) -exec sed -i '' 's/\(from\s\+["'\''].*\)\.js\(["'\'']\)/\1.jsx\2/g' {} +

echo "✅ Done. JSX files renamed and imports updated."

