import {useParams} from "react-router-dom";
import {useGetPostsQuery} from "../redux/api";
import {PostCard} from "../components/Views/PostCard";
import {Error} from "../components/Views/Error";
import {Loading} from "../components/Views/Loading";
import {Title} from "../components/Views/Title";
import {User} from "../components/User";
import {useEffect} from "react";

export function UserPage() {

  const { id } = useParams();
  const {data: posts, isError, isFetching,refetch} = useGetPostsQuery(+id);

    useEffect(() => {
        if (isError) refetch();
    }, [isError]);

  return (
    <div className="m-10">
      <div className="flex gap-10 justify-end mb-10 items-center">
        <Title text="User" />
      </div>
      <User id={id}/>
      <div className="my-10">
        {isFetching && <Loading/>}
        {isError && <Error/>}
        {!isFetching &&
            !isError &&
            posts?.map((post) => (
                <PostCard key={post.id} post={post}/>
            ))}
      </div>
    </div>
  );
}
