# 2026 家庭中国旅行

公开网址：https://diw1.github.io/family-china-trip-2026/

- `trip-data.json`：每日安排、航班酒店、待办状态的统一数据源。
- `index.template.html`：首页模板。
- `guide.html`：地点、执行规则与官方来源。
- `photos.html`：机位与摄影师原作者作品链接；不转载作品。
- `scripts/build_itinerary.py`：生成首页、四份行程 Markdown 和 `output/pdf/family-trip-2026.pdf`。需要 Python、ReportLab 与 Windows 微软雅黑字体；无网站运行依赖。

修改每日安排或状态时，先改统一数据，再运行生成脚本；若涉及地点规则，同步详细攻略和拍照页。检查后通过现有 GitHub Pages 发布，不迁移托管。

所有活动为计划，未确认事项不标记成已预订。不提交私人订单、证件、邮箱、私人地址或完整预订凭证。`tmp/` 是本地研究和验证材料，不发布。

本地预览时，用静态文件服务器打开仓库根目录即可；浏览网页本身不需要 Python 或安装任何依赖。
