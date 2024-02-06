import React from "react";
import useSWR from "swr";

interface Props {
  productId: string;
}

const useFetchProduct = ({ productId }: Props) => {
  const fetcher = (...args: [RequestInfo, RequestInit]) => {
    const [url, options] = args;
    return fetch(url, { ...options }).then((res) => res.json());
  };

  const { data, error, isValidating, mutate, isLoading } = useSWR(
    `https://thi-api.onrender.com/api/user/product/${productId}`,
    fetcher
  );

  return {
    product: data,
    isLoading,
    error,
    isValidating,
    mutate,
  };
};

const useAllProducts = () => {
  const fetcher = (...args: [RequestInfo, RequestInit]) => {
    const [url, options] = args;
    return fetch(url, { ...options }).then((res) => res.json());
  };

  const { data, error, isValidating, mutate, isLoading } = useSWR(
    `https://thi-api.onrender.com/api/user/product`,
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

export { useFetchProduct, useAllProducts };
