import { useCallback, useContext, useState } from "hono/jsx";
import { AppContext } from "../contexts";
import { authenticate, createAccount } from "../rpc";
import { Button, HoverMenu, Input, Label } from "./UI";

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
      <div className="flex gap-8 p-4">
        <LoginForm />
        <div className="border-r border-slate-200" />
        <RegisterForm />
      </div>
    </HoverMenu>
  );
}

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
      <span className="text-xl font-medium">Login</span>
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
      <span className="text-xl font-medium">Register</span>
      <Label>Email</Label>
      <Input value={email} setValue={setEmail} />
      <Label>Password</Label>
      <Input value={password} setValue={setPassword} type="password" />
      <Button onClick={onSubmit}>Register</Button>
    </div>
  );
}
