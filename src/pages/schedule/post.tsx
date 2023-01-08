import { IPost } from "../../objects/schedule/schedule-interface";
import ReactMarkdown from "react-markdown";

export function Post({ post }: { post: IPost }) {
    return (
        <>
            <h2>{post.title}</h2>
            <div>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </>
    );
}
