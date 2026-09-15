# PicMuse SEO / GEO 全链路流程图

## 一、总体架构与用户访问链路

```mermaid
flowchart LR
    U[用户] --> D[picmuse.app]
    D --> CDN[CDN / HTTPS]
    CDN --> S[GitHub Pages<br/>静态 HTML/CSS/JS]
    CDN --> M[媒体 CDN<br/>图片/视频/字幕]
    S --> C[SEO/GEO 内容页]
    C --> T[功能页/模板页/指南页/案例页]
    T --> V[图片与视频示例]
    V --> DL[统一下载页<br/>/download/]
    DL --> GP[Google Play<br/>PicMuse（一期）]
    DL -.后续.-> AS[App Store<br/>PicSelf]
    GP --> P[PicMuse Android App]
    AS --> IP[PicSelf iOS App]
    P --> API[现有 App 后端]
    API --> Q[生成任务队列]
    Q --> GEN[AI 图片/视频生成服务]
    GEN --> R[首次生成结果]
    R --> SH[分享 / 再次生成 / 7日回访]

    DNS[Cloudflare DNS] -.域名解析.-> D
    R2[对象存储 R2] --> M
```

## 二、多语言内容与 SEO/GEO 自动化链路

```mermaid
flowchart TD
    GSC[Google Search Console API] --> DATA[搜索数据仓库]
    BING[Bing Webmaster API] --> DATA
    CRAWL[站点巡检<br/>索引/死链/结构化数据/性能] --> DATA
    DATA --> CLUSTER[关键词聚类与意图识别]
    CLUSTER --> RULE[机会筛选规则<br/>有展示无点击 / 排名5-20 / 可承接]
    RULE --> BRIEF[AI 生成内容 Brief]
    BRIEF --> DRAFT[AI 初稿 / FAQ / 内链 / 元数据]
    DRAFT --> TRANS[多语言翻译初稿]
    TRANS --> QA[自动质检<br/>事实/重复/链接/SEO/GEO/敏感内容]
    QA --> PR[生成 GitHub Pull Request]
    PR --> HUMAN[人工审核<br/>事实/版权/产品承诺/翻译终稿]
    HUMAN --> CONTENT[Markdown/MDX 内容库]
    CONTENT --> BUILD[Astro 构建<br/>locale 页面 / hreflang / sitemap]
    BUILD --> PREVIEW[预览环境 + Lighthouse]
    PREVIEW --> PUBLISH[GitHub Pages 发布]
    PUBLISH --> INDEX[Google/Bing 抓取与索引]
    INDEX --> GSC

    LANG[语言配置<br/>en / zh-TW / ko / ja / de / es] --> TRANS
    ENTITY[产品实体资料<br/>About / 作者 / 版本 / 来源] --> DRAFT
```

## 三、内容发布、媒体处理与转化漏斗

```mermaid
flowchart LR
    AUTHOR[提交内容与原始媒体] --> PR[GitHub PR]
    PR --> MEDIA[媒体处理]
    MEDIA --> IMG[WebP/AVIF 多尺寸图片]
    MEDIA --> VID[MP4/WebM 视频]
    MEDIA --> POSTER[视频 poster]
    MEDIA --> SUB[字幕 VTT / 文字稿]
    IMG --> R2[对象存储]
    VID --> R2
    POSTER --> R2
    SUB --> R2
    R2 --> MC[cdn.picmuse.app]
    PR --> BUILD[静态构建]
    MC --> BUILD
    BUILD --> PAGE[SEO/GEO 页面]
    PAGE --> I[impression]
    I --> K[click]
    K --> L[landing_view]
    L --> CE[content_engagement]
    CE --> DCV[download_cta_view]
    DCV --> SC[store_click]
    SC --> SO[Google Play store_view]
    SO --> IN[install / first_open]
    IN --> SG[signup]
    SG --> FG[first_generation]
    FG --> SUB[subscription / return_7d]
    PAGE --> V[video_start / 25 / 50 / 75 / complete]
    PAGE --> DC[download_click]
    DC --> FO[first_open]
```

## 四、部署、监控与回滚

```mermaid
flowchart TD
    CODE[GitHub Repository] --> CI[GitHub Actions]
    CI --> CHECK[链接 / 元数据 / Schema / 性能 / 安全检查]
    CHECK -->|通过| BUILD[构建静态站与媒体清单]
    CHECK -->|失败| ISSUE[Issue / 通知 / 修复队列]
    BUILD --> DEPLOY[原子发布 GitHub Pages]
    DEPLOY --> CDN[CDN 缓存]
    DEPLOY --> SNAP[保留上一版本<br/>一键回滚]

    MON[监控系统] --> UPTIME[Uptime / 5xx / P95]
    MON --> WEB[Core Web Vitals]
    MON --> INDEX[索引 / Sitemap / Canonical]
    MON --> EVENT[事件完整性]
    MON --> API[API / 生成成功率 / 成本]
    MON --> GEO[GEO 引用抽样]
    UPTIME --> ALERT[告警邮件 / Slack / GitHub Issue]
    WEB --> ALERT
    INDEX --> ALERT
    EVENT --> ALERT
    API --> ALERT
    GEO --> TODO[内容改写与实验待办]
    TODO --> CODE
    SNAP --> DEPLOY
```

## 五、职责边界

| 模块 | 主要职责 | 是否需要常驻服务器 |
|---|---|---|
| GitHub Repository | 代码、内容、媒体清单、版本记录 | 否 |
| GitHub Actions | 构建、质检、媒体处理、自动 PR | 否 |
| GitHub Pages/CDN | 静态页面和公开资源分发 | 否 |
| 对象存储 | 图片、视频、字幕、封面 | 否 |
| 独立 API | 登录、配额、生成、分享、动态数据 | 是，可用 serverless/托管服务 |
| 数据仓库/看板 | Search Console、漏斗、成本、告警 | 通常使用托管服务 |
