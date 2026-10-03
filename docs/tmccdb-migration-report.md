# TMCCDB 工具迁移说明

本次将五个既有工具接入 AimatraLab 的 `/lab/<id>/` 原生工作区和工具目录。注册表的 `1.0.0` 指 AimatraLab 迁移界面的首次发布，不代表科学模型的新版本，也不代表新增独立安装包。上游 TMCCDB 的 `package.json` 版本为 `2.1.0`，来源固定为 [Bingule/tmcc-database](https://github.com/Bingule/tmcc-database/tree/27e9767486d5dc8b81453a409d6023b458de40d7)，提交 `27e9767486d5dc8b81453a409d6023b458de40d7`；来源及科学文件 SHA-256 记录在 `vendor/tmccdb/UPSTREAM.json`。

| 工具                 | 原文件与复用内容                                                                                                            | 执行方式与限制                                                                                                                                                                                                                                                      |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Crystal Description  | `src/tools/crystal-description/CrystalDescriptionPage.tsx`；保留已有服务链接与嵌入入口                                      | CIF 由 [crystal-description](https://github.com/Bingule/crystal-description) 的现有 [Streamlit Python 服务](https://crystal-description.streamlit.app/)处理；AimatraLab 不提供 Python 后端。上游页面注明 4 MB、200 sites 上限，社区实例可能休眠；不要上传保密结构。 |
| Theoretical Capacity | `src/pages/TheoreticalCapacityPage.tsx`、`src/lib/capacity.ts`、`chemistry.ts`、`atomicWeights.ts`                          | 浏览器本地计算 `Q = nF / (3.6M)`，沿用计算常数 `96485.33212 C/mol`。用户必须提供正的电子转移数，不推断价态或电子数。                                                                                                                                                |
| Molecular Weight     | `src/pages/MolecularWeightPage.tsx` 及共享化学式解析、原子量数据                                                            | 浏览器本地计算摩尔质量和元素贡献，保留整数/小数计量数及嵌套圆括号。水合物点号不受支持，ASCII 句点用于小数。                                                                                                                                                         |
| Reviewer Two         | `src/tools/reviewer-two/pages/ReviewerTwoPage.tsx`；保留独立项目和安装说明                                                  | 页面是技能启动入口；审阅需在获授权的私有宿主中执行，并明确授权稿件访问。保留上游指向的 [reviewer-two 固定提交](https://github.com/Bingule/reviewer-two/tree/9ff847d0b23a23c87b24e5340907df4c45f32ffc)，不新增浏览器稿件上传或在线审阅后端。                         |
| Rate Performance     | `src/tools/rate-performance/` 的页面、组件、`analysis/`、`models/`、`utils/`、`data/`、`references/`，以及共享解析/导出模块 | 浏览器本地执行原有倍率拟合、模型比较、厚度动力学、特征时间、传输、计时电流与能量/功率工作流；保留模型适用条件、校验和失败状态，不增加新的科学结论。                                                                                                                 |

迁移以复用上游科学实现为原则；Next.js 路由、语言入口、导航、外部服务提示及样式适配属于集成改动。`UPSTREAM.json` 分别列出科学文件校验值与集成改动文件。为兼容 Next.js 的类型解析，仅移除一条不再需要的 `@ts-expect-error` 注释，运行逻辑未变。注册表使用三项工具的真实运行截图；`download` 为空，版本历史只描述本次工作区接入。

署名保留 Bing Wu / TMCCDB 和原项目链接。固定上游快照未包含独立 LICENSE 文件；本次没有为上游代码补造许可证，也没有声称获得新的授权。独立 Crystal Description 与 Reviewer Two 项目的后端及技能规则仍由各自仓库维护。

验证（2026-10-03）：112 项上游科学与导出测试、14 项站点测试及 38 个科学文件来源哈希校验通过；类型检查、带 `/NexoraLab` 的静态构建与链接检查通过。五个入口及倍率分析的全部八个页面已在浏览器检查，覆盖桌面和 390px 手机；计算器另检查 320px 手机与 768px 平板。长标题换行和表格、公式、图表内部滚动保持页面可读。

新旧站点 LiFePO₄ 摩尔质量均为 157.755 g/mol，单电子转移理论容量均为 169.893 mAh/g。倍率原示例均收敛于 128 次迭代：Qₘ=317.733 mAh/g，τ=0.0713127 h，n=0.59227，R²=0.998771，RMSE=1.76665 mAh/g；置信区间与统计量一致，两站拟合数据 CSV 的 SHA-256 完全相同。新站合成 CSV 文件导入及列映射、模型比较、计时电流示例重建均成功；参数/残差 CSV、SVG 和 PNG 实际下载并检查。

原晶体服务从休眠唤醒后，内置 SnO₂ 示例成功返回 P4₂/mnm、6 个位点及 Robocrys 英文结构描述。Reviewer Two 核验固定源码链接、中英文安装与授权入口；未运行真实稿件审阅。晶体服务需继续保留现有 Streamlit 部署，休眠时点击唤醒；Reviewer Two 需按已有说明在私有宿主安装。其余三项工具无需后端或 API 密钥。原 TMCCDB 部署及独立项目文件未修改。

发布路径：`/NexoraLab/lab/crystal-description/`、`/NexoraLab/lab/theoretical-capacity/`、`/NexoraLab/lab/molecular-weight/`、`/NexoraLab/lab/reviewer-two/`、`/NexoraLab/lab/rate-performance/`。各入口对应 `/NexoraLab/tools/<id>/` 详情页。推送 `main` 后由既有 GitHub Pages 工作流发布，直接链接需在部署完成后复核。

Reviewer Two 后续展示调整：注册类型改为 `skill`，保留上述 URL 作为双语安装与使用指南，卡片入口改为“使用指南”，不再计入在线工具。独立 Skill 原仓库和固定源码提交不变；站点继续展示登记版本、版本历史与后续更新，并支持 `release` 发布说明链接。
