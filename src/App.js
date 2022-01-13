import "./App.css";
import { UseBookSearch } from "./useBookSearch";
import { useState } from "react";
function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { books, error, hasMore, isLoading } = UseBookSearch(query, pageNumber);
  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(2);
  };
  return (
    <div className="App">
      {isLoading&&<p>Loading....</p>}
      <input type="text" onChange={handleSearch} />
      {books.map((book,index)=>{
        return <p>{index} {book}</p>
      })}
      {error&&<p>Somthing went wrong</p>}
    </div>
  );
}

export default App;
