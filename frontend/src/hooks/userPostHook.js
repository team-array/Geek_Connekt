import { useState, useEffect } from "react";
import axios from "axios";

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
        let cancel;
        setLoading(true);
        setError(false);
        axios({
            method: "get",
            url: "http://localhost:8000/getUserImage",
            params: {
                userId: userId,
                pageNumber: pagenumber,
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
    }, [userId, pagenumber, deletePosts]);
    return { loading, error, posts, hasMore };
}
