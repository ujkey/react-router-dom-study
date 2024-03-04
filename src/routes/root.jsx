// 전역 레이아웃 정의

import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function action() {
  const contacts = await createContact(); // 빈 연락처를 생성
  return { contacts };
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
        <nav>
          {/* access loader data */}
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
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
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
