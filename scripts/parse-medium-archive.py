#!/usr/bin/env python3
"""Convert the exported Medium compendium PDF text into structured blog data."""

from __future__ import annotations

import csv
import json
import math
import re
import sys
import unicodedata
from collections import Counter
from difflib import SequenceMatcher
from pathlib import Path

BASE_URL = "https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site"

CATEGORIES = [
    {"slug": "retail-fmcg-quick-commerce", "name": "Retail, FMCG & Quick Commerce", "description": "Analysis of kirana retail, FMCG distribution, quick commerce, pricing, delivery work and India's changing shopping ecosystem."},
    {"slug": "seo-local-search", "name": "SEO & Local Search", "description": "Practical local SEO, search visibility and Google discovery guidance for businesses in Lucknow and across India."},
    {"slug": "digital-marketing", "name": "Digital Marketing", "description": "Digital marketing strategy, agency selection and affordable online growth systems for local businesses."},
    {"slug": "social-media-content", "name": "Social Media & Content", "description": "Content, social media, creator platforms and practical publishing ideas for businesses and professionals."},
    {"slug": "ai-business-automation", "name": "AI for Business & Automation", "description": "Applied AI products, agent workflows, no-code systems and automation designed for MSMEs and offline businesses."},
    {"slug": "artificial-intelligence", "name": "Artificial Intelligence", "description": "AI developments, prompting, models, national policy and the wider direction of intelligent technology."},
    {"slug": "msme-startup-growth", "name": "MSME & Startup Growth", "description": "Entrepreneurship, jobs, small-business growth, Startup India and practical opportunities for Indian MSMEs."},
    {"slug": "technology-security", "name": "Technology & Digital Security", "description": "Digital tools, platforms, account security and accessible explainers for safer technology use."},
    {"slug": "society-opinion", "name": "Society & Opinion", "description": "Commentary on public policy, law, relationships, geopolitics and contested social questions."},
    {"slug": "personal-stories-culture", "name": "Personal Stories & Culture", "description": "Personal reflections, Hindi stories, remembrance, values and cultural writing."},
]

STOPWORDS = {
    "a", "an", "and", "are", "as", "at", "be", "best", "by", "can", "for", "from", "how", "in", "into", "is", "it", "its", "of", "on", "or", "our", "that", "the", "their", "this", "to", "top", "why", "with", "your", "you", "2024", "2025", "2026",
}


def clean_inline(value: str) -> str:
    value = value.replace("\u00ad", "").replace("\ufeff", "")
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def slugify(title: str, post_id: int) -> str:
    replacements = {
        "₹": " rupee ", "&": " and ", "AI": " ai ", "MSME": " msme ",
        "मैं": " main ", "उम्मीद": " umeed ", "और": " aur ", "वो": " woh ", "माँ": " maa ",
    }
    value = title
    for source, target in replacements.items():
        value = value.replace(source, target)
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii").lower()
    words = re.findall(r"[a-z0-9]+", value)
    useful = [word for word in words if word not in STOPWORDS]
    selected = (useful or words)[:10]
    slug = "-".join(selected).strip("-")
    return (slug[:76].rstrip("-") or f"article-{post_id}")


def category_for(title: str, body: str) -> str:
    title_sample = title.lower()
    body_sample = body[:3500].lower()
    rules = [
        ("personal-stories-culture", ["कहानी", "माँ", "in loving memory", "my mother", "personal story", "poem"]),
        ("society-opinion", ["false accusation", "matrimonial", "marriage", "muslim population", "pahalgam", "terror", "western influence", "new world order", "dharma", "religion", "geopolit", "men today", "law and justice"]),
        ("retail-fmcg-quick-commerce", ["quick commerce", "q-commerce", "q commerce", "kirana", "zepto", "blinkit", "instamart", "fmcg", "grocery", "dark store", "delivery partner", "traditional retail", "retailer"]),
        ("seo-local-search", ["local seo", "seo in lucknow", "google business", "google maps", "showing up on google", "search ranking", "search engine", "rank on google"]),
        ("social-media-content", ["social media", "content marketing", "linkedin", "instagram", "youtube", "creator", "quotes to inspire", "viral content"]),
        ("ai-business-automation", ["agent mode", "automation", "automated ai", "ai products", "no-code", "no code", "ai solutions", "ai for business", "business intelligence", "workflow", "kisaan saathi", "kirana ai"]),
        ("digital-marketing", ["digital marketing", "online marketing", "marketing agency", "digital growth", "digital success"]),
        ("artificial-intelligence", ["artificial intelligence", "chatgpt", "google research", "prompting", "ai summit", "ai journey", "ai in india", "ai adoption", "ai advantage", "agentic era"]),
        ("technology-security", ["selfie for sign-in", "recover your account", "cyber", "digital security", "technology", "tech ecosystem", "google"]),
        ("msme-startup-growth", ["msme", "startup", "small business", "job market", "entrepreneur", "business growth", "budget 2025", "fresh talent", "partnership"]),
    ]
    best_slug = "msme-startup-growth"
    best_score = 0
    for slug, phrases in rules:
        score = 0
        for phrase in phrases:
            if phrase in title_sample:
                score += 6
            elif phrase in body_sample:
                score += 1
        if score > best_score:
            best_slug = slug
            best_score = score
    return best_slug


def classify_block(raw: str) -> dict | None:
    raw = raw.strip("\n")
    lines = [line.rstrip() for line in raw.splitlines()]
    lines = [line for line in lines if not re.fullmatch(r"\s*\d+\s*", line)]
    if not lines:
        return None
    text = clean_inline(" ".join(line.strip() for line in lines))
    if not text or text.lower().startswith("original file:"):
        return None
    if re.match(r"^#{1,4}\s+", text):
        return {"type": "heading", "text": re.sub(r"^#{1,4}\s+", "", text)}
    bulletish = sum(bool(re.match(r"\s*(?:[•▪◦*]|[-–—]|\d+[.)])\s+", line)) for line in lines)
    if bulletish >= max(1, len(lines) // 2):
        items = []
        for line in lines:
            item = re.sub(r"^\s*(?:[•▪◦*]|[-–—]|\d+[.)])\s+", "", line).strip()
            if item:
                items.append(item)
        return {"type": "list", "items": items}
    indented = all((not line.strip()) or len(line) - len(line.lstrip()) >= 2 for line in lines)
    heading_signal = (
        len(text) <= 115
        and not re.search(r"[.!?]$", text)
        and (indented or text.lower() in {"introduction", "conclusion", "final thoughts", "key takeaways", "the bottom line"})
    )
    if heading_signal:
        return {"type": "heading", "text": text}
    if text.startswith(">"):
        return {"type": "quote", "text": text.lstrip("> ")}
    return {"type": "paragraph", "text": text}


def trim_description(text: str, limit: int = 155) -> str:
    text = clean_inline(text)
    if len(text) <= limit:
        return text
    short = text[: limit + 1].rsplit(" ", 1)[0].rstrip(" ,;:-")
    return short + "…"


def seo_title(title: str) -> str:
    title = clean_inline(title)
    if len(title) <= 60:
        return title
    return title[:61].rsplit(" ", 1)[0].rstrip(" ,;:-")


def parse_archive(text: str) -> list[dict]:
    parts = re.split(r"(?=\f?POST #\d+\s+•\s+)", text)
    posts = []
    used_slugs: set[str] = set()
    for part in parts:
        marker = re.match(r"\f?POST #(\d+)\s+•\s+(DRAFT|\d{4}-\d{2}-\d{2})\s*", part)
        if not marker:
            continue
        post_id = int(marker.group(1))
        date_value = marker.group(2)
        rest = part[marker.end():].lstrip("\n")
        original_at = rest.find("Original File:")
        if original_at < 0:
            raise ValueError(f"POST #{post_id}: Original File marker not found")
        title_raw = rest[:original_at]
        title = clean_inline(title_raw)
        after = rest[original_at + len("Original File:"):]
        file_match = re.match(r"\s*([^\n]+(?:\n(?!\s*\n)[^\n]+)*)", after)
        original_file_raw = file_match.group(1) if file_match else ""
        original_file = clean_inline(original_file_raw)
        body_raw = after[(file_match.end() if file_match else 0):].lstrip("\n")
        body_raw = body_raw.replace("\f", "\n\n")
        body_raw = re.sub(r"(?m)^\s*\d+\s*$", "", body_raw)
        blocks_raw = [block for block in re.split(r"\n\s*\n+", body_raw) if block.strip()]
        # The exported page repeats the title once before the article body and
        # often contains the full wording when the PDF header is ellipsized.
        if blocks_raw:
            repeated_title = clean_inline(blocks_raw[0])
            if SequenceMatcher(None, repeated_title.lower(), title.lower()).ratio() > 0.62:
                if len(repeated_title) > len(title):
                    title = repeated_title
                blocks_raw.pop(0)
        blocks = []
        for block_raw in blocks_raw:
            block = classify_block(block_raw)
            if block:
                blocks.append(block)
        paragraphs = [block["text"] for block in blocks if block["type"] == "paragraph" and len(block["text"]) > 55]
        description_source = paragraphs[0] if paragraphs else title
        slug = slugify(title, post_id)
        if slug in used_slugs:
            slug = f"{slug}-{post_id}"
        used_slugs.add(slug)
        body_plain = " ".join(
            block.get("text", " ".join(block.get("items", []))) for block in blocks
        )
        category = category_for(title, body_plain)
        title_terms = [word for word in re.findall(r"[a-z0-9]+", title.lower()) if word not in STOPWORDS and len(word) > 2]
        word_counts = Counter(word for word in re.findall(r"[a-z][a-z0-9-]+", body_plain.lower()) if word not in STOPWORDS and len(word) > 3)
        secondary = []
        for word, _ in word_counts.most_common(30):
            if word not in title_terms and word not in secondary:
                secondary.append(word)
            if len(secondary) == 5:
                break
        primary = " ".join(title_terms[:5]) or title
        hash_match = re.search(r"-([0-9a-f]{12})\.html$", original_file, re.I)
        medium_url = None
        if hash_match and date_value != "DRAFT":
            filename = original_file.split("/")[-1]
            stem = re.sub(r"^\d{4}-\d{2}-\d{2}_", "", filename)
            stem = re.sub(r"\.html$", "", stem)
            medium_url = f"https://sheevumgoel.medium.com/{stem}"
        word_count = len(re.findall(r"\b\w+\b", body_plain))
        status = "draft" if date_value == "DRAFT" else "published"
        placeholder = bool(re.match(r"^(?:draft_post|hello there|jatin$)", title.lower()))
        indexable = status == "published" and word_count >= 100 and not placeholder
        canonical = f"{BASE_URL}/blogs/{slug}/"
        posts.append({
            "id": post_id,
            "title": title,
            "seoTitle": seo_title(title),
            "metaDescription": trim_description(description_source),
            "primaryKeyword": primary,
            "secondaryKeywords": secondary,
            "slug": slug,
            "category": category,
            "date": None if status == "draft" else date_value,
            "status": status,
            "indexable": indexable,
            "author": "Sheevum Goel",
            "authorSlug": "sheevum-goel",
            "originalFile": original_file,
            "mediumUrl": medium_url,
            "canonical": canonical,
            "readingMinutes": max(1, math.ceil(word_count / 220)),
            "wordCount": word_count,
            "blocks": blocks,
        })
    if len(posts) != 140:
        raise ValueError(f"Expected 140 posts, parsed {len(posts)}")
    return posts


def similarity_candidates(posts: list[dict]) -> list[dict]:
    pairs = []
    for index, left in enumerate(posts):
        left_tokens = set(re.findall(r"[a-z0-9]+", left["title"].lower())) - STOPWORDS
        for right in posts[index + 1:]:
            right_tokens = set(re.findall(r"[a-z0-9]+", right["title"].lower())) - STOPWORDS
            union = left_tokens | right_tokens
            jaccard = len(left_tokens & right_tokens) / len(union) if union else 0
            sequence = SequenceMatcher(None, left["title"].lower(), right["title"].lower()).ratio()
            score = max(jaccard, sequence * 0.9)
            if score >= 0.58:
                pairs.append({
                    "leftId": left["id"], "leftTitle": left["title"],
                    "rightId": right["id"], "rightTitle": right["title"],
                    "score": round(score, 3), "recommendation": "manual intent review; keep separate until approved",
                })
    return sorted(pairs, key=lambda pair: pair["score"], reverse=True)


def add_related(posts: list[dict]) -> None:
    for post in posts:
        post_terms = set(re.findall(r"[a-z0-9]+", post["title"].lower())) - STOPWORDS
        scored = []
        for candidate in posts:
            if candidate["id"] == post["id"] or candidate["status"] != "published":
                continue
            candidate_terms = set(re.findall(r"[a-z0-9]+", candidate["title"].lower())) - STOPWORDS
            overlap = len(post_terms & candidate_terms)
            category_bonus = 4 if candidate["category"] == post["category"] else 0
            freshness = candidate["id"] / 1000
            scored.append((category_bonus + overlap + freshness, candidate["id"]))
        post["relatedIds"] = [item[1] for item in sorted(scored, reverse=True)[:5]]


def ensure_unique_metadata(posts: list[dict]) -> None:
    title_groups: dict[str, list[dict]] = {}
    description_groups: dict[str, list[dict]] = {}
    for post in posts:
        title_groups.setdefault(post["seoTitle"].casefold(), []).append(post)
        description_groups.setdefault(post["metaDescription"].casefold(), []).append(post)
    for group in title_groups.values():
        if len(group) < 2:
            continue
        for post in group:
            suffix = f" | Archive {post['id']}"
            base = post["seoTitle"][: 60 - len(suffix)].rsplit(" ", 1)[0].rstrip(" ,;:-")
            post["seoTitle"] = f"{base}{suffix}"
    for group in description_groups.values():
        if len(group) < 2:
            continue
        for post in group:
            suffix = f" Archive entry #{post['id']}."
            base = post["metaDescription"][: 158 - len(suffix)].rstrip(" …,;:-")
            post["metaDescription"] = f"{base}.{suffix}".replace("..", ".")


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Usage: parse-medium-archive.py <pdftotext.txt> <project-root>")
    source = Path(sys.argv[1])
    root = Path(sys.argv[2])
    posts = parse_archive(source.read_text(encoding="utf-8"))
    ensure_unique_metadata(posts)
    add_related(posts)
    duplicates = similarity_candidates(posts)
    category_counts = Counter(post["category"] for post in posts)
    payload = {"categories": CATEGORIES, "articles": posts}
    (root / "lib").mkdir(exist_ok=True)
    (root / "content-migration").mkdir(exist_ok=True)
    (root / "lib" / "blog-data.json").write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    report = {
        "detected": len(posts),
        "published": sum(post["status"] == "published" for post in posts),
        "drafts": sum(post["status"] == "draft" for post in posts),
        "categories": [{"slug": cat["slug"], "name": cat["name"], "count": category_counts[cat["slug"]]} for cat in CATEGORIES],
        "duplicateCandidates": duplicates,
        "manualReview": [
            {
                "id": post["id"],
                "title": post["title"],
                "reason": (
                    "Source archive marks this entry as DRAFT; page is preserved as noindex."
                    if post["status"] == "draft"
                    else "Extracted entry is empty, placeholder-like or below 100 words; page is preserved as noindex."
                ),
            }
            for post in posts if not post["indexable"]
        ],
    }
    (root / "content-migration" / "migration-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    with (root / "content-migration" / "medium-migration-map.csv").open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.writer(handle)
        writer.writerow(["Original Article Title", "Original Medium URL", "New Website URL", "Category", "Primary Keyword", "Publication Status"])
        category_names = {item["slug"]: item["name"] for item in CATEGORIES}
        for post in posts:
            writer.writerow([post["title"], post["mediumUrl"] or "", post["canonical"], category_names[post["category"]], post["primaryKeyword"], post["status"]])
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
