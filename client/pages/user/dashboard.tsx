import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import SearchBar from "../../components/SearchBar";

const Dashboard: React.FC = () => {
  const fetchBooks = async ({ pageParam = 0 }) => {
    const fetch = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/books/search`
    );
    return fetch.data;
  };

  /*const { data, isLoading, isError, error } = useQuery({
    queryKey: ["book"],
    queryFn: () => fetchBooks(),
  });*/

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["book"],
    queryFn: fetchBooks,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  return (
    <div className="flex flex-col items-center ">
      <h3 className="text-5xl xl:text-7xl font-black text-center mt-12 text-darkblue tracking-tighter">
        {" "}
        Esplora il flusso{" "}
      </h3>
      <SearchBar />
    </div>
  );
};

export default Dashboard;
