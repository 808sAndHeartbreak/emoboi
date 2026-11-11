# EMOBOI.COM

> Personal multimedia archive. Drain-core aesthetics.

## Structure

```
├── index.html      # Homepage
├── sf6/            # SF6 Frame Data Tool
├── clocktower/     # 钟楼手记 · 血染钟楼记录与 DeepSeek 推理
├── gojuon/         # Japanese Gojūon Learning
├── english/        # English Lexicon
├── gallery/        # Visual Gallery
└── music/          # Music Player
```

## 钟楼手记

[打开钟楼手记](https://emoboi.com/clocktower/)。主页导航和全屏菜单均有“钟楼”入口。

```
clocktower/
├── index.html             # 自包含 HTML：界面、脚本、字体与背景
├── README.md              # 使用方式与数据说明
├── scripts/daybreak.json  # 重见天日图片整理版，可独立导入
├── NotoSansSC-OFL.txt      # 界面黑体许可
└── NotoSerifSC-OFL.txt     # 标题宋体许可
```

首页展示“血染钟楼推理工具”和大号“开始”按钮，设置位于开始下方。开局直接配置新对局，历史对局在同窗折叠。默认 12 人、支持 5–20 座位；进入后由底部页签切换“游戏信息”和“推理分析”。游戏页为圆形座位、阶段和速记，存活亮/死亡暗，5–20人按需拉长椭圆；推理页可选模型、提问和开启新对话，历史按对话归组。角色选择维持稳定窗口、单层列表滚动；设置可退出本局。

通用补充规则与常驻剧本库保存在本机。开局可临时导入 JSON、调整角色和本局裁定；临时修改不覆盖剧本库。历史对局和自定义剧本支持删除、恢复。支持完整备份与手机操作，AI Key 由使用者自行配置。预装常驻“重见天日”（北方的预言家，图片整理版），含25个玩家角色、2个奇遇及完整特殊规则，用户修改与删除状态保留。

重新分析使用最新完整资料开启独立对话；追问沿所选报告继续，仅增量补充变化。支持历史报告分支、独立追问草稿、原始证据引用与返回阅读位置。局内为墨黑与纸色阅读界面，手机纵向、桌面游戏信息双栏；首页动效遵循减少动态效果设置。

v0.14保留玩家原话声明、死亡说明、入夜处决确认、Key粘贴和断流内容保存；新增双页与环形座位，独立新分析和历史追问分别操作。输入去除空白占位与重复字段，修复撤销规则的上下文更新。报告按问题专项回答或简短分类，号码、角色与机制术语突出；系统强制挂起网页仍可能中断，重试由玩家发起。

## Run Locally

```bash
python -m http.server 8000
```

---

*Design by 天*  
*© 2026 emoboi.com*
