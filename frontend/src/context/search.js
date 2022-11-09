import { createContext, useContext, useState } from "react";

export const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export default function SearchProvider({ children }) {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [searchSubmit, setSearchSubmit] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        keywords,
        setKeywords,
        location,
        setLocation,
        searchSubmit,
        setSearchSubmit,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
