// AuthService.ts
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../models/User';

export interface AuthServiceType {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (user: User) => Promise<void>;
}

export const AuthService: AuthServiceType = {
  signIn: async (email: string, password: string) => {
    try {
      const response = await api.post('api/v1/oauth/token/', {
        grant_type: "password",
        client_id: "SUqAuccXKuBbcK564aLNmqBaNxGZTsVhQt6GXycn",
        client_secret: "eqWTii2q6CW4ZxDUgd9KmjLcxYEMXQsgFyP1BIdwiIwoGD8YRbyCmx73HQpCs6OZ4knEencov3G63ima6f6cpMTfSHQJ1iDYbqwo6HVzcBaOyNLm65xYIy0rYpvFXtuL",
        username: email, password
      });
      console.log('Sign in response:', response.data);
    } catch (error: any) {
      console.log('Sign in error:', error.response.data);
      throw error.response.data;
    }
  },
  signUp: async (user: User) => {
    try {
      const token = await api.post('api/v1/oauth/token/', {
        grant_type: "client_credentials",
        client_id: "1MHLz6yMd9WEV5B5bp1wapf2hcPJOv3SAdV5rS4N",
        client_secret: "d38avxXujw5lg80jTvqZYv671b4HQAjMu2CGZjD3rrO3UzOGSsvRWffEJxyJ1OBKZRMLKd75IcrulXOfpACSs3t3FUm4s1FDYChb5bm0oE70YGw3mq8uutJJOvgRZyfs"
      });
      AsyncStorage.setItem('token', token.data.access_token);
      const response = await api.post('api/v1/users/', user);
      console.log('Sign up response:', response.data);
    } catch (error: any) {
      console.error('Sign up error:', error.response.data);
      throw error.response.data;
    }
  },
};