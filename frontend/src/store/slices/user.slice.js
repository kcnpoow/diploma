import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import userService from '../../services/user.service.js';

const auth = createAsyncThunk('user/auth', async () => {
  try {
    const { data } = await userService.auth();
    return data;
  } catch (error) {
    return rejectWithValue('Not authorized');
  }
});

const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await userService.login(email, password);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const register = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      await userService.register(name, email, password);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data.message,
        });
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await userService.logout();
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data.message,
        });
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const update = createAsyncThunk(
  'user/update',
  async (updateData, { rejectWithValue }) => {
    try {
      const { data } = await userService.update(updateData);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data.message,
        });
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: null,
    isAuthenticated: false,
    isLoading: true,
  },
  extraReducers: (builder) => {
    // auth
    builder.addCase(auth.fulfilled, (state, { payload }) => {
      state.info = payload.info;
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(auth.rejected, (state) => {
      state.isLoading = false;
    });

    // login
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.info = payload.info;
      state.isAuthenticated = true;
    });

    // logout
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

    // update
    builder.addCase(update.fulfilled, (state, { payload }) => {
      state.info = payload;
    });
  },
});

export { auth, login, register, logout, update };
export default userSlice.reducer;
