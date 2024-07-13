import React, { useState, useEffect } from "react";

import { signOut, useSession } from "next-auth/react";

import useSWR from "swr";
import { useRouter } from "next/router";

import LoadingSpinner from "@/components/LoadingSpinner";

import "react-datepicker/dist/react-datepicker.css";
import Unauthenticated from "@/components/Unauthenticated";

import EmailWhiteList from "@/components/Admin/EmailWhiteList";
import CreateEvent from "@/components/Admin/CreateEvent";

export default function Admin() {
  const { data: session, status } = useSession();

  const [email, setEmail] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);

  const router = useRouter();

  let getAdminsURL = "";
  if (email && idToken) {
    getAdminsURL = `api/admin/get-all?email=${email}&idToken=${idToken}`;
  }

  useEffect(() => {
    const fetchSession = async () => {
      if (session && session.user && session.user.email) {
        setEmail(session.user.email);
      }
      if (session && session.idToken) {
        setIdToken(session.idToken);
      }
    };
    fetchSession();
  }, [session]);

  let url = "";
  if (email) {
    url = `/api/calendar/get-events`;
  }

  const {
    data: eventsToJSON,
    isLoading,
    mutate,
  } = useSWR(url, async () => {
    const res = await fetch(url);
    return res.json();
  });

  const { data: adminEmails } = useSWR(getAdminsURL, async () => {
    const res = await fetch(getAdminsURL);
    return res.json();
  });

  if (status === "unauthenticated") {
    return <Unauthenticated callbackUrl="/admin" />;
  }

  if (isLoading || status === "loading" || !email || !adminEmails) {
    return <LoadingSpinner />;
  }

  if (idToken) {
    const decodedToken: any = jwt.decode(idToken);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      signOut({ callbackUrl: "/admin" });
    }
  }

  console.log(adminEmails);
  if (!adminEmails.includes(email)) {
    router.push("/");
    return <LoadingSpinner />;
  }

  let events: any = [];
  if (eventsToJSON && eventsToJSON != "[object Object]") {
    events = JSON.parse(eventsToJSON);
  }

  if (status === "authenticated") {
    return (
      <div className="flex flex-col items-center py-16 min-h-[calc(100svh-133px)]">
        <div className="flex flex-col ">
          <CreateEvent
            idToken={idToken}
            email={email}
            events={events}
            mutate={mutate}
          />
          <EmailWhiteList idToken={idToken} email={email} />
          {/* <Photos idToken={idToken} email={email} /> */}
        </div>
      </div>
    );
  }
}
