import { CommentItem } from "./comment-item";

export type Comments = {
  username: string;
  comment: string;
  replies: Comments[];
};

const comments: Comments[] = [
  {
    username: "User 1",
    comment:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, possimus! Consectetur temporibus quos omnis corporis reiciendis ullam sed facilis maiores dolores est sint, eaque blanditiis natus suscipit. At, nam voluptas.",
    replies: [],
  },
  {
    username: "User 2",
    comment:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, possimus! Consectetur temporibus quos omnis corporis reiciendis ullam sed facilis maiores dolores est sint, eaque blanditiis natus suscipit. At, nam voluptas.",
    replies: [
      {
        username: "User  1",
        comment:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, possimus! Consectetur temporibus quos omnis corporis reiciendis ullam sed facilis maiores dolores est sint, eaque blanditiis natus suscipit. At, nam voluptas.",
        replies: [],
      },
      {
        username: "User 3",
        comment:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, possimus! Consectetur temporibus quos omnis corporis reiciendis ullam sed facilis maiores dolores est sint, eaque blanditiis natus suscipit. At, nam voluptas.",
        replies: [],
      },
    ],
  },
  {
    username: "User 2",
    comment:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, possimus! Consectetur temporibus quos omnis corporis reiciendis ullam sed facilis maiores dolores est sint, eaque blanditiis natus suscipit. At, nam voluptas.",
    replies: [
      {
        username: "User  1",
        comment:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, possimus! Consectetur temporibus quos omnis corporis reiciendis ullam sed facilis maiores dolores est sint, eaque blanditiis natus suscipit. At, nam voluptas.",
        replies: [],
      },
      {
        username: "User 3",
        comment:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, possimus! Consectetur temporibus quos omnis corporis reiciendis ullam sed facilis maiores dolores est sint, eaque blanditiis natus suscipit. At, nam voluptas.",
        replies: [
          {
            username: "User  1",
            comment:
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, possimus! Consectetur temporibus quos omnis corporis reiciendis ullam sed facilis maiores dolores est sint, eaque blanditiis natus suscipit. At, nam voluptas.",
            replies: [
              {
                username: "User  1",
                comment:
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, possimus! Consectetur temporibus quos omnis corporis reiciendis ullam sed facilis maiores dolores est sint, eaque blanditiis natus suscipit. At, nam voluptas.",
                replies: [],
              },
              {
                username: "User 3",
                comment:
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, possimus! Consectetur temporibus quos omnis corporis reiciendis ullam sed facilis maiores dolores est sint, eaque blanditiis natus suscipit. At, nam voluptas.",
                replies: [],
              },
            ],
          },
          {
            username: "User 3",
            comment:
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, possimus! Consectetur temporibus quos omnis corporis reiciendis ullam sed facilis maiores dolores est sint, eaque blanditiis natus suscipit. At, nam voluptas.",
            replies: [
              {
                username: "User 3",
                comment:
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, possimus! Consectetur temporibus quos omnis corporis reiciendis ullam sed facilis maiores dolores est sint, eaque blanditiis natus suscipit. At, nam voluptas.",
                replies: [
                  {
                    username: "User 3",
                    comment:
                      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, possimus! Consectetur temporibus quos omnis corporis reiciendis ullam sed facilis maiores dolores est sint, eaque blanditiis natus suscipit. At, nam voluptas.",
                    replies: [
                      {
                        username: "User 3",
                        comment:
                          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, possimus! Consectetur temporibus quos omnis corporis reiciendis ullam sed facilis maiores dolores est sint, eaque blanditiis natus suscipit. At, nam voluptas.",
                        replies: [
                          {
                            username: "User 3",
                            comment:
                              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, possimus! Consectetur temporibus quos omnis corporis reiciendis ullam sed facilis maiores dolores est sint, eaque blanditiis natus suscipit. At, nam voluptas.",
                            replies: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export function Comments() {
  return (
    <div className="w-4xl m-auto my-5 border-2 px-5 border-gray-400">
      {comments.map((comment, index) => (
        <CommentItem key={index} comment={comment} />
      ))}
    </div>
  );
}
