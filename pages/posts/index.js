import { Fragment, useState, useEffect } from "react";

import PostsListFull from "../../components/PostsList/PostsListFull";

export const getServerSideProps = async () => {
  const res = await fetch("http://pfe-back-g4-dev.herokuapp.com/posts/");

  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
};

export default function posts({ posts }) {
  return (
    <>
      <PostsListFull posts={posts} title="Les annonces" />
    </>
  );
}