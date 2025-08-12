import React, { useState } from 'react';
import Header from '../../Home/components/Header';
import EmotionalBlogApp from './principal';
import '../styles/blog.css';

const BlogPage: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);

  const openMenu = () => setMenuActive(true);
  const closeMenu = () => setMenuActive(false);

  return (

    <div className="blog-page">
      <Header menuActive={menuActive} openMenu={openMenu} closeMenu={closeMenu} />
      <EmotionalBlogApp />
    </div>
  );
};

export default BlogPage;
