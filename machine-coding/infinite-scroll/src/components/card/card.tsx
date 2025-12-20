export type Memes = {
  author: string;
  nsfw: boolean;
  spoiler: boolean;
  subreddit: string;
  title: string;
  ups: number;
  postLink: string;
  url: string;
  preview: string[];
};

type Props = {
  meme: Memes;
};

export function Card({ meme }: Readonly<Props>) {
  return (
    <div className="border shadow-xs rounded-lg flex flex-col gap-2">
      <div className="bg-pink-300 p-3 overflow-clip">
        <h3 className="font-bold overflow-clip h-5">{meme?.title}</h3>
        <h6>{meme?.author}</h6>
      </div>
      <div className="w-full flex justify-center pb-2">
        <img src={meme?.preview[0]} alt="image1" height={100} width={100} className="h-32 w-32 object-cover" />
      </div>
    </div>
  );
}
