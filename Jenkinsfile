pipeline {
    agent { label 'windows' }

    stages {
        stage ('prepare-env') {
            steps {
                withCredentials([file(credentialsId: 'google_services_json', variable: 'VAR_GOOGLE_SERVICES_JSON')]) {
                    bat label: '', script: 'copy %VAR_GOOGLE_SERVICES_JSON% app/App_Resources/Android/google-services.json'
                }
            }
        }
        
        stage('Build') {
            steps {                
                bat label: '', script: '''
                npm install
                tns doctor
                tns build android
                '''
            }
        }
        stage('Test') {
            steps {
                bat label: '', script: '''
                npm run e2e -- --runType=android27
                '''
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
