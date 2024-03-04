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

<br/>

## Form : 클라이언트 사이드 라우팅으로 데이터 전송

아래는 `Form` 컴포넌트로 폼을 제출하여 연락처를 생성하는 예시이다. 서버로 데이터를 전송하지 않고 클라이언트 사이드 라우팅을 통해 데이터를 전달한다.

### 1. 라우트 액션 생성

라우트 액션은 라우트가 렌더링되기 전에 실행되는 함수이다. 이를 통해 URL과 관련된 다양한 작업을 수행할 수 있다.

예를 들어, 사용자가 특정 URL로 이동하면 라우트가 렌더링되기 전에 해당 URL에 대한 데이터를 로드하거나, 라우트가 렌더링된 후에 추가적인 작업(업데이트)을 수행할 수 있다.

다음은 빈 연락처를 생성하기 위한 라우트 액션을 정의한 코드이다.

```jsx
// root.jsx
export async function action() {
  const contact = await createContact(); // 빈 연락처를 생성(업데이트)
  return { contact };
}
```

### 2. Form 컴포넌트 추가

`Form` 컴포넌트로 폼을 제출하면 라우터는 URL을 변경하고, 해당 URL에 맞는 컴포넌트를 렌더링한다.

`Form` 컴포넌트를 사용하면 사용자가 입력한 데이터를 URL에 포함하여 전송할 수 있다.

이를 통해 라우팅된 페이지 간에 데이터를 전달하고, 다른 페이지로 이동할 때 데이터를 유지할 수 있다.

예시로는 사용자가 입력한 검색어를 URL에 추가하여 검색 결과를 표시하는 경우, 사용자가 폼을 제출할 때 해당 데이터를 URL에 포함하여 서버로 전송하는 경우 등이 있다.

```jsx
// root.jsx
import { Form } from "react-router-dom";

export async function action() {
  const contact = await createContact();
  return { contact };
}

/* ...  */

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          {/* other code */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>

        {/* ... */}
      </div>
    </>
  );
}
```

### 3. 라우트에 폼 액션 추가

라우트에 `action`을 추가하면, 라우트가 렌더링되기 전에 해당 액션이 실행된다.

```jsx
// main.jsx
/* other imports */

import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction, // ✅
  },
]);
```

<br/>

## URL Params in Loader : URL 파라미터로 데이터 로드하기

라우트의 URL 파라미터를 사용하여 데이터를 로드할 수 있다.

### 1. 로더에서 URL 파라미터 사용하기

로더를 추가하고, `useLoaderData`를 사용하여 데이터에 엑세스한다.

```jsx
// contact.jsx
import { useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";

export async function loader({ params }) {
  const contact = await getContact(params.contactId); // ✅
  return { contact };
}

export default function Contact() {
  const { contact } = useLoaderData(); // ✅
  // ...
}
```

### 2. 라우트에 로더 추가

라우트에 로더를 추가하면, 라우트가 렌더링되기 전에 해당 로더가 실행된다.

```jsx
// main.jsx
/* … */
import Contact, { loader as contactLoader } from "./routes/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader, // ✅
      },
    ],
  },
]);
```
