# PicMuse SEO / GEO 试点需求确认表

更新时间：2026-09-15

本文把目前已确认的信息、基于这些信息做出的架构决策，以及开工前仍需补齐的事项分开记录。未标记为“已确认”的内容不能直接写入生产营销文案。

## 1. 已确认信息

| 类别 | 已确认内容 |
|---|---|
| 官网现状 | 当前没有官网，也没有 SEO 资产 |
| 官网域名 | `picmuse.app` 已购买，可以正常使用 |
| 首期官网定位 | 官方产品说明、SEO/GEO 内容入口、多语言下载转化站 |
| 网站能力边界 | SEO 网站只负责内容展示和引导下载，不提供 Web 在线生成 |
| Android | 使用 PicMuse，首期优先支持 Android |
| iOS | 当前商店名称为 PicSelf，后续接入官网 |
| 账号关系 | PicMuse 与 PicSelf 共享账号、作品、订阅和积分 |
| 已知能力 | 文生图、图生图、图生视频、文生视频、AI 写真、丰胸、魔法笔刷等 |
| 下载方式 | 使用官方应用商店下载链接；目前没有 Web App |
| 当前归因 | 下载链接暂未携带渠道参数 |
| 重点市场 | 美国、韩国、日本、台湾、香港 |
| 首期语言 | 英文、繁体中文、韩语、日语、德语、西班牙语 |
| 代码与部署 | 当前目录是 GitHub 仓库克隆，后续需要自动化 |
| Google 账号 | 计划使用 `mwj0791@gmail.com` 创建和管理 Google 相关工具 |
| 公开素材 | 当前没有独立素材库，先参考 Google Play 商店素材 |
| 法律页面 | 使用 PicSelf 的 Terms、Privacy Policy、User Agreement |
| 内容负责人 | 用户与 AI 协作负责内容生产和维护 |
| 内容展示边界 | AI 写真、丰胸、身体编辑等相关内容允许展示，但按 18+ 处理 |
| Android Firebase | 已确认接入 Firebase Analytics/GA4，属性名为 `Picmuse APP Android`，属性 ID 为 `499195889` |
| App 关键事件 | 已确认存在 `first_open`、`login_success`、`Creativing`、`Creative_successful`、`Creative_fail` 和购买/订阅事件链路 |
| App 数据状态 | Xiashushu 查询显示数据更新至 2026-09-14，近 30 天约 85.5 万次事件、71 个事件名 |

法律页面入口：

- [Terms and Conditions](https://www.picself.ai/terms-conditions.html)
- [Privacy Policy](https://www.picself.ai/privacy-policy.html)
- [User Agreement](https://www.picself.ai/user-agreement.html)

## 2. 一期架构决策

### 2.1 官网不做 Web 在线生成

一期采用：

```text
picmuse.app
  -> SEO/GEO 内容、产品介绍、真实示例、下载页
  -> Android 用户进入 Google Play 的 PicMuse 下载页
```

不在 GitHub Pages 中实现图片/视频生成、登录、积分、订阅或用户作品管理。

如果未来要做 Web 在线生成，需要新增受控的后端或 Serverless/API 层，至少处理：

- 模型 API 密钥和请求代理
- 用户身份、账号和共享积分
- 任务队列、超时、重试和并发限制
- 生成结果存储、访问权限和删除
- 滥用防护、内容安全和成本控制

静态网页可以调用一个已经存在的安全 API，但不能直接把模型密钥放在前端。当前没有 Web App，也没有必要为了 SEO 试点先建设这一整套系统。

### 2.2 首期以 Android 下载为唯一主转化

一期主 CTA 统一为：

```text
Download PicMuse for Android
```

页面仍然从内容模型上预留 `platform` 字段，以便第二阶段加入：

```text
Android -> PicMuse -> Google Play
iOS     -> PicSelf -> App Store
```

在 iOS 品牌实际改名之前，不能把 App Store 当前显示名称写成 PicMuse。

### 2.3 SEO/GEO 内容定位

官网不是泛 AI 工具目录，也不是内容农场。首期定位为：

> 面向图片和视频创作者的官方 AI 创作工具站，帮助用户了解 PicMuse 的能力、使用场景和移动端创作方式，并直接下载 App。

内容优先围绕真实能力和高意图场景：

- AI image generator / AI photo creation
- image to video / text to video
- AI portrait and AI photo editing
- social media image and video creation
- magic brush and natural-language editing
- Android app download and product help

具体功能上线前仍需按当前生产版本逐项确认，尤其是涉及身体编辑、写真和用户上传图片的页面。

## 3. 一期建议漏斗

由于网站不直接生成图片，一期漏斗调整为：

```text
Google impression
  -> organic click
  -> landing_view
  -> content_engagement
  -> download_cta_view
  -> store_click
  -> Google Play store_view
  -> install
  -> first_open
  -> signup_or_login
  -> first_generation
  -> subscription_or_return
```

网站自身可以可靠测量到 `store_click`。`install`、`first_open`、`first_generation` 和订阅需要 App 侧已有或新增的 Firebase/Google Ads/内部埋点配合，不能只靠静态官网推断。

## 4. 从零开始的工具基线

建议先建立以下账号和工具：

1. Google Search Console：验证 `picmuse.app`，提交 sitemap，监控查询、页面、国家、设备、展示、点击、CTR 和平均排名。
2. GA4：创建 Web Property 和 Web Data Stream，记录官网页面和下载点击事件。
3. Google Tag Manager：集中管理 GA4 和后续广告标签，减少每次改标签都修改站点代码。
4. Google Analytics for Firebase：Android App 已接入；后续重点是把官网 `store_click` 与 App 侧 `first_open`、生成和订阅事件打通归因。
5. Google Ads：把官网 `store_click` 与 App 侧 `install`、`first_open`、`first_generation` 区分为不同转化目标。
6. GitHub Actions：自动构建、检查、发布和定时生成 SEO 数据报告。

GA4 官方文档建议先创建账号、Property 和 Web Data Stream，再进行网站标记；事件可以在 Realtime 和 DebugView 中验证。Search Console 用于监控抓取、索引和搜索表现，且可以提交 sitemap。相关官方说明见方案文档末尾的参考链接。

## 5. 仍需补齐的信息

以下是目前真正会阻塞实施或影响结果判断的事项。

### P0：开工前必须确认

1. **Android Google Play 正式链接**
   - 已确认：<https://play.google.com/store/apps/details?id=com.smb.picmuse>
   - 上线前仍需检查重点市场是否都可正常访问。

2. **产品能力清单**
   - 按“当前生产版本支持 / 部分地区支持 / 已下线或不确定”标注文生图、图生图、图生视频、文生视频、AI 写真、丰胸、魔法笔刷等能力。
   - 确认哪些能力允许在官网公开展示。

3. **Google Play 素材使用权**
   - 确认商店截图、宣传视频、应用图标和示例图片可以直接复用。
   - 确认是否需要重新导出官网尺寸，避免直接抓取商店页面资源。

4. **法律页面的品牌适用性**
   - 确认 PicSelf 的法律页面可以作为 PicMuse 官网法律入口。
   - 确认官网是否需要补充独立的 Cookie/分析隐私说明。

5. **官网主品牌文案**
   - 确认是否使用“PicMuse”作为官网主品牌，并在 iOS 页面说明“当前 App Store 显示为 PicSelf”。

6. **18+ 页面处理**
   - 相关功能页必须标注 18+，避免未成年人导向的文案、案例和入口。
   - AI 写真、丰胸和身体编辑内容需建立素材筛选规则，不能直接把所有商店素材原样搬到官网。

### P1：第一版上线前确认

1. **下载归因方式**
   - 首期至少记录官网的 `store_click`。
   - App 已接入 Firebase，但现有 `referrer` 事件的参数为空，UTM/campaign 覆盖约为 0.4%；需要工程侧修复或确认 Play Install Referrer、UTM 和 Google Ads 关联链路。

2. **Google 账号权限**
   - 当前无法从本机确认 `mwj0791@gmail.com` 的权限：本机未安装 `gcloud`，浏览器访问 GA4 时未登录。
   - 登录后当前 GA4 页面显示的是 `Default Account for Firebase / com-smartrol-alarm`，不是 PicMuse，说明需要先切换到 PicMuse 对应的 Analytics 账号/资源；这不能直接证明该邮箱缺少 PicMuse 权限。
   - 需要在 Google 各产品的用户管理页确认该邮箱是否拥有 Google Play Console、Google Ads、Firebase、Search Console、GA4 和 Tag Manager 的管理员或协作者权限。

3. **市场和语言优先级**
   - 六种语言都支持，但需要确定首发顺序。
   - 建议首发英文、韩语、日语、繁体中文；德语和西班牙语第二批上线，避免六种语言同时产生低质量翻译。

4. **价格、积分和订阅**
   - 官网一期可以不展示具体价格和免费额度。
   - 如果要展示，需要提供按国家/平台区分的当前事实和更新时间。

5. **内容审查规则**
   - 已确认相关内容按 18+ 展示；仍需制定图片筛选、文案、年龄提示、地区限制和搜索摘要规则。

6. **网站品牌资源**
   - Logo、应用图标、品牌色、字体、官方截图和可公开示例。
   - 如果暂时没有独立素材，先从已获授权的商店素材中建立媒体清单。

## 6. 建议的下一步顺序

1. 确认 Android 商店链接、功能清单、素材授权和法律页面适用性。
2. 在 Google 产品后台核验 `mwj0791@gmail.com` 的权限，并创建/验证 Search Console、GA4、Tag Manager 和 Firebase 资源。
3. 确定六种语言的首发顺序和每种语言的审核方式。
4. 先建设静态站骨架、下载页、产品事实页和少量高意图内容，相关敏感页面统一 18+ 规则。
5. 在所有 Android 下载按钮统一记录 `store_click`，同时保留 `locale`、`content_id`、`page_type`、`cluster` 和 UTM 参数。
6. 让 App 工程核对 `referrer` 空参数、注册事件和 Google Ads 关联，再根据 Search Console 的真实展示和点击数据扩充内容。

## 8. Xiashushu 埋点核查摘要

核查日期：2026-09-15。来源：Xiashushu，PicMuse Android，内部产品 ID `770`，品牌 ID `35`。

### 已确认存在

- Firebase Analytics/GA4：属性 `499195889`，名称 `Picmuse APP Android`。
- `first_open`：稳定上报，可作为首次打开/安装近似指标。
- `login_success`：存在，但没有独立 `signup` 事件。
- `Creativing`：生成开始，参数包括模型名、时长和画质等。
- `Creative_successful`：生成成功。
- `Creative_fail`：生成失败，并带失败原因字段。
- 购买和订阅链路：包括 `open_sku`、`Subscription_show`、`to_subscribe`、`buy_now`、`purchase`、`in_app_purchase` 以及取消、失败、续订和退款事件。
- 产品内素材级字段：Home 灵感点击和 `template_preview` 可带素材/模板相关字段。

### 目前未找到或数据质量不足

- 独立 `signup` 事件：未找到，可能与 `login_success` 合并。
- `return_7d`：未找到独立事件，应使用 GA4 留存报表或基于 `first_open` 和活跃数据计算。
- `referrer` 参数：事件存在，但 Action/Label 参数为空。
- UTM/campaign：30 天带值用户约占 0.4%，目前不足以支持稳定的广告素材级归因。
- 广告创意素材 ID：未找到独立字段。

### 对官网一期的影响

官网可以先稳定测量 `landing_view`、`content_engagement`、`download_cta_view` 和 `store_click`。App 侧的 `first_open`、生成和订阅数据已经具备分析基础，但官网访问到 App 行为的跨端连接仍需通过 Google Ads、Play Install Referrer 或统一渠道参数补齐。

## 7. 参考资料

- [Google Analytics for websites](https://developers.google.com/analytics/devguides/collection/ga4/web)
- [Google Analytics events](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Search Console getting started](https://developers.google.com/search/docs/monitor-debug/search-console-start)
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Ads conversion management](https://developers.google.com/google-ads/api/docs/conversions/overview)
