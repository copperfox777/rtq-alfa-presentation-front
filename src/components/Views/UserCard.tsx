import { useNavigate } from "react-router-dom";
import cl from "classnames"

export function UserCard(props: { user: IUser; disabled?: boolean }) {
  const navigate = useNavigate();
  return (
    <div
      className={cl("card h-32",props.disabled && "opacity-50")}
      onClick={() => navigate(`/user/${props.user.id}`)}
    >
      <div className="grid grid-flow-col">
        <div className="mr-3 flex">
          <img
            className="w-20 h-20 rounded-full mr-10 "
            src={props.user.avatar}
            alt="avatar"
          />
          <div className="justify-self-start">
            <div className="font-bold mb-5">{props.user.name}</div>
            <div>{props.user.job}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
