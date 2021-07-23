import React from 'react';
import { Link } from 'react-router-dom';
import { setAccessToken } from '../accessToken';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface Props {}

export const Header: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <div>you are logged in as: {data.me.email}</div>;
  } else {
    body = <div>not logged in</div>;
  }

  return (
    <header>
      <div>
        <Link to="/">home</Link>
      </div>
      <div>
        <Link to="/signup">register</Link>
      </div>
      <div>
        <Link to="/signin">login</Link>
      </div>
      <div>
        <Link to="/bye">bye</Link>
      </div>
      <div>
        {!loading && data && data.me ? (
          <button
            onClick={async () => {
              await logout();
              setAccessToken('');
              await client!.resetStore();
            }}
          >
            logout
          </button>
        ) : null}
      </div>
      {body}
    </header>
  );
};
