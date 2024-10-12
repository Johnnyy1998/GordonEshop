import { useEffect } from "react";
import { useRouteError, Link, redirect } from "react-router-dom";
const ErrorElement = () => {
  const error = useRouteError();

  useEffect(() => {
    redirect("/");
  }, []);

  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <p className="text-9xl font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            page not found
          </h1>
          <p className="mt-6 text-lg leading-7 ">
            Sorry, we coulnd not find the page you are looking for
          </p>
          <div className="mt-10">
            <Link to="/" className="btn  btn-secondary">
              GO BACK HOME
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <h4 className="text-center font-bold text-4xl">There was an error</h4>
      <Link to="/" className="btn  btn-secondary">
        GO BACK HOME
      </Link>
    </main>
  );
};
export default ErrorElement;
