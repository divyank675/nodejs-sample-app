
pipeline {
agent any
stages {
stage('Build') {
    steps {
    // One or more steps need to be included within the steps block.
    sh "docker build .  -t divyankchauhan/nodejs-sample-app:$BUILD_NUMBER"
    }
}



stage('LOGIN') {
    steps {
    // One or more steps need to be included within the steps block.
     withCredentials([string(credentialsId: 'DOCKER_PASSWORD', variable: 'DOCKER_PASSWORD')]){
     sh "docker -H tcp://172.17.0.1:4200 login -u divyankchauhan -p $DOCKER_PASSWORD"
}
}
}


stage('PUSH') {
    steps {
    // One or more steps need to be included within the steps block.
    sh "docker push divyankchauhan/nodejs-sample-app:$BUILD_NUMBER"
    }
   }

stage('IMage Tag update in manifest') {
    steps {
script {
    // some block
   sh "test=$(cat deployment.yaml | grep image | awk -F: '{ print $3 }')"
   sh 'sed -i "s+$test+$BUILD_NUMBER+g" manifest/deployment.yaml'

}
       sh "test=$(cat deployment.yaml | grep image | awk -F: '{ print $3 }')"
       sh 'sed -i "s+$test+$BUILD_NUMBER+g" manifest/deployment.yaml'

    }
   }
stage("deploying manifest"){
    steps {
    // One or more steps need to be included within the steps block.
    sh "kubectl apply -f  manifest/deployment.yaml"
    }
   }



  }
}
