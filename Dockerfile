# 1️⃣ 빌드 스테이지 (Build Stage)
FROM node:18-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 매니저 설정 (npm 대신 pnpm을 사용하고 싶으면 수정 가능)
COPY package.json package-lock.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# Vite 빌드 실행
RUN npm run build


# 2️⃣ 실행 스테이지 (Runtime Stage)
FROM nginx:alpine

# Nginx 설정 파일 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 포트 열기
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]