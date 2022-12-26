import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import userService from '../../services/userService.js';

const auth = createAsyncThunk('user/auth', async (_, { rejectWithValue }) => {
  try {
    const response = await userService.auth();
    return response.data;
  } catch (error) {
    return rejectWithValue('Not authorized');
  }
});

const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await userService.login(email, password);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  }
);

const register = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      await userService.register(name, email, password);
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  }
);

const logout = createAsyncThunk('user/logout', async () => {
  try {
    await userService.logout();
  } catch {}
});

const update = createAsyncThunk('user/update', async ({ name, email }) => {
  try {
    await userService.update(name, email);
  } catch (error) {}
});

const initialState = {
  info: null,
  isAuthenticated: false,
  isLoading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    // auth action
    builder.addCase(auth.fulfilled, (state, { payload }) => {
      state.info = payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(auth.rejected, (state) => {
      state.isLoading = false;
    });

    // login action
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.info = payload.user;
      state.isAuthenticated = true;
    });

    // logout action
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.info = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.info = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    });
  },
});

export { auth, login, register, logout, update };
export default userSlice.reducer;
