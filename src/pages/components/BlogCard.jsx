import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@nextui-org/button'
import { MdDelete, MdEditSquare, MdNavigateNext } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { deleteBlogs, editBlogs, getBlogs } from '../../redux/slices/blogSlice'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { Input } from '@nextui-org/input'
import { toast } from 'sonner'
import { Route, Routes, useNavigate } from 'react-router-dom'

const BlogCard = ({ prop }) => {
  const dispatch = useDispatch()



  const [isOpen, onOpenChange] = useState(false)
  const navigate = useNavigate()



  return (

    <>
      <div className='p-6 rounded-lg bg-slate-800 dark:bg-slate-300 m-6 hover:transform hover:scale-105 hover:shadow-2xl bg-gradient-to-tr from-slate-800 to-slate-300'>
        <h1 className='text-xl font-bold'>{prop.title}</h1>
        <h3 className='text-lg'>{prop.author}</h3>
        <p>{prop.description}</p>
        <div className='flex gap-2 mt-3'>
          <Button color="secondary" className='text-md h-9' onClick={() => {
            onOpenChange(true)
          }}>{<MdEditSquare />}</Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Edit Blog</ModalHeader>
                  <ModalBody>
                    <form className="flex flex-col gap-2" id="edit-blog"
                      onSubmit={async (e) => {
                        e.preventDefault()
                        const title = e.target.title.value
                        const description = e.target.description.value
                        const author = e.target.author.value
                        onOpenChange(false)
                        //e.target means form


                        try {
                          await dispatch(editBlogs({ id: prop.id, title, description, author })).unwrap();
                          dispatch(getBlogs());
                          toast.success("Successfully edited blog");
                        } catch (error) {
                          toast.error(error.message);
                        }


                      }}
                    >
                      <Input label="Title" bordered name='title' defaultValue={prop.title}></Input>
                      <Input label="description" bordered name="description" defaultValue={prop.description}></Input>
                      <Input label="author" bordered name="author" defaultValue={prop.author}></Input>
                    </form>


                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit" form='edit-blog'

                    >
                      Edit
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>




          <Button color="danger" className='text-md h-9' onClick={async () => {

            try {
              await dispatch(deleteBlogs(prop.id)).unwrap()
              await dispatch(getBlogs())
              toast.success("Successfully deleted blog")
            } catch (error) {
              toast.error(error.message)
            }


          }}>{<MdDelete />}</Button>
          <Button className='bg-slate-100 text-md h-9'
            onClick={() => { navigate(`/detail/${prop.id}`) }}
          >{<MdNavigateNext />}</Button>

        </div>

      </div>
    </>

  )
}
BlogCard.propTypes = {
  "id": PropTypes.number,
  "title": PropTypes.string,
  "description": PropTypes.string,
  "author": PropTypes.string
}


export default BlogCard
