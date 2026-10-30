import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import {
  IDLE_LIMIT_MS,
  MAX_SESSION_MS,
  WARNING_MS,
  lastActive,
  markActive,
  rememberReturnTo,
  setSignOutReason,
} from "../lib/adminSession";

const ACTIVITY_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"];

// Wraps every page that needs a signed-in admin. Signs out after IDLE_LIMIT_MS
// without activity (in any tab) or MAX_SESSION_MS after signing in, whichever
// comes first. The pages' own `!user` checks then send the visitor to /login.
export default function AdminSession() {
  const location = useLocation();
  const [user, setUser] = useState(auth.currentUser);
  const [msLeft, setMsLeft] = useState(null); // set only inside the warning window

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    rememberReturnTo(location.pathname + location.search);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!user) {
      setMsLeft(null);
      return;
    }
    const signedInAt = Date.parse(user.metadata.lastSignInTime) || 0;

    function check() {
      const now = Date.now();
      const reason =
        now - signedInAt >= MAX_SESSION_MS ? "expired" : now - lastActive() >= IDLE_LIMIT_MS ? "idle" : null;
      if (reason) {
        setSignOutReason(reason);
        signOut(auth);
        return;
      }
      const left = IDLE_LIMIT_MS - (now - lastActive());
      setMsLeft(left <= WARNING_MS ? left : null);
    }

    // Writing storage on every scroll event is wasteful; once every 15s is plenty.
    let lastMarked = 0;
    function onActivity() {
      const now = Date.now();
      if (now - lastMarked < 15_000) return;
      lastMarked = now;
      markActive();
    }

    check();
    ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));
    const timer = setInterval(check, 5_000);
    return () => {
      ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, onActivity));
      clearInterval(timer);
    };
  }, [user]);

  function staySignedIn() {
    markActive();
    setMsLeft(null);
  }

  return (
    <>
      {msLeft !== null && (
        <div
          role="alert"
          className="fixed inset-x-0 top-0 z-[60] bg-amber-100 border-b border-amber-300 text-amber-900"
        >
          <div className="max-w-3xl mx-auto px-6 py-3 flex flex-wrap items-center gap-3">
            <p className="flex-1 text-sm">
              You’ll be signed out{" "}
              {msLeft < 60_000 ? "in less than a minute" : `in about ${Math.ceil(msLeft / 60_000)} minutes`}{" "}
              because you’ve been inactive. Unsaved changes will be lost.
            </p>
            <button
              type="button"
              onClick={staySignedIn}
              className="rounded-lg bg-amber-900 text-white px-3 py-1.5 text-sm font-medium hover:bg-amber-950"
            >
              Stay signed in
            </button>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}
