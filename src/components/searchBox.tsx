import React, { useEffect, useState } from "react";
import styles from "../assets/styles/SearchBox.module.css";
import { useDebounce } from "../features";

interface SearchBoxProps {
  search: Function;
}

export default function SearchBox({ search }: SearchBoxProps) {
  const [searchText, setSearchText] = useState<string>("");

  const { debouncedValue } = useDebounce(searchText, 500);

  const handleOnChange = (searchText: string) => {
    setSearchText(searchText);
  };

  useEffect(() => {
    function searchDishes() {
      search(debouncedValue);
    }
    searchDishes();
  }, [debouncedValue]);

  return (
    <div className={styles.search_container}>
      <h2>Search</h2>
      <input
        type="search"
        value={searchText}
        onChange={(e) => handleOnChange(e.target.value)}
        placeholder="Search for dishes..."
        className={styles.search_input}
      />
    </div>
  );
}
