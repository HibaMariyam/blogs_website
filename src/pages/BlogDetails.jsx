import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBlogDetails } from '../redux/slices/blogSlice'

const BlogDetails = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const selectedBlog = useSelector((state) => state.blog.selectedBlog)
    useEffect(() => {
        dispatch(getBlogDetails(id))
    }, [])

    if (!selectedBlog) {
        return <h1>Loading...</h1>
    }
    return (
        <div className='p-6'>

            <h1 className='text-3xl font-bold text-white flex justify-center mb-3'>{selectedBlog.title}</h1>
            <p className='text-lg text-white' >{selectedBlog.description}</p>
        </div>
    )
}

export default BlogDetails
