import { useState, useEffect } from "react";
import { url } from "App";
import {useGetUserQuery} from "../redux/rtk";

export function CurrentUser({ id }) {
  const [user, setUser] = useState();
  const [isError, setError] = useState(false);
  useEffect(() => {
    async function getData() {
      setError(false);
      try {
        const response = await fetch(url + `users/${id}`);
        let data = await response.json();
        setUser(data);
        setError(false);
      } catch (e) {
        setError(true);
      }
    }

    getData();
  }, [id]);
  if (isError) return <h1>Error</h1>;
  if (!user) return null;
  return <h1>{user.name}</h1>;
}
