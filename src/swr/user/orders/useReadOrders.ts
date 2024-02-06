import React from "react";
import useSWR from "swr";

interface ReadProps {
  token: string;
}

const useReadOrders = ({ token }: ReadProps) => {
  const fetcher = (...args: [RequestInfo, RequestInit]) => {
    const [url, options] = args;

    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    return fetch(url, { ...options, headers }).then((res) => res.json());
  };

  const { data, error, isValidating, mutate, isLoading } = useSWR(
    `https://thi-api.onrender.com/api/user/order`,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
    isValidating,
    mutate,
  };
};

export { useReadOrders };
