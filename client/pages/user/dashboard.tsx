import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import InfiniteScroll from "react-infinite-scroller";
import SearchBar from "../../components/SearchBar";
import CardBook from "../../components/CardBook";
import Loading from "../../components/Loading";
import axios from "axios";

const Dashboard: React.FC = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [distance, setDistance] = useState(1200);
  const { userData } = useAuthContext();

  const pageSize = 12;

  const handleSearchbar = (
    q: string,
    cat: string,
    stat: string,
    dis: number
  ): void => {
    cat === "Tutte" ? setCategory("") : setCategory(cat);
    setStatus(stat);
    setDistance(dis);
    setQuery(q);
  };

  const fetchBooks = async ({ pageParam = 0 }) => {
    const pageSkip = pageParam * pageSize;

    const fetch = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/books/search?q=${query}&category=${category}&status=${status}&radius=${distance}&lon=${userData?.location?.coordinates[0]}&lat=${userData?.location?.coordinates[1]}&pageSkip=${pageSkip}&pageSize=${pageSize}`
    );
    const result = fetch.data;

    return { result, nextPage: pageParam + 1 };
  };

  const {
    data,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["book", query, category, distance, status],
    queryFn: fetchBooks,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextPage < lastPage.result.totalBooks / pageSize)
        return lastPage.nextPage;
      return undefined;
    },
  });

  const memoBooks = useMemo(() => {
    return isLoading ? (
      <Loading />
    ) : isError ? (
      <p> Qualcosa è andato storto! </p>
    ) : data?.pages[0].result.books.length === 0 ? (
      <div className="flex justify-center items-center mt-12">
        <h3 className="font-bold text-lg">Nessun libro trovato</h3>
      </div>
    ) : (
      <div className="overflow-auto">
        {data?.pages.map((page, i) => (
          <div
            className="xl:grid xl:grid-cols-4 mx-20 lg:mx-28 gap-y-4"
            key={i}
          >
            {page.result.books.map((book: any) => (
              <CardBook
                key={book.isbn}
                cover={book.cover}
                title={book.title}
                author={book.author}
                status={book.status}
                id={book._id}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }, [data]);

  return (
    <div className="flex flex-col items-center ">
      <h3 className="text-5xl xl:text-7xl font-black text-center mt-12 text-darkblue tracking-tighter">
        {" "}
        Esplora il flusso{" "}
      </h3>
      <SearchBar onSearch={handleSearchbar} />
      <div className="mt-12">{/* Divider */}</div>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          if (!isFetching && !isFetchingNextPage) fetchNextPage();
        }}
        hasMore={hasNextPage}
        useWindow={true}
        threshold={30}
        loader={
          <div className="flex justify-center mb-20" key={0}>
            <Loading />
          </div>
        }
      >
        {memoBooks}
      </InfiniteScroll>
    </div>
  );
};

export default Dashboard;
