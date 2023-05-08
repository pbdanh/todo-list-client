import { useSelector } from "react-redux";

export default function content() {
  const selector = useSelector;
  const count = selector((state) => state.danhPB.value);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}
