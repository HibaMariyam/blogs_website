import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../redux/slices/blogSlice'
import BlogCard from '../pages/components/BlogCard'
import { Button } from '@nextui-org/button'
import { MdNavigateNext } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const BlogPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getBlogs())
  }, [])

  const blogState = useSelector((state) => state.blog)

  if (blogState.isLoading) {
    return <h1>Loading...</h1>
  }

  if (blogState.isError) {
    return <h1>Something went wrong</h1>

  }

  return (
    <div>
      {
        blogState.blogList.map(
          (blog) => {
            return <BlogCard prop={blog} key={blog.id} />
          }
        )
      }
    </div>
  )
}

export default BlogPage