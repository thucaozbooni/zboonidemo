import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '@services/AuthServices';
import { User } from 'models/User';

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (user: User, { rejectWithValue }) => {
    try {
      await AuthService.signUp(user);
      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({email, password}: any, { rejectWithValue }) => {
    try {
      await AuthService.signIn(email, password);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.error_description);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;