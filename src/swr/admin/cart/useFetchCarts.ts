import React from "react";
import useSWR from "swr";

const useFetchAllCarts = () => {
  const fetcher = async (...args: [RequestInfo, RequestInit]) => {
    const [url, options] = args;
    const res = await fetch(url, { ...options });
    return await res.json();
  };

  const { data, error, isValidating, mutate, isLoading } = useSWR(
    `https://thi-api.onrender.com/api/admin/user-orders/carts`,
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

export { useFetchAllCarts };
