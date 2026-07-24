'use server';

import { createClient } from '@/infrastructure/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import type { AuthActionResult } from '@/domain/auth/types';

export async function loginAction(
  locale: string,
  formData: FormData
): Promise<AuthActionResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, message: 'Email dan password wajib diisi.' };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, message: 'Email atau password salah.' };
  }

  revalidatePath('/', 'layout');
  redirect(`/${locale}/dashboard`);
}

export async function registerAction(
  locale: string,
  formData: FormData
): Promise<AuthActionResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const fullName = formData.get('fullName') as string;

  if (!email || !password || !fullName) {
    return { success: false, message: 'Semua field wajib diisi.' };
  }

  if (password.length < 8) {
    return { success: false, message: 'Password minimal 8 karakter.' };
  }

  if (password !== confirmPassword) {
    return { success: false, message: 'Konfirmasi password tidak cocok.' };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });

  if (error) {
    if (error.message.includes('already registered')) {
      return { success: false, message: 'Email sudah terdaftar.' };
    }
    return { success: false, message: 'Gagal mendaftar. Coba lagi.' };
  }

  revalidatePath('/', 'layout');
  redirect(`/${locale}/dashboard`);
}

export async function logoutAction(locale: string): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect(`/${locale}/login`);
}

export async function forgotPasswordAction(
  formData: FormData
): Promise<AuthActionResult> {
  const email = formData.get('email') as string;

  if (!email) {
    return { success: false, message: 'Email wajib diisi.' };
  }

  const supabase = createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/reset-password`,
  });

  if (error) {
    return { success: false, message: 'Gagal mengirim email reset password.' };
  }

  return {
    success: true,
    message: 'Link reset password sudah dikirim ke email kamu.',
  };
}

export async function resetPasswordAction(
  formData: FormData
): Promise<AuthActionResult> {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || password.length < 8) {
    return { success: false, message: 'Password minimal 8 karakter.' };
  }

  if (password !== confirmPassword) {
    return { success: false, message: 'Konfirmasi password tidak cocok.' };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { success: false, message: 'Gagal mengubah password. Link mungkin sudah kedaluwarsa.' };
  }

  return { success: true, message: 'Password berhasil diubah. Silakan login.' };
}

export async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('hd_users')
    .select('id, email, full_name, role, is_active')
    .eq('id', user.id)
    .single();

  if (!profile) return null;

  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    role: profile.role,
    isActive: profile.is_active,
  };
    }
