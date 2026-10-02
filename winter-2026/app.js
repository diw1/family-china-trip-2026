const data = {
  couple: {
    title: '两个人的首尔，逛街也留白。',
    intro: '把时间给咖啡、美术馆、好好吃饭和适量购物。无需安排儿童项目，累了就回酒店。',
    note: '七岁孩子已有中国签证，不按 30 天免签安排。孩子留在大连的照顾人和交接方式尚未确定；落实后再锁定两人版韩国机票。',
    days: [
      ['到达 · 安顿下来', '大连飞首尔，按实际抵达机场安排接送。入住后只在酒店周边吃晚饭，早点休息。', '机场交通和酒店位置一起比较，不假定所有航班都到同一机场。'],
      ['景福宫周边 · 西村', '上午短逛宫殿或光化门周边，下午西村咖啡与小店。当天只围绕一个片区。', '景福宫通常周二休馆；所选方案此日为周三或周四，仍须查当日开放。'],
      ['汉南洞 · Leeum', '美术馆＋汉南洞小店，晚餐选一家想认真吃的餐厅。展览和餐位提前核对。', '若此日为圣诞节，用预约馆展或酒店餐饮做主轴，不靠临时排队。'],
      ['圣诞慢日 · 酒店与晚餐', '睡到自然醒，酒店早餐、休息或自费 SPA；傍晚短逛明洞及百货周边。', '25–27 日人流可能集中，SPA、餐饮的具体可约情况待查。'],
      ['圣水洞 · 咖啡与设计小店', '晚出门，选两三家店慢逛；不为打卡横穿全城。冷了就进咖啡馆。', '周末热门店会排队；如人多，换酒店周边购物或休息。'],
      ['留白 · 补逛与收行李', '补买伴手礼，或者用半天去 COEX 一带。晚餐后收行李，留好返程余量。', '可按前几天体力自由调换，不额外安排远郊一日团。'],
      ['首尔 → 大连', '早餐、退房、前往机场，飞回大连。到达后以休息和交接孩子为主。', '韩国比中国快一小时；以机票上的当地时间为准。']
    ],
    hotels: [
      ['首选询价', '首尔四季酒店', 'Four Seasons Seoul · 光化门', '游览老城与市中心比较顺路，适合六晚连住。两人可先比较 Deluxe 和 Premier。', 'A$500–600 是预算门槛，圣诞价可能超出；不要为了品牌压缩其他体验。', 'https://www.fourseasons.com/seoul/accommodations/guest_rooms/deluxe_room/'],
      ['位置备选', '首尔乐天酒店 · 行政塔', 'THE GRAND LOTTE SEOUL / Executive Tower', '偏重明洞、百货和购物便利。官网现转至 THE GRAND LOTTE SEOUL；询价时明确楼栋与房型。', '行政酒廊权益因套餐而异，不能把不同楼栋、翻新房与旧房混在一起比。', 'https://www.lottehotel.com/seoul-grand/en'],
      ['度假氛围备选', '首尔君悦酒店', 'Grand Hyatt Seoul · 南山一带', '适合重视酒店休息与汉南洞片区的人；官网确认有室内泳池。', '往返老城更依赖交通；滑冰场的 2026 冬季运营与收费未确认。', 'https://www.hyatt.com/grand-hyatt/en-US/selrs-grand-hyatt-seoul']
    ]
  },
  family: {
    title: '一家三口的首尔，一天一个重点。',
    intro: '把室内游乐放在节日前，穿插短途散步、泳池和休息。按七岁儿童安排活动与询价，游乐项目另核对实际身高限制。',
    note: '按两成人＋一名七岁儿童、一间合规可入住的客房询价。酒店儿童俱乐部不视为可离场托管；父母陪同是当前默认。',
    days: [
      ['到达 · 酒店周边晚饭', '大连飞首尔，入住后不安排门票项目。早点吃饭，让孩子适应旅途。', '预订时写清实际儿童年龄及床位，不以两成人房价代替家庭总价。'],
      ['乐天世界 · 室内为主', '把主要游乐日放在周三或周四，避开 25 日假期。只玩适合年龄和身高的项目。', '室内不代表所有项目都在室内；营业时间、快速通行与限制临近核对。'],
      ['水族馆或室内博物馆', '二选一；不把水族馆、购物中心、游乐园连续塞进同一天。下午早回酒店。', '若此日是 25 日，优先已预约场次；没有合适场次就换酒店休息。'],
      ['酒店休息 · 短看节日气氛', '睡足、早餐、在确认儿童可进入的时段游泳；傍晚短逛酒店附近。', '泳池儿童年龄、陪同、时段和休馆日需向最终酒店确认。'],
      ['光化门周边 · 轻量文化日', '天气好就短逛宫殿与广场，天气差改室内展馆。用故事和观察代替长时间讲解。', '户外安排可随气温取消；展馆预约按七岁儿童核对。'],
      ['弹性日 · 喜欢的地方再去一次', '轻松购物或补一个孩子喜欢的室内点；下午回酒店整理行李。', '不默认滑雪或长途交通，不为填满行程而赶场。'],
      ['首尔 → 大连', '退房、机场、飞回大连，晚间休息。', '带齐每位旅客的入境文件；孩子与成人分别核对。']
    ],
    hotels: [
      ['家庭优先询价', '首尔四季酒店 · Premier', 'Four Seasons Seoul · 双床方向', '官网 Premier 双床房允许两成人＋两儿童，面积 45–48㎡；一家三口先从这一类核价。', '基础 Deluxe 页面仅列两成人或加一婴儿，不能默认容纳学龄儿童。按七岁儿童确认早餐及床位。', 'https://www.fourseasons.com/seoul/accommodations/guest_rooms/premier_room/'],
      ['位置备选', '首尔乐天酒店 · 主塔方向', 'THE GRAND LOTTE SEOUL', '偏重市中心与购物便利，按两成人＋儿童查合规三人房型。', '楼栋、加床及儿童餐饮权益单独确认；酒廊年龄规则有版本差异，暂不列成家庭权益。', 'https://www.lottehotel.com/seoul-grand/en'],
      ['酒店休息备选', '首尔君悦酒店', 'Grand Hyatt Seoul', '有室内泳池，可作为酒店休息比重较高的备选。', '官方 Family Room 为两间连通房，不能当作单间预算；先查三人可住的单间及儿童泳池规则。', 'https://www.hyatt.com/grand-hyatt/en-US/selrs-grand-hyatt-seoul']
    ]
  },
  tasks: [
    ['passport-documents','已知身份 · 核对文件','孩子七岁且已有中国签证；中国护照持有人为澳洲 PR。核对 PR／RRV 文件、在澳居住证明和实际返澳日期。'],
    ['child-visa-care','现有签证 · 行前核对','核对孩子中国签证的每次停留期；如去首尔，确认返大连时有效且有可用入境次数。如不去，落实大连照顾安排。'],
    ['appointment','10 月开始','预约墨尔本韩国 C-3-9 递交名额；每位申请人分别预约。'],
    ['documents','递交前','备好申请表、照片、护照、澳洲 PR／RRV Visa Grant Notice、连续居住证明和近三个月银行流水。'],
    ['submission','10 月下旬—11 月上旬','递交韩国签证并付适用费用；如有儿童申请，先确认监护人与关系证明材料。'],
    ['visa-result','12 月出发前','确认韩国签证获批，打印签证结果；检查返澳 travel facility、护照有效期及旅行保险。'],
    ['dates','订票前','锁定墨尔本出发 10/11 日及首尔 22–28 或 23–29 日；确认澳洲护照旅客实际抵达中国日期。'],
    ['flights','待核价','比价 MEL–CAN、CAN–DLC、DLC–首尔往返、1/3 DLC–上海、1/10 上海–CAN–MEL；逐段核对舱位、行李、机场、卖方和退改。'],
    ['hotels','待核价','取得从化三/四晚与首尔六晚的含税可取消报价，按实际人数确认房型、早餐与儿童费用。'],
    ['activities','出发前','核对首尔开放日、餐厅与美术馆预约、泳池维护；2026 圣诞活动正式公布后再加入。'],
    ['arrival','抵韩前 3 日内','按每人资格填写免费的 e-Arrival Card，复核回大连及回澳洲所需文件。']
  ]
};
let party='couple', depart=22;
const query=new URLSearchParams(location.search);
if(query.get('party')==='family') party='family';
if(query.get('date')==='23') depart=23;
const $=s=>document.querySelector(s);
const dateLabel=n=>{const d=new Date(Date.UTC(2026,11,n));return `12.${String(n).padStart(2,'0')} 周${'日一二三四五六'[d.getUTCDay()]}`};
function render(){
  document.querySelectorAll('[data-party]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.party===party)));
  document.querySelectorAll('[data-date]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.date===depart)));
  const d=data[party], back=depart+6;
  const legs=[
    ['12.10 / 11','墨尔本 → 广州','周四或周五出发；广州过周末。实际抵达日取决于航班，首日只安排休息与用餐。','用户意向'],
    ['12.14 — 17','从化温泉 · 3 晚','建议周一入住，周四退房；想更慢可延至 18 日，形成四晚五天。','建议安排'],
    [`12.17/18 — ${depart}`,'大连 · 第一段','从广州飞大连后留几天相聚。冬天以室内、用餐和短途活动为主，住宿方式待定。','日期待定'],
    [`12.${depart} — ${back}`,'首尔 · 6 晚',party==='couple'?'两位大人去首尔，孩子的大连照顾安排另确认。':'两位大人带孩子一起去首尔；房型、门票按七岁儿童核价。','双方案'],
    [`12.${back} — 01.03`,'大连 · 第二段','从首尔回大连，跨年并休息；1 月 3 日飞上海。','用户意向'],
    ['01.03 — 10','上海 · 7 晚','连住一周，保留相聚、逛街和临时安排的空间，酒店位置待主要活动区域确定。','用户意向'],
    ['01.10','上海 → 广州 → 墨尔本','优先核对同票联程与行李衔接，返澳抵达日待确认。','待查航班']
  ];
  $('#route').innerHTML=legs.map((x,i)=>`<article class="route-row"><div class="route-date">${x[0]}</div><span class="dot">${i+1}</span><div><span class="mini">${x[3]}</span><h3>${x[1]}</h3><p>${x[2]}</p></div></article>`).join('');
  $('#seoul-title').textContent=d.title;$('#seoul-intro').textContent=d.intro;$('#party-note').textContent=d.note;
  $('#seoul-dates').textContent=`${dateLabel(depart)} → ${dateLabel(back)}`;
  $('#days').innerHTML=d.days.map((x,i)=>`<article class="day"><div class="day-date"><small>DAY 0${i+1}</small><b>${dateLabel(depart+i)}</b></div><div><h3>${x[0]}</h3><p>${x[1]}</p><p class="small">${x[2]}</p></div></article>`).join('');
  $('#hotel-cards').innerHTML=d.hotels.map(x=>`<article class="hotel"><span class="pill">${x[0]}</span><h3>${x[1]}</h3><p class="latin">${x[2]}</p><p>${x[3]}</p><p class="small">${x[4]}</p><a href="${x[5]}" target="_blank" rel="noopener">官网与房型 ↗</a></article>`).join('');
  const q=new URLSearchParams({party,date:String(depart)});history.replaceState(null,'',`${location.pathname}?${q}${location.hash}`);
}
document.querySelectorAll('[data-party]').forEach(b=>b.addEventListener('click',()=>{party=b.dataset.party;render()}));
document.querySelectorAll('[data-date]').forEach(b=>b.addEventListener('click',()=>{depart=+b.dataset.date;render()}));
let checked={};try{checked=JSON.parse(localStorage.getItem('winter-2026-tasks')||'{}')}catch{}
$('#checklist').innerHTML=data.tasks.map(([id,time,label])=>`<label class="task"><input type="checkbox" data-task="${id}" ${checked[id]?'checked':''}><span><small>${time}</small>${label}</span></label>`).join('');
function progress(){const count=document.querySelectorAll('[data-task]:checked').length;$('#progress').textContent=`本机已勾选 ${count} / ${data.tasks.length} 项`}
document.querySelectorAll('[data-task]').forEach(el=>el.addEventListener('change',()=>{checked[el.dataset.task]=el.checked;try{localStorage.setItem('winter-2026-tasks',JSON.stringify(checked))}catch{}progress()}));
$('#print').addEventListener('click',()=>window.print());render();progress();
