import React, { useEffect, useState } from "react";
import axios from "axios";
export const UseBookSearch = (query, pageNumber) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  useEffect(()=>{
      setBooks([])
  },[query])
  useEffect(() => {
    setIsLoading(true);
    setError(false);
    let cancle;
    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: { q: query, page: pageNumber },
      //for to avoid send request every key change
      cancelToken: new axios.CancelToken((c) => (cancle = c)),
    })
      .then((res) => {
        setBooks((prev) => {
          return [
              //aviod array elemnts repeating
            ...new Set([
              ...prev,
              ...res.data.docs.map((data) => {
                return data.title;
              }),
            ]),
          ];
        });
        setHasMore(res.data.docs.lentgh>0)
        setIsLoading(false);
        console.log(books);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true)
      });

    return () => cancle();
  }, [query, pageNumber]);
  return {isLoading,error,books,hasMore};
};
