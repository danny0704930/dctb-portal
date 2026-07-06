# DCTB 内部工具入口（dashboard.dctb.my）

一个统一登入入口：登入后显示所有内部 dashboard 的选单，点击跳转到对应的子域名。

## Step 1 — 建 GitHub Repo

新建一个 repo，比如叫 `dctb-portal`，把这个文件夹里所有文件上传上去（保持结构不变）。

## Step 2 — 连 Vercel

跟你其他项目一样：Add New → Project → 选这个 repo → Deploy。

## Step 3 — 设置环境变量

**复用你已经建好的 Clerk application（DCTB Review Generator）**：
1. 去 Clerk 后台 → Configure → API Keys，复制 Publishable Key（`pk_test_...`）
2. Vercel 这个 project → Settings → Environment Variables，新增：
   - Name: `VITE_CLERK_PUBLISHABLE_KEY`
   - Value: 刚复制的 key

## Step 4 — 接子域名

Vercel 这个 project → Settings → Domains → 输入 `dashboard.dctb.my` → Add，
拿到 CNAME 值后，去 Exabytes DNS 管理加一条 CNAME 记录（跟 review.dctb.my 一模一样的流程）。

## Step 5 — 之后要新增 dashboard 时

打开 `src/App.jsx`，在 `TOOLS` 这个数组里加一个新项目：

```js
{
  id: "xxx",
  label: "新工具名字",
  desc: "简短描述",
  url: "https://xxx.dctb.my",
  icon: 某个 lucide-react 图标,
  ready: true,
}
```

存档、push 到 GitHub，Vercel 会自动重新部署。

## 现在的状态

- `review.dctb.my` — 已经上线，可以直接点
- `sales.dctb.my` / `ads.dctb.my` — 还没接子域名，先显示"即将上线"，等接好后把对应的 `ready` 改成 `true`
