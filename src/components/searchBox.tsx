import React, { useEffect, useState } from "react";
import styles from "../assets/styles/SearchBox.module.css";
import { useDebounce } from "../features";

interface SearchBoxProps {
  search: Function;
}

/* This component renders a searchbox. If the user types in the searchbox it triggers a search function to get the desired results */
export default function SearchBox({ search }: SearchBoxProps) {
  // initialising the searchText variable and setting it to an empty string
  const [searchText, setSearchText] = useState<string>("");

  // gets the debouncedValue from the useDebounced hook to prevent each keystroke in the searchbox trigger a search and trigger it only when a specified delay found between two key srokes, here the delay supplied is 500ms. This enhances the performance as well  as the user experience
  const { debouncedValue } = useDebounce(searchText, 500);

  // The useEffect hook triggers a search with an empty string as searchText in the intial render, which brings in the complete dishes data. The subsequent calls on the search function is triggered only when there is a change in the debouncedValue. The debounced value is set to the value of the searchText box with a delay of 500ms after the user has finished typing (or in between)
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
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search for dishes..."
        className={styles.search_input}
      />
    </div>
  );
}
