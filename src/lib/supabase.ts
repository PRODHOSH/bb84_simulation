import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Types for our leaderboard
export interface LeaderboardEntry {
  id?: number;
  user_id: string;
  username: string;
  score: number;
  total_questions: number;
  time_taken: number;
  created_at?: string;
}

// Auth helper functions
export const signInWithGoogle = async () => {
  // Determine the correct redirect URL based on environment
  const isDev = window.location.hostname === 'localhost';
  const redirectTo = isDev 
    ? 'http://localhost:8080/#/quiz'
    : 'https://bb84-simulation.vercel.app/#/quiz';
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
    },
  });
  return { data, error };
};

export const signUpWithEmail = async (email: string, password: string, username: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        display_name: username,
      },
      emailRedirectTo: `${window.location.origin}/#/quiz`,
    },
  });
  return { data, error };
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Rate limiting check - prevent spam submissions
const SUBMISSION_COOLDOWN = 30000; // 30 seconds
let lastSubmission = 0;

export const canSubmitScore = (): boolean => {
  const now = Date.now();
  if (now - lastSubmission < SUBMISSION_COOLDOWN) {
    return false;
  }
  return true;
};

export const updateLastSubmission = () => {
  lastSubmission = Date.now();
};
