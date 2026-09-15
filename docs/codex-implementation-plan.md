# PicMuse SEO / GEO 实施计划（Codex 执行版）

## 0. 执行规则

本文件是后续 Codex 任务的执行基线。除非用户明确要求，否则 Codex 不应跳过验收、擅自选择产品事实、自动发布内容或提交生产 Secrets。

### 已确认的一期边界

- `picmuse.app` 是官方静态内容与下载转化站，不提供 Web 在线生成。
- 首期主转化是 Android Google Play 下载；iOS 当前仍显示为 PicSelf，后续接入。
- 官网首期语言为英文、繁体中文、韩语、日语、德语、西班牙语，建议分批上线。
- PicMuse Android 已接入 Firebase/GA4，属性 ID `499195889`；网站一期应把 `store_click` 与 App 侧 `first_open`、生成和订阅事件分开建模。
- 内容由用户与 AI 协作生产，涉及产品事实、敏感能力、版权和法律内容必须人工审核。

### 不可假设的事实

- PicMuse 的实际功能、模型、价格、免费额度、商店链接和商业授权。
- LitAI 或其他产品的实际功能。
- 价格、免费额度、商店素材正式授权、Google 账号权限、Google Ads/Play Install Referrer 归因修复状态。

这些信息缺失时，Codex 应先建立配置占位和 TODO，不能写成看似真实的营销文案。

### 首选技术基线

- Astro + TypeScript 静态生成，GitHub Pages 发布。
- Markdown/MDX + front matter 作为首期内容源。
- 图片/视频使用对象存储 + CDN，媒体不放进 GitHub 仓库作为生产源。
- 动态能力通过独立 API；静态站不保存密钥。
- GitHub Actions 负责检查、构建、预览、发布和定时任务。

若 Codex 发现技术约束与该基线冲突，先在 PR 或 `docs/decisions/` 记录原因和替代方案。

## 1. 阶段总览

| 阶段 | 目标 | 主要产物 | 通过条件 |
|---|---|---|---|
| A | 项目基线和决策 | ADR、目录、配置契约 | 无未决的阻塞性配置问题 |
| B | 静态站骨架 | Astro 站点、布局、多语言路由 | 本地构建和预览成功 |
| C | SEO/GEO 基础 | metadata、Schema、sitemap、内容模型 | 抓取和结构化数据检查通过 |
| D | 媒体和移动端 | 图片/视频组件、CDN 引用、响应式页面 | 关键设备无溢出，性能达标 |
| E | 转化和分析 | 下载页、事件、漏斗数据 | 事件可在测试环境验证 |
| F | 自动化内容流水线 | Search Console 同步、AI PR、质检 | 失败可重试，发布需人工合并 |
| G | GitHub 生产发布 | Actions、域名、监控、回滚 | 生产发布可回滚 |
| H | 试点复盘 | 8 周报告和下一轮 backlog | 有明确扩展/调整/停止决策 |

## 2. 阶段 A：项目基线和决策

### Codex 任务

1. 检查仓库、Git 分支、Node/npm 版本和 GitHub 权限；不得删除已有用户文件。
2. 建立 `docs/decisions/`，记录静态生成器、部署方式、媒体存储、分析工具和多语言规则。
3. 建立产品事实清单 `docs/product-facts.md`，所有未知字段标记 `TODO`。
4. 建立 `docs/adr/` 或等价的架构决策记录，记录选择和放弃的方案。
5. 初始化目录：`apps/picmuse-site`、`packages/*`、`automation/*`、`.github/workflows`。

### 验收

- README 能说明本地启动、构建、预览和部署流程。
- 产品事实没有虚构值；未知项有责任人和阻塞等级。
- 所有后续任务都能引用配置字段，而不是把域名和产品文案写死。

## 3. 阶段 B：静态站和多语言骨架

### Codex 任务

1. 初始化 Astro + TypeScript；开启严格类型检查。
2. 实现主布局、导航、页脚、语言切换、404 和法律页占位。
3. 实现 `/en/`、`/zh-tw/`、`/ko/`、`/ja/`、`/de/`、`/es/` 路由约定；语言列表从产品配置读取，支持分批发布。
4. 为每个页面建立 front matter schema，至少包含 `content_id`、`locale`、`content_type`、`status`、`canonical_id`。
5. 实现产品配置文件，包含品牌、域名、下载平台、API、分析和媒体前缀。
6. 添加移动优先 CSS；支持 320px、375px、390px、768px 和桌面宽度。

### 验收

- `npm run build` 或项目约定命令无错误。
- 语言切换是普通可抓取链接，不依赖客户端重定向。
- 缺失翻译不会生成半翻译索引页。
- 页面在手机宽度无横向滚动和遮挡。

## 4. 阶段 C：SEO/GEO 基础和内容模型

### Codex 任务

1. 实现统一 metadata：title、description、H1、canonical、OG、Twitter 图。
2. 实现 `Organization`、`WebSite`、`SoftwareApplication`、`Article`、`HowTo`、`VideoObject` Schema；只在页面事实成立时输出。
3. 按语言生成 sitemap、robots、RSS/Atom；处理 hreflang 双向关联。
4. 实现内容类型模板：首页、功能页、模板页、指南页、案例页、对比页、术语页、产品事实页；一期功能页只做说明和下载 CTA，不伪装成 Web 在线工具。
5. 建立内容 lint：缺少作者、更新时间、来源、CTA、canonical 或翻译状态时阻断构建。
6. 为 GEO 页面提供首段结论、适用条件、限制、步骤、FAQ、来源和版本字段。

### 验收

- 每个可索引页面都有唯一 metadata 和 canonical。
- JSON-LD 可被校验器解析，无产品事实幻觉。
- sitemap 不包含草稿、404、缺失翻译或 `noindex` 页面。
- 页面正文在无客户端 JavaScript 时仍可读取。

## 5. 阶段 D：图片、视频和移动端体验

### Codex 任务

1. 实现媒体清单格式，字段包含 URL、宽高、比例、版权、alt、poster、字幕和 `content_id`。
2. 实现图片组件：`srcset`、`sizes`、WebP/AVIF、尺寸占位、lazy-load。
3. 实现视频组件：poster、`preload="metadata"`、MP4/WebM、字幕 VTT、文字稿和无声默认播放策略。
4. 实现媒体上传/压缩脚本；原始素材不得自动提交到 Git 仓库。
5. 允许通过环境配置切换 R2/CDN 或其他媒体供应商。
6. 在 CI 中加入 Lighthouse 移动端、图片体积、横向溢出和可访问性检查。

### 验收

- 图片和视频 URL 来自配置的 CDN，而非硬编码供应商地址。
- 视频关键内容有文字稿或页面正文补充。
- 320px 宽度下导航、语言切换、视频和下载 CTA 不重叠。
- 核心页面目标：LCP < 2.5s、INP < 200ms、CLS < 0.1。

## 6. 阶段 E：下载转化和分析漏斗

### Codex 任务

1. 实现静态 `/download/` 页面和平台入口配置；一期只展示 Android Google Play，保留 iOS/PicSelf 配置位。
2. 为下载链接附加 `utm_source`、`utm_medium`、`utm_campaign`、`content_id`、`locale`。
3. 定义并实现网站事件：`landing_view`、`content_engagement`、`download_cta_view`、`store_click`；App 侧事件单独记录 `install`、`first_open`、`signup`、`first_generation`、`subscription`、`return_7d`。
4. 所有事件统一带 `product_id`、`locale`、`content_id`、`content_type`、`cluster` 和匿名 session ID。
5. 使用 consent 模式；未同意分析时不发送非必要追踪事件。
6. 建立漏斗数据字典和测试页，验证事件参数、重复触发和失败情况。

### 验收

- 测试环境可以看到每个事件及完整参数。
- 下载点击、首次打开和首次价值不会混成一个事件。
- 分析 ID 和 API 地址来自环境配置，不出现在仓库 Secrets 以外的位置。
- 页面核心 CTA 在无分析脚本时仍可用。

## 7. 阶段 F：关键词监控和 AI 自动化

### Codex 任务

1. 实现 Search Console API 定时同步：query、page、country、device、date、impressions、clicks、CTR、position。
2. 接入 Bing Webmaster（若凭证和地区可用）；失败任务进入重试队列并通知。
3. 实现关键词聚类和机会规则：有展示无点击、排名 5-20、已有工具承接、无近似重复页。
4. AI 生成内容 brief、标题候选、FAQ、内链建议和翻译初稿；输出必须包含来源和不确定项。
5. AI 输出只能生成 GitHub PR，不能直接发布；保存模型、prompt 版本、来源和审核人字段。
6. 实现自动检查：事实引用、重复度、语言质量、链接、Schema、敏感内容、性能和可访问性。
7. 每周生成看板/报告：曝光、点击、CTR、排名、语言对比、页面 cohort、漏斗、成本和异常。
8. 每月执行固定 GEO 问题集，记录引用/未引用、答案准确性和后续改写建议。

### 验收

- 定时任务可重复运行，幂等，不重复写入相同日期/查询数据。
- API 失败、限流和权限错误有清晰日志、重试和通知。
- AI 产物以 PR 形式进入审核队列，人工未合并前不会生产发布。
- 报告可以按 `product_id`、`locale`、`cluster`、`content_type` 分组。

## 8. 阶段 G：GitHub 生产部署、监控和回滚

### Codex 任务

1. 配置 PR 检查：类型、构建、链接、Schema、sitemap、Lighthouse、依赖安全和 secret scanning。
2. 配置预览部署；预览 URL 不能进入生产 sitemap。
3. 配置 GitHub Pages 自定义域名和 HTTPS；`www` 与主域名统一规范化。
4. 配置生产 Secrets 使用 GitHub Environments，最小权限分离 preview/production。
5. 配置原子发布、immutable asset hash、上一版本保留和回滚说明。
6. 配置 uptime、5xx、P95、构建失败、索引异常、事件丢失、API 健康和生成成功率监控。
7. 配置邮件/Slack/GitHub Issue 告警；告警需包含产品、环境、URL、时间和处理链接。

### 验收

- PR 未通过质量检查不能合并到生产分支。
- 生产站点可通过自定义域名访问，HTTPS 有效。
- 能在演练中回滚到上一版本。
- 任何密钥都不会出现在构建产物、日志或前端代码中。

## 9. 阶段 H：PicMuse 试点内容与复盘

### 首批内容

- 首页 1 个。
- 工具/模板落地页 3 个。
- 问题型指南 6 个。
- 模板页 6 个。
- About、作者/审核者、产品事实、Privacy、Terms、Contact、Download。

### 8 周节奏

- 第 1-2 周：基础架构、域名、分析、Search Console、内容 schema。
- 第 3-5 周：首批多语言页面、媒体、Android 下载页和移动端优化；iOS 页面只保留后续接入所需的数据模型。
- 第 6 周：关键词同步、AI brief/PR、自动质检和周报。
- 第 7-8 周：内容改写、GEO 抽样、漏斗分析和扩展决策。

### 复盘门槛

- 关键页面可抓取，事件无丢失。
- 至少 6 页获得有效展示，找到 2 个有点击潜力的查询簇。
- 自然访客到 `store_click` 的基线稳定可采集；如 App 侧已接通归因，再追加安装、首次打开和首次生成指标。
- 至少 30 个自然/AI 引荐激活用户，且有一个主题簇连续两周增长。

## 10. Codex 任务拆分格式

后续给 Codex 的每个具体任务建议使用以下格式：

```text
目标：实现 [单一能力]
范围：允许修改 [文件/目录]；不得修改 [边界]
输入：引用 [配置/产品事实/设计文档]
约束：不能虚构产品事实；保留多语言；移动端必须可用
验收：列出可执行命令、页面路径和预期结果
交付：代码、测试、文档、变更摘要
```

每个任务保持小而可回滚；完成一个阶段后才进入下一阶段。Codex 在最终报告中应列出：修改文件、验证命令、未完成 TODO、风险和需要人工确认的事项。

## 11. 明确不自动化的动作

- 不自动购买域名、创建云账户、创建 API key 或绑定信用卡。
- 不自动发布未经人工审核的 SEO/GEO 内容。
- 不自动删除或 `noindex` 已收录页面。
- 不自动上传包含用户隐私或未授权版权素材的媒体。
- 不把第三方网站或截图中的文字当成 PicMuse 产品事实。
