const data = {
  couple: {
    title: '两个人的首尔，逛街也留白。',
    intro: '把时间给咖啡、美术馆、好好吃饭和适量购物。无需安排儿童项目，累了就回酒店。',
    note: '已确定：两位成人，不带孩子；12 月 22 日周二入住、27 日周日退房，共五晚。孩子留在大连的照顾与交接安排另落实。正在比较五晚连住与两家分住 2＋3 晚，尚未选定酒店；房费总上限已放宽到A$3,500，跑步随缘，不参与酒店排序。分住已比较原五家酒店的20组分段报价：预算与氛围优先 Mondrian 三晚＋L’Escape套房两晚；不选Mondrian可看 Naru 两晚河景无早＋L’Escape三晚53㎡套房双早，合计A$3,487；全程双早则A$3,722超过新上限。已登录核查Amex，Mondrian前三晚THC＋L’Escape后两晚套房全双早合计A$3,168.64，另有一次US$100指定消费额度。',
    days: [
      ['到达 · 安顿下来', '大连飞首尔，按实际抵达机场安排接送。入住后只在酒店周边吃晚饭，早点休息。', '机场交通和酒店位置一起比较，不假定所有航班都到同一机场。'],
      ['景福宫周边 · 西村', '上午短逛宫殿或光化门周边，下午西村咖啡与小店。当天只围绕一个片区。', '此日为周三；宫殿开放时间和预约临近核对。'],
      ['汉南洞 · Leeum', '美术馆＋汉南洞小店，晚餐选一家想认真吃的餐厅。展览和餐位提前核对。', '此日是平安夜；如选 Naru＋L’Escape，可上午换酒店、寄行李，再安排下午活动。提前入住视供应情况；晚餐提前预约，展馆预约与开放待确认。'],
      ['圣诞慢日 · 酒店与晚餐', '睡到自然醒，酒店早餐、休息或自费 SPA；傍晚短逛明洞及百货周边。', '如选 Mondrian前三晚＋L’Escape后两晚，今天早餐后换酒店；25–27日人流可能集中，SPA、餐饮的具体可约情况待查。'],
      ['圣水洞 · 咖啡与设计小店', '晚出门，选两三家店慢逛；不为打卡横穿全城。冷了就进咖啡馆。', '周末热门店会排队；如人多，换酒店周边购物或休息。'],
      ['首尔 → 大连', '早餐、退房、前往机场，飞回大连。到达后以休息和交接孩子为主。', '韩国比中国快一小时；以机票上的当地时间为准。']
    ],
    hotels: [
      ['首选 · 氛围与位置', 'L’Escape 莱斯盖普', 'Luxury Collection · 明洞／会贤', '巴黎复古风格，适合两人吃饭、逛街、回酒店休息。32㎡ Amour 大床房五晚约 A$2,921，不含早，预算内；53㎡ Atelier 小套房含早约 A$3,617，属于超预算升级。', '已在本次日期的订房页核对房型、双人入住、含税价及取消政策。套房列有浴缸与酒廊使用权，具体餐饮权益待酒店确认；不把 SPA 当作天然温泉。', 'https://www.marriott.com/en-us/hotels/sellm-lescape-a-luxury-collection-hotel-seoul-myeongdong/overview/'],
      ['预算内 · 含早与设计', 'Mondrian 首尔梨泰院', 'Mondrian Seoul Itaewon · 梨泰院', '设计感强，适合汉南洞、梨泰院餐饮与酒店休息。23㎡ Signature King 五晚可取消无早约 A$2,593；双人含早约 A$2,891，平均 A$578／晚，符合原预算。', '客房较小；官网列地铁站步行约 15 分钟，冬季更依赖打车。室内泳池可用，官网 2026 户外泳池营业季为 5/23–9/27，不把户外池列入十二月体验。', 'https://all.accor.com/hotel/B771/index.en.shtml'],
      ['超预算 · 汉江景观', 'Hotel Naru 美憬阁', 'Hotel Naru Seoul – MGallery Collection · 麻浦', '推荐按 38㎡ Deluxe River King 核价，带浴缸、看汉江；有全年室内泳池。可取消无早五晚约 A$3,577，平均 A$715／晚；含双人早餐约 A$4,161。', '低价无景房不能代表河景体验：37㎡低楼层无景无障碍房可取消约 A$3,168。河景可取消价列 12/21 18:00 前免费取消、12/19 前零付款；实际扣款与担保下单核对。', 'https://mgallery.accor.com/en/hotels/B5E0.html'],
      ['备选 · 市中心与泳池', '首尔威斯汀朝鲜酒店', 'The Westin Josun Seoul · 市厅／明洞', '经典酒店，适合重视市中心位置、室内泳池和完整酒店设施。36㎡ Deluxe 大床房五晚约 A$3,508，不含早；双人含早方案约 A$4,000。', '约 A$702／晚已超过原预算。基础房桑拿另收费；泳池每日有维护时段，节假日可能限制每日进入次数。', 'https://www.marriott.com/en-us/hotels/selwi-the-westin-josun-seoul/overview/'],
      ['备选 · 实用与泳池', '东大门诺富特酒店', 'Novotel Ambassador Seoul Dongdaemun', '23㎡标准大床房，可取消、不含早五晚约 A$2,975；含早可取消约 A$3,384。靠近东大门，适合偏重逛城、用酒店室内泳池的安排。', '房间较小；低价 A$2,826 是不可退款方案，不能与可取消价格混比。房型描述中的泳池指酒店设施，不是客房私泳池；冬季不依赖屋顶设施。', 'https://all.accor.com/hotel/A5U6/index.en.shtml']
    ]
  },
  tasks: [
    ['passport-documents','已知身份 · 核对文件','孩子七岁且已有中国签证；中国护照持有人为澳洲 PR。核对 PR／RRV 文件、在澳居住证明和实际返澳日期。'],
    ['child-visa-care','现有签证 · 行前核对','核对孩子中国签证的每次停留期，落实两位成人去首尔期间孩子在大连的照顾与交接安排。'],
    ['appointment','已预约','韩国签证递交时段已预约；以私人确认邮件为准。'],
    ['documents','材料基本齐备','其余材料已准备，近三个月澳洲银行流水留到递交前一周补齐；提醒已设置。'],
    ['submission','按已约时段递交','携完整材料现场递交韩国签证，并支付适用费用。'],
    ['visa-result','12 月出发前','确认韩国签证获批，打印签证结果；检查返澳 travel facility、护照有效期及旅行保险。'],
    ['dates','首尔日期已定','首尔为 12/22–27，五晚，两位成人。墨尔本出发仍比较 10/11 日；确认澳洲护照旅客实际抵达中国日期。'],
    ['transport-changsha','待核价','比价 MEL–CAN、12/16 广州南–长沙南高铁、12/20 长沙–大连航班（长沙往返段一大一小，另一位成人同期交通另定）、DLC–首尔往返、1/3 DLC–上海、1/10 上海–CAN–MEL；逐段核对舱位、行李、机场、卖方和退改。'],
    ['hotels-changsha','候选已查 · 尚未预订','长沙按一成人＋七岁儿童查四晚；首尔两成人五晚，比较连住与两家分住 2＋3 晚；分住已核查原五家酒店的20组分段价，优先比较 Mondrian＋L’Escape与 Naru＋L’Escape；已取得Amex会员分段价；康莱德三晚免费夜未返回可订FHR库存。下单前重新核对房型、税费、双人早餐和取消截止时间。'],
    ['activities-changsha','出发前','核对长沙欢乐雪域儿童身高与陪同规则、科技馆改造和地质博物馆预约，门票按一大一小；核对首尔开放日、餐厅与美术馆预约、泳池维护；2026 圣诞活动正式公布后再加入。'],
    ['arrival','抵韩前 3 日内','按每人资格填写免费的 e-Arrival Card，复核回大连及回澳洲所需文件。']
  ]
};
const party='couple', depart=22;
const $=s=>document.querySelector(s);
const dateLabel=n=>{const d=new Date(Date.UTC(2026,11,n));return `12.${String(n).padStart(2,'0')} 周${'日一二三四五六'[d.getUTCDay()]}`};
function render(){
  const d=data[party], back=depart+5;
  const legs=[
    ['12.10 / 11','墨尔本 → 广州','周四或周五出发；广州过周末。实际抵达日取决于航班，首日只安排休息与用餐。','用户意向'],
    ['12.14 — 16','广州 · 继续停留','取消从化后，14–15 日先留广州市区；16 日前往长沙。','衔接建议'],
    ['12.16 — 20','长沙 · 4 晚','你带七岁孩子，一大一小四晚五天；以玩雪、科学互动和恐龙为主，每天一个主要项目。','用户确定日期'],
    [`12.20 — ${depart}`,'大连 · 第一段','建议 20 日从长沙飞大连，22 日两位成人去首尔；具体航班与住宿方式待定。','衔接建议'],
    [`12.${depart} — ${back}`,'首尔 · 5 晚','已确定两位成人，不带孩子；孩子在大连的照顾安排另落实。','日期与人数已确定'],
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
let checked={};try{checked=JSON.parse(localStorage.getItem('winter-2026-tasks')||'{}')}catch{}
$('#checklist').innerHTML=data.tasks.map(([id,time,label])=>`<label class="task"><input type="checkbox" data-task="${id}" ${checked[id]?'checked':''}><span><small>${time}</small>${label}</span></label>`).join('');
function progress(){const count=document.querySelectorAll('[data-task]:checked').length;$('#progress').textContent=`本机已勾选 ${count} / ${data.tasks.length} 项`}
document.querySelectorAll('[data-task]').forEach(el=>el.addEventListener('change',()=>{checked[el.dataset.task]=el.checked;try{localStorage.setItem('winter-2026-tasks',JSON.stringify(checked))}catch{}progress()}));
$('#print').addEventListener('click',()=>window.print());render();progress();
