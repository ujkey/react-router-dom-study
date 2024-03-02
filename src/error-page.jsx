import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError(); // 발생한 오류를 가져옴
  console.log("⚠️", error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
