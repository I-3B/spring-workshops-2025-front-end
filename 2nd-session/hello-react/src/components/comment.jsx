export function Comment({ comment }) {
  return (
    <div className="comment">
      <p>{comment.author}</p>
      <p>{comment.text}</p>
      {comment.replies.length !== 0 && (
        <div className="replies">
          {comment.replies.map((reply, index) => {
            // HOMEWORK!!!!
            return <Reply color={index % 2 == 0 ? "blue" : "red"} key={reply.id} reply={reply} />;
          })}
        </div>
      )}
    </div>
  );
}

function Reply({ reply }) {
  return (
    <p className="reply">
      {reply.author}: {reply.text}
    </p>
  );
}
