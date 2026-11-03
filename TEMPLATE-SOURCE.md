# 模板与素材来源

## 布局

- 2026-11-03：采用原创 HTML/CSS 实现 Wiki 侧栏、章节内容与木框居民档案卡；保留原站个人资料、中英文页面、主题切换与旧链接跳转。
- Wiki 布局参考：https://stardewvalleywiki.com/Stardew_Valley_Wiki
- 档案卡视觉参考：https://www.lifeaftergrind.com/2023/08/stardew-valley-oc-profile-maker.html
- 档案卡使用 CSS 边框与排版，没有复制参考站模板图片、输入表单或脚本。
- 原主页曾基于 https://github.com/dapraws/dapraws.github.io 改编，本次替换其基础与覆盖样式，移除对旧背景图与远程字体的依赖。

## 开源字体

- 英文标题：Pixelify Sans，https://github.com/google/fonts/tree/main/ofl/pixelifysans ，本地 `font/PixelifySans.ttf`，SIL OFL 1.1，许可 `font/OFL.txt`。
- 中文标题：Fusion Pixel 12px proportional zh_hans，https://github.com/TakWolf/fusion-pixel-font/releases/tag/2026.10.25 ，本地 `font/fusion-pixel-12px-zh-hans.woff2`，SIL OFL 1.1，许可 `font/Fusion-Pixel-OFL.txt`。
- 正文使用系统字体以保证长文与指标的可读性。以上为开源近似像素字体，不声称为星露谷游戏原版字体。

## Wiki 图标

以下素材于 2026-11-03 从 Stardew Valley Wiki 下载至 `assets/stardew/`。游戏素材属于 Stardew Valley / ConcernedApe，保留游戏及 Wiki 来源署名，不将其声明为本站开源作品。

| 文件 | 来源 |
| --- | --- |
| junimo.png | https://stardewvalleywiki.com/mediawiki/images/en/b/b3/Junimo_Icon.png |
| book.png | https://stardewvalleywiki.com/mediawiki/images/en/d/df/Book_of_Mysteries.png |
| quest.png | https://stardewvalleywiki.com/mediawiki/images/en/c/c2/Quests_Icon.png |
| coral.png | https://stardewvalleywiki.com/mediawiki/images/en/b/b1/Coral.png |
| chicken.png | https://stardewvalleywiki.com/mediawiki/images/en/2/22/White_Chicken.png |
| note.png | https://stardewvalleywiki.com/mediawiki/images/en/0/09/Secret_Note_Icon.png |
| farm.png | https://stardewvalleywiki.com/mediawiki/images/en/0/05/Standard_Farm_Map_Icon.png |
| spring.png | https://stardewvalleywiki.com/mediawiki/images/en/b/b1/Dandelion.png |
| weather.png | https://stardewvalleywiki.com/mediawiki/images/en/f/f1/Weather_Icon.png |

## 项目数据

- 仓库：https://github.com/WBoxian/Rednote-Qilin-Search-Rec-System
- 数据规模与延迟：仓库 README.md。
- 精确指标：`src/backend/online/full_test_metrics.json`，blob SHA `c03f821b3a4233167cce06426b0e77288b118e76`，评测日期 2026-11-02。
- 本站保留的必要指标及协议字段见 `assets/data/qilin.json`，同步日期 2026-11-03。

## 2026-11-03 视觉修订与表盘装饰

- 背景为 Wiki 页面实际使用的原图：https://stardewvalleywiki.com/mediawiki/images/en/6/6a/Stardewbackground.png ，本地 `assets/stardew/background.png`。
- 表盘直接使用 Wiki Day Cycle 页的游戏原图：https://stardewvalleywiki.com/mediawiki/images/en/3/35/Clock.png ，本地 `assets/stardew/clock.png`，不覆盖或改写图中内容，仅作装饰。
- `panel-frame.svg` 为本站绘制的可伸缩像素菜单边框。没有修改游戏原图文件。
- Profile Maker 的双栏画像、卷轴标题、资料栏和物品格布局被用于个人档案区，针对实际履历重新组织内容并适配手机；没有使用其空白 JPG 背景，以便中英文长文本和小屏保持可读。
- 页面隐藏 MRR@100 展示列；数据快照保留源文件字段以便追溯。

## 日夜切换图标

- 使用 Pixelarticons 的开源像素图标：https://github.com/halfmage/pixelarticons ，MIT License，Copyright (c) 2019 Gerrit Halfmann。
- 来源：`svg/sun.svg`（blob `86f49a1ebc946d785af5ae99907fc75bafae7e6f`）和 `svg/moon.svg`（blob `68382ef5a613eb33e8542ee5876c4aa2493fb44e`）。
- 原图与许可保存在 `assets/icons/pixelarticons/`；页面内联 SVG，并随主题更新切换提示和无障碍标签。
