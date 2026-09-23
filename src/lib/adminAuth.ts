import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "hft_admin_session";

function getSecretKey() {
  const secret = process.env.AUTH_SECRET || "default_hft_dev_secret_key_needs_32_characters_minimum";
  return new TextEncoder().encode(secret.padEnd(32, "0"));
}

export async function verifyAdminCredentials(
  email: string,
  pass: string
): Promise<boolean> {
  const expectedEmail = process.env.ADMIN_EMAIL || "shivam@hasslefree-travels.com";
  const expectedPass = process.env.ADMIN_PASSWORD || "admin123";

  return email.trim() === expectedEmail.trim() && pass === expectedPass;
}

export async function setAdminSessionCookie() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function checkAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;

    await jwtVerify(token, getSecretKey());
    return true;
  } catch {
    return false;
  }
}

export async function requireAdminAuth() {
  const isAuthenticated = await checkAdminSession();
  if (!isAuthenticated) {
    redirect("/admin/login");
  }
}
