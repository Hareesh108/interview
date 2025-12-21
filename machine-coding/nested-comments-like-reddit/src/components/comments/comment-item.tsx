import type { Comments } from "./comments";

type Props = {
  comment: Comments;
};

export function CommentItem({ comment }: Readonly<Props>) {
  return (
    <div className="my-10">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
            alt="user"
            className="w-10"
          />
          <h1>{comment.username}</h1>
        </div>
        <div>
          <p>{comment.comment}</p>
        </div>
      </div>

      {!!comment.replies.length &&
        comment.replies?.map((comment,index) => (
          <div key={index} className="pl-5 border-l-4 border-l-pink-400">
            <CommentItem comment={comment} />
          </div>
        ))}
    </div>
  );
}
