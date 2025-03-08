#!/bin/bash
DOCKER_HUB_REPO="luckyprice1103/tiling-frontend"

# 환경 변수에서 NEW_TAG 값 가져오기
if [ -f /home/ubuntu/.deploy_env ]; then
    source /home/ubuntu/.deploy_env
else
    echo "❌ ERROR: /home/ubuntu/.deploy_env 파일을 찾을 수 없습니다!"
    exit 1
fi

echo "🔹 최신 Docker 이미지 Pull 중... (버전: ${NEW_TAG})"
docker pull ${DOCKER_HUB_REPO}:${NEW_TAG}

echo "🔹 기존 컨테이너 중지 중..."
docker stop backend || true
docker rm backend || true

echo "🔹 새로운 컨테이너 실행 중..."
docker run -d -p 5173:80 --name backend ${DOCKER_HUB_REPO}:${NEW_TAG}

echo "✅ 배포 완료!"
