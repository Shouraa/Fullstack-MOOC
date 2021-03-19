import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notify = (errorMessage) => {
    setErrorMessage(errorMessage);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      console.log('user from app', user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      notify('Wrong credentials');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    window.localStorage.clear();
    window.location.reload();
  };

  const addNewBlog = async (newBlogObject) => {
    createNewFormRef.current.toggleVisibility();
    const addedBlog = await blogService.create(newBlogObject);
    setBlogs(blogs.concat(addedBlog));
    notify(`a new blog ${addedBlog.title} by ${addedBlog.author}`);
  };

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (exception) {
      notify('failed to remove the blog');
    }
  };

  const handleLikes = async (id, buttonType) => {
    const blog = blogs.find((n) => n.id === id);
    const changedBlog =
      buttonType === 'like'
        ? { ...blog, likes: blog['likes'] + 1 }
        : { ...blog, likes: blog['likes'] - 1 };

    const updatedBlog = await blogService.update(changedBlog, id);
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)));
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='text'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );

  const createNewFormRef = useRef();

  const createNewForm = () => (
    <Togglable buttonLabel='create new blog' ref={createNewFormRef}>
      <BlogForm createBlog={addNewBlog} />
    </Togglable>
  );

  const blogList = () =>
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleChange={handleLikes}
          removeBlog={removeBlog}
        />
      ));
  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? (
        <div>
          <h1>log in to application</h1>
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <h4>
            {user.username} is logged in{' '}
            <button
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button>
          </h4>
          {createNewForm()}
          {blogList()}
        </div>
      )}
    </div>
  );
};

export default App;
