import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const USERS_URL = "http://localhost:3000/users";

const initialState = {
  userss: [],
  errors: null,
  status: "idle",
};

//Read Users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get(USERS_URL);
    return response.data;
});

//Create Users
export const addUsers = createAsyncThunk('users/addUsers', async (data) => {
  const response = await axios.post(USERS_URL, data)
  return response.data
})

//Update Users
export const editUsers = createAsyncThunk('users/editUsers', async (data) => {
  const response = await axios.put(`http://localhost:3000/users/${data.id}`, data)
  return response.data
})

export const deleteUsers = createAsyncThunk('users/deleteUsers', async (id) => {

  const response = await axios.delete(`http://localhost:3000/users/${id}`)
  return response.data
})

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.userss = action.payload
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed'
            state.errors = action.error.message
        })
        .addCase(addUsers.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(addUsers.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // const addedUsers = action.payload.map(user => {
          //   user.name,
          //   user.email
          //   return user
          // })
          // state.userss = addedUsers
          state.userss = action.payload
        })
        .addCase(addUsers.rejected, (state, action) => {
          state.status = 'failed'
          state.errors = action.error.message
        })
        
      .addCase(editUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(editUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.userss = action.payload
      })
      .addCase(editUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.error.message
      })

      .addCase(deleteUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { id } = action.payload

        if (id) {
          state.userss = state.userss.filter(userId => userId !== id)
        }
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.error.message
      })
  },
});

export const selectUsers = state => state.users.userss
export const getAllStatus = state => state.users.status
export const getAllErrors = state => state.users.errors

export default userSlice.reducer;
