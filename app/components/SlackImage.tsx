type Meme = {
  authors: string[];
  content: string;
  image: string;
  tags: string[];
};

export default async function SlackImage({ meme }: { meme: Meme }) {
  const blob = await fetch(meme.image, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
    },
  })
    .then((res) => res.arrayBuffer())
    .then((buffer) => {
      const b64 = Buffer.from(buffer).toString("base64");
      return b64;
    });

  const src = "data:image/png" + ";base64," + blob;

  return <img src={src} alt="" className="dark:invert border-0" width="100%" />;
}
