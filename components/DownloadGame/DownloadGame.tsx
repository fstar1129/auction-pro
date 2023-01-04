import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";

const DownloadGame: React.FC = (): JSX.Element => {
  const { setUserData, isUserUpdating, user } = useMoralis();
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState({ isError: false, message: "" });
  const [google, setGoogle] = useState(true);
  const [arrland, setArrland] = useState(true);
  const currentUser = user.get("username");
  const [form, setForm] = useState({
    username: currentUser,
    password: "",
    repeatedPassword: "",
  });

  const checkUserExistCloudFunction = useMoralisCloudFunction(
    "checkUserExist",
    { formusername: form.username },
    { autoFetch: false }
  );

  async function checkUsername() {
    try {
      const moralisResult = await checkUserExistCloudFunction.fetch();
      if (moralisResult === true) {
        return setErr({
          isError: true,
          message: "This username is already taken!",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (
      submitted === true &&
      err.message === "This username is already taken!"
    ) {
      setSubmitted(false);
    }
  }, [submitted]);

  const handleAccountSetup = async () => {
    setErr({
      isError: false,
      message: "",
    });
    checkUsername();

    if (!form.username || form.username.length < 6) {
      return setErr({
        isError: true,
        message: "Username must be at least 6 characters long!",
      });
    }

    if (form.password.length < 8 || form.repeatedPassword.length < 8) {
      return setErr({
        isError: true,
        message: "Password must be at least 8 characters long!",
      });
    }

    if (
      !form.password ||
      !form.repeatedPassword ||
      form.password !== form.repeatedPassword
    ) {
      return setErr({
        isError: true,
        message: "Please repeat password correctly!",
      });
    }

    try {
      await setUserData({
        username: form.username,
        password: form.password,
      });
      setSubmitted(true);
    } catch (err) {
      console.log(err);
      setErr({
        isError: true,
        message: "Something went wrong! Please try again later!",
      });
    }
  };

  const handleInputChange = (val) => (evt) => {
    setForm({ ...form, [val]: evt.target.value });
  };

  const updateAgain = () => {
    setErr({ isError: false, message: "" });
    form.username = currentUser;
    form.password = "";
    form.repeatedPassword = "";
    setSubmitted(false);
  };

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GAME_GOOGLE_DOWNLOAD !== "") {
      setGoogle(false);
    }
    if (process.env.NEXT_PUBLIC_GAME_ARRLAND_DOWNLOAD !== "") {
      setArrland(false);
    }
  }, []);

  return (
    <>
      <div className="w-full flex flex-col bg-elementor-1 pb-10 py-5 gap-3 min-h-[65vh] mxmd:min-h-[70vh]">
        <div>
          <h3 className="font-display text-elementor-text-3 text-2xl ml-2 mb-3 mxlg:ml-4">
            Download Pre-Alpha Game
          </h3>
          <div className="border-b-[1px] border-elementor-text-3" />
        </div>
        <div className="flex flex-col px-4">
          <div className="flex flex-row w-[98.25%] mxlg:justify-center mxmd:flex-col mxmd:items-center">
            <div className="flex flex-row mxlg:min-w-[295px]">
              <div className="flex flex-col text-right">
                <p className="font-display text-elementor-text-3 text-base mr-8 pb-4">
                  Current version:
                </p>
                <p className="text-elementor-text-3 font-display text-base mr-8 pb-4">
                  Arrland.com
                </p>
                <p className="text-elementor-text-3 font-display text-base mr-8 pb-4">
                  Google Drive
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-display text-elementor-text-1 text-base pb-[8px]">
                  {process.env.NEXT_PUBLIC_GAME_BUILD_VERSION}
                </p>
                <a
                  href={process.env.NEXT_PUBLIC_GAME_ARRLAND_DOWNLOAD}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <button
                    className={`w-full font-display text-elementor-text-2 bg-elementor-text-1 rounded-sm hover:bg-elementor-text-3 duration-150 text-sm px-3 py-1 mb-[5px] text-center  ${
                      arrland === true &&
                      "disabled:hover:bg-elementor-text-1 disabled:opacity-25 disabled:cursor-not-allowed"
                    }`}
                    disabled={arrland}
                  >
                    Download
                  </button>
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_GAME_GOOGLE_DOWNLOAD}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <button
                    className={`w-full font-display text-elementor-text-2 bg-elementor-text-1 rounded-sm hover:bg-elementor-text-3 duration-150 text-sm px-3 py-1 mb-[5px] text-center  ${
                      google === true &&
                      "disabled:hover:bg-elementor-text-1 disabled:opacity-25 disabled:cursor-not-allowed"
                    }`}
                    disabled={google}
                  >
                    Download
                  </button>
                </a>
              </div>
            </div>
            <div className="flex flex-col w-[1px] bg-elementor-text-3 mx-10 mxmd:hidden" />
            <div className="hidden flex-col h-[1px] w-[320px] bg-elementor-text-3 mxmd:flex mt-3 mb-8" />
            <div className="flex flex-col mxxl:w-[460px] mxmd:max-w-[300px]">
              <h1 className="text-4xl font-display text-elementor-text-1 mb-2">
                Game Account
              </h1>
              <p className="font-display text-elementor-text-3 text-base font-normal mb-6">
                Setup your username and password for Pirates of the Arrland
                game.
              </p>

              <div className="mb-3 mxxl:flex mxxl:flex-col mxxl:mb-2">
                <input
                  type="text"
                  placeholder="Username"
                  onChange={handleInputChange("username")}
                  value={form.username}
                  className={`form-control p-2 text-sm text-elementor-text-1 bg-elementor-1 bg-clip-padding border border-solid border-elementor-text-1 rounded transition ease-in-out focus:text-elementor-text-1 focus:bg-elementor-text-2 focus:border-elementor-text-1 focus:outline-none font-display mr-2 mxxl:mr-0 mxxl:mb-3 ${
                    err.message === "This username is already taken!" &&
                    "border-[#FF0000]"
                  }`}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleInputChange("password")}
                  minLength={6}
                  className={`form-control p-2 border-text-elementor-text-1 mxxl:mr-0 mxxl:mb-3
                  ${
                    (form.password === "" && form.repeatedPassword === "") ||
                    form.password !== form.repeatedPassword ||
                    form.repeatedPassword.length < 8
                      ? "border-[#FF0000]"
                      : "border-green-400"
                  }
                  text-elementor-text-1 rounded bg-elementor-1 bg-clip-padding border border-solid transition ease-in-out focus:text-elementor-text-1 focus:bg-elementor-text-2 focus:border-elementor-text-1 focus:outline-none font-display text-sm mr-2
                `}
                />
                <input
                  type="password"
                  placeholder="Repeat password"
                  value={form.repeatedPassword}
                  onChange={handleInputChange("repeatedPassword")}
                  className={`form-control p-2 border-text-elementor-text-1 mxxl:mr-0 mxxl:mb-3
                  ${
                    (form.password === "" && form.repeatedPassword === "") ||
                    form.password !== form.repeatedPassword ||
                    form.password.length < 8
                      ? "border-[#FF0000]"
                      : "border-green-400"
                  }
                  text-elementor-text-1 bg-elementor-1 bg-clip-padding border border-solid rounded transition ease-in-out focus:text-elementor-text-1 focus:bg-elementor-text-2 focus:border-elementor-text-1 focus:outline-none font-display px-2 text-sm
                `}
                />
              </div>

              {err.isError && (
                <div className="mb-2">
                  <p className="text-[#FF0000] font-display text-sm">
                    {err.message}
                  </p>
                </div>
              )}

              {(!submitted &&
                err.message !== "This username is already taken!") ||
                (err.message === "" && (
                  <div className="text-green-400 font-display text-sm mb-2">
                    You successfully updated your game account credentials!
                  </div>
                ))}

              {submitted ? (
                <button
                  className={`h-[48px] font-display text-elementor-text-2 bg-elementor-text-1 rounded-sm hover:bg-elementor-text-3 duration-150 px-3 py-1 mb-2`}
                  onClick={() => updateAgain()}
                >
                  {submitted && "Update again"}
                </button>
              ) : (
                <button
                  className={`h-[48px] font-display text-elementor-text-2 bg-elementor-text-1 rounded-sm hover:bg-elementor-text-3 duration-150 px-3 py-1 mb-2 ${
                    isUserUpdating &&
                    "disabled:cursor-not-allowed disabled:opacity-25"
                  }`}
                  onClick={() => !submitted && handleAccountSetup()}
                  disabled={isUserUpdating}
                >
                  {isUserUpdating ? "UPDATING..." : "SETUP"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadGame;
