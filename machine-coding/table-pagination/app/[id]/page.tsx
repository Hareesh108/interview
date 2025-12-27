import { use } from "react";

export default function View({ params }: { params: Promise<{ id: string }> }) {
  const resolved = use(params);
  console.log(resolved);

  return <>Hello</>;
}
