# DCTB 内部工具入口（dashboard.dctb.my）

架构（v2）：单一 Clerk 登入门槛，所有内部工具都是这个 App 内部的路由（react-router），
不管访问哪个路径都逃不出登入检查 —— 不再有"子域名 / 独立静态文件不受保护"的漏洞。

```
dashboard.dctb.my/          → 选单首页
dashboard.dctb.my/apogo     → APO GO 订阅看板（已迁移进来，受保护）
dashboard.dctb.my/sales     → 待迁移（目前 TOOLS 里 ready: false）
dashboard.dctb.my/ads       → 待迁移（目前 TOOLS 里 ready: false）
```

review.dctb.my 目前还是独立子域名、独立开放访问（不经过这个登入），
在 `src/pages/Menu.jsx` 的 `TOOLS` 数组里用 `external` 字段标记。

## 部署

跟原本一样：GitHub push → Vercel 自动部署。

**这次多了一个重要文件：`vercel.json`**（SPA fallback，让 `/apogo` 这种路径不会 404，
一律先交给 index.html，由 react-router 接手判断要显示哪个页面）。一定要连同其他文件
一起上传，否则刷新 `/apogo` 页面会出现 404。

环境变量、Clerk 设置都不用重新做，沿用原本的 `VITE_CLERK_PUBLISHABLE_KEY`。

## 之后要加新工具时（两种情况）

### 情况 A：像 APO GO 一样，是纯 HTML/CSS/JS 写的（没有用 React/Vite 打包）

1. 把整份 HTML 存成 `src/pages/xxx-content.html`
2. 建一个 `src/pages/Xxx.jsx`，照抄 `ApoGo.jsx` 的写法（import 那份 html，塞进
   `<iframe srcDoc={...}>`）
3. 在 `App.jsx` 里加一行 `<Route path="/xxx" element={<Xxx />} />`
4. 在 `Menu.jsx` 的 `TOOLS` 数组里加一个新项目（`ready: true`，`path: "/xxx"`，
   不要加 `external`）

### 情况 B：是用 React/Vite 写的独立项目（像 Sales、Ads 现在这样）

这个复杂一些，需要把该项目的代码合并进这个 repo 里（变成一个子路由），或维持独立
部署但改走"反向代理"。两种做法都有对应的坑（资源路径、构建冲突等），届时再个别讨论。

## 现在的状态

- APO GO — ✅ 已迁移，受保护
- Sales / Ads — 待迁移（React/Vite 项目，属于情况 B）
- Review Generator — 暂时维持独立子域名（review.dctb.my），不受这层登入保护
