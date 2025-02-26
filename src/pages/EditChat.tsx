import { useParams } from "react-router";

export default function EditChatPage() {
  const { id } = useParams();

  return <div>{id}</div>;
}
