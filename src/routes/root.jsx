// 전역 레이아웃 정의

import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function action() {
  const contacts = await createContact(); // 빈 연락처를 생성
  return redirect(`/contacts/${contacts.id}/edit`); // 새로 생성된 연락처의 편집 페이지로 리디렉션
}

const Root = () => {
  const { contacts } = useLoaderData();

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

          {/* <form method="post">
            <button type="submit">New</button>
          </form> */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>

        {/* sidebar */}
        <nav>
          {/* access loader data */}
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
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

// 루트 모듈에서 로더 함를 생성, 내보내기
export async function loader() {
  const contacts = await getContacts();
  console.log(contacts, "contacts");

  return { contacts };
}
