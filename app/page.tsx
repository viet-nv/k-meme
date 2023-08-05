import Search from "./components/Search";
import SlackImage from "./components/SlackImage";
import { data } from "./constants";

function removeAccents(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export default async function Home({
  searchParams,
}: {
  searchParams: { query: string | undefined; author: string | undefined };
}) {
  const query = (searchParams.query || "").toLowerCase();
  const author = searchParams.author || "";

  const filteredData = data.filter((item) => {
    const isContainContent = removeAccents(item.content)
      .toLowerCase()
      .includes(query);
    const isTag = item.tags.map((i: string) => i.toLowerCase()).includes(query);
    return (
      (isContainContent || isTag) &&
      (author ? item.authors.includes(author) : true)
    );
  });

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Search />
      <div className="grid gap-4 items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredData.map((item) => (
          <SlackImage meme={item} key={item.image} />
        ))}
      </div>
    </div>
  );
}
