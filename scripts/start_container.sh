#!/bin/bash
DOCKER_HUB_REPO="luckyprice1103/tiling-frontend"

# NEW_TAG 값 불러오기
if [ -f /home/ubuntu/frontend/.deploy_env ]; then
    source /home/ubuntu/frontend/.deploy_env
else
    echo "❌ ERROR: /home/ubuntu/frontend/.deploy_env 파일을 찾을 수 없습니다!"
    exit 1
fi

# NEW_TAG 값이 비어 있으면 기본값 설정
if [ -z "$NEW_TAG" ]; then
    echo "❌ ERROR: NEW_TAG 값이 비어 있습니다! 기본값을 설정합니다."
    NEW_TAG="latest"
fi

echo "🔹 최신 Docker 이미지 Pull 중... (버전: ${NEW_TAG})"
docker pull ${DOCKER_HUB_REPO}:${NEW_TAG}

echo "🔹 기존 프론트엔드 컨테이너 중지 중..."
docker stop frontend || true
docker rm frontend || true

echo "🔹 새로운 프론트엔드 컨테이너 실행 중..."
docker run -d -p 5173:80 --name frontend ${DOCKER_HUB_REPO}:${NEW_TAG}

echo "✅ 프론트엔드 배포 완료!"
