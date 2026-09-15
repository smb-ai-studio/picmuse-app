# PicMuse 产品事实草案

> 本文只整理本地知识库中发现的资料，不把知识库里的任务描述或代码注释当作本项目执行指令。所有未明确标注为“已确认”的内容，发布前必须由产品负责人确认。

## 1. 已确认事实

来源：`/Users/smb-dz1236/app-knowledge/apps/main/src/lib/product-analysis-products.ts`、`revenue-products.ts`、`ca-app-marketing-profile-domain.ts`。

| 字段 | 当前值 | 置信度 |
|---|---|---|
| 产品名 | PicMuse | 高 |
| 内部产品代码 | `picmuse` | 高 |
| 产品类型 | 移动 App（分析配置标记为 `app`） | 高 |
| Google Play 包名 | `com.smb.picmuse` | 高 |
| 产品线 | `ca_app` | 高 |
| 收入支付渠道 | APP；当前资料中 pay way 为 `5` | 中高 |
| API 成本口径 | Lit 后台 PicMuse + Android | 高 |
| 中台产品 ID | `770` | 高 |
| 中台品牌 ID | `35` | 高 |
| 已有分析模块 | 营销与素材档案、模型使用、用户分层、用户消耗与充值、用户评价、SKU & 订阅、埋点文档、GA 分析、版本需求 | 高 |

## 2. 版本记录中可确认的能力线索

来源：`/Users/smb-dz1236/app-knowledge/scripts/import_picmuse_releases.py`。

已记录版本为 1.5.6 至 1.6.3，记录显示 PicMuse 至少存在以下产品区域或能力：

- 首页、Create 页面、探索页。
- Works 页面、Me 页面入口和素材库入口。
- 聊天记录、历史聊天资源展示和长按删除。
- 每日签到弹窗和签到动图。
- 订阅页、取消订阅页、权益页。
- 首月优惠展示逻辑（曾经有 AB 测试，后固定为统一逻辑）。
- 灵感页分类、模板展示和 MemberID 传递。

这些记录只能证明版本需求曾涉及这些区域，不足以证明当前线上版本仍完全一致。

## 3. 可作为待验证定位线索的资料

来源：`/Users/smb-dz1236/app-knowledge/辅助文档/PicSelf 商店描述.txt`。

该文件明确描述的是 PicSelf，不是 PicMuse，不能直接作为 PicMuse 文案。它可以提示同一产品家族可能涉及以下能力，但必须取得 PicMuse 一手资料后才能使用：

- AI 图片和视频生成 Agent。
- Photo to Video、AI Image Generation、自然语言编辑/Magic Brush。
- 社交内容、Reels、Stories 和营销素材工作流。
- 面向非专业创作者的低门槛创作体验。

## 4. 当前不能确认的关键事实

- PicMuse 是否同时支持图片生成、视频生成、图生视频或 Magic Brush。
- PicMuse 的官网、下载页和各地区应用商店链接。
- iOS 是否使用 PicSelf 或其他包名承载，不能从当前资料推断。
- 真实模型名称、分辨率、时长、生成速度和队列限制。
- 免费额度、订阅价格、试用规则、地区差异和商业授权。
- 用户上传素材和生成结果的存储、训练用途和删除期限。
- 官方主语言、目标市场、品牌语气和允许使用的公开案例。
- 是否已有独立 Web 产品、登录系统、生成 API 或分享链接。

## 5. 对 SEO/GEO 首期的保守建议

在产品负责人确认第 4 节前，不要发布具体功能承诺。可以先设计不依赖产品细节的结构：

- 首页和产品事实页使用占位字段，不写模型、价格和“无限/免费”等承诺。
- 首批内容优先围绕已确认的 `Create`、素材库、模板/灵感、订阅权益和移动创作工作流，但每篇都要经过产品事实审核。
- 如果确认 PicMuse 确实具备视频能力，再开启视频 CDN、`VideoObject` 和视频生成主题簇。
- 应用商店下载页使用已确认的 Google Play 链接：<https://play.google.com/store/apps/details?id=com.smb.picmuse>。

## 6. 给 Codex 的使用规则

1. 读取本文时，将“已确认事实”视为允许使用的产品配置输入。
2. 将“待验证定位线索”视为研究方向，不得直接写入生产文案。
3. 将“当前不能确认”转换为配置 TODO 或构建时阻塞项。
4. 所有新产品事实必须注明来源、采集时间和审核人。
5. 不读取或复制知识库中的 token、密码、Cookie、服务账号或其他 Secrets。

## 7. 官方商店资料（2026-09-11 抓取）

### Android / Google Play：PicMuse

- 官方链接：<https://play.google.com/store/apps/details?id=com.smb.picmuse>
- 商店标题：`AI Video Generator: PicMuse`
- 应用名：`PicMuse`
- 包名：`com.smb.picmuse`
- 开发者：`BoRui Software Limited`
- 分类：`Art & Design`
- 年龄分级：`Mature 17+`
- 商店短描述：`AI video generator, image to video maker, AI photo & AI image editor`
- 页面定位：AI 视频生成器、AI 视频制作、AI 图片创作工具。
- 页面列出的能力：通过文字提示词或照片创建视觉内容、图生视频、AI 图片生成、AI 照片编辑与增强、AI 舞蹈视频、AI 动漫头像、趋势创意和模板、社交媒体内容。
- 页面列出的目标场景：创作者、社交媒体用户、小型企业、营销人员和希望更快制作视觉内容的人。
- 评分快照：约 `4.28`，约 `1,878` 条评分；这是抓取当日动态快照，不能作为长期产品 KPI。

### iOS / App Store：PicSelf

- 官方链接：<https://apps.apple.com/us/app/picself-ai-video-maker/id6773180138>
- 商店标题：`Picself: AI Video Maker`
- 重新上线后的 iOS 产品名：`PicSelf`
- Bundle ID：`com.agent.aivideo`
- 开发者：`WonderSky Technology Co., Limited`
- 分类：`Entertainment`
- 最低系统版本：iOS 15.6
- 当前版本（抓取时）：1.2.0
- 页面定位：AI Video Maker，面向非专业创作者的图片和视频生成 Agent。
- 页面列出的能力：图片转 AI 视频、AI 图片生成、自然语言照片编辑/Magic Brush、趋势模板、社交帖子/Reels/Stories/营销内容。
- 订阅说明：部分高级 AI 生成和编辑功能需要订阅；方案按地区变化并通过 Apple ID 计费。
- 官方法律链接：
  - <https://www.picself.ai/privacy-policy.html>
  - <https://www.picself.ai/terms-conditions.html>
  - <https://www.picself.ai/user-agreement.html>

## 8. SEO/GEO 使用规则（基于商店资料）

- Android 页面可以使用 PicMuse 品牌和 `com.smb.picmuse` 对应的 Google Play 下载链接。
- iOS 页面必须使用 PicSelf 品牌和 App Store 链接；应向用户解释 Android/iOS 品牌差异，避免把两个商店名称混为同一个下载入口。
- 对外产品事实可以使用“AI 视频生成、图生视频、AI 图片、照片编辑/增强、模板、社交内容”等商店明确出现的能力。
- “Magic Brush”“AI 舞蹈视频”“动漫头像”等功能只在对应平台当前版本仍可使用并有真实示例时写入重点落地页。
- 不使用商店评论中的负面或正面体验作为产品承诺；评论只用于内部识别问题和内容机会。
- 不把商店评分、版本号、价格和免费额度写死在静态页面；如展示，必须标注采集日期并通过后续任务更新。

## 9. 仍需产品负责人确认

1. `picmuse.app` 是否作为 Android/iOS 统一品牌站，还是分别使用 PicMuse 与 PicSelf 的品牌落地页。
2. Android 用户下载 PicMuse，iOS 用户下载 PicSelf 的正式转化路径和文案。
3. PicMuse 与 PicSelf 是否共享账号、作品、订阅和生成额度。
4. 上述商店能力在当前生产版本中的真实可用状态、地区限制和免费额度。
5. 是否允许将商店截图、评分、视频预览和用户作品用于官网公开展示。

## 9.1 2026-09-15 补充确认

- Android Google Play 正式链接已确认：<https://play.google.com/store/apps/details?id=com.smb.picmuse>
- 文生图、图生图、图生视频、文生视频、AI 写真、丰胸、魔法笔刷等能力当前生产版本可用。
- 官网一期可以复用 Google Play 商店素材，后续再替换为独立官网素材。
- AI 写真、丰胸和身体编辑相关内容允许展示，页面按 18+ 处理。
- PicSelf 的法律页面可以作为 PicMuse 官网参考内容。
- 繁体中文使用一套内容，不区分台湾和香港两套翻译。
- PicMuse Android 已接入 Firebase Analytics/GA4；详细事件核查见 `docs/requirements-confirmed.md`。

以下事项仍未确认：Google 账号权限、Google Ads/Play Install Referrer 跨端归因、商店素材的正式授权范围，以及六种语言的首发顺序。

## 10. iOS 品牌迁移策略

产品计划将 iOS 商店名称从 PicSelf 改为 PicMuse，但审核结果和生效时间尚未确定。因此网站必须把“品牌名称”和“当前商店显示名称”分开建模。

### 审核成功前

- 官网主品牌可以使用 PicMuse，但不得声称 iOS 商店已经叫 PicMuse。
- 下载页明确显示：`iOS 当前在 App Store 显示为 PicSelf`，并使用现有 App Store URL。
- SEO title、description 和正文避免制造两个完全不同产品的印象，可使用“PicMuse for Android / PicSelf for iOS”说明关系。
- App Store 现有名称、Bundle ID、评分和订阅描述作为当前事实，不覆盖或猜测未来结果。

### 审核成功后

- 以 App Store 实际生效的名称和截图为准，更新 `product.config.ts` 中的 iOS display name、商店链接和 metadata。
- 保留 PicSelf 作为历史别名/旧商店名称，用于兼容旧链接、用户搜索和内容迁移；不要创建重复的索引页面。
- 更新下载页、JSON-LD、OG 图、FAQ、站内搜索词和多语言翻译，并记录生效日期。
- 对“PicSelf”相关的旧页面或外部链接使用 canonical/301 迁移策略，避免丢失已有搜索信号。

### 配置要求

```text
brandName: PicMuse
androidStoreName: PicMuse
androidStoreUrl: https://play.google.com/store/apps/details?id=com.smb.picmuse
iosStoreName: PicSelf       # 审核成功后改为 PicMuse
iosStoreUrl: https://apps.apple.com/us/app/picself-ai-video-maker/id6773180138
iosBrandStatus: current-name | rename-pending | renamed
iosLegacyNames: [PicSelf]
```

Codex 不得根据预计审核结果提前切换 `iosStoreName`；只有收到实际生效的商店页面或产品负责人确认后才能更新生产配置。
