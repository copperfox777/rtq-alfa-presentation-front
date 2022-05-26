import { CurrentUser } from "../components/CurrentUser";
import { User } from "../components/User";
import { Title } from "../components/Views/Title";

export function Main() {
  return (
    <div className="m-10">
      <div className="flex justify-between text-3xl font-bold mb-10 ">
        <Title text="Main" />
        <CurrentUser id={1} />
      </div>
      <div className="flex flex-col gap-10">
        <User id={1} />
        <User id={2} />
        <User id={3} />
        <User id={4} />
        <User id={5} />
        <User id={6} />
      </div>
    </div>
  );
}
