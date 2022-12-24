import React, {memo, useEffect, useState} from 'react';
import axios from "axios";

export const Request = memo(() => {
    type CommentType = {
        postId: number,
        id: number,
        name: string
        email: string
        body: string
    }

    const [comments, setComments] = useState<CommentType[]>([])

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/comments`)
            .then(response => setComments(response.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <ul>
                {comments.map((el, index) =>
                    <li key={index}>
                        <span>{el.id}))) </span>
                        <span>{el.name}---  </span>
                        <span>{el.body}</span>
                    </li>,
                )}

            </ul>
        </div>
    );
});

