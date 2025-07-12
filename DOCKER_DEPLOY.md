# Docker 部署指南

## 快速开始

### 方法一：使用 Docker Compose（推荐）

```bash
# 构建并启动容器
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止容器
docker-compose down
```

### 方法二：使用 Docker 命令

```bash
# 构建镜像
docker build -t gobang-game .

# 运行容器
docker run -d \
  --name gobang-game-container \
  -p 3000:3000 \
  gobang-game

# 查看日志
docker logs -f gobang-game-container

# 停止容器
docker stop gobang-game-container

# 删除容器
docker rm gobang-game-container
```

## 访问应用

容器启动后，访问以下地址：

- 主页：<http://localhost:3100>
- 五子棋游戏：<http://localhost:3100/gobang>

## 生产环境部署

### 1. 构建生产镜像

```bash
# 构建镜像并打标签
docker build -t gobang-game:latest .
docker tag gobang-game:latest your-registry/gobang-game:latest

# 推送到镜像仓库
docker push your-registry/gobang-game:latest
```

### 2. 在服务器上部署

```bash
# 拉取镜像
docker pull your-registry/gobang-game:latest

# 运行容器
docker run -d \
  --name gobang-game \
  -p 80:3000 \
  --restart unless-stopped \
  your-registry/gobang-game:latest
```

### 3. 使用 Nginx 反向代理（可选）

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 环境变量

可以通过环境变量配置应用：

```bash
# 设置端口（默认 3100）
-e PORT=3100

# 设置主机名（默认 0.0.0.0）
-e HOSTNAME=0.0.0.0

# 禁用遥测（默认已禁用）
-e NEXT_TELEMETRY_DISABLED=1

# 构建时禁用 ESLint 检查（已在 Dockerfile 中配置）
-e ESLINT_NO_DEV_ERRORS=true
-e DISABLE_ESLINT_PLUGIN=true
```

## 故障排除

### 查看容器状态

```bash
docker ps -a
```

### 查看容器日志

```bash
docker logs gobang-game-container
```

### 进入容器调试

```bash
docker exec -it gobang-game-container sh
```

### 重新构建镜像

```bash
# 清理缓存重新构建
docker build --no-cache -t gobang-game .
```

## 镜像优化

当前 Dockerfile 已经进行了以下优化：

1. **多阶段构建**：减少最终镜像大小
2. **Node.js 22 Alpine**：使用最新 LTS 版本的轻量级基础镜像
3. **Standalone 输出**：Next.js 优化的生产构建
4. **非 root 用户**：提高安全性
5. **依赖缓存**：利用 Docker 层缓存加速构建

## 性能监控

### 查看资源使用情况

```bash
docker stats gobang-game-container
```

### 健康检查

```bash
# 检查应用是否正常运行
curl http://localhost:3000
```
