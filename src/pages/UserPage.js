import {useNavigate, useParams} from "react-router-dom";
import {useGetPostsQuery, useGetUserQuery} from "../redux/api";
import {PostCard} from "../components/Views/PostCard";
import {Error} from "../components/Views/Error";
import {Loading} from "../components/Views/Loading";
import {Title} from "../components/Views/Title";
import {User} from "../components/User";
import {Button} from "../components/Views/Button";
import cl from "classnames";

export function UserPage() {
    const {id} = useParams();
    const navigate = useNavigate()
    const {
        data: posts,
        isError,
        isLoading,
        isFetching,
        refetch: refetchPosts,
    } = useGetPostsQuery(+id);

    const {refetch: refetchUser} = useGetUserQuery(+id);

  return (
      <div className="m-10">
          <div className="flex gap-10 justify-end mb-10 items-center">
              <Title text="User"/>
              <Button title="Refetch User" onClick={refetchUser}/>
              <Button title="Refetch Posts" onClick={refetchPosts}/>
              <Button
                  title="Edit User"
                  className="self-start justify-self-end"
                  onClick={() => navigate(`/editUser/${id}`)}
              />
          </div>
          <User id={id}/>
          <div className="my-10">
              {isLoading && <Loading/>}
              {isError && <Error/>}
              <div className={cl(isFetching && "opacity-50")}>
                  {posts?.map((post) => (
                      <PostCard key={post.id} post={post}/>
                  ))}
              </div>
          </div>
      </div>
  );
}
