import useSWR from "swr";

interface Props {
  token: string;
}

const useGetUser = ({ token }: Props) => {
  const fetcher = (...args: [RequestInfo, RequestInit]) => {
    const [url, options] = args;

    // Create a new Headers object and set the Authorization header with the bearer token
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    return fetch(url, { ...options, headers }).then((res) => res.json());
  };

  const { data, error, isValidating, mutate, isLoading } = useSWR(
    `https://thi-api.onrender.com/api/user/auth`,
    fetcher
  );

  return {
    user: data,
    isLoading,
    error,
    isValidating,
    mutate,
  };
};

export default useGetUser;
