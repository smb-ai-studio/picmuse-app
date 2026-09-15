# PicMuse 页面布局与转化设计

更新时间：2026-09-15

## 1. 首页

首页目标：让第一次访问者在一个屏幕内理解产品，并愿意继续看真实结果或下载。首期功能和素材优先参考 Google Play 商店页，详见 [google-play-feature-reference.md](./google-play-feature-reference.md)。首页只展示最有搜索和转化价值的能力，不把商店长描述完整搬进首屏。

```text
顶部导航
  Logo | Features | Guides | Download | Language

首屏
  左：短定位、核心结果、Android 下载 CTA
  右：真实作品/手机截图/短视频

下一段可见内容
  “See what you can create”
  图片和视频结果带功能标签

功能带
  AI video generator
  Image to video
  AI image generator
  AI photo editing
  Trend inspiration

场景带
  Social content
  Portraits
  Creative experiments
  Small business content

产品证据
  App 截图、前后对比、短视频、使用步骤

下载区
  Android 下载 CTA
  当前平台说明
  18+ 功能提示

页脚
  About | Privacy | Terms | User Agreement | Contact
```

首页营销原则：

- 首屏不讲完整功能清单，只讲最重要的结果。
- 首屏下方立刻展示真实作品，避免用户只看到口号。
- 功能顺序按用户价值排序，不按内部模块命名排序。
- 首页不把 AI 写真、丰胸或强身体编辑作为唯一主视觉。
- 任何商店素材都要标明为产品展示，不暗示所有结果都能稳定复现。

## 2. 功能页

功能页目标：承接高意图搜索，解释一个具体能力，并把用户送到 Google Play。

首批功能页优先覆盖：

- AI Video Generator
- Image to Video
- AI Image Generator
- AI Photo Editor / Enhancer
- Trend Inspiration / Templates

第二批或专题页覆盖：

- AI Dance Video
- AI Anime Generator
- Magic Brush
- AI Portrait
- 18+ body editing features

```text
Breadcrumb / 功能分类

H1：用户目标或功能名称
一句话结论
真实图片或视频
Download PicMuse for Android

它适合什么场景
三步使用流程
前后结果或案例
可调节项与限制
适用平台
FAQ
相关功能/指南
页面末尾下载 CTA
```

功能页必须明确：

- 这是 PicMuse App 功能介绍页。
- 网站不能直接在线生成。
- Android 当前下载入口是 Google Play。
- iOS 相关内容第二阶段再接入，当前名称为 PicSelf。
- AI 写真、丰胸、身体编辑页面按 18+ 处理。

## 3. 指南页

指南页目标：承接问题型搜索和 AI 问答引用，提供可独立阅读的答案。

```text
问题型标题
40-80 字直接答案
适用条件与限制
步骤或判断框架
真实示例
常见错误
PicMuse 相关功能
Android 下载 CTA
作者、审核者、更新时间、来源
```

指南页不应为了 SEO 硬塞产品文案。先回答问题，再自然说明 PicMuse 如何承接这个场景。

## 4. 模板/灵感页

模板页目标：展示可参考的创作方向，鼓励用户下载 App。

```text
主题标题
结果网格或视频列表
每个结果的场景、比例、风格标签
使用建议
Download PicMuse
```

模板页要求：

- 每个模板必须对应真实可用的 App 工作流或创作提示。
- 不制造大量只有标题不同的重复页面。
- 图片和视频需要来源、版权和版本记录。
- 身体编辑/AI 写真相关模板单独标注 18+。

## 5. 下载页

下载页目标：减少犹豫和误点，让用户清楚知道当前可下载的平台。

```text
PicMuse
在手机上开始创作
Android
PicMuse
Google Play 下载按钮

iOS
当前 App Store 显示为 PicSelf
第二阶段接入或显示说明

常见问题
  需要什么设备
  PicMuse 与 PicSelf 的关系
  账号、作品、订阅和积分是否共享

法律链接和隐私说明
```

一期不展示 Web App、桌面端或死链接。

## 6. About / Product Facts

目标：建立品牌实体和 GEO 可引用资料。

必须包含：

- PicMuse 官方名称
- Android 应用名称和 Google Play 链接
- 包名 `com.smb.picmuse`
- PicMuse 与 PicSelf 的平台关系
- 当前已确认的功能范围
- 内容更新时间
- 官方法律链接
- 联系方式或支持入口

这类页面不要写成品牌故事长文，重点是清晰、可引用、可验证。

## 7. 页面转化规则

- 每个页面一个主转化目标：Android Google Play 点击。
- 主 CTA 位置：首屏一次、内容证据后一次、页面底部一次。
- 记录 `store_click`，参数包括 `content_id`、`page_type`、`cluster`、`locale`、`platform`。
- 从搜索进入的页面，首屏不要先放长导航或大段品牌宣言。
- 内容页必须在用户看到第一个真实结果后尽快出现下载入口。
- 页面之间通过上下文内链连接，不依赖“查看更多”无限滚动。
