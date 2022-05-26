import {useEffect} from "react";
import {Error} from "./Views/Error";
import {Loading} from "./Views/Loading";
import {UserCard} from "./Views/UserCard";
import {useGetUserQuery} from "../redux/api";

export function User({ id }) {

  const { currentData: user, isError, isFetching,refetch } = useGetUserQuery(+id);

  useEffect(() => {
    if (isError) refetch();
  }, [isError]);

  if (isFetching && !user) return <Loading />;
  if (isError) return <Error />;
  if (user) return <UserCard user={user} disabled={isFetching} />;
  return null;
}
