"""Build the static daily homepage and printable handout from trip-data.json."""
import json
from html import escape as e
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / 'trip-data.json').read_text(encoding='utf-8'))

def build_html():
    flights = ''.join('<tr>' + ''.join(f'<td>{e(cell)}</td>' for cell in row) + '</tr>' for row in data['flights'])
    airport = data['airport_timing']
    airport_rows = ''.join('<tr>' + ''.join(f'<td>{e(cell)}</td>' for cell in [row['date']+' '+row['flight'],row['arrival']+' '+row['terminal'],row['leave']]) + '</tr>' for row in airport['rows'])
    stays = []
    for stay in data['stays']:
        phone = f'<a href="tel:{e(stay["dial"])}">{e(stay["phone"])}</a>' if stay['dial'] else ''
        stays.append(f'<article><p class="card-kicker">{e(stay["city"])} · {e(stay["dates"])}</p><h3>{e(stay["hotel"])}</h3><p>{e(stay["address"])}</p><p>{e(stay["state"])}</p>{phone}</article>')
    cities = []
    for city in data['cities']:
        cards = []
        for day in city['days']:
            items = ''.join(f'<li>{e(item)}</li>' for item in day['items'])
            cards.append(f'<article class="daily-card" id="day-{day["date"].replace(".", "-")}"><div class="daily-date"><strong>{e(day["date"])}</strong><span>{e(day["weekday"])}</span></div><div class="daily-body"><p class="daily-tag">{e(day["tag"])}</p><h3>{e(day["title"])}</h3><ul>{items}</ul><p class="daily-limit"><strong>留余地</strong> {e(day["limit"])}</p><details class="daily-photo"><summary>拍照与执行提醒</summary><p>{e(day["photo"])}</p></details></div></article>')
        cities.append(f'<section class="page-shell daily-city" id="{city["id"]}"><div class="section-heading"><div><p class="eyebrow ink">{e(city["dates"])}</p><h2>{e(city["name"])}</h2><p>{e(city["intro"])}</p></div><a href="{e(city["detail"])}">看本段详细攻略 →</a></div><div class="daily-grid">{"".join(cards)}</div></section>')
    tasks = []
    for i, task in enumerate(data['todos'], 1):
        tasks.append(f'<details class="task-row" id="todo-{i}"{" open" if i <= 3 else ""}><summary><span class="task-priority">{e(task["priority"])}</span><span>{e(task["title"])}</span><span class="task-state">{e(task["state"])}</span></summary><div class="task-body"><p class="task-meta">负责：{e(task["owner"])} · 时间：{e(task["when"])}</p><p>{e(task["text"])}</p></div></details>')
    html = (ROOT / 'index.template.html').read_text(encoding='utf-8')
    for name, value in {'UPDATED':data['updated'], 'FLIGHTS':flights, 'AIRPORT_POLICY':e(airport['policy']), 'AIRPORT_ROWS':airport_rows, 'AIRPORT_NOTE':e(airport['note']), 'STAYS':''.join(stays), 'CITIES':'\n'.join(cities), 'TODOS':'\n'.join(tasks)}.items():
        html = html.replace('{{' + name + '}}', value)
    assert '{{' not in html
    (ROOT / 'index.html').write_text(html, encoding='utf-8')

def build_markdown():
    header = '> 更新：' + data['updated'] + '。由 trip-data.json 同步生成，与网页首页及离线简版使用同一份逐日数据。\n> 这是计划，不是预约凭证；公开资料不含姓名、订单号、证件号和朋友住址。\n\n'
    overview = ['# 2026 年 9 月家庭旅行｜行程总览\n\n', header, '## 同行与原则\n\n西安一家三口；孩子7岁，能听说中文、少阅读、历史零基础。奶奶62岁，自行抵达西安且不参加西安游玩，9月16日起四人同行。不处理奶奶自行抵达安排。每天一个重点，保留午休；自然耐看便服人像是高优先级，不做古装妆造。\n\n', '## 航班（当地时间）\n\n| 日期 | 航班 | 出发 | 到达 |\n|---|---|---|---|\n']
    overview.extend('| ' + ' | '.join(row) + ' |\n' for row in data['flights'])
    airport = data['airport_timing']
    overview.extend(['\n## 机场提前量与出发时间\n\n',airport['policy']+'\n\n','| 日期与航班 | 目标到机场 | 出发安排 |\n|---|---|---|\n'])
    for row in airport['rows']:
        overview.append('| '+row['date']+' '+row['flight']+' | '+row['arrival']+' '+row['terminal']+' | '+row['leave']+' |\n')
    overview.append('\n'+airport['note']+'\n')
    overview.append('\n## 住宿与真实状态\n\n')
    for stay in data['stays']:
        overview.append('- ' + stay['dates'] + '：' + stay['hotel'] + '；' + stay['address'] + '。' + stay['state'] + '。\n')
    overview.append('\n## 需要确认\n\n')
    for task in data['todos']:
        overview.extend(['### '+task['priority']+'｜'+task['title']+'\n\n', '- 状态：'+task['state']+'\n- 负责：'+task['owner']+'\n- 时间：'+task['when']+'\n\n'+task['text']+'\n\n'])
    overview.append('## 攻略入口\n\n- [西安详细安排](./西安亲子轻松行程.md)\n- [桂林与阳朔详细安排](./桂林亲子轻松行程.md)\n- [上海详细安排](./上海亲子轻松行程.md)\n- [照片机位与六位摄影师作品]('+data['site']+'photos.html)\n- [官网资料与研究详情]('+data['site']+'guide.html)\n')
    (ROOT/'行程总览.md').write_text(''.join(overview), encoding='utf-8')
    groups = [('西安亲子轻松行程.md','西安亲子轻松行程',[data['cities'][0]],[]),('桂林亲子轻松行程.md','桂林与阳朔三代低疲劳行程',data['cities'][1:3],[]),('上海亲子轻松行程.md','上海三代轻松行程',[data['cities'][3]],[data['cities'][2]['days'][-1]])]
    for filename, title, cities, extra in groups:
        output = ['# '+title+'\n\n', header]
        for city in cities:
            output.extend(['## '+city['name']+' · '+city['dates']+'\n\n', city['intro']+'\n\n'])
            for day in extra + city['days']:
                output.extend(['### '+day['date']+' '+day['weekday']+'｜'+day['title']+'\n\n', '**状态：'+day['tag']+'。**\n\n'])
                output.extend('- '+item+'\n' for item in day['items'])
                output.extend(['\n**减负规则：** '+day['limit']+'\n\n','**拍照 / 执行：** '+day['photo']+'\n\n'])
            output.append('[本段地点、规则与官方资料]('+data['site']+city['detail']+')\n\n')
        output.append('## 待办状态与作品\n\n[统一待办清单](./行程总览.md) · [自然人像机位](./拍照优先攻略.md) · [西安三位摄影师](./西安旅拍摄影师三选.md) · [桂林三位摄影师](./桂林旅拍摄影师三选.md)\n')
        (ROOT/filename).write_text(''.join(output), encoding='utf-8')

def build_pdf():
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib import colors
    from reportlab.lib.enums import TA_LEFT
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from reportlab.lib.pagesizes import A4
    font = Path('C:/Windows/Fonts/msyh.ttc')
    pdfmetrics.registerFont(TTFont('TripChinese', str(font), subfontIndex=0))
    styles = getSampleStyleSheet()
    for name, size, lead, color in [('Title',23,32,'#172a46'),('Heading1',19,26,'#172a46'),('Heading2',13,20,'#172a46'),('BodyText',10,16,'#26384c')]:
        styles[name].fontName = 'TripChinese'
        styles[name].fontSize = size
        styles[name].leading = lead
        styles[name].textColor = colors.HexColor(color)
        styles[name].wordWrap = 'CJK'
        styles[name].spaceAfter = 7
        styles[name].alignment = TA_LEFT
    styles.add(ParagraphStyle('SmallTrip', parent=styles['BodyText'], fontSize=9, leading=14, textColor=colors.HexColor('#506078')))
    story = []
    def p(text, style='BodyText'):
        return Paragraph(e(text), styles[style])
    story.extend([p('2026 家庭中国旅行', 'Title'),p('9月12–28日 · 每天一个重点', 'Heading1'),p('更新：' + data['updated'] + ' · 离线执行简版'),p('西安一家三口；9月16日起奶奶加入，四人继续。孩子7岁，能听说中文、少阅读；奶奶62岁，不参加西安游玩。'),p('拍照是高优先级：自然、耐看、现代便服，不安排古装。所有时间为计划，活动和接送未因写入攻略而完成预订。'),Spacer(1,10),p('航班 · 全部为当地时间','Heading2')])
    airport = data['airport_timing']
    story.append(p(airport['policy'],'SmallTrip'))
    arrivals = {row['flight']:row for row in airport['rows']}
    for row in data['flights']:
        story.append(p(' · '.join(row),'SmallTrip'))
        story.append(p('目标'+arrivals[row[1]]['arrival']+'到'+arrivals[row[1]]['terminal']+'；'+arrivals[row[1]]['leave'],'SmallTrip'))
    story.append(Spacer(1,10))
    story.append(p('酒店与状态','Heading2'))
    for stay in data['stays']:
        story.extend([p(stay['dates'] + '｜' + stay['hotel'],'Heading2'),p(stay['address'] + '；' + stay['state'],'SmallTrip')])
    story.extend([Spacer(1,8),p('完整攻略、照片作品与最新状态：','SmallTrip'),Paragraph(f'<link href="{data["site"]}" color="#2d6a64">{data["site"]}</link>', styles['SmallTrip'])])
    for city in data['cities']:
        story.extend([PageBreak(),p(city['name'] + ' · ' + city['dates'],'Heading1'),p(city['intro'])])
        for day_index, day in enumerate(city['days']):
            if city['id'] == 'guilin' and day_index == 3:
                story.extend([PageBreak(),p('桂林 · 外出与恢复','Heading1'),p('9/19–20 · 一个地标，一天留白；不压缩午休。')])
            block=[p(day['date']+' '+day['weekday']+'｜'+day['title'],'Heading2'),p('状态：'+day['tag'],'SmallTrip')]
            block.extend(p(item) for item in day['items'])
            block.extend([p('留余地：'+day['limit'],'SmallTrip'),p('拍照 / 执行：'+day['photo'],'SmallTrip'),Spacer(1,10)])
            story.append(KeepTogether(block))
    story.extend([PageBreak(),p('待办与分工','Heading1'),p('以下角色是建议分工，状态截至'+data['updated']+'；未替家人联系或预订。')])
    for task in data['todos']:
        story.append(KeepTogether([p(task['priority']+'｜'+task['title'],'Heading2'),p(task['state']+' · 负责：'+task['owner'],'SmallTrip'),p('时间：'+task['when'],'SmallTrip'),p(task['text']),Spacer(1,9)]))
    story.extend([Spacer(1,8),p('随身小包','Heading2'),p('与订票一致的证件原件、水、零食、无文字小游戏、防晒帽、雨衣、防滑鞋。儿童联系卡写家长电话和酒店中文地址，随身携带，不上传公开网页。')])
    def footer(canvas, doc):
        canvas.setFont('TripChinese',8)
        canvas.setFillColor(colors.HexColor('#506078'))
        canvas.drawString(40,24,'家庭中国旅行 · '+data['updated']+' · 计划可删减，休息不用补做')
        canvas.drawRightString(A4[0]-40,24,str(doc.page))
    out=ROOT/'output/pdf/family-trip-2026.pdf'
    out.parent.mkdir(parents=True,exist_ok=True)
    doc=SimpleDocTemplate(str(out),pagesize=A4,leftMargin=40,rightMargin=40,topMargin=34,bottomMargin=44,title='2026 家庭中国旅行｜离线简版',author='家庭旅行手册')
    doc.build(story,onFirstPage=footer,onLaterPages=footer)
    print('Built',out)

if __name__ == '__main__':
    build_html()
    build_markdown()
    build_pdf()
    print('Built index.html from trip-data.json')
