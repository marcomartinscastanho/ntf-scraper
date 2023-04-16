import React, { useEffect } from "react";
import { ActionFunction, Form, Navigate, useActionData } from "react-router-dom";
import { useSession } from "../../contexts/session.context";
import { login } from "../../services/api";

import "./auth.styles.css";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  if (typeof username === "string" && typeof password === "string") {
    const [sessionToken] = await login(username, password);
    return { sessionToken };
  }
};

export const Auth = () => {
  const { sessionToken, setSessionToken } = useSession();
  const actionData = useActionData() as { [key: string]: string };

  useEffect(() => {
    if (actionData?.sessionToken) {
      setSessionToken(actionData.sessionToken);
    }
  }, [actionData?.sessionToken, setSessionToken]);

  // if the tokens are stored in the local storage
  if (sessionToken) {
    return <Navigate to="/scrape" />;
  }

  return (
    <div className="auth-container">
      <Form method="post" id="auth-form" className="auth-form">
        <label className="auth-form-label">
          <span>Username</span>
          <input name="username" placeholder="usename" />
        </label>
        <label className="auth-form-label">
          <span>Password</span>
          <input type="password" name="password" placeholder="password" />
        </label>
        <button type="submit">Save</button>
      </Form>
    </div>
  );
};

export default Auth;

// reference: https://stackoverflow.com/questions/72514608/google-chrome-extension-manifest-version-3-to-handle-google-sign-ins/73345256#73345256
// reference: https://codesandbox.io/s/cs3k1
// reference: https://stackoverflow.com/questions/65625854/how-to-integrate-gapi-in-chrome-extensions-manifest-v3
