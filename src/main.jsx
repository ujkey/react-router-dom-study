import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Contact, { loader as contactLoader } from "./routes/contact";
import "./index.css";
import EditContact, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader, // 루트 라우트에 로더 설정
    action: rootAction, // 루트 라우트에 라우팅 액션 설정
    children: [
      {
        path: "contacts/:contactId", // URL 매개변수를 사용하여 동적 라우팅
        element: <Contact />,
        loader: contactLoader, // 연락처 라우트에 로더 설정
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction, // 라우트에 액션 설정
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div>에러가 발생했습니다.</div>, // 에러 경로에 대한 상황별 오류 메세지 생성
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
