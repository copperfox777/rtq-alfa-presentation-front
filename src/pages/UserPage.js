import {useParams} from "react-router-dom";
import {useGetPostsQuery} from "redux/api";
import {PostCard} from "../components/Views/PostCard";
import {Error} from "../components/Views/Error";
import {Loading} from "../components/Views/Loading";
import {Title} from "../components/Views/Title";
import {User} from "../components/User";

export function UserPage() {

  const { id } = useParams();
  const {data: posts, isError: errPosts, isFetching: loadingPosts} = useGetPostsQuery(+id);

  return (
    <div className="m-10">
      <div className="flex gap-10 justify-end mb-10 items-center">
        <Title text="User" />
      </div>
      <User id={id}/>
      <div className="my-10">
        {loadingPosts && <Loading/>}
        {errPosts && <Error/>}
        {!loadingPosts &&
            !errPosts &&
            posts?.map((post) => (
                <PostCard key={post.id} post={post}/>
            ))}
      </div>
    </div>
  );
}
