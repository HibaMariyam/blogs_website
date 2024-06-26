import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./slices/blogSlice";

const store=configureStore({
    reducer:{
       blog:blogSlice
       //Reducer Function: Each slice includes reducers to handle state changes.
       //reducer: { blog: blogSlice } in the configureStore function maps the blog slice of state to the blogSlice reducer.
//This configuration allows Redux to know that any actions related to the blog slice should be handled by the blogSlice reducer.
//By using slices, you can modularize your state management, making your Redux code more maintainable and easier to understand.
    },
    devTools:true
})

export default store
//store is the main source of state management in Redux.