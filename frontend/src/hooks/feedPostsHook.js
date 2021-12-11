import { useState, useEffect } from "react";
import axios from "axios";
import {BaseUrl} from "../constants";

export default function UserPostHook(
    userId,
    pageNumber,
    setPageNumber,
    deletePosts
) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [pagenumber, setpagenumber] = useState(pageNumber);

    useEffect(() => {
        setPosts([]);
    }, [userId, deletePosts]);

    useEffect(() => {
        // console.log(pageNumber);
        let cancel;
        setLoading(true);
        setError(false);
        axios({
            method: "get",
            url: BaseUrl+"/getAllPosts",
            params: {
                id:
                    localStorage.getItem("user") !== null
                        ? JSON.parse(localStorage.getItem("user")).id
                        : "",
                pageNumber: pageNumber,
            },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
            .then((res) => {
                console.log("Hook: ", res.data.posts);
                setPosts((posts) => {
                    return [...posts].concat(res.data.posts);
                });
                console.log("SET POSTS: ", posts);
                setHasMore(res.data.remPosts);
                setLoading(false);
            })
            .catch((error) => {
                if (axios.isCancel(error)) return;
                setLoading(false);
                setError(true);
            });
        return () => cancel();
    }, [userId, pageNumber, deletePosts]);
    return { loading, error, posts, hasMore };
}
