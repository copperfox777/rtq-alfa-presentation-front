import {useEffect, useState} from "react";
import {url} from "App";
import {Error} from "./Views/Error";
import {Loading} from "./Views/Loading";
import {UserCard} from "./Views/UserCard";

export function User({ id }) {
  const [user, setUser] = useState();
  const [isError, setError] = useState(false);
  const [isFetching, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setError(false);
      setLoading(true);
      try {
        const response = await fetch(url + `users/${id}`);
        let data = await response.json();
        setUser(data);
        setError(false);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    }

    getData();
  }, [id]);


  if (isFetching) return <Loading />;
  if (isError) return <Error />;
  if (!isFetching && !isError) return <UserCard user={user} />;
  return null;
}
