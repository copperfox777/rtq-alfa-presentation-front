import { Button } from "./Button";

export function PostCard(props) {
  return (
    <div className="card my-5">
      <div>
        <div className="font-bold">{props.post.title}</div>
        <div>{props.post.text}</div>
      </div>
    </div>
  );
}
