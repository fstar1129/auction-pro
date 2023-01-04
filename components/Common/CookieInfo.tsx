import React from "react";
import { useCookies } from "react-cookie";

const COOKIE_NAME = "cookie-info";

const CookieInfo: React.FC = (): JSX.Element => {
  const [cookies, set] = useCookies([COOKIE_NAME]);

  const handleCookieAccept = (): void => {
    set(COOKIE_NAME, true, { path: "/" });
  };

  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <div>
      {!cookies["cookie-info"] && (
        <div className="flex flex-row items-center bg-elementor-text-3 p-2 justify-center">
          <p className="text-black text-xs">
            Arrland.com uses cookies, including anonymous statistics. By
            accepting cookies you can help us make our website better.
          </p>
          <button
            className="ml-1 hover:underline text-xs font-bold text-black"
            onClick={handleCookieAccept}
          >
            I accept cookies
          </button>
        </div>
      )}
    </div>
  );
};

export default CookieInfo;
