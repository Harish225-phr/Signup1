import React, {useState} from 'react';
 const PostDataOnClick = () =>{

    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);

    const postData = () =>{
        setLoading(true); 
        fetch('https://jsonplaceholder.typicode.com/posts',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your-token-here'
        },
        body: JSON.stringify({
            title: 'han hogyi call',
            body: 'mehnat kr bhai',
            userId: 1
        })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Data posted successfully',data);
        }) 
        .catch((error) =>{
            console.log('Error posting data:', error);
        });
    };

    return(
        <div>
            <button onClick={postData}>Post Data</button>
        </div>
    );
};
    export default PostDataOnClick;