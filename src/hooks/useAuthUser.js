import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export function useAuthUser() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setProfile(null);

      if (!u) {
        setLoading(false);
        return;
      }

      setProfileLoading(true);
      try {
  const ref = doc(db, "users", u.uid);
  const snap = await getDoc(ref);

  console.log("🔍 AUTH UID:", u.uid);
  console.log("🔍 FIRESTORE PATH:", ref.path);
  console.log("🔍 PROJECT ID:", db.app.options.projectId);
  console.log("🔍 DOC EXISTS:", snap.exists());
  console.log("🔍 DOC DATA:", snap.data());

  setProfile(snap.exists() ? snap.data() : null);
} finally {
  setProfileLoading(false);
  setLoading(false);
}

    });

    return () => unsub();
  }, []);

  return { user, profile, loading, profileLoading };
}
