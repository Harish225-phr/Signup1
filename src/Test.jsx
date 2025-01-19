import React, {useState, useEffect} from "react";

const FetchPosts = () => {
  const [posts, setPosts] = useState([]);
  
 useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((data) => setPosts(data))
  .catch((error) =>console.error('Error fetching data:',error));
 }, []);

 return(
  <div>
    <h1>Posts</h1>
    {posts.map((post) =>(
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ))}
</div>
 );
};

export default FetchPosts;