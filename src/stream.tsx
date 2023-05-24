
const formatDate = (date: Date) =>
  date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  });

export function MessageStream({ messages }) {
    return messages.length < 1 ? (
        <div className="empty">No messages</div>
      ) : (
        messages.map((message, i) => (
          <div className="message-wrapper" key={i}>
            <div className="role">Role: {message.role}</div>
            <pre className="chat-message">{message.content}</pre>
            {!message.meta.loading && (
              <div className="tag-wrapper">
                <span className="tag">
                  Timestamp: {formatDate(new Date(message.timestamp))}
                </span>
                {message.role === 'assistant' && (
                  <>
                    <span className="tag">
                      Tokens: {message.meta.chunks.length}
                    </span>
                    <span className="tag">
                      Response time: {message.meta.responseTime}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        ))
      );
}