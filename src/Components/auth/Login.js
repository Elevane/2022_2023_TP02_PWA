import React from "react";

async function authenticate(email, password) {
  const user = {
    email: email,
    password: password,
  };

  return fetch(process.env.REACT_APP_DBHOST_USERS + "/authenticate" , {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    },
    body: JSON.stringify(user),
  }).then((data) => data.json());
}

export default function Login() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Authentification starting")
    await authenticate(email, password).then((value) => {
      if(value === null || value=== undefined)
        alert("Return value can't be read")
      else if (!value.isSuccess) {
        alert(value.errorMessage);
      }
      else if (value.result === undefined) {
        alert("result is undifiend",);
      }
      else{
        localStorage.setItem(
          "user",
          JSON.stringify({ user: value.result })
        );
        window.location.href = "/"
      }
    }).catch(function() {
      alert("Failed to fetch api");
  });;
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    window.location.href = "/CreateAccount";
  };
  return (
    <div id="login-form-wrap">
      <h2> Login </h2>{" "}
      <form id="login-form" onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="email"
            required
          />
        </p>{" "}
        <p>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="password"
            required
          />
        </p>{" "}
        <p>
          <input type="submit" id="login" value="Login" />
        </p>{" "}
      </form>{" "}
      <div id="create-account-wrap">
        <p>
          {" "}
          Not a member ?{" "}
          <a href="/create" onClick={handleCreateAccount}>
            {" "}
            Create Account{" "}
          </a>
        </p>
      </div>{" "}
    </div>
  );
}
