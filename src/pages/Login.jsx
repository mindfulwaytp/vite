import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import {
  clearSignOutReason,
  consumeReturnTo,
  markActive,
  signOutReason,
} from "../lib/adminSession";

const SIGN_OUT_MESSAGES = {
  idle: "You were signed out after 30 minutes of inactivity. Sign in again to continue.",
  expired: "Your session ended after 12 hours. Sign in again to continue.",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(() => SIGN_OUT_MESSAGES[signOutReason()] || null);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => clearSignOutReason(), []);

  // Covers both a fresh sign-in and arriving here already signed in (e.g. from the
  // footer link). The admin pages check the session's age, so a stale one still
  // ends up back here.
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) navigate(consumeReturnTo() || "/admin", { replace: true });
      }),
    [navigate]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    try {
      // Before signing in, so the admin pages don't see a session with no activity.
      markActive();
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      setError(err?.message || "Login failed");
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    setError(null);
    setInfo(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Enter your email above, then click \"Forgot password?\" again.");
      return;
    }

    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, trimmed);
      setInfo(`Password reset email sent to ${trimmed}. Check your inbox (and spam folder).`);
    } catch (err) {
      setError(err?.message || "Could not send reset email");
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <p className="text-gray-600 mt-1">Sign in with your staff account.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <input
              className="mt-1 w-full border rounded-lg p-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Password</label>
            <input
              className="mt-1 w-full border rounded-lg p-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {info && <div className="text-sm text-green-700">{info}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-sky-700 text-white py-2 hover:bg-sky-800 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={resetLoading}
            className="w-full text-sm text-sky-700 hover:text-sky-900 underline disabled:opacity-60"
          >
            {resetLoading ? "Sending reset email…" : "Forgot password?"}
          </button>
        </form>
      </div>
    </div>
  );
}
