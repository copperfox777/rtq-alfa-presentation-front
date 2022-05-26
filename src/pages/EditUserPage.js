import { useParams } from "react-router-dom";
import {
  useGetUserQuery,
  useGetPostsQuery,
  useUpdateUserMutation,
} from "redux/api";
import { useEffect, useState, useRef } from "react";
import { Button } from "components/Views/Button";
import { toast, ToastContainer } from "react-toastify";
import { UserRTQ } from "../components/UserRTQ";
import { Title } from "../components/Views/Title";
import * as PropTypes from "prop-types";

function EditUser(props) {
  const idRef = useRef();
  const nameRef = useRef();
  const jobRef = useRef();

  const {
    data: user,
    isError,
    isFetching,
    refetch: refetchUser,
  } = useGetUserQuery(+props.id, {
    skip: !props.id,
  });

  // Заполняем поля после загрузки
  useEffect(() => {
    if (user) {
      idRef.current.value = user.id;
      nameRef.current.value = user.name;
      jobRef.current.value = user.job;
    }
  }, [user]);

  const handleUpdate = () => {
    const data = {
      id: idRef.current.value,
      name: nameRef.current.value,
      job: jobRef.current.value,
    };
    props.updateUser(data);
  };

  return (
    <div className="card mt-10 ">
      <div className="flex w-full justify-end gap-x-5">
        <Button
          title="Load"
          onClick={() => {
            props.setId(+idRef.current.value);
            refetchUser(+idRef.current.value);
          }}
        />
        <Button title="Save" onClick={handleUpdate} />
      </div>
      <label htmlFor="id">id</label>
      <input id="id" ref={idRef} />

      <label htmlFor="name">Name</label>
      <input id="name" ref={nameRef} />

      <label htmlFor="job">Job</label>
      <input id="job" ref={jobRef} />
    </div>
  );
}

export function EditUserPage() {
  const { id: initialId } = useParams();
  const [id, setId] = useState(+initialId);

  const [updateUser, { isLoading: isMutating }] = useUpdateUserMutation();

  return (
    <div className="m-10">
      <Title text="Edit" />
      <div className="flex gap-10 justify-end mb-10"></div>

      <div className="flex gap-10 flex-col">
        <UserRTQ id={id} isMutating={isMutating} />
        <UserRTQ id={1} />
      </div>

      <EditUser id={id} setId={setId} updateUser={updateUser} />
    </div>
  );
}
