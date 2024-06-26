// import { Button } from '@nextui-org/button'
// import React, { useState } from 'react'
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
// import { Input } from '@nextui-org/input';
// import { useDispatch } from 'react-redux';
// import { createBlogs, getBlogs } from '../../redux/slices/blogSlice';
// import { toast } from 'sonner';


// const NavBar = () => {

//   const [isOpen, onOpenChange] = useState(false)
//   const dispatch = useDispatch()
//   return (

//     <nav className="bg-slate-800 flex p-4 justify-between">
//       <p className="font-bold text-lg text-white">Blog</p>
//       <Button color="primary" variant="shadow" onClick={() => {
//         onOpenChange(true)
//       }}>Add Blog</Button>


//       <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">Add Blog</ModalHeader>
//               <ModalBody>
//                 <form className="flex flex-col gap-2" id="add-blog"
//                   onSubmit={async (e) => {
//                     e.preventDefault()
//                     const title = e.target.title.value
//                     const description = e.target.description.value
//                     const author = e.target.author.value
//                     onOpenChange(false)
//                     //e.target means form
//                     try {
//                       await dispatch(createBlogs({ title, description, author })).unwrap()
//                       await dispatch(getBlogs())
//                       toast.success("Blog added successfully")
//                     } catch (error) {
//                       toast.error(error.message)
//                     }


//                   }}
//                 >
//                   <Input label="Title" bordered name='title' ></Input>
//                   <Input label="description" bordered name="description"></Input>
//                   <Input label="author" bordered name="author"></Input>
//                 </form>


//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   Close
//                 </Button>
//                 <Button color="primary" type="submit" form='add-blog'

//                 >
//                   Submit
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>


//     </nav>



//   )
// }

// export default NavBar

import { Button } from '@nextui-org/button';
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Input } from '@nextui-org/input';
import { useDispatch } from 'react-redux';
import { createBlogs, getBlogs } from '../../redux/slices/blogSlice';
import { toast } from 'sonner';

const NavBar = () => {
  const [isOpen, onOpenChange] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validateForm = () => {
    const errors = {};
    if (!title) errors.title = "Title cannot be empty";
    if (!description) errors.description = "Description cannot be empty";
    if (!author) errors.author = "Author cannot be empty";
    return errors;
    //(!title) is a conditional check that evaluates to true if title is falsy (like an empty string).
    //When (!title) is true, errors.title is set to "Title cannot be empty", indicating a validation error for the title field.
    //After checking all conditions, the function returns the errors object. If all fields are filled out (errors object remains empty), it will be returned as an empty object {}.
  };

  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    const errors = validateForm();
    //Object.keys(errors) returns an array of keys (property names) from the errors object. In your case, these keys would correspond to the form fields that failed validation (e.g., title, description, author).
    //Object.keys(errors).length retrieves the number of keys in the errors object. This count indicates how many fields have validation errors.
    //The strict equality operator (===) compares the length of Object.keys(errors) to 0. If the errors object is empty (i.e., Object.keys(errors).length === 0 evaluates to true), it means there are no validation errors.
    if (Object.keys(errors).length === 0) {
      onOpenChange(false);
      try {
        await dispatch(createBlogs({ title, description, author })).unwrap();
        await dispatch(getBlogs());
        toast.success("Blog added successfully");
        setTitle('');
        setDescription('');
        setAuthor('');
        setErrors({});
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      setErrors(errors);
      // Set errors state to display validation error messages
    }
  };

  return (
    <nav className="bg-slate-800 flex p-4 justify-between">
      <p className="font-bold text-lg text-white">Blog</p>
      <Button color="primary" variant="shadow" onClick={() => onOpenChange(true)}>
        Add Blog
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Blog</ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-2" id="add-blog" onSubmit={handleSubmit}>
                  <Input
                    label="Title"
                    bordered

                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`border ${errors.title ? 'border-red-500' : ''} rounded-xl`}
                  />
                  {/* {errors.title ? (
                    <div className='text-red-500'>{errors.title}</div>
                  ) : null} */}
                  {errors.title && (
                    <div className='text-red-500'>{errors.title}</div>
                  )}
                  <Input
                    label="Description"
                    bordered

                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`border ${errors.description ? 'border-red-500' : ''} rounded-xl`}

                  />
                  {/* {errors.title ? (
                    <div className='text-red-500'>{errors.title}</div>
                  ) : null} */}
                  {errors.description && (
                    <div className='text-red-500'>{errors.description}</div>
                  )}

                  {/* Conditional Rendering ({errors.author && (...)}): {errors.author}: Checks if errors.author exists and is truthy. In JavaScript, an object property (like errors.author) is considered truthy if it exists and is not explicitly false, null, undefined, 0, or an empty string ''. */}
                  {/* When errors.author is truthy (i.e., there is an error message for the "Author" field), the expression evaluates to true. */}
                  <Input
                    label="Author"
                    bordered

                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}

                    className={`border ${errors.author ? 'border-red-500' : ''} rounded-xl`}
                  />
                  {/* {errors.title ? (
                    <div className='text-red-500'>{errors.title}</div>
                  ) : null} */}
                  {errors.author && (
                    <div className='text-red-500'>{errors.author}</div>
                  )}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit" form='add-blog'>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </nav>
  );
};

export default NavBar;
