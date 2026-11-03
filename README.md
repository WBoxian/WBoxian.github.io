# Boxian Wen · 星露谷主题个人网站

采用星露谷 Wiki 式导航与游戏居民档案卡，展示 AI 应用兴趣、项目、教育、科研与论文。

- 中文（默认）：https://wboxian.github.io/
- 英文：https://wboxian.github.io/en/
- 旧版 `/zh/` 链接自动跳转至中文首页。
- 原生 HTML、CSS 与 JavaScript，通过 GitHub Pages 部署。
- 明暗主题跟随系统，手动选择后在浏览器本地保存。
- 中英文切换回到页顶；手机使用折叠菜单。
- Wiki 原背景和未经覆盖的游戏表盘装饰图；桌面布局按浏览器可用宽度铺满。
- 背景按页面滚动进度从上部平移至下部；减少动态效果的系统偏好开启时保持静止。

## 结构

- `index.html`：中文首页；`en/index.html`：英文页面；`zh/index.html`：旧链接跳转。
- `css/wiki.css`：Wiki 布局、档案卡、双主题与响应式适配。
- `js/custom.js`：菜单、主题与语言交互。
- `images/`：公开头像。
- `font/`：本地 Pixelify Sans、Fusion Pixel 字体及各自的 OFL 许可。
- `assets/stardew/`：从 Stardew Valley Wiki 获取的像素图标。
- `assets/data/qilin.json`：本次同步采用的指标及来源快照。

## 预览

```sh
python -m http.server 8000
```

使用 http://localhost:8000/ 或 http://localhost:8000/en/。

## 内容边界

公开姓名统一为 Boxian Wen；页面不展示真实中文姓名、手机号，不提交私人简历原文件。

项目数据同步于 2026-11-03，评测快照日期为 2026-11-02。全链路已知正例保留评估与完整日志曝光排序评估分别呈现；测试集已被观察、特征时间隔离仍未核验，结果用于离线诊断。

页面为静态快照，不在访问时请求 GitHub。后续更新时，核对项目 README 和 `src/backend/online/full_test_metrics.json`，同步修改中英文页面及 `assets/data/qilin.json`。

表盘为游戏原图装饰，不显示当前日期、时间或天气。页面没有天气 API 请求、定时刷新或自定义表盘设置。

模板与素材来源见 TEMPLATE-SOURCE.md；字体许可见 font/OFL.txt 和 font/Fusion-Pixel-OFL.txt。
