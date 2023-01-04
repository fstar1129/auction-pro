import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import { closeDialog, selectDialog } from "../../../state/dialog/dialogSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import CloseDialogButton from "../Partials/CloseDialogButton";

export default function Settings() {
  const { setUserData, isUserUpdating, user } = useMoralis();
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);
  const currentUser = user.get("username");
  const [form, setForm] = useState({
    username: currentUser,
    password: "",
    repeatedPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState({ isError: false, message: "" });

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

  return (
    <>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => dispatch(closeDialog())}
        open={dialog.isOpen}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay
            className="fixed inset-0 bg-black-400 w-full h-full"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(2px)",
            }}
          />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block w-full text-elementor-text-3 max-w-[420px] text-left align-middle rounded-sm transition-all transform bg-elementor-1 bg-gradient-to-b p-[2px] from-elementor-text-3 to-[#64a2bc] shadow-xl">
            <CloseDialogButton />
            <div className="bg-[#11131c] p-5">
              <h1 className="text-5xl font-display text-elementor-text-1 font-bold flex flex-row justify-between items-center">
                Game Account
              </h1>

              <div className="mt-2">
                <p className="font-display text-elementor-text-3">
                  Setup your username and password for Pirates of the Arrland
                  game.
                </p>
              </div>

              <div className="mt-2 w-full flex flex-col items-center justify-center min-h-[200px]">
                <input
                  type="text"
                  placeholder="Username"
                  onChange={handleInputChange("username")}
                  value={form.username}
                  className={`form-control block w-full p-2 font-normal  text-elementor-text-1 bg-elementor-1 bg-clip-padding border border-solid border-elementor-text-1 rounded transition ease-in-out m-2 focus:text-elementor-text-1 focus:bg-elementor-text-2 focus:border-elementor-text-1 focus:outline-none font-display ${
                    err.message === "This username is already taken!" &&
                    "border-[#FF0000]"
                  }`}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleInputChange("password")}
                  className={`form-control block w-full p-2 border-text-elementor-text-1
                  ${
                    (form.password === "" && form.repeatedPassword === "") ||
                    form.password !== form.repeatedPassword ||
                    form.repeatedPassword.length < 8
                      ? "border-[#FF0000]"
                      : "border-green-400"
                  }
                                  text-elementor-text-1 rounded bg-elementor-1 bg-clip-padding border border-solid transition ease-in-out m-2 focus:text-elementor-text-1 focus:bg-elementor-text-2 focus:border-elementor-text-1 focus:outline-none font-display px-2
                                `}
                />

                <input
                  type="password"
                  placeholder="Repeat password"
                  value={form.repeatedPassword}
                  onChange={handleInputChange("repeatedPassword")}
                  className={`form-control block w-full p-2 border-text-elementor-text-1
                  ${
                    (form.password === "" && form.repeatedPassword === "") ||
                    form.password !== form.repeatedPassword ||
                    form.password.length < 8
                      ? "border-[#FF0000]"
                      : "border-green-400"
                  }
                                  font-normal text-elementor-text-1 bg-elementor-1 bg-clip-padding border border-solid rounded transition ease-in-out m-2 focus:text-elementor-text-1 focus:bg-elementor-text-2 focus:border-elementor-text-1 focus:outline-none font-display px-2
                                `}
                />
              </div>

              {err.isError && (
                <div className="mb-2">
                  <p className="text-[#FF0000] font-display text-xl">
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
                  className="w-full inline-flex font-display font-bold justify-center mt-3  py-3 text-3xl bg-[#3E6A86] text-elementor-text-2 rounded-sm hover:bg-elementor-text-3 duration-300"
                  onClick={() => updateAgain()}
                >
                  {submitted && "Update again"}
                </button>
              ) : (
                <button
                  className={`w-full inline-flex font-display font-bold justify-center mt-3  py-3 text-3xl bg-[#3E6A86] text-elementor-text-2 rounded-sm hover:bg-elementor-text-3 duration-300${
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
      </Dialog>
    </>
  );
}
