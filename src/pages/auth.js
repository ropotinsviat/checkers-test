import { useState } from "react";
import { observer } from "mobx-react-lite";
import "../styles/auth.css";
function Auth({ store }) {
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [mode, setMode] = useState(false);

  function login() {
    store.login(loginName, loginPassword);
  }
  function registration() {
    store.registration(signupEmail, signupName, signupPassword);
  }

  if (store.isLoading)
    return (
      <div className="ideal-center">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );

  return (
    <div className="container">
      {mode ? (
        <div className="login form">
          <header>Login</header>
          <input
            type="text"
            placeholder="Enter your name"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <input
            type="button"
            className="button"
            value="Login"
            onClick={login}
          />
          <div className="signup">
            <span className="signup">
              Don't have an account?
              <label onClick={() => setMode(false)}>Signup</label>
            </span>
          </div>
        </div>
      ) : (
        <div className="registration form">
          <header>Signup</header>
          <input
            type="email"
            placeholder="Enter your email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your name"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Create a password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
          <input
            type="button"
            className="button"
            value="Signup"
            onClick={registration}
          />
          <div className="signup">
            <span className="signup">
              Already have an account?
              <label onClick={() => setMode(true)}>Login</label>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default observer(Auth);
