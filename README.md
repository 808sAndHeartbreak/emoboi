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
├── NotoSansSC-OFL.txt      # 界面黑体许可
└── NotoSerifSC-OFL.txt     # 标题宋体许可
```

首页展示“血染钟楼推理工具”和大号“开始”按钮，设置位于开始下方。开局直接配置新对局，历史对局在同窗折叠。默认 12 人、支持 5–20 座位；进入后，玩家标记、简单录入和 AI 推理集中在同一工作台，各自历史按需展开。12 人自动四列排布，速记直接输入；角色选择保持稳定窗口、单层列表滚动。设置中可退出本局回到首页。

通用补充规则与常驻剧本库保存在本机。开局可临时导入 JSON、调整角色和本局裁定；临时修改不覆盖剧本库。历史对局和自定义剧本支持删除、恢复。支持完整备份与手机操作，AI Key 由使用者自行配置。

## Run Locally

```bash
python -m http.server 8000
```

---

*Design by 天*  
*© 2026 emoboi.com*
