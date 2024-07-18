import { useCallback, useContext, useState } from "hono/jsx";
import { AppContext } from "../../contexts";
import { authenticate, createAccount } from "../../rpc";
import { Button } from "./Button";
import { HoverMenu } from "./HoverMenu";
import { Input } from "./Input";
import { Label } from "./Label";

export function Account() {
  const { auth } = useContext(AppContext);

  if (auth) {
    return <Profile />;
  }

  return <Unauthenticated />;
}

function Profile() {
  const { auth, setAuth } = useContext(AppContext);

  if (!auth) {
    return null;
  }

  return (
    <HoverMenu trigger={auth.user.name ?? auth.user.email}>
      <Button onClick={() => setAuth(null)}>Logout</Button>
    </HoverMenu>
  );
}

function Unauthenticated() {
  return (
    <HoverMenu trigger={<div>Account</div>}>
      <div className="flex gap-4">
        <LoginForm />
        <RegisterForm />
      </div>
    </HoverMenu>
  );
}

// async function authenticate(email: string, password: string) {
//   const client = hc<ApiType>("/api");
//
//   const response = await client.auth.$post({
//     json: {
//       email,
//       password,
//     },
//   });
//
//   return await response.json();
// }
//
// async function createAccount(email: string, password: string) {
//   const client = hc<ApiType>("/api");
//
//   const response = await client.users.$post({
//     json: {
//       email,
//       password,
//     },
//   });
//
//   return await response.json();
// }

function LoginForm() {
  const { setAuth } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = useCallback(
    () => authenticate(email, password).then(setAuth),
    [email, password, setAuth],
  );

  return (
    <div className="flex flex-col gap-4">
      <Label>Email</Label>
      <Input value={email} setValue={setEmail} />
      <Label>Password</Label>
      <Input value={password} setValue={setPassword} type="password" />
      <Button onClick={onSubmit}>Login</Button>
    </div>
  );
}

function RegisterForm() {
  const { setAuth } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = useCallback(() => {
    createAccount(email, password).then(setAuth);
  }, [email, password, setAuth]);

  return (
    <div className="flex flex-col gap-4">
      <Label>Email</Label>
      <Input value={email} setValue={setEmail} />
      <Label>Password</Label>
      <Input value={password} setValue={setPassword} type="password" />
      <Button onClick={onSubmit}>Register</Button>
    </div>
  );
}
