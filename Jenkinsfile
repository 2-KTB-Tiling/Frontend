pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = "luckyprice1103/tiling-frontend"
        DEPLOY_SERVER = "ec2-3-36-132-43.ap-northeast-2.compute.amazonaws.com"

    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: 'github_token', url: 'https://github.com/2-KTB-Tiling/Frontend.git'
            }
        }

        
        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', 
                    usernameVariable: 'DOCKER_HUB_USERNAME', 
                    passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                    script {
                        sh 'echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USERNAME" --password-stdin'
                    }
                }
            }
        }

        stage('Get Latest Version & Set New Tag') {
            steps {
                script {
                    def latestTag = sh(script: "curl -s https://hub.docker.com/v2/repositories/${DOCKER_HUB_REPO}/tags | jq -r '.results | map(select(.name | test(\"v[0-9]+\\\\.[0-9]+\"))) | sort_by(.last_updated) | .[-1].name'", returnStdout: true).trim()
                    
                    def newVersion
                    if (latestTag == "null" || latestTag == "") {
                        newVersion = "v1.0"  // 첫 번째 버전
                    } else {
                        def versionParts = latestTag.replace("v", "").split("\\.")
                        def major = versionParts[0].toInteger()
                        def minor = versionParts[1].toInteger() + 1
                        newVersion = "v${major}.${minor}"
                    }

                    env.NEW_TAG = newVersion
                    echo "New Image Tag: ${NEW_TAG}"
                }
            }
        }

        stage('Build & Push backend Image') {
            steps {
                withCredentials([file(credentialsId: 'front-key', variable: 'SECRET_ENV')]) {
                    script {
                        sh """
                        cp $SECRET_ENV .env
                        docker build -t ${DOCKER_HUB_REPO}:${NEW_TAG} --build-arg ENV_FILE=.env -f Dockerfile .
                        docker push ${DOCKER_HUB_REPO}:${NEW_TAG}
                        """
                    }
                }
            }
        }

        stage('Deploy to EC2 with Docker Compose') {
            steps {
                script {
                    def newTag = env.NEW_TAG  // 🔹 NEW_TAG 값을 가져오기

                    sh """
                    echo "🚀 배포 서버에 Docker Compose 적용 중..."

                    # 🔹 SSH 접속하여 Docker Compose 배포 실행
                    ssh -o StrictHostKeyChecking=no -i /var/lib/jenkins/.ssh/id_rsa ubuntu@${DEPLOY_SERVER} << EOF
                    export NEW_TAG=${newTag}  # 🔹 NEW_TAG 값을 환경 변수로 설정
                    sudo docker pull ${DOCKER_HUB_REPO}:\$NEW_TAG
                    sudo docker-compose -f /home/ubuntu/docker-compose.yml down
                    sudo sed -i 's|image: luckyprice1103/tiling-frontend:.*|image: luckyprice1103/tiling-frontend:\$NEW_TAG|' /home/ubuntu/docker-compose.yml
                    sudo docker-compose -f /home/ubuntu/docker-compose.yml up -d
                    EOF

                    echo "✅ Docker Compose 배포 완료!"
                    """
                }
            }
        }



        // stage('Update GitHub Deployment YAML') {
        //     steps {
        //         withCredentials([usernamePassword(credentialsId: 'github_token', 
        //             usernameVariable: 'GIT_USERNAME', 
        //             passwordVariable: 'GIT_PASSWORD')]) {
        //             script {
        //                 sh """
        //                 git clone https://github.com/2-KTB-Tiling/k8s-manifests.git
        //                 cd k8s-manifests
        //                 sed -i 's|image: luckyprice1103/tiling-frontend:.*|image: luckyprice1103/tiling-frontend:${NEW_TAG}|' deployment.yaml
        //                 git config --global user.email "luckyprice1103@naver.com"
        //                 git config --global user.name "luckyPrice"
        //                 git add deployment.yaml
        //                 git commit -m "Update frontend image to ${NEW_TAG}"
        //                 git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/2-KTB-Tiling/k8s-manifests.git main
        //                 """
        //             }
        //         }
        //     }
        // }
    }
}

