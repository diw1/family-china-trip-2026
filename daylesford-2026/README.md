# Daylesford · Melbourne Cup Weekend 2026

公开行程页：2026 年 11 月 1–3 日，两晚，3 位成人与 2 位 6 岁孩子。

页面为独立的静态子目录，沿用本仓库 GitHub Pages 的 `main` 分支根目录发布方式，不需要构建。入口为 `index.html`，样式为 `styles.css`，`app.js` 从 `trip-data.json` 读取内容。

## 维护

- 日程、地址、预约状态、菜单参考、费用分账、清单与来源统一更新 `trip-data.json`。
- `confirmed` 表示本次确认的预约；`planned` 表示计划或建议；`optional` 表示可跳过。
- 周日小火车已取消；Enchanted Adventure 已获商家确认，11 月 1 日 10:15–11:15 Nippers：1 成人 + 2 名 6 岁儿童，另 2 成人持 09:00 入园时段的全日 General Admission；3 双园区手套已订。预约摘要与活动时间线均标记 `confirmed`，09:45 前到园属于报到要求。
- 6 岁儿童可自行攀爬；成人协助仍为 1:1，另 1 名孩子须能够自行完成。清单提醒保存确认电子票，出发前由参加活动的成人本人及儿童家长或监护人签 waiver。湖边散步仍安排在周二 brunch 之后。
- 保留准确的预约时间：周日 Nippers 10:15–11:15、Sault 18:30；周一 Bathhouse 14:00–15:30、Rubens 18:00；周二 Cliffy’s 10:15。
- 每日天气保存在 `days[].weather`，记录地区、气温、降雨概率、雨量、BOM发布时间与来源链接；当前为2026年10月29日快照，手动更新。Arthurs Seat采用22:35 AEDT版本，Daylesford采用17:00 AEDT版本；无JavaScript简版同时维护。改动脚本与样式时更新HTML中的缓存版本。
- 周一 Lavandula 为可选，明确写“看当天上午天气再决定”；持续下雨可跳过，14:00 Bathhouse预约保持原时间。Lavandula费用保留为天气允许才发生的预算。
- 10 月 29 日确认周日约 13:00 离开 Enchanted 后，去 Dandenong Plaza（Dandenong Square）吃麦当劳并给车补电，再前往 Zulu。超充在 Clow Street 有顶停车楼 Level 2、Star Car Wash 附近；麦当劳在 Level 2 Food Court，官网常规周日 09:00–18:00。午饭、补电、路程及入住时刻是建议安排，须保留路况和充电缓冲，不标为预约。
- Zulu 住宿为 11 月 1–3 日两晚，15:00 起入住、10:00 前退房。入住人数已得到酒店书面确认。
- 清单仅保存在本机浏览器；打印按钮调用浏览器的打印或保存 PDF 功能。
- `costs` 按两家各 50% 计算。`confirmed` 为已确认金额，`estimate` 为预算，`pending` 为待实际账单；未知金额使用 `null`，不能当作零元。Enchanted 按票面总价 A$295 均分，两家各 A$147.50。
- 已确认金额为 Zulu A$1,694、Enchanted A$295、Bathhouse A$245，合计 A$2,234，每家 A$1,117。加上 Sault A$550 与 Lavandula A$17 的预算，参考合计 A$2,801，每家 A$1,400.50；Dandenong 午饭与超充、Wombat、Rubens、Cliffy’s 的实际账单及额外酒水、加购与路费尚未计入。预算不能标记为已付，其他杂项不重复计入已单列费用。
- `index.html` 内的无 JavaScript 简版保留核心已订安排、报到时间及成人协助要求；年龄、人数或预约变化时同时核对这份简版。
- 根目录 `index.html` 与 `index.template.html` 只新增入口链接，旧行程保持原结构。

## 公开范围

可以发布商家名称、商家地址、日期时间、人数和公共资料来源。不能发布姓名、邮箱、家庭地址、预订编号、管理预约链接、券码、私人兑换链接、代金券余额、订单支付信息、原始邮件、账单或个人凭证。订单与入住说明仍在原确认邮件中查看。

## 检查

本地可用 Python HTTP server 预览，再检查桌面与 375px 手机的导航、清单保存和打印布局。发布后核对线上 HTML、JSON、CSS 与 JavaScript 均来自本次提交。
