# Boxian Wen · 星露谷主题个人网站

基于 [dapraws 的星露谷个人主页模板](https://github.com/dapraws/dapraws.github.io) 改编，展示 AI 应用兴趣、项目、教育、科研与论文。

- 英文：https://wboxian.github.io/
- 中文：https://wboxian.github.io/zh/
- 原生 HTML、CSS 与 JavaScript，通过 GitHub Pages 部署。
- 明暗主题跟随系统，手动选择后在浏览器本地保存。
- 中英文内容切换保留当前内容锚点；手机使用折叠菜单。

## 结构

- `index.html`、`zh/index.html`：中英文页面。
- `css/style.css`：上游模板样式；`css/custom.css`：简历内容、双主题与响应式适配。
- `js/custom.js`：菜单、主题与语言交互。
- `images/`：公开头像。
- `font/`：Pixelify Sans 的 OFL 许可。背景与字体从固定上游提交版本加载。

## 预览

```sh
python -m http.server 8000
```

使用 http://localhost:8000/ 或 http://localhost:8000/zh/。

## 内容边界

公开姓名统一为 Boxian Wen；页面不展示真实中文姓名、手机号，不提交私人简历原文件。

模板与素材来源见 TEMPLATE-SOURCE.md，字体许可见 font/OFL.txt。
