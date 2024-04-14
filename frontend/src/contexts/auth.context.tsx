import { ReactNode, createContext, useState } from 'react';
import { TOKEN } from '../constants/constants';

type Props = {
  children?: ReactNode;
};

type User = {
  id: string;
  name: string;
  organization : string;
  phoneNumber: string;
};

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  token : string | null;
  setToken : (token : string | null) => void;
};

const loggedInUser = localStorage.getItem('user');
const jwtToken = localStorage.getItem(TOKEN);

const initialState = {
  authenticated: loggedInUser && jwtToken ? true : false,
  setAuthenticated: () => { },
  user: loggedInUser ? JSON.parse(loggedInUser) : null,
  setUser: () => { },
  setToken : () => {},
  token : jwtToken ? jwtToken : null
};

const AuthContext = createContext<IAuthContext>(initialState);

const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState(
    initialState.authenticated
  );

  const [user, setUser] = useState<User | null>(initialState.user);
  const [token, setToken] = useState<string | null> (initialState.token);

  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, user, setUser,setToken,token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
