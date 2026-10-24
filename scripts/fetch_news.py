import json
import re
from datetime import datetime, timezone
from pathlib import Path
import urllib.request
import xml.etree.ElementTree as ET
from urllib.parse import quote_plus

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "data" / "articles.json"

QUERIES = [
    ("Cameroun", "actualité Cameroun"),
    ("Afrique", "actualité Afrique francophone"),
    ("Sport", "football Afrique Cameroun"),
    ("Gaming", "actualités jeux vidéo"),
    ("Tech", "technologie applications Android"),
]

def clean(text):
    text = re.sub(r"<[^>]+>", " ", text or "")
    return re.sub(r"\s+", " ", text).strip()

def main():
    articles = []
    seen = set()

    for category, query in QUERIES:
        url = (
            "https://news.google.com/rss/search?q="
            + quote_plus(query)
            + "&hl=fr&gl=CM&ceid=CM:fr"
        )

        request = urllib.request.Request(
            url, headers={"User-Agent": "AfricaBuzzAI/1.0"}
        )

        try:
            with urllib.request.urlopen(request, timeout=20) as response:
                root = ET.fromstring(response.read())

            for item in root.findall("./channel/item")[:10]:
                title = clean(item.findtext("title"))
                link = item.findtext("link", "").strip()
                description = clean(item.findtext("description"))
                source = item.find("source")
                source_name = source.text if source is not None else "Source d'actualité"

                if not title or not link or link in seen:
                    continue

                seen.add(link)
                articles.append({
                    "category": category,
                    "title": title,
                    "summary": description[:250],
                    "source": source_name,
                    "url": link,
                    "published": item.findtext("pubDate", "")
                })

        except Exception as error:
            print(f"Flux indisponible ({category}) : {error}")

    OUTPUT.write_text(
        json.dumps({
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "articles": articles[:50]
        }, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

    print(f"{len(articles)} titres récupérés.")

if __name__ == "__main__":
    main()