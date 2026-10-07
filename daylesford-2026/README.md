# Daylesford · Melbourne Cup Weekend 2026

公开行程页：2026 年 11 月 1–3 日，两晚，3 位成人与 2 位 5 岁孩子。

页面为独立的静态子目录，沿用本仓库 GitHub Pages 的 `main` 分支根目录发布方式，不需要构建。入口为 `index.html`，样式为 `styles.css`，`app.js` 从 `trip-data.json` 读取内容。

## 维护

- 日程、地址、预约状态、菜单参考、清单与来源统一更新 `trip-data.json`。
- `confirmed` 表示本次确认的预约；`planned` 表示计划或建议；`optional` 表示可跳过。
- 保留准确的预约时间：周日火车 12:30、Sault 18:30；周一 Bathhouse 14:00–15:30、Rubens 18:00；周二 Cliffy’s 10:15。
- Zulu 住宿为 11 月 1–3 日两晚，15:00 起入住、10:00 前退房。入住人数已得到酒店书面确认。
- 清单仅保存在本机浏览器；打印按钮调用浏览器的打印或保存 PDF 功能。
- `index.html` 内的无 JavaScript 简版只包含已确认安排；预约变化时同时核对这份简版。
- 根目录 `index.html` 与 `index.template.html` 只新增入口链接，旧行程保持原结构。

## 公开范围

可以发布商家名称、商家地址、日期时间、人数和公共资料来源。不能发布姓名、邮箱、家庭地址、预订编号、管理预约链接、原始邮件、账单或个人凭证。订单与入住说明仍在原确认邮件中查看。

## 检查

本地可用 Python HTTP server 预览，再检查桌面与 375px 手机的导航、清单保存和打印布局。发布后核对线上 HTML、JSON、CSS 与 JavaScript 均来自本次提交。
