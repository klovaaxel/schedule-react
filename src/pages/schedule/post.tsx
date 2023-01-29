import { IPost } from "../../objects/schedule/schedule-interface";
import ReactMarkdown from "react-markdown";
import "./post.scss";
import { useState } from "react";

export function Post({ post }: { post: IPost }) {
    const [content, setContent] = useState(post.content);
    const canEditContent = false; //getPermissions()
    function handleContentChange(e: any) {
        setContent(e.target.value);
    }

    return (
        <div className="post">
            <h2>{post.title}</h2>
            <div className="content">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            {canEditContent ? (
                <div className="edit {}" id={`edit-post-${post.id}`}>
                    <label htmlFor={`post-${post.id}`}>Edit</label>
                    <textarea
                        id={`post-${post.id}`}
                        name="content"
                        onChange={handleContentChange}
                    >
                        {content}
                    </textarea>
                    <button>Save</button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
