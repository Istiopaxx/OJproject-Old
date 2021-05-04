# Online Judge
* * *

## 개요
json 형태의 데이터를 주고받아 문제를 푸는 온라인 저지




## 실행법
API 서버와 Client 서버로 구분된 구조이다. 두 서버를 모두 실행하려면 `npm start`
```
npm start
```
#### API 서버 실행
프로젝트 루트 디렉토리에서 터미널에 `node ./servers/app.js`
```
node ./servers/app.js
```
#### 개발 시 API 서버 실행
소스코드를 수정한 후 저장하면 자동으로 서버를 재시작 해주는 nodemon을 적용하였다. 실행하려면 `npm run dev`
```
npm run dev
```



## 기능
#### 1. 문제 풀이
user가 문제 “start API”에 JSON형태로 POST 요청을 보낸다.JSON 형태에는 user_id와 problem_id가 포함되어 있어야 한다.   
데이터검증 후 토큰(problem_id , user_id 더한 값을 해싱)  + 문제의 초기상태 ( 문제DB에 저장해 둔 시나리오를 쿼리)   
 를 생성하여 JSON 형태로 response.   
“call API”에 get요청을 보내면 해당 토큰에 해당하는 state를 response.   
(채점DB에 있는 토큰key에 맞는 value를 쿼리로 날려서 JSON형태로 가져온다.)    
“action API”에 post요청을 보내면 문제에 해당하는 컨트롤러가 action을 state에 적용 함.    
(채점DB에 있는 해당 value를 가져와서 변경 후 timestamp++,상태 변경. DB저장) 후 바뀐state를 response.   
“action API” 컨트롤러 끝단에 timestamp의 값을 확인 후 실패,성공 여부를 확인 후 해당 조건이 성립한다면 채점DB의 state 삭제,    
grade 컨트롤러에 state 전달후 grade 측정 후 채점 결과를 response, 채점번호DB에 user_id,problem_id,grade 등을 저장.   
#### 2. 유저 information
#### 3. 채점 현황
#### 4. 구글,깃허브,카카오 계정 인증

* * *



## 코딩 컨벤션 suggested by keisluv
1. 변수(인스턴스)명은 camalCase, 함수명은 snake_case
2. 생각나면 추가하자!!



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)