# react-router-dom

`react-router-dom`은 리액트 앱에서 라우팅을 도와주는 라이브러리이다.

튜토리얼을 따라하면서, `react-router-dom`을 사용하는 방법을 익히고, 주요 기능들을 알아본 기록이다.

<br/>

## Install : 모듈 설치

```bash
npm install react-router-dom localforage match-sorter sort-by
```

<br/>

## Adding a Router : 라우터 추가하기

`Browser Router`를 생성하고, `root route`를 추가한다.

그러면 웹사이트의 URL이 변경될 때마다, 라우터는 URL을 읽고, URL에 맞는 컴포넌트를 렌더링한다.(클라이언트 사이드 라우팅 활성화)
