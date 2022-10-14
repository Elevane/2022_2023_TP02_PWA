import React from "react";
async function register(email, password, username) {
  const user = {
    username : username,
    email: email,
    password: password,
  };
  return fetch(process.env.REACT_APP_DBHOST_USERS + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    },
    body: JSON.stringify(user),
  }).then((data) => data.json());
}


export default function CreateAccount() {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [username, setUserName] = React.useState();

    const handleSubmit = async e => {
        e.preventDefault();
        await register(email, password, username).then((value) => {
          if (!value.isSuccess) {
            alert(value.errorMessage);
          }
          else if (value.result === undefined) {
            alert("Failed connection Error");
          }
          else {
            localStorage.setItem(
              "user",
              JSON.stringify({ user: value.result })
            );
            window.location.href = "/"
          }
         
        });
    }

  return (

    <div  id="login-form-wrap">
      <h2 className="pb-2"> Create account </h2>{" "}
      <form id="login-form" onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Email"
            required
          />
        </p>{" "}
        <p>
          <input
            type="text"
            id="username"
            onChange={(e) => setUserName(e.target.value)}
            name="username"
            placeholder="username"
            required
          />
        </p>{" "}
     
        <p>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Password"
            required
          />
        </p>{" "}
        <p>
          <input type="submit" id="create" value="create" />
        </p>{" "}
      </form>{" "}
      <div id="create-account-wrap">
        <p>
          {" "}
          Already a member, {" "}
          <a href="/login">
            {"   "}
            Login{" "}
          </a>
        </p>
      </div>{" "}
    </div>

  );
}
