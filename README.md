# Boxian Wen · 个人主页

以可视化简历为核心的中英双语个人网站，展示 AI 应用兴趣、项目实践、教育背景、科研经历与论文成果。

- [英文主页](https://wboxian.github.io/)
- [中文主页](https://wboxian.github.io/zh/)

## 设计与实现

参考 [vCard](https://github.com/codewithsadee/vcard-personal-portfolio) 的侧边名片与内容卡片布局，独立实现暖白 / 森林绿双主题、轻量像素细节和响应式页面。

网站使用原生 HTML、CSS、JavaScript，无构建步骤，无第三方运行时依赖。直接由 GitHub Pages 托管。

| 文件 | 职责 |
| --- | --- |
| `index.html` | 英文内容与首屏主题初始化 |
| `zh/index.html` | 中文内容与首屏主题初始化 |
| `styles.css` | 双主题变量、卡片布局、响应式与打印样式 |
| `script.js` | 主题切换、偏好保存、内容标签与键盘导航 |
| `assets/profile/` | 头像与站点图标 |

## 本地预览

在仓库根目录运行：

```sh
python -m http.server 8000
```

打开 `http://localhost:8000/` 或 `http://localhost:8000/zh/`。页面使用站点根路径引用资源，请通过 HTTP 服务预览。

## 内容维护

中英文内容分别维护在两份 HTML 中，修改项目指标、时间与成果时同步更新。当前内容以用户提供的简历为依据；数据规模表示项目数据集规模。

概览、项目、经历与论文可通过 `#about`、`#projects`、`#resume`、`#papers` 直接访问，切换语言保留当前标签。关闭 JavaScript 时按顺序展示全部内容。

主题首次跟随系统；手动切换后保存在 `localStorage` 的 `theme` 字段中，刷新、切换语言和同源标签页保持一致。清除该字段即可恢复跟随系统。

## 发布前检查

- `node --check script.js`
- `git diff --check`
- 核对中英文内容、项目评测指标和论文作者身份。
- 验证四个内容标签、直接链接、浏览器前进 / 后退和键盘方向键。
- 验证明暗切换、刷新后保持选择、首次访问跟随系统。
- 验证桌面与手机布局，无横向溢出。

GitHub 个人主页 README 在 [WBoxian/WBoxian](https://github.com/WBoxian/WBoxian) 单独维护。
