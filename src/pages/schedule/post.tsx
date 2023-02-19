import { IPost } from "../../objects/schedule/schedule-interface";
import ReactMarkdown from "react-markdown";
import "./post.scss";
import { useState } from "react";
import AssignmentChip from "../../components/assignment-chip/assignment-chip";

export function Post({ post }: { post: IPost }) {
    const [content, setContent] = useState(post.content);
    const canEditContent = false; //getPermissions()
    function handleContentChange(e: any) {
        setContent(e.target.value);
    }

    return (
        <div className="post">
            <h2>{post.title}</h2>
            <aside className="assignments">
                {post.assignments.map((assignment) => {
                    return (
                        <AssignmentChip
                            props={{ assignment: assignment, course: null }}
                        ></AssignmentChip>
                    );
                })}
            </aside>
            <section className="content">
                <ReactMarkdown>{content}</ReactMarkdown>
            </section>
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
