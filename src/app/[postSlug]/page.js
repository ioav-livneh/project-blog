import React from "react";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { BLOG_TITLE } from "@/constants";
import { loadBlogPost } from "../../helpers/file-helpers";

import BlogHero from "@/components/BlogHero";
import styles from "./postSlug.module.css";

import CodeSnippet from "@/components/CodeSnippet/CodeSnippet";
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo/DivisionGroupsDemo";
import CircularColorsDemo from "@/components/CircularColorsDemo/CircularColorsDemo";

export async function generateMetadata({ params }) {
  const blogPostData = await loadBlogPost(params.postSlug);

  if (!blogPostData) {
    notFound();
  }

  const { frontmatter } = blogPostData;

  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const blogPostData = await loadBlogPost(params.postSlug);
  if (!blogPostData) {
    notFound();
  }

  const { frontmatter, content } = blogPostData;

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo: DivisionGroupsDemo,
            CircularColorsDemo: CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
