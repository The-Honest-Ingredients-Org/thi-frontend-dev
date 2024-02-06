import React from "react";
import useSWR from "swr";

const useFetchAllOrders = () => {
  const fetcher = (...args: [RequestInfo, RequestInit]) => {
    const [url, options] = args;
    return fetch(url, { ...options }).then((res) => res.json());
  };

  const { data, error, isValidating, mutate, isLoading } = useSWR(
    `https://thi-api.onrender.com/api/admin/user-orders/orders`,
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

export { useFetchAllOrders };
