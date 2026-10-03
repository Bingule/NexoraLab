# NexoraLab

Bing Wu 创立的在线材料科学实验室与科研软件平台。首版包括首页、可搜索和筛选的软件目录、Online Lab、研究方向、创始人介绍和由 JSON 自动生成的软件详情页。

采用 Next.js、TypeScript 和普通 CSS，构建为静态网站；没有数据库、登录或计算后端。五个初始条目均明确标注为 Demo，Online Lab 工作区尚未集成科学计算。创始人照片来自用户提供的原始图片。

## 本地运行

需要 Node.js 22.18 或更新版本及 npm。

```sh
npm install
npm run dev
```

打开 http://127.0.0.1:3000 。

Windows 当前工作区依赖已安装，可直接双击 `start.cmd`，或在本目录终端运行 `.\start.cmd`。它优先使用系统 Node.js，也兼容 Codex 提供的 Node.js，无需全局 npm 即可启动现有安装。

```sh
npm test
npm run typecheck
npm run build
npm run check:links
npm run preview
```

构建产物位于 `out/`；预览地址为 http://127.0.0.1:4173 。预览脚本仅用于本地检查，不是生产后端。若 4173 已占用，可用环境变量 `PORT` 指定其他端口。

## 注册下一个工具

1. 从 `templates/nexoralab.json` 复制到 `content/tools/<id>.json`，填写真实名称、类别、版本和发布 URL。
2. 如有图标或截图，放入 `public/tools/<id>/`，在 JSON 中填写文件名。
3. 将真实软件的 `demo` 设为 `false`。没有真实 URL 的字段保留空字符串，网站会自动隐藏按钮。
4. 构建后自动生成目录卡片、`/tools/<id>/` 详情页和最新动态。

软件源代码留在各自独立的项目目录与仓库。完整格式与发布规则见 [docs/nexoralab-manifest.md](docs/nexoralab-manifest.md)。

## GitHub Pages

已包含 `.github/workflows/deploy.yml`：创建并推送本网站仓库后，在 GitHub **Settings → Pages → Source** 选择 **GitHub Actions**。推送到 `main` 触发测试、检查、构建和部署。未在此任务中创建 GitHub 仓库或远程发布。

默认使用仓库名作为 base path，例如 `/NexoraLab`；用户名站点（`username.github.io`）自动使用根路径。自定义域名时，在仓库的 **Settings → Secrets and variables → Actions → Variables** 中设置 `PAGES_CUSTOM_DOMAIN=true`，并在 Pages 设置域名、按 GitHub 指引配置 DNS，工作流会改用根路径。

其他静态托管直接发布 `out/`。本地测试子路径部署：PowerShell 中设置 `$env:NEXT_PUBLIC_BASE_PATH='/NexoraLab'`，再运行 `npm run build`、`npm run preview` 并访问 `/NexoraLab/`；测试后用 `Remove-Item Env:NEXT_PUBLIC_BASE_PATH` 恢复。

## 主要文件

- `app/`：页面与样式
- `components/`：共享组件
- `content/tools/`：软件注册表，每个软件一个 JSON
- `lib/manifest.ts`：元数据格式与校验
- `public/founder/`：创始人照片
- `public/tools/`：可选软件展示资源
- `templates/nexoralab.json`：独立软件项目使用的模板

网站为英文，说明文档为中文。Google Scholar、GitHub、ORCID、Email、CV 当前是无链接的“待添加”文本；提供真实 URL 后可在 `components/Founder.tsx` 替换。
