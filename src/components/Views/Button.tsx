export function Button(props: {
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={props.onClick}
      className={
        "px-4 py-2 font-semibold bg-cyan-500/25 text-white rounded-lg hover:bg-cyan-500/40 shadow-sm" +
        " " +
        props.className
      }
    >
      {props.title || props.children || "Button"}
    </button>
  );
}
