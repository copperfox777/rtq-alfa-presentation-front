import { useGetUserQuery } from "redux/api";
import { Loading } from "./Views/Loading";
import { Error } from "./Views/Error";
import { UserCard } from "./Views/UserCard";

export function UserRTQ({ id, isMutating }: { id: number, isMutating:boolean }) {
  const { currentData: user, isError, isFetching } = useGetUserQuery(+id);
  
  if (isFetching && !user) return <Loading />;
  if (isError) return <Error />;
  if (user) return <UserCard user={user} disabled={isMutating || isFetching} />;
  return null;
}
