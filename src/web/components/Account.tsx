import { hc } from "hono/client";
import { useCallback, useState } from "hono/jsx";
import type { ApiType } from "../../api";
import type { SelectUser } from "../../db";
import { Button } from "./Button";
import { HoverMenu } from "./HoverMenu";
import { Input } from "./Input";
import { Label } from "./Label";

export function Account() {
  const [user, setUser] = useState<SelectUser>();

  const logout = useCallback(() => {
    setUser(undefined);
  }, []);

  if (user) {
    return <Profile user={user} logout={logout} />;
  }

  return <Unauthenticated setUser={setUser} />;
}

type ProfileProps = {
  user: SelectUser;
  logout: () => void;
};

function Profile({ user, logout }: ProfileProps) {
  return (
    <HoverMenu trigger={user.name ?? user.email}>
      <Button onClick={logout}>Logout</Button>
    </HoverMenu>
  );
}

type UnauthenticatedProps = {
  setUser: (user: SelectUser) => void;
};

function Unauthenticated({ setUser }: UnauthenticatedProps) {
  return (
    <HoverMenu trigger={<div>Account</div>}>
      <div className="flex gap-4">
        <LoginForm setUser={setUser} />
        <RegisterForm setUser={setUser} />
      </div>
    </HoverMenu>
  );
}

async function authenticate(email: string, password: string) {
  const client = hc<ApiType>("/api");

  const response = await client.auth.$post({
    json: {
      email,
      password,
    },
  });

  return await response.json();
}

async function createAccount(email: string, password: string) {
  const client = hc<ApiType>("/api");

  const response = await client.users.$post({
    json: {
      email,
      password,
    },
  });

  return await response.json();
}

function LoginForm({ setUser }: UnauthenticatedProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = useCallback(() => {
    authenticate(email, password).then((result) => {
      if (result) {
        const { user } = result;
        // @ts-ignore
        setUser(user);
      }
    });
  }, [email, password, setUser]);

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

function RegisterForm({ setUser }: UnauthenticatedProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = useCallback(() => {
    createAccount(email, password).then((result) => {
      if (result) {
        const { user } = result;
        // @ts-ignore
        setUser(user);
      }
    });
  }, [email, password, setUser]);

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
