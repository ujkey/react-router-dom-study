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

<br/>

## Root Route : 루트 라우트

### 루트 레이아웃 설정

```jsx
import Root from "./routes/root"; // 루트 레이아웃 컴포넌트

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

// ...
```

<br/>

## Not Found Errors Route : 에러 페이지 커스텀

렌더링, 데이터 로드 또는 데이터 변경 중에 오류가 발생하면, 리액트 라우터는 이를 포착해서 404 페이지를 렌더링한다.

UX뿐만 아니라 DX를 위해 오류 페이지를 커스텀하면 좋다.

### 1. 에러 페이지 커스텀하기

`useRouteError`를 사용하면, 라우터에서 발생한 오류를 받아올 수 있다.

```jsx
import { useError } from "react-error-boundary";

function ErrorPage() {
  const { error, resetErrorBoundary } = useError(); // ✅

  return (
    <div>
      <h1>Something went wrong</h1>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
```

### 2. 커스텀 에러 페이지 등록하기

루트 `errorElement`에 추가하면, 라우터가 오류가 발생했을 때, 커스텀 에러 페이지를 렌더링한다.

```jsx
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />, // ✅
  },
]);
```

<br/>

## Nested Routes : 중첩 라우트

### 1. 중첩 라우트 구성 - `children`

루트 라우트에 하위 경로를 추가하여 중첩 라우트를 구성할 수 있다.

```jsx
import Contact from "./routes/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contact/:contactId",
        element: <Contact />, // ✅
      },
    ],
  },
]);
```

### 2. 중첩 라우트 렌더링 위치 지정 - `<Outlet/>`

`<Outlet/>`을 활용하여 중첩된 경로를 렌더링할 위치를 루트 경로에 알려주어야 한다.

```jsx
// src/routes/root.js
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      {/* ... */}
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
```

<br/>

## Client Side Routing : 클라이언트 사이드 라우팅

클라이언트 사이드 라우팅을 사용하면, 앱이 서버에서 새 페이지를 가져오지 않고도, URL을 변경할 수 있다. 앱은 새로운 UI를 즉시 렌더링한다. (새로운 네트워크 요청이 없음)

`<Link/>` 컴포넌트를 사용하면, 클라이언트 사이드 라우팅을 활성화할 수 있다.

```jsx
import { Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        {/* ... */}

        <nav>
          <ul>
            <li>
              <Link to={`contacts/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`contacts/2`}>Your Friend</Link>
            </li>
          </ul>
        </nav>

        {/* ... */}
      </div>
    </>
  );
}
```
