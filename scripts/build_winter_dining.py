"""Build the public restaurant shortlist from structured research data."""
from pathlib import Path
import html
import json
import re
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "research" / "nearby-restaurants-2026-10-28.json"
DEST = ROOT / "winter-2026"

def e(value):
    return html.escape(str(value), quote=True)

def source_link(source):
    external = source["url"].startswith("https://")
    attrs = ' target="_blank" rel="noopener noreferrer"' if external else ""
    return f'<a href="{e(source["url"])}"{attrs}>{e(source["label"])}{" ↗" if external else " →"}</a>'

def card(city, restaurant, number):
    r = restaurant
    query = r.get("local_name") or r["name"]
    if city["id"] == "seoul":
        # Search by business name: the user checks the selected branch on the live map.
        query = r["local_name"] if r["id"] != "kr-noodles" else "명동교자 본점"
        url = "https://map.naver.com/p/search/" + quote(query, safe="")
    else:
        url = "https://uri.amap.com/search?keyword=" + quote(r["name"], safe="") + "&city=" + quote(city["name"], safe="") + "&view=map"
    dishes = " · ".join(r["signatures"])
    sources = " · ".join(source_link(s) for s in r["sources"])
    return f"""
<article class="dining-card" id="{e(r["id"])}">
  <div class="dining-card-top"><span class="dining-category">{number:02d} / {e(r["category"])}</span><span class="dining-tier">{e(r["tier"])}</span></div>
  <h3>{e(r["name"])}</h3>
  {f'<p class="dining-local">{e(r["local_name"])}</p>' if r["local_name"] else ""}
  <p class="dining-area">{e(r["area"])}</p>
  <p class="dining-dishes"><b>可以点</b> {e(dishes)}</p>
  <div class="dining-budget"><strong>{e(r["budget"])}</strong><small>参考餐费 · 详见价格口径</small></div>
  <p class="dining-access">{e(r["access"])}</p>
  <details class="dining-details"><summary>地址、用餐提醒与来源</summary><div>
    <dl><dt>地址</dt><dd>{e(r["address"])}</dd><dt>为何保留</dt><dd>{e(r["evidence"])}</dd><dt>价格口径</dt><dd>{e(r["budget_basis"])}</dd><dt>用餐提醒</dt><dd>{e(r["notes"])}</dd><dt>营业参考</dt><dd>{e(r["hours"])}</dd></dl>
    <p class="dining-sources">{sources}</p>
  </div></details>
  <a class="dining-map" href="{e(url)}" target="_blank" rel="noopener noreferrer">地图搜店名 ↗</a>
</article>"""

def main():
    data = json.loads(DATA.read_text(encoding="utf-8-sig"))
    assert data["status"] == "researched_not_reserved"
    ids = [r["id"] for c in data["cities"] for r in c["restaurants"]]
    assert len(ids) == len(set(ids))
    planning_path = DEST / "planning.html"
    planning = planning_path.read_text(encoding="utf-8-sig")
    head = re.search(r"<head>.*?</head>", planning, re.S).group(0)
    head = re.sub(r"<title>.*?</title>", "<title>附近吃什么 · 冬日旅行 2026—2027</title>", head, flags=re.S)
    head = head.replace("</head>", '<link rel="stylesheet" href="dining.css?v=20261028"/></head>')
    sidebar = re.search(r'<aside class="sidebar">.*?</aside>', planning, re.S).group(0)
    sections = []
    for city in data["cities"]:
        restaurants = "".join(card(city, r, i + 1) for i, r in enumerate(city["restaurants"]))
        sections.append(f"""
<section class="dining-city" id="{e(city["id"])}">
  <div class="section-heading"><span class="eyebrow">{e(city["id"].upper())} / {len(city["restaurants"])} TYPES</span><h2>{e(city["name"])}，一类留一家。</h2><p>{e(city["period"])}</p></div>
  <div class="dining-hotel"><span class="status {'pending' if city["id"] == 'changsha' else 'confirmed'}">{e(city["base_status"])}</span><p><b>{e(city["base"])}</b><br/>{e(city["base_address"])}</p>{source_link(city["hotel_source"])}</div>
  <p class="dining-intro">{e(city["intro"])}</p>
  <p class="dining-priority">{e(city["priority"])}</p>
  <div class="dining-grid">{restaurants}</div>
</section>""")
    jump = "".join(f'<a href="#{e(c["id"])}">{e(c["name"])} · {len(c["restaurants"])}家</a>' for c in data["cities"])
    total = len(ids)
    page = f"""<!DOCTYPE html>
<html lang="zh-CN">{head}
<body data-page="dining"><a class="skip" href="#main">跳到主要内容</a>
{sidebar}
<div class="workspace"><header class="topbar"><span>旅行手册 <span class="crumb">/</span> <a href="planning.html">待办与备选</a> <span class="crumb">/</span> <b>附近吃什么</b></span><div class="top-actions"><span class="updated">核查 {e(data["checked_at"])}</span><button class="print-button" id="print" type="button">打印餐饮手册</button></div></header>
<main id="main"><div class="page-intro"><p class="eyebrow">DINING SHORTLIST / {total} RESTAURANTS</p><h1>附近吃什么</h1><p class="intro-text">广州、长沙、首尔。按不同菜式各留一家，出门看位置，点菜看招牌。</p></div>
<nav class="section-nav" aria-label="按城市查看餐厅">{jump}<a href="#dining-notes">预算与使用说明</a></nav>
<div class="planning-banner"><span class="status pending">餐饮备选 · 均未订座</span><p>酒店状态沿用已确认记录；餐厅是这次新整理的备选，不代表已预约。长沙酒店仍待定。</p></div>
{"".join(sections)}
<section class="dining-notes" id="dining-notes"><div class="section-heading"><span class="eyebrow">BEFORE YOU GO</span><h2>挑适合的一餐，不必全部打卡。</h2></div><p>{e(data["travel_note"])}</p><p>{e(data["currency_note"])} {source_link(data["fx_source"])}</p><p>平台评分只作口碑线索，核查日为{e(data["checked_at"])}；不是不同平台之间的统一排名。具体分店、节日菜单、排队和营业时间以出发前的店家资料为准。</p><p>广州、长沙预算以成人参考列出，孩子按点菜分享量安排；首尔预算为两人且不含酒水。高端套餐属于可选特别餐，不作为每天餐费。</p><p><a href="../research/nearby-restaurants-2026-10-28.json">查看本次结构化餐厅记录 ↗</a> · <a href="planning.html">返回待办与备选 →</a></p></section>
</main><footer><span>冬日旅行 · 2026.12.10 — 2027.01.19</span><span>餐饮备选 · 未联系／未订座 · 私人预订资料不公开</span></footer></div></body></html>
"""
    page = "\n".join(line.rstrip() for line in page.splitlines()) + "\n"
    (DEST / "dining.html").write_text(page, encoding="utf-8")
    # Make the new shortlist easy to find while keeping bookings separate.
    entry = '<a href="#restaurants">附近餐厅</a>'
    if entry not in planning:
        needle = '<a href="#activities">活动草稿</a>'
        assert planning.count(needle) == 1
        planning = planning.replace(needle, needle + entry, 1)
    if 'id="restaurants"' not in planning:
        note = '<aside class="note" id="restaurants"><h3>广州、长沙、首尔：附近吃什么</h3><p>按不同菜式各留一家，已整理18家餐厅的具体分店、招牌菜、人民币预算、位置与来源。全部为未订座备选；长沙仍按候选酒店选店。</p><a href="dining.html">打开餐饮手册 →</a></aside>\n'
        assert planning.count('<section id="tasks">') == 1
        planning = planning.replace('<section id="tasks">', note + '<section id="tasks">', 1)
    planning = re.sub(r"更新 \d{4}\.\d{2}\.\d{2}", "更新 " + data["checked_at"].replace("-", "."), planning, count=1)
    planning_path.write_text(planning, encoding="utf-8")
    print(json.dumps({"restaurants": total, "cities": {c["name"]: len(c["restaurants"]) for c in data["cities"]}, "page": str(DEST / "dining.html")}, ensure_ascii=False))

if __name__ == "__main__":
    main()
