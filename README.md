# 五子棋游戏 (Gobang Game)

基于Next.js构建的五子棋游戏，支持双人对战模式。包含完整的游戏逻辑和响应式UI设计。

## 功能特性

- 🎮 双人对战模式
- 📊 实时显示游戏状态（当前玩家、获胜信息）
- 🔄 游戏记录与撤销功能
- 🎨 响应式界面设计
- ⏱️ 游戏计时功能

## 安装与运行

### 前置要求

- Node.js v18+
- pnpm

### 启动步骤

```bash
# 克隆仓库
git clone https://github.com/liu7015463/gobang-game.git
cd gobang-game

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 开始游戏

## 技术栈

- [Next.js](https://nextjs.org) - React框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的JavaScript
- [Tailwind CSS](https://tailwindcss.com) - 实用优先的CSS框架
- [ESLint](https://eslint.org) - 代码质量检查
- [Prettier](https://prettier.io) - 代码格式化

## 部署方式

### Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fliu7015463%2Fgobang-game)

### Docker 部署

```bash
docker build -t gobang-game .
docker run -p 3000:3000 gobang-game
```

详细Docker部署说明请参考 [DOCKER_DEPLOY.md](DOCKER_DEPLOY.md)

## 项目结构

```
gobang-game/
├── .dockerignore
├── .gitignore
├── .prettierrc.js
├── DOCKER_DEPLOY.md
├── docker-compose.yml
├── Dockerfile
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── gobang.html
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   └── app/
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       ├── page.tsx
│       └── gobang/
│           ├── context.ts
│           ├── game.board.tsx
│           ├── game.footer.tsx
│           ├── game.head.tsx
│           ├── game.info.tsx
│           ├── game.operate.tsx
│           ├── game.rule.tsx
│           ├── game.status.tsx
│           ├── game.tsx
│           ├── gobang.css
│           └── page.tsx
```

## 贡献指南

欢迎提交PR改进项目！请确保：

1. 代码符合ESLint规则
2. 包含必要的单元测试
3. 更新相关文档

## 许可证

本项目采用 MIT 许可证
