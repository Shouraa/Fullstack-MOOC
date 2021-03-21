import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, user, handleChange, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    border: 'solid ',
    marginBottom: 4,
  };
  const [visible, setVisible] = useState(false);

  // const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const compare = user.name.toLowerCase() === blog.author.toLowerCase();

  const removeStyle = { display: compare ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = (event) => {
    handleChange(blog.id, event.target.value);
  };

  const handleRemove = () => {
    if (window.confirm(`Remove '${blog.title}'?`)) {
      removeBlog(blog.id);
    }
  };
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button id="toggleInfo-button" onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <p>{blog.url}</p>
        <p>
          {' '}
          likes: {blog.likes}{' '}
          <input
            id="like-button"
            type="button"
            value="like"
            onClick={handleLike}
          />{' '}
          <input type="button" value="dislike" onClick={handleLike} />
        </p>
        <p>user: {user.name}</p>
        <button id="remove-button" style={removeStyle} onClick={handleRemove}>
          remove
        </button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
