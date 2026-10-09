# AimatraLab 私有源码与 Vercel 迁移

## 当前阶段

已确认现有 Vercel 项目 `https://vercel.com/bingule/nexora-lab` 通过 Git 自动部署本仓库 `main`。用户指定 Supabase 项目为 `eenvstbjrjdveifelgpm`（`https://eenvstbjrjdveifelgpm.supabase.co`）。本轮准备原生 Next.js 构建并将 GitHub Actions 改为纯 CI，Vercel 负责生产部署。仓库尚未转私有，登录和数据库权限尚未接通。

目标：主站源码保存在私有仓库，生产部署和线上验收仅使用 Vercel。保留布局、工具、双语和 Windows 机器码激活，不增加支付。

仓库私有化不会收回此前公开的源码副本。浏览器收到的 JavaScript、HTML、样式和本地科学算法仍可查看，关闭 source map 不等于加密前端。需要保护的逻辑应按具体功能移到服务端，并检查实际权限；仅隐藏按钮不能保护接口。

## Vercel 配置

- 复用用户指定的 Vercel 项目，确认 owner/team、本仓库、生产分支 `main`、根目录及 Next.js preset。构建命令为 `npm run build`，Output Directory 保持默认。
- Vercel 的 `VERCEL=1` 启用原生 Next.js，不使用 `output: export`。`NEXT_PUBLIC_BASE_PATH` 必须为空，旧 `/NexoraLab/` 子路径仅属于 Pages。
- 正式域名填写 `NEXT_PUBLIC_SITE_URL`。否则自动使用 `VERCEL_PROJECT_PRODUCTION_URL`，必要时回退 `VERCEL_URL`；不将旧 Pages 地址或示例地址填入 Vercel。
- `.vercelignore` 排除环境文件、Git 元数据、QA 临时资料及已知授权签发文件；`.vercel/` 不提交。生产前端 source map 明确关闭，仍需审阅实际上传范围。
- 将提交 SHA、Vercel deployment、生产 alias 与线上验收对应起来。检查所有页面、图片、双语及直接链接，以及 canonical、Open Graph、sitemap 的域名和根路径。

## 下载与私有化切换顺序

当前仓库 Releases 提供 CrystalDesk Windows 客户端与单位换算器。仓库变私有后，匿名用户无法继续通过原链接下载。

1. 用户已要求指定下载登录可用。附件不能继续通过原公开 URL 绕过验证；应使用私有附件加服务端身份校验后签发的短时下载地址，或私有对象存储。281 MiB Windows ZIP 不经 Vercel 函数转发，也不放入网页仓库。
2. 复制准确的原附件，核对 SHA-256，更新注册表 `download` / `release`，验证登录下载及未登录拒绝。保留机器码激活，不重打包或替换客户端，不上传签发器或客户授权。
3. 核验 Vercel 生产正常后，将 Pages 工作流改为纯 CI，保留测试、类型和发布材料检查，停止旧 Pages 站点。
4. 主站仓库转私有，检查匿名源码访问被拒绝、Vercel 仍能访问和部署、受保护下载仍正常。独立工具仓库是否私有化分别确定，不自动修改其他仓库。

## Supabase 接入前需要确定

- 用户指定的 Supabase 项目，以及 Production / Preview 环境。
- 用户已选择登录后访问指定工具或下载；具体工具名单仍待确认。不预建计算结果或其他无关数据表。
- 真实生产域名及应用实际 Auth callback，匹配 Site URL / Redirect URLs。

接入时按当前 SSR 文档在服务端验证用户身份。浏览器只使用项目 URL 和 publishable / anon key；secret / service_role 只留安全服务端环境，并额外检查操作权限，不用特权密钥让普通用户绕过 RLS。密钥不粘贴到聊天或源码。

分别验收注册/登录、会话刷新、退出、未登录拒绝、A/B 用户数据隔离及实际读写权限。建表成功或 Vercel Ready 不代表这些功能已通过。现阶段未执行数据库迁移，未验证登录或 RLS。
