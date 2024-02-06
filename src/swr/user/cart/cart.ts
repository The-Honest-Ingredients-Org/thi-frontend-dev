import React from "react";
import useSWR, { SWRConfiguration } from "swr";

interface ReadProps {
  token: string;
}

const useReadCart = ({ token }: ReadProps) => {
  const fetcher = async (...args: [RequestInfo, RequestInit]) => {
    const [url, options] = args;

    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    return fetch(url, { ...options, headers }).then((res) => res.json());
  };

  const swrConfig: SWRConfiguration<any, any> = {
    fetcher,
  };

  const { data, error, isValidating, mutate, isLoading } = useSWR(
    `https://thi-api.onrender.com/api/user/cart`,
    swrConfig
  );

  return {
    cart: data,
    isLoading,
    error,
    isValidating,
    mutate,
  };
};

export { useReadCart };
