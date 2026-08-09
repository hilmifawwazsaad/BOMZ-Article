#!/bin/bash
set -euo pipefail
cd /home/ubuntu/bomz-articles

# Setup lokal repo saja
git remote set-url origin https://github.com/hilmifawwazsaad/BOMZ-Article.git
git config --local credential.helper 'store --file=/home/ubuntu/bomz-articles/.git/credentials'

TODAY=$(TZ="Asia/Jakarta" date +%Y-%m-%d)

# Cek artikel sudah ada?
for f in src/content/articles/*.md; do grep -q "^date: \"${TODAY}\"" "$f" 2>/dev/null && echo "ALREADY_EXISTS_${TODAY}" && exit 0; done

# Fetch RSS (fallback jika gagal)
RSS_RAW=$(curl -s -L --max-time 8 'https://www.antaranews.com/rss/terkini.xml' 2>/dev/null | grep '<title>' | head -10 || true)

DATA_FILE="/home/ubuntu/bomz-articles/data/cron_context.txt"
mkdir -p "$(dirname "$DATA_FILE")"

if [ -n "$RSS_RAW" ]; then
    echo "SOURCE=rss" > "$DATA_FILE"
    echo "HEADLINES:" >> "$DATA_FILE"
    echo "$RSS_RAW" | sed 's/<title>//g; s/<\/title>//g; s/&amp;/\&/g' >> "$DATA_FILE"
else
    echo "SOURCE=fallback" >> "$DATA_FILE"
    cat >> "$DATA_FILE" << 'EOF2'
TOPICS (choose one):
- Economic inequality and informal sector
- Digital divide between urban/rural Indonesia
- Education quality vs enrollment rate gap
- Healthcare access disparity across islands
- Urban housing crisis and spatial segregation
- Water scarcity and infrastructure gap
- Agricultural productivity stagnation despite food security programs
- Youth unemployment despite education expansion
- Corruption accountability vs systemic reform
Avoid: politics drama, celebrity news, religious content, sports results.
EOF2
fi
