// 전역 레이아웃 정의

import { Outlet, Link } from "react-router-dom";

const Root = () => {
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              {/* <a href={`/contact/1`}>Your Name</a> */}
              <Link to={`/contact/1`}>Your Name</Link>
            </li>
            <li>
              {/* <a href={`/contact/2`}>Your Friend</a> */}
              <Link to={`/contact/2`}>Your Friend</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>{" "}
      {/* 하위 경로를 렌더링할 위치를 지정 */}
    </>
  );
};

export default Root;
