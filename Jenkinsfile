
pipeline {
agent any
stages {

stage('Run CI?') {
      agent any
      steps {
        script {
          if (sh(script: "git log -1 --pretty=%B | fgrep -ie '[skip ci]' -e '[ci skip]'", returnStatus: true) == 0) {
            currentBuild.result = 'NOT_BUILT'
            error 'Aborting because commit message contains [skip ci]'
          }
        }
      }
    }



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
      sh '''#!/bin/bash
            test=$( cat manifest/deployment.yaml| grep image );    t=${test:0:59} ;    sed -i "s+$test+$t$BUILD_NUMBER'+g" manifest/deployment.yaml
         '''
    }
   }

stage('git tag and push') {
    steps {
      sh '''#!/bin/bash
             git add manifest/deployment.yaml
             git commit -m "[skip ci]  $BUILD_NUMBER" 
             git tag   $BUILD_NUMBER -m "Version $BUILD_NUMBER"
             git push origin HEAD:main
             git push --tags 

         '''
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
