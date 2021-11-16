import { useGetPosts } from './lib/api-hooks';
import { FetchState } from './types';
import './App.css';

function App() {
  const [posts, fetchState, getPosts] = useGetPosts();
  const btnOnClick = () => getPosts();

  return (
    <div className="container">
      <h1>React TypeScript API hooks</h1>
      {fetchState === FetchState.DEFAULT && (
        <>
          <p>
            Hello there, click the button below to get the list of posts from
            the API.
          </p>
          <button onClick={btnOnClick}>Get Posts</button>
        </>
      )}
      {fetchState === FetchState.LOADING && <p>Fetching posts...</p>}
      {fetchState === FetchState.ERROR && (
        <>
          <p>Oops! Something went wrong. Please try again.</p>
          <button onClick={btnOnClick}>Get Posts</button>
        </>
      )}
      {fetchState === FetchState.SUCCESS && (
        <>
          <p>Here's the list of posts:</p>
          <ul className="posts-list">
            {posts.map((post) => (
              <li key={post.id} className="post">
                <h3>
                  {post.id} - {post.title}
                </h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
