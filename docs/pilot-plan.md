# PicMuse SEO / GEO 免费流量试点方案

## 0. 资料边界与假设

以下方案已根据 2026-09-15 的需求确认收敛：PicMuse 当前没有官网和 Web 端，`picmuse.app` 首期作为官方静态内容与 Android 下载转化站；iOS 当前仍以 PicSelf 名称发布。PicMuse Android 已确认接入 Firebase/GA4。视觉和页面规则见 [design-system.md](./design-system.md)、[page-layouts.md](./page-layouts.md) 和 [content-visual-guidelines.md](./content-visual-guidelines.md)。Google Play 功能参考见 [google-play-feature-reference.md](./google-play-feature-reference.md)。详细确认表见 [requirements-confirmed.md](./requirements-confirmed.md)。尚未标记为已确认的价格、素材授权和跨端归因能力，正式发布前仍需校准。

## 1. 试点目标与边界

### 目标

- 在 8 周内验证非品牌搜索和 AI 答案引荐能否带来可持续的应用下载和后续激活。
- 建立可重复的“关键词 -> 内容页 -> 下载页 -> 应用激活”生产和测量链路。
- 用低成本静态部署验证 3 个高意图主题，而不是一开始铺设大规模内容农场。

### 暂不做

- 不购买大量外链、不做自动群发、不生成无事实依据的“伪专家”内容。
- 不把 SEO 流量目标等同于页面访问量；没有激活事件的数据不进入成功标准。
- 不在 GitHub Pages 上运行密钥、队列或长任务。GitHub 负责代码、静态站和构建；需要鉴权、计费、生成任务的能力放在受控的 serverless/API 服务。

## 2. 产品定位与转化路径

建议先选一个可被搜索、可被演示、能自然引导下载的切口，例如：

> PicMuse：帮助独立创作者快速生成可直接用于社媒、商品页和营销素材的图片，并提供可控的风格/尺寸/提示词工作流。

一期核心路径：

`搜索/AI 问答曝光 -> 解决问题的内容页 -> 下载 CTA -> Google Play -> 安装/首次打开 -> 首次生成`

每个落地页只设一个主 CTA（“下载 PicMuse”或具体功能介绍），网站记录到 `store_click`；安装、首次打开、首次生成和订阅需要 App 侧埋点配合。

## 3. 站点与域名架构

### 域名

- 主站：`picmuse.app`，统一 HTTPS、canonical 和品牌入口。
- `www.picmuse.app` 301 到主站；不要让 GitHub Pages 默认域名参与索引。
- 可选的内容子域名仅在确有独立发布节奏时使用；首期优先同域名目录结构，集中权重。

### 页面分层

- `/`：产品价值、示例、核心 CTA。
- `/features/`：可索引的功能说明目录；每个功能有独立 URL、真实示例和下载 CTA。未提供 Web 在线工具，不把静态页面包装成可在线生成工具。
- `/templates/`：按用途/行业/尺寸组织的模板页，模板必须真实可用。
- `/guides/`：教程、对比、工作流和案例；作者、更新时间、来源清晰。
- `/glossary/`：术语解释，仅覆盖确有搜索需求且能链接到工具/指南的词。
- `/changelog/` 或 `/updates/`：产品事实、模型/功能变更，增强实体可信度。

首期建议 12-20 个页面：1 个首页、3 个工具页、6 个问题型指南、6 个模板页，外加必要的 About、Contact、Privacy、Terms。

### GitHub 部署

- GitHub 仓库作为单一事实源；Pull Request 检查链接、元数据、构建和 Lighthouse。
- GitHub Actions 构建静态站并发布 GitHub Pages；DNS 使用 `A/AAAA` 或 CNAME 按 GitHub 文档配置。
- 生成站点的版本化内容存放在仓库，图片压缩后提交或使用稳定的对象存储/CDN URL。
- Actions 日志中不得出现 API key；域名、分析 ID 等使用环境变量/Secrets。

## 4. SEO 技术基线

- 每个可索引 URL 具备唯一 title、description、H1、canonical、Open Graph/Twitter 图。
- 生成 `sitemap.xml`、`robots.txt`、RSS/Atom（指南更新）；提交 Google Search Console、Bing Webmaster Tools。
- 使用 `Organization`、`WebSite`、`SoftwareApplication`、`Article`、`HowTo`、`FAQPage`（仅在页面确实呈现问答时）结构化数据。
- 服务器端/构建时输出正文，避免把关键内容只放在客户端渲染后。
- 图片使用真实结果图和描述性 alt；尺寸、格式、压缩和 lazy-load 不牺牲首屏 LCP。
- 处理分页、筛选、重复模板、404、重定向和语言版本；六种语言采用分批上线，避免同时生成低质量翻译页面。
- 目标：移动端 LCP < 2.5s、INP < 200ms、CLS < 0.1；每周检查死链和索引覆盖。

## 5. 内容与 GEO 设计

### 三个首期主题簇

1. **任务型**：如社媒配图、商品主图、博客封面、缩略图尺寸与提示词。
2. **方法型**：如如何保持角色一致、如何写可复用提示词、如何批量生成变体。
3. **比较/决策型**：如不同图片生成工作流的成本、速度、可控性；只写可验证的事实。

每簇包含 1 个支柱页、2-4 个具体问题页和 1-2 个可直接使用的工具/模板页，页面之间用上下文链接闭环。

### 面向 AI 引擎的可引用内容

- 在页面开头给出 40-80 字的直接结论和适用条件，随后再展开步骤、示例和限制。
- 使用清晰的 H2/H3、定义句、编号步骤、对比表和 FAQ；每一页只回答一个主问题。
- 标注作者/审核者、更新时间、工具版本、提示词原文和示例输入输出；保留可访问的来源链接。
- 建立 `/about`、作者页和产品事实页，统一品牌实体名称、产品类别、官网和社交账号。
- 每月抽样询问主流 AI 搜索/问答引擎，记录是否被引用、引用位置和答案准确性；修正缺失事实，不用关键词堆砌。

## 6. 免费分发与获客闭环

- 发布真实可下载/可复制的提示词、尺寸预设、风格对照和结果案例，作为自然分享资产。
- 在 Product Hunt、Indie Hackers、Reddit/Discord 等允许自荐的社区做问题导向的发布；遵守版规，优先提供原生价值。
- 用 GitHub README、示例仓库和 changelog 建立开发者可发现性；不要用 GitHub 作为垃圾外链网络。
- 让每个结果页具备轻量分享卡片和可追溯的分享 URL；分享默认不暴露用户私密输入。
- 邮件只发送用户主动订阅的更新/模板，提供退订；不购买名单。

## 7. 数据、事件与归因

### 必须接入

- GA4 或同等隐私友好的分析工具、Search Console、Bing Webmaster。
- 事件：`landing_view`、`content_engagement`、`download_cta_view`、`store_click`，以及 App 侧的 `install`、`first_open`、`signup`、`first_generation`、`subscription`、`return_7d`。
- 内容维度：`page_type`、`cluster`、`query_source`、`content_id`、`locale`、`platform`。
- 每周导出查询、展示、点击、商店点击、安装、首次打开、首次生成和成本；网站不能仅凭静态页面准确推断 App 安装。

### 8 周试点门槛（可按基线调整）

- 第 2 周：技术 SEO 通过，关键页面可抓取，事件无丢失。
- 第 4 周：至少 6 页获得有效展示；发现 2 个有点击潜力的查询簇。
- 第 6 周：自然流量访客到 `download_cta_view` >= 20%，落地页到 `store_click` 的数据稳定可采集。
- 第 8 周：至少找到 1 个有明确下载意图且连续两周增长的主题簇；如果 App 侧已接通归因，再增加安装、首次打开和首次生成门槛。

## 8. 执行节奏

### 第 1 周：准备

确认 Android 商店链接、产品能力、素材授权、首发语言顺序、隐私政策和事件字典；配置 GitHub Pages、DNS、Search Console、GA4 和 Tag Manager；建立关键词表和内容模板。

### 第 2-3 周：最小站点

上线首页、3 个工具页、About/Legal、6 个高意图指南和分析埋点；完成 sitemap、结构化数据、性能和可访问性检查。

### 第 4-6 周：内容与分发

每周发布 2-3 页高质量内容，配套真实示例；在 2-3 个相关社区做人工发布；每周根据 Search Console 查询改写标题、首段和内部链接。

### 第 7-8 周：评估

比较主题簇、页面类型、入口查询与激活率；抽样检查 AI 引用；决定扩大、改定位或停止某一簇。把结论写入仓库的试验记录，确保下一轮可复盘。

## 9. 风险与决策点

- **产品尚未稳定**：先把工具降级为可用的模板/提示词体验，避免 SEO 承诺超过实际能力。
- **AI 生成成本失控**：匿名用户限额、队列和缓存；成本事件与激活率联看。
- **薄内容/重复内容**：宁可少发，要求每页有独特示例、判断标准或一手数据。
- **隐私与版权**：明确输入图和输出图的保留期限、训练用途、商用边界及举报渠道。
- **GitHub Pages 能力不足**：静态内容继续留在 GitHub；鉴权、计费、生成 API 独立部署，不把密钥塞进前端。
- **没有搜索需求**：两周无展示不代表失败，先验证查询意图和页面质量；连续两轮无信号再替换主题。

## 10. 开工前需要确认的事项

1. 商店素材授权范围，以及后续官网专用素材替换计划。
2. 六种语言的首发顺序，以及每种语言的审核方式；繁体中文已确认使用一套。
3. PicSelf 法律页面作为 PicMuse 官网法律参考时的品牌说明，以及是否需要单独补充分析隐私说明。
4. `mwj0791@gmail.com` 是否拥有 Search Console、GA4、Tag Manager、Firebase、Google Ads 和 Play Console 所需权限。
5. App 侧 `referrer` 空参数、UTM 覆盖率、独立 signup 事件和 Google Ads 关联的修复计划。
6. AI 写真、丰胸、魔法笔刷等 18+ 功能的图片筛选、页面提示、地区和搜索摘要边界。

以下内容已经明确，不再作为一期阻塞项：`picmuse.app` 域名可用；网站首期不提供 Web 在线生成；首期主转化是 Android Google Play 下载；内容由用户与 AI 协作维护。

---

# 11. 从 0 开始的系统架构（建议基线）

## 11.1 总体原则

- **静态优先**：公开页面在构建时生成，CDN 直接返回 HTML、CSS、JS 和图片；交互工具按需加载。
- **内容与产品解耦**：SEO 内容不依赖生成服务才能访问；生成 API 故障时，指南、模板和示例仍可用。
- **可观测、可回滚**：每次内容和代码发布都有版本、预览 URL、检查结果和回滚点。
- **多语言从数据模型开始**：不要先复制页面再补翻译，URL、元数据、站点地图和分析维度都原生支持 locale。

## 11.2 推荐分层

1. **展示层**：建议采用 Astro + TypeScript 静态生成，发布到 GitHub Pages/CDN；首期只实现导航、语言切换、媒体播放和下载归因等轻量客户端交互，不实现 Web 生成工具。若团队已有成熟 Next.js 能力，可用 Next.js 静态导出替代，但不得让公开 SEO 页面依赖服务端运行时。
2. **内容层**：Git 仓库中的 Markdown/MDX + front matter，图片和结构化数据一起版本化；未来需要非技术编辑时再接 Headless CMS。
3. **应用层**：一期不新增 Web 应用层；PicMuse 现有 App 后端保持独立。未来若开放 Web 生成，再增加 API 层处理登录、共享积分、图片生成、任务队列和分享链接，密钥不进入静态产物。
4. **数据层**：事件采集、搜索数据仓库和运营看板分开；业务数据库不承担分析查询。
5. **自动化层**：GitHub Actions 负责构建/发布，定时任务负责抓取搜索数据、内容质检、AI 草稿和报告通知。

## 11.3 多语言信息架构

- 首期支持英文、繁体中文、韩语、日语、德语、西班牙语，使用明确的 `/en/`、`/zh-tw/`、`/ko/`、`/ja/`、`/de/`、`/es/` 路径；不要依赖浏览器自动跳转。建议英文、韩语、日语、繁体中文先上线，德语和西班牙语第二批上线。
- 每个页面有稳定的 `translation_key`，语言版本用 `hreflang` 双向关联；缺失翻译时返回明确的 fallback 或 `noindex`，不生成半翻译页面。
- 每种语言独立维护 title、description、H1、OG 图、关键词和示例，不做机器直译后直接发布。
- 生成各语言独立 sitemap，并提交 sitemap index；语言切换器使用可抓取的普通链接。
- 分析事件统一带 `locale`、`content_id`、`translation_key`，可比较不同语言的曝光到激活率。
- 后续扩语言按数据门槛执行：该语言有搜索需求、可人工审核、客服和法律页面齐备后再开放。

# 12. SEO / GEO 内容系统

## 12.1 内容实体模型

每篇内容至少包含：`content_id`、`locale`、`content_type`、`cluster`、`primary_query`、`search_intent`、`author`、`reviewer`、`source_urls`、`product_version`、`last_reviewed_at`、`canonical_id`、`status`。

内容类型固定为：工具页、模板页、问题指南、对比页、案例页、术语页、产品事实页。类型决定必填字段、结构化数据、内链规则和转化 CTA。

## 12.2 AI 生产但人工负责

自动化可以完成关键词聚类、搜索结果摘要、内容大纲、初稿、翻译初稿、内部链接建议、元数据草稿、图片 alt 草稿和旧文更新建议；不能自动发布涉及产品能力、价格、版权、健康/法律等事实的内容。

发布前必须通过：事实引用检查、重复度检查、品牌语气检查、语言质量检查、链接检查、结构化数据校验、敏感内容检查和人工审核。每次 AI 输出保存 prompt 版本、模型版本、输入来源和审核人，便于追责与回滚。

## 12.3 GEO 可引用性

- 页面首屏先给结论、适用条件和限制，再展开过程；关键答案保持可独立引用。
- 使用定义句、编号步骤、对比表、FAQ 和真实示例；每个事实尽量绑定第一方或权威来源。
- 建立统一的产品实体资料：名称、类别、创始/团队信息、功能边界、更新时间、官网和社交账号。
- 每月运行固定问题集，记录 Google AI Overviews、Bing Copilot、Perplexity 等是否展示/引用 PicMuse；变化进入内容待办。

# 13. 性能、稳定性与安全

- 公开页面 CDN 缓存，HTML 预渲染；图片转 WebP/AVIF、响应式尺寸和明确宽高，避免 CLS。
- 首屏只加载必要 CSS/JS，工具编辑器、分析 SDK 和分享组件延迟加载；设置资源预算并在 CI 失败时阻断超预算发布。
- 采用 immutable asset hash、短缓存 HTML、长缓存静态资源；发布使用原子切换，保留上一版本一键回滚。
- API 设置超时、重试上限、幂等任务 ID、队列、死信处理和速率限制；生成失败提供可理解的降级提示。
- 监控 uptime、5xx、P95 延迟、构建失败、索引异常、事件丢失和生成成功率；异常通过邮件/Slack/Issue 通知。
- 密钥仅存在 GitHub Environments/Secret Manager；最小权限、依赖锁定、Dependabot、CodeQL、secret scanning 和定期备份。
- 隐私：分析采用 consent 模式，生成输入默认不公开；分享链接使用不可猜测 ID，提供删除和数据保留策略。

# 14. Google 关键词监控与漏斗

## 14.1 数据源

- **Search Console API**：查询、页面、国家、设备、语言的 impressions、clicks、CTR、position，每日入库。
- **Bing Webmaster API**：作为第二搜索引擎校验，不把单一平台波动当成趋势。
- **GA4/隐私友好分析**：首期记录落地页、内容互动、下载 CTA 和商店点击；App 侧另行记录安装、首次打开、首次生成、订阅和 7 日回访。
- **站点巡检**：每日抓取 sitemap、索引状态、canonical、死链、Core Web Vitals 和结构化数据错误。

## 14.2 漏斗定义

`impression -> click -> landing_view -> content_engagement -> download_cta_view -> store_click -> install -> first_open -> first_generation -> subscription/return_7d`

每一步按 `locale`、`cluster`、`content_type`、`query`、`device` 和 `platform` 分组，保存事件时间和匿名 visitor/session ID。首期重点指标是查询簇 CTR、落地页到商店点击率、不同语言下载点击率；安装、首次打开、首次生成和订阅需要 App 侧归因支持。

## 14.3 看板与告警

- 日看板：索引、抓取、错误、事件完整性和下载链接健康；App 生成 API 健康保留为产品侧看板。
- 周看板：关键词排名/曝光/点击变化、页面 cohort、漏斗转化、语言对比和内容发布影响。
- 告警示例：核心页面连续 3 天 impressions 下降 30%、P95 超预算、事件量与服务日志偏差超过 10%、sitemap 出现不可访问 URL。

# 15. 全流程自动化 / AI 化

## 15.1 自动流水线

1. 定时拉取 Search Console/Bing/站点巡检数据，聚类新查询和排名下降页面。
2. 规则引擎筛选机会：有展示无点击、排名 5-20、已有工具可承接、没有近似重复页。
3. AI 生成 brief、标题候选、结构大纲、FAQ、内链和多语言初稿，并附来源与不确定项。
4. 自动运行事实/链接/重复/SEO/GEO/性能检查，生成 PR；人工在 PR 中审核和修改。
5. 合并后 Actions 构建预览并发布；发布记录 content_id、版本、语言和实验标签。
6. 发布 7/14/28 天自动生成表现报告，建议保留、改写、合并或下线；任何 `noindex`/删除动作需要人工确认。

## 15.2 运营控制面

建议建立一个仅团队可见的运营面板：内容队列、审核状态、关键词机会、发布日历、漏斗、API 成本、异常和回滚入口。所有自动任务输出可追溯日志，失败进入重试或人工队列，不静默丢失。

## 15.3 自动化边界

可全自动：数据同步、聚类、报告、链接检查、构建、预览、低风险元数据建议。

必须人工确认：事实、版权、产品承诺、价格、法律/隐私文本、首发内容、翻译终稿、删除或合并索引页面。

# 16. 分阶段交付与验收

### 阶段 A：架构和基线（第 1-2 周）

确定技术栈、域名/DNS、locale 规则、事件字典、内容 schema、视觉 token、页面布局、CI 质量门槛、Search Console、GA4 和基础看板。验收：可预览、可发布、可回滚、网站事件可验证。

### 阶段 B：内容 MVP（第 3-5 周）

上线首批语言的首页/法律页、3 个功能说明页、6 个指南、6 个模板页和实体资料页。验收：无关键索引错误，移动端性能达标，所有页面有明确 Android 下载 CTA。

### 阶段 C：自动化闭环（第 6-8 周）

接入 Search Console/Bing API、关键词聚类、AI brief/草稿 PR、自动质检、周报和告警。验收：从数据发现到人工审核 PR 的链路可重复，失败可重试且有通知。

### 阶段 D：规模化决策（第 9 周以后）

只扩大达到门槛的语言和主题簇；为新语言、新工具和新内容类型分别设 cohort，避免总量增长掩盖单页质量下降。

# 17. 需要在架构评审会上定下来的选择

1. 静态生成器（Astro 或 Next.js 静态导出）。
2. 六种语言的首发顺序，以及翻译审核方式。
3. 分析工具（GA4 或隐私优先替代品）、Google 账号权限和数据保留期限。
4. 关键词数据同步频率、看板工具和告警渠道。
5. AI 使用的模型、预算、可接受的人工审核 SLA 和禁止自动发布的内容类别。
6. App 侧归因能力、素材授权、敏感功能展示边界和图片/视频存储/CDN。

# 18. 静态内容、媒体与移动端设计

## 18.1 SEO/GEO 页面形态

SEO/GEO 页面原则上全部在构建阶段生成静态 HTML，用户无需等待后端 API 即可打开、抓取和分享。页面中的图片、视频、结构化数据和下载链接都在构建时确定；一期只保留媒体播放、语言切换和下载归因等轻量客户端组件，不加载 Web 生成器或登录功能。

这意味着：

- 搜索引擎和 AI 爬虫可以直接读取标题、正文、FAQ、图片说明和视频上下文。
- GitHub Pages/CDN 可以缓存绝大多数请求，降低延迟和故障影响。
- 产品 API 暂时不可用时，内容页、案例页和下载页仍可访问。

## 18.2 图片架构

- 原图不直接放进页面；构建流程生成 AVIF/WebP 多尺寸版本，并保留必要的 JPEG/PNG fallback。
- 使用 `srcset`、`sizes`、明确的 `width/height` 或 `aspect-ratio`，避免移动端下载过大的桌面图片。
- 首屏主视觉使用 preload 或优先级提示；首屏以下图片 lazy-load。
- 每张公开图片必须有描述性 alt、版权/来源字段和对应内容实体；装饰图片使用空 alt。
- 高频图片放到 CDN 或对象存储，GitHub 仓库只保存压缩版本、清单和内容引用，避免仓库膨胀。

## 18.3 视频架构与 SEO

- 视频使用 MP4/H.264 作为广泛兼容格式，必要时补充 WebM；根据网络情况提供多码率版本。
- 页面默认不自动播放带声音的视频；移动端优先点击播放，避免影响性能和用户流量。
- 使用 poster、固定宽高比、字幕/文字稿和简短摘要；关键内容不能只存在于视频音轨中。
- 为重要视频生成 `VideoObject` 结构化数据，包含 `name`、`description`、`thumbnailUrl`、`uploadDate`、`duration` 和可访问的内容页 URL。
- 视频文件放在对象存储/CDN 或视频平台，页面静态引用；不建议把大型视频直接提交到 Git 仓库或依赖 Git LFS 作为生产 CDN。
- 记录 `video_impression`、`video_start`、`video_25/50/75`、`video_complete`，并关联 `content_id` 与 `locale`。

## 18.4 下载转化链路

内容页和媒体页的主 CTA 统一指向产品下载/应用入口，不在每个页面设计多个相互竞争的按钮：

`静态内容页 -> 图片/视频示例 -> 下载 PicMuse -> Google Play -> 首次打开 -> 首次生成`

- 一期下载页只展示 Android Google Play；iOS/PicSelf 使用配置预留，待第二阶段接入。
- 下载链接带有 `utm_source=seo|geo`、`utm_medium=organic`、`utm_campaign`、`content_id` 和 `locale`，以便回传安装和激活归因。
- 使用统一的 `/download/` 页面作为可索引入口，平台跳转由轻量客户端逻辑完成；页面本身保留静态的产品说明和备用链接。
- 不把“下载”事件等同于激活：至少区分 `store_click`、`install`（若平台可回传）、`first_open`、`first_generation` 和 `subscription`。

## 18.5 移动端要求

- 采用 mobile-first 响应式布局，断点只解决内容布局问题，不用 viewport 缩放字体。
- 触控目标至少 44x44 CSS px；导航、语言切换、视频播放和下载 CTA 在小屏幕上不互相遮挡。
- 长标题、按钮和多语言文本允许换行；不使用会导致横向滚动的固定宽度容器。
- 功能页在低端手机和慢网下先展示功能说明与示例，再延迟加载视频和非必要脚本。
- 移动端验收至少覆盖 320px、375px、390px、768px 和桌面宽度；检查横向溢出、键盘输入、视频比例、CLS 和下载按钮可用性。
- CI 中加入 Lighthouse 移动端检查，建议门槛：Performance >= 90、Accessibility >= 95、SEO >= 95；核心页面的 LCP < 2.5s、INP < 200ms、CLS < 0.1。

# 19. 多产品快速复制设计

如果 PicMuse 试点验证有效，建议把它升级为一个可配置的“产品增长站点平台”，而不是复制粘贴整套代码。

## 19.1 共享与隔离

| 能力 | 多产品共享 | 每个产品隔离 |
|---|---:|---:|
| 页面模板、组件、SEO 检查、性能预算 | 是 | 否 |
| GitHub Actions / 发布流程 | 是 | 产品配置和 Secrets 独立 |
| 内容 schema、翻译 schema、媒体处理 | 是 | 内容、媒体和版权独立 |
| 域名与 sitemap | 否 | 是 |
| Search Console / Bing 数据 | 否 | 是 |
| GA4 数据流和漏斗 | 平台规范共享 | Product ID、数据流和看板隔离 |
| 品牌实体、作者、价格、功能承诺 | 否 | 是 |
| API、账号、配额、计费 | 可复用基础模块 | 数据和权限隔离 |

## 19.2 推荐仓库方式

采用 monorepo 或“模板仓库 + 产品内容仓库”模式：

```text
growth-platform/
  packages/ui/             共用 UI 与响应式组件
  packages/seo/            metadata、schema、sitemap、hreflang
  packages/media/          图片/视频压缩与媒体清单工具
  packages/analytics/      事件规范与归因 SDK
  packages/quality/        链接、重复、性能、敏感内容检查
  apps/picmuse-site/       PicMuse 产品配置与页面
  apps/product-b-site/     其他产品配置与页面
```

若团队规模较小，可先使用一个模板仓库，每个产品从模板创建独立仓库；当共享组件开始频繁更新，再抽成版本化 package。产品内容、域名、分析属性和发布凭证必须分开。

## 19.3 产品配置驱动

每个产品只需提供配置和内容，不重复实现框架逻辑：

- `product_id`、产品名、品牌色、Logo、描述、产品类别。
- 域名、语言列表、默认语言、下载平台和应用商店链接。
- API 地址、分析 ID、Search Console 属性和告警渠道。
- 内容主题簇、作者/审核者、隐私与条款链接。
- 媒体 Bucket/CDN 前缀、版权规则和保留策略。
- 转化事件名、漏斗目标和试点阈值。

模板根据配置自动生成导航、语言切换、metadata、JSON-LD、sitemap、下载页、404 和法律页面。

## 19.4 复制流程

```text
复制产品配置与空内容目录
  -> 绑定新域名和 Search Console
  -> 创建独立媒体 Bucket/CDN 前缀
  -> 配置独立 API、分析流和 Secrets
  -> 运行品牌/链接/多语言/性能检查
  -> 先发布 1 个首页 + 3 个工具/模板 + 3 个指南
  -> 观察 2-4 周数据
  -> 决定扩展主题簇和语言
```

模板成熟后，新增一个产品的工作量主要集中在产品资料、真实示例、关键词研究、翻译和合规审核，而不是重新开发站点框架。

## 19.5 多产品 SEO 风险控制

- 不跨产品复制同一篇文章后只替换品牌名；每个产品必须有独特能力、示例和用户意图。
- 每个域名单独提交 sitemap 和 Search Console 属性，单独计算曝光、点击和激活。
- 共用的教程可以做平台级知识页，但必须明确产品适用范围并避免多个域名互相 canonical。
- 共享组件发布前运行所有产品的视觉回归、链接、结构化数据和性能检查。
- 一个产品的 API、媒体权限或分析配置不得通过默认值意外复用到另一个产品。

## 19.6 只有 PicMuse 时的仓库落地方式

当前只有一个产品时，建议使用一个仓库，不要提前创建独立的共享仓库。公共能力放在仓库内的 `packages/`，PicMuse 的品牌、内容和产品功能放在 `apps/picmuse-site/`，这样边界清楚，又不会增加发布和依赖管理成本。

```text
picmuse-seo/
  apps/
    picmuse-site/
      pages/               页面入口与 locale 路由
      content/             PicMuse 内容、翻译和 front matter
      product.config.ts    品牌、域名、下载、API、分析配置
      assets/              少量页面专属资源
  packages/
    ui/                    导航、按钮、卡片、视频、下载 CTA
    seo/                   metadata、JSON-LD、sitemap、hreflang
    i18n/                  语言路由、翻译加载、fallback 规则
    media/                 图片压缩、视频 poster、字幕和 CDN 清单
    analytics/             事件名、UTM、漏斗字段和 consent
    quality/               链接、重复、结构化数据、性能和敏感内容检查
  automation/
    jobs/                  Search Console 同步、关键词聚类、报告
    prompts/               AI brief、翻译、审核和更新提示词版本
  public/
    robots.txt
  .github/
    workflows/             CI、预览、发布、定时任务
  docs/                    架构、内容规范、实验记录和运行手册
```

### 当前阶段的依赖规则

- `packages/*` 不得引用 PicMuse 的品牌文案、产品 API 或具体内容。
- `apps/picmuse-site` 可以组合公共包，但产品专属交互放在自己的目录中。
- 内容只进入 `apps/picmuse-site/content`，不要把文章散落在组件代码里。
- 所有产品变量从 `product.config.ts` 读取，不在组件中硬编码域名、下载链接或分析 ID。
- 公共包先作为 workspace 内部包使用，不急于发布到 npm。

### 什么时候抽成独立共享仓库

满足以下任一条件再拆分：第二个产品已经开始接入；公共包需要独立版本和权限；或公共组件由不同团队独立维护。拆分时优先抽取 `ui`、`seo`、`i18n`、`media` 和 `quality`，产品内容与配置仍留在各自仓库。

# 20. 复制到 LitAI 的准备与修改清单

以下按 LitAI 是 AI 视频生成/编辑产品来规划；如果 LitAI 的实际能力不同，应先以产品事实表为准，不能让模板中的视频功能描述超过真实能力。

## 20.1 可以直接复用的部分

- Astro 静态站点框架、响应式组件和移动端布局。
- 多语言 URL、`hreflang`、metadata、JSON-LD、sitemap 生成器。
- GitHub Actions 构建、预览、链接检查、Lighthouse、CodeQL 和发布回滚。
- R2/CDN 媒体上传、图片压缩、视频 poster/字幕处理流程。
- Search Console/Bing 数据同步、关键词聚类、漏斗事件规范和看板模板。
- AI 内容 brief、翻译初稿、内链建议、重复度检查和人工审核 PR 流程。

## 20.2 LitAI 必须准备的产品资料

### 产品和品牌

- 官方产品名、Logo、品牌色、产品简介、产品类别和一句话定位。
- 官方域名（例如 `litai.app`，以实际注册结果为准）、社交账号和品牌实体资料。
- 产品截图、真实生成视频、poster、字幕、输入提示词和输出参数。
- 支持的平台：Web、iOS、Android、桌面端，以及各自的下载链接。

### 功能和限制

- 支持的生成模式：文生视频、图生视频、视频延展、口型/动作/风格等。
- 可选模型、分辨率、时长、宽高比、生成速度、并发数和队列行为。
- 免费额度、积分/订阅、商业使用权、导出限制和水印规则。
- 明确不支持的内容、地区限制、审核规则和失败原因。

### 合规和运营

- Privacy、Terms、版权/商用授权、内容举报和数据删除政策。
- AI 生成内容标识、训练数据声明和用户上传素材的保留期限。
- 支持语言、人工翻译/审核负责人和客服入口。
- 每月可用于内容、翻译、视频制作和 API 的预算。

## 20.3 LitAI 需要修改的站点内容

### 页面结构

建议从 PicMuse 的页面集合改成：

```text
/{locale}/
/{locale}/video-generator/
/{locale}/image-to-video/
/{locale}/text-to-video/
/{locale}/templates/
/{locale}/guides/
/{locale}/models/
/{locale}/pricing/
/{locale}/download/
```

实际路径应根据搜索量和产品真实功能确定，不要为了覆盖关键词创建没有独特价值的页面。

### 内容主题簇

- 任务型：短视频广告、产品演示、社媒短片、影视分镜、游戏概念视频。
- 方法型：提示词结构、镜头运动、角色一致性、图生视频、视频延展和字幕工作流。
- 决策型：模型能力、速度、成本、分辨率、时长和适用场景比较；数据必须来自可验证测试。
- 模板型：按平台比例、行业、镜头类型和营销目标提供真实可用模板。

PicMuse 侧重静态图片时，LitAI 需要替换所有产品实体、CTA、示例、媒体格式、视频结构化数据和激活事件，不能只改 Logo 和产品名。

## 20.4 LitAI 的数据和事件修改

在共享事件规范上增加视频专属字段：

```text
product_id=litai
locale
content_id
model_id
generation_mode
duration_seconds
aspect_ratio
download_platform
```

关键事件建议包括：

```text
landing_view
video_preview_start
template_select
generation_start
generation_success
generation_fail
download_click
first_open
first_value
share
return_7d
```

LitAI 的核心漏斗应重点观察：

`搜索曝光 -> 页面点击 -> 视频预览 -> 选择模板 -> 开始生成 -> 生成成功 -> 下载/注册 -> 首次导出`

## 20.5 LitAI 上线前检查

1. 所有页面中的 PicMuse 文案、Logo、canonical、Schema、OG 图和下载链接已替换。
2. LitAI 的每种语言都有独立 title、description、示例和 CTA；缺失翻译页面不进入索引。
3. 视频 poster、字幕、文字稿、`VideoObject` 和媒体版权信息齐全。
4. Search Console、Bing、分析数据流、API、媒体 Bucket 和告警渠道全部使用 LitAI 独立配置。
5. 免费额度、价格、模型名称和生成限制与产品实际状态一致。
6. 移动端下载、视频播放、上传/生成入口和长文本经过真实设备测试。
7. 至少准备首页、3 个高意图落地页、3 个指南、3 个模板页，再开启第一轮索引。
