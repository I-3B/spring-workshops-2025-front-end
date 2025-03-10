import { Comment } from "./components/comment";
import { Post } from "./components/post";


const data = {
  post: { title: "Hello, World!", content: "This is my first post." },
  comments: [
    {
      id: 1,
      author: "Alice",
      text: "Great post!",
      replies: [
        { id: 11, author: "Bob", text: "I agree!" },
        { id: 12, author: "Charlie", text: "Thanks for sharing." },
      ],
    },
    {
      id: 2,
      author: "David",
      text: "Interesting perspective.",
      replies: [],
    },
    {
      id: 3,
      author: "Eve",
      text: "Could you elaborate on that?",
      replies: [{ id: 31, author: "Frank", text: "Sure, let me explain..." }],
    },
  ],
};
function App() {
  return (
    <div>
      <Post post={data.post} />
      <ul className="comments">
        {data.comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      </ul>
    </div>
  );
}

function Hello({ name }) {
  return <p>Hello, {name}!</p>;
}
export default App;
