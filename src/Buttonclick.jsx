import React, {useState} from 'react'

const Buttonclick = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    
   const fetchData = () =>{
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
     
    .then(response => response.json())
    .then((data) => {
      setPosts(data);
      setLoading(false);
    })
    .catch((error) => {
      console.log('Error fetching data:',error);
      setLoading(false);
    });
  }
  return (
    <div>
      <button onClick={fetchData}>
        {loading ? 'Loading..' : 'Fetch Posts'}
      </button>
      {posts.length > 0 &&(
        <div>
          {posts.map((post) => (
           <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            </div>
          ))} 
    </div>
      )}
    </div>
  );
};

export default Buttonclick