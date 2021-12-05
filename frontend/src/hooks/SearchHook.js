import { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../constants";

export default function SearchHook(searchTerm, pagenumber) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [pageNumber, setPageNumber] = useState(pagenumber);
    const [typingTimeout, setTypingTimeout] = useState(0);
    useEffect(() => {
        setSearchedUsers([]);
    }, [searchTerm]);

    useEffect(() => {
        // SearchFunction();
        let searchTimeout = setTimeout(SearchFunction, 500);
        return () => {
            clearTimeout(searchTimeout);
        };
    }, [searchTerm, pageNumber]);

    const SearchFunction = () => {
        if (searchTerm.length > 0) {
            let cancel;
            setLoading(true);
            setError(false);
            axios({
                method: "GET",
                url: BaseUrl+`/searchUsers`,
                params: {
                    searchTerm,
                    pageNumber,
                    token: localStorage.getItem("jwt"),
                },
                cancelToken: new axios.CancelToken((c) => (cancel = c)),
            })
                .then((res) => {
                    console.log("Search Hook: ", res.data);
                    setLoading(false);
                    setSearchedUsers(res.data.users);
                    setHasMore(res.data.hasMore);
                })
                .catch((err) => {
                    if (axios.isCancel(err)) return;
                    setError(true);
                });
            return () => cancel();
        }
    };

    return { loading, error, searchedUsers, hasMore, setPageNumber };
}
