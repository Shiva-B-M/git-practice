pipeline {

    agent any

    environment {
        APP_NAME   = 'sample-node-app'
        IMAGE_NAME = 'sample-node-app'
        IMAGE_TAG  = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo '========================================'
                echo '        CHECKOUT SOURCE CODE'
                echo '========================================'

                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '========================================'
                echo '        INSTALL DEPENDENCIES'
                echo '========================================'

                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                echo '========================================'
                echo '        RUNNING TESTS'
                echo '========================================'

                sh 'npm test'
            }
        }

        stage('Build Application') {
            steps {
                echo '========================================'
                echo '        BUILD APPLICATION'
                echo '========================================'

                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '========================================'
                echo '        BUILD DOCKER IMAGE'
                echo '========================================'

                sh """
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                    docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Deploy') {
            steps {
                echo '========================================'
                echo '        DEPLOY APPLICATION'
                echo '========================================'

                sh """
                    docker stop ${APP_NAME} || true
                    docker rm ${APP_NAME} || true

                    docker run -d \
                        --name ${APP_NAME} \
                        -p 3000:3000 \
                        ${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Verify Deployment') {
            steps {
                echo '========================================'
                echo '        VERIFY DEPLOYMENT'
                echo '========================================'

                sh 'docker ps'
                sh 'sleep 5'
                sh 'curl -f http://localhost:3000/health'
            }
        }
    }

    post {

        success {
            echo '========================================'
            echo '       CI/CD PIPELINE SUCCESSFUL'
            echo '========================================'

            echo "Application : ${APP_NAME}"
            echo "Docker Image: ${IMAGE_NAME}:${IMAGE_TAG}"
            echo "Build Number: ${BUILD_NUMBER}"
        }

        failure {
            echo '========================================'
            echo '       CI/CD PIPELINE FAILED'
            echo '========================================'

            echo 'Please check the console output.'
        }

        always {
            echo "Build #${BUILD_NUMBER} completed."
        }
    }
}
