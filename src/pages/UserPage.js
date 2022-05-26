import { useParams } from "react-router-dom";
import { useGetPostsQuery, useGetUserQuery } from "../redux/api";
import { PostCard } from "../components/Views/PostCard";
import { Error } from "../components/Views/Error";
import { Loading } from "../components/Views/Loading";
import { Title } from "../components/Views/Title";
import { User } from "../components/User";
import { useEffect } from "react";
import { Button } from "../components/Views/Button";
import cl from "classnames";

export function UserPage() {
  const { id } = useParams();
  const {
    data: posts,
    isError,
    isLoading,
    isFetching,
    refetch: refetchPosts,
  } = useGetPostsQuery(+id, {
    refetchOnReconnect: true,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const { refetch: refetchUser } = useGetUserQuery(+id);

  useEffect(() => {
    if (isError) refetchPosts();
  }, [isError]);

  return (
    <div className="m-10">
      <div className="flex gap-10 justify-end mb-10 items-center">
        <Button title="Refetch User" onClick={refetchUser} />
        <Button title="Refetch Posts" onClick={refetchPosts} />
        <Title text="User" />
      </div>
      <User id={id} />
      <div className="my-10">
        {isLoading && <Loading />}
        {isError && <Error />}
        <div className={cl(isFetching && "opacity-50")}>
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
