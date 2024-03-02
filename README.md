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

<br/>

## Data loader : 데이터 로더

리액트 라우터는 데이터를 라우트 컴포넌트로 쉽게 로드할 수 있도록 도와준다.

이는 서버에 요청하지 않고 데이터를 가능한 빨리 가져와 라우트 컴포넌트에 전달함으로써 사용자 경험을 향상시킬 수 있다.

### 1. 데이터 로더 정의, 내보내기

데이터 `loader` 를 정의하고, 루트 모듈에서 내보낸다.

이 데이터 로더는 각 라우트가 렌더링되기 전에 데이터를 제공하는 데 사용된다.

```jsx
// root.jsx
import { getContacts } from "../contacts";

// 루트 모듈에서 로더 함를 생성, 내보내기
export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}
```

### 라우트에 데이터 로더 설정 추가

각 라우트에 `loader`를 추가하면, 라우트 컴포넌트에서 로더 데이터에 접근할 수 있다.

```jsx
import Root, { loader as rootLoader } from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader, // ✅
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);
```

### 3. 데이터 엑세스 후 렌더링

`useLoaderData`를 사용하여 라우트 컴포넌트에서 로더 데이터에 접근할 수 있다.

이를 통해 서버에 요청하지 않고 데이터를 가져오는 것이 가능하다.

```jsx
// root.jsx
import { useLoaderData } from "react-router-dom";

export default function Root() {
  const { contacts } = useLoaderData(); // ✅

  return (
    <>
      <div id="sidebar">
        {/* ... */}

        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>이름 없음</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>연락처 없음</i>
            </p>
          )}
        </nav>

        {/* ... */}
      </div>
    </>
  );
}
```
