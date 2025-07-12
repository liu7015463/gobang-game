# 使用官方 Node.js 22 Alpine 镜像作为基础镜像
FROM node:22-alpine AS base

# 安装依赖阶段
FROM base AS deps
# 检查 https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
# 了解为什么可能需要 libc6-compat
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 复制包管理文件
COPY package.json pnpm-lock.yaml* ./
# 安装 pnpm
RUN npm install -g pnpm
# 安装依赖
RUN pnpm install --frozen-lockfile

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 安装 pnpm
RUN npm install -g pnpm

# 禁用 ESLint 检查并构建应用
ENV ESLINT_NO_DEV_ERRORS=true
ENV DISABLE_ESLINT_PLUGIN=true
ENV NEXT_LINT=false
RUN pnpm build --no-lint

# 生产运行阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# 禁用 Next.js 遥测
ENV NEXT_TELEMETRY_DISABLED=1

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制构建产物
COPY --from=builder /app/public ./public

# 设置正确的权限并复制构建文件
RUN mkdir .next
RUN chown nextjs:nodejs .next

# 自动利用输出跟踪来减少镜像大小
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3100

ENV PORT=3100
ENV HOSTNAME=0.0.0.0

# 启动应用
CMD ["node", "server.js"]
