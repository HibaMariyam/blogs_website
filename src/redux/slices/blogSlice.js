import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"




const initialState = {
  blogList: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
  selectedBlog: null
}


export const getBlogs = createAsyncThunk("blog/getBlogs", async () => {
  const response = await axios.get("http://localhost:3000/blogs")
  return response.data
})


export const createBlogs = createAsyncThunk("blog/createBlogs", async (data) => {
  const response = await axios.post("http://localhost:3000/blogs/", data)
  return response.data
})

export const deleteBlogs = createAsyncThunk("blog/deleteBlogs", async (id) => {
  const response = await axios.delete(`http://localhost:3000/blogs/${id}/`)
  return response.data
})

export const editBlogs = createAsyncThunk("blog/editBlogs", async (data) => {
  const response = await axios.patch(`http://localhost:3000/blogs/${data.id}/`, data)
  return response.data
})

export const getBlogDetails = createAsyncThunk("blog/getBlogDetails", async (id) => {
  const response = await axios.get(`http://localhost:3000/blogs/${id}`)
  return response.data
})

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogList = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
        console.error("Error fetching blogs:", action.error.message);
      })
      .addCase(createBlogs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBlogs.fulfilled, (state) => {
        state.isLoading = false

      })
      .addCase(createBlogs.rejected, (state, action) => {
        state.isLoading = false
        state.errorMessage = action.error.message;
        console.error("creating blogs error:", action.error.message);

      })
      .addCase(deleteBlogs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBlogs.fulfilled, (state) => {
        state.isLoading = false

      })
      .addCase(deleteBlogs.rejected, (state, action) => {
        state.isLoading = false
        state.errorMessage = action.error.message;
        console.error("creating blogs error:", action.error.message);

      })
      .addCase(editBlogs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editBlogs.fulfilled, (state) => {
        state.isLoading = false

      })
      .addCase(editBlogs.rejected, (state, action) => {
        state.isLoading = false
        state.errorMessage = action.error.message;
        console.error("creating blogs error:", action.error.message);

      })
      .addCase(getBlogDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBlogDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedBlog = action.payload
      })
      .addCase(getBlogDetails.rejected, (state, action) => {
        state.isLoading = false
        state.errorMessage = action.error.message;
        console.error("creating blogs error:", action.error.message);
      })
  },
});
export default blogSlice.reducer

