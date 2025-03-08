# 1️⃣ 빌드 스테이지 (Build Stage)
FROM node:20-alpine as builder

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 매니저 설정 (npm 대신 pnpm을 사용하고 싶으면 수정 가능)
COPY package.json package-lock.json ./
RUN npm install

# 소스 코드 복사
COPY . .

ARG ENV_FILE
COPY ${ENV_FILE} .env

# Vite 빌드 실행
RUN npm run build


# 2️⃣ 실행 스테이지 (Runtime Stage)
FROM nginx:alpine

# Nginx 설정 파일 복사
COPY --from=builder /app/dist /usr/share/nginx/html

COPY --from=builder /app/.env .env

# Nginx 포트 열기
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]



# # 1️⃣ Node.js 기반으로 Vite 개발 서버 실행
# FROM node:20-alpine

# # 작업 디렉토리 설정
# WORKDIR /app

# # 패키지 매니저 설정 (pnpm 사용 가능)
# COPY package.json package-lock.json ./
# RUN npm install

# # 소스 코드 복사
# COPY . .

# ARG ENV_FILE
# COPY ${ENV_FILE} .env

# # Vite 개발 서버 실행 포트 열기
# EXPOSE 5173

# # Vite 개발 서버 실행 (네트워크 외부에서 접근 가능하도록 --host 옵션 추가)
# CMD ["npm", "run", "dev", "--", "--host"]

