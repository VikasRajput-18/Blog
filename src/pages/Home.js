import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

const Home = ({isAuth}) => {
  const [postLists, setPostsLists] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const [search , setSearch] = useState("")

  
  const deletePost = async (id) =>{
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  }
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostsLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  },[deletePost]);
  
  return (
    <div className="homePage">
      <h1 className="text-center heading">"My Blog"</h1>
      <p className="description text-center">
        Latest blogs. You can create your own Blog
      </p>
      <div className="searchBlog">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="allPost">
        {postLists
          .filter((post) => {
            if (search === "") {
              return post;
            } else if (
              post.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return post;
            }
          })
          .map((post, id) => {
            return (
              <div className="post" key={id}>
                <div className="imageBox d-flex align-items-center justify-content-center">
                  <img
                    src={`../images/blog${id + 1 >= 4 ? 1  : id + 1}.jpg`}
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="postHeader">
                  <div className="title">
                    <h1 className="postTitle">{post.title}</h1>
                  </div>
                  <div className="deletePost">
                    {isAuth && post.author.id === auth.currentUser.uid && (
                      <button className="btn text-danger deleteBtn" onClick={() => deletePost(post.id)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    )}
                  </div>
                </div>
                <p className="postTextContainer">{post.postText}</p>
                <h4 className="author">
                  Author :{" "}
                  <span className="authorName"> @{post.author.name} </span>
                </h4>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
