import {useNavigate, useParams} from "react-router-dom";
import {useGetPostsQuery, useGetUserQuery} from "redux/api";
import {useEffect} from "react";
import {Button} from "components/Views/Button";
import {PostCard} from "../components/Views/PostCard";
import {UserRTQ} from "../components/UserRTQ";
import {Error} from "../components/Views/Error";
import {Loading} from "../components/Views/Loading";
import {Title} from "../components/Views/Title";

export function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isError: errUser,
    refetch: refetchUser,
  } = useGetUserQuery(+id);
  const {
    data: posts,
    isError: errPosts,
    isFetching: loadingPosts,
    isSuccess: successPosts,
    refetch: refetchPosts,
  } = useGetPostsQuery(+id);

  useEffect(() => {
    if (errUser) refetchUser();
    if (errPosts) refetchPosts();
  }, [errUser, errPosts]);

  return (
    <div className="m-10">
      <div className="flex gap-10 justify-end mb-10 items-center">
        <Title text="User" />
        <Button title="Refetch User" onClick={refetchUser}/>
        <Button title="Refetch Posts" onClick={refetchPosts}/>
        <Button
            title="Edit User"
            className="self-start justify-self-end"
            onClick={() => navigate(`/editUser/${id}`)}
        />
      </div>
      <UserRTQ id={id}/>
      <div className="my-10">
        {loadingPosts && <Loading/>}
        {!loadingPosts && errPosts && <Error/>}
        {!loadingPosts &&
            !errPosts &&
            posts?.map((post) => (
                <PostCard key={post.id} post={post}/>
            ))}
      </div>
    </div>
  );
}
