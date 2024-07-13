import { useState } from "react";
import useSwr from "swr";

import { Tooltip } from "@chakra-ui/react";

export default function EmailWhiteList({ idToken, email }: any) {
  const [showEmailMgmt, setShowEmailMgmt] = useState(false);

  const [addedEmail, setAddedEmail] = useState("");
  const [addEmailLoading, setAddEmailLoading] = useState(false);
  const [deleteEmailLoading, setDeleteEmailLoading] = useState(false);

  const [addedAdmin, setAddedAdmin] = useState("");
  const [addAdminLoading, setAddAdminLoading] = useState(false);
  const [deleteAdminLoading, setDeleteAdminLoading] = useState(false);

  let adminsURL = "";
  let emailsURL = "";
  if (idToken && email) {
    adminsURL = `/api/admin/get-all?email=${email}&idToken=${idToken}`;
    emailsURL = `/api/emails/get-all?email=${email}&idToken=${idToken}`;
  }

  const { data: emails, mutate: emailsMutate } = useSwr(emailsURL, async () => {
    const res = await fetch(emailsURL);
    return res.json();
  });

  const { data: admins, mutate: adminsMutate } = useSwr(adminsURL, async () => {
    const res = await fetch(adminsURL);
    return res.json();
  });

  async function deleteEmail(emailToDelete: string) {
    setDeleteEmailLoading(true);
    const response = await fetch("api/emails/remove-value", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        idToken: idToken,
        emailToDelete: emailToDelete,
      }),
    });
    const res = await response.json();
    if (response.ok) {
      await emailsMutate();
    }
    setDeleteEmailLoading(false);
    return await res;
  }
  async function addEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAddEmailLoading(true);
    const response = await fetch("api/emails/add-value", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        idToken: idToken,
        addedEmail: addedEmail,
      }),
    });
    const res = await response.json();
    if (response.ok) {
      setAddedEmail("");
      await emailsMutate();
    }
    setAddEmailLoading(false);
    return await res;
  }

  async function deleteAdmin(adminToDelete: string) {
    setDeleteAdminLoading(true);
    const response = await fetch("api/admin/remove-value", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        idToken: idToken,
        emailToDelete: adminToDelete,
      }),
    });
    const res = await response.json();
    if (response.ok) {
      await adminsMutate();
    }
    setDeleteAdminLoading(false);
    return await res;
  }
  async function addAdmin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAddAdminLoading(true);
    const response = await fetch("api/admin/add-value", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        idToken: idToken,
        addedEmail: addedAdmin,
      }),
    });
    const res = await response.json();
    if (response.ok) {
      setAddedAdmin("");
      await adminsMutate();
    }
    setAddAdminLoading(false);
    return await res;
  }

  return (
    <div>
      <button
        onClick={(e) => setShowEmailMgmt(!showEmailMgmt)}
        className="mt-5 border border-1 p-2"
      >
        Show Photo and Admin email management
      </button>
      {showEmailMgmt && (
        <>
          <form onSubmit={addEmail} className="flex items-center gap-2 mt-12">
            <span>Add email: </span>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={addedEmail}
              required
              onChange={(event) => {
                setAddedEmail(event.target.value);
              }}
              className="outline-none border-2 indent-1 rounded-lg focus:ring-2 focus:border-transparent "
            />
            <button className="py-2 px-3 rounded-lg p-2 bg-orange hover:bg-orangeHover">
              Submit
            </button>
          </form>
          <h2 className="mt-2">Allowable Emails:</h2>
          <div className="flex flex-col w-[95vw] footerXM:w-[90vw] footerSM:w-[85vw] sm:w-[80vw] xxl:w-[1280px]">
            <div className="flex flex-wrap gap-2 justify-center items-center mt-2">
              {emails &&
                emails.map((currentEmail: string, index: number) => {
                  return (
                    <Tooltip label="Delete email" key={index}>
                      <span
                        className="cursor-pointer"
                        onClick={(e) => {
                          deleteEmail(currentEmail);
                        }}
                      >
                        {currentEmail}
                        {index !== emails.length - 1 && ","}
                      </span>
                    </Tooltip>
                  );
                })}
            </div>
          </div>

          <form onSubmit={addAdmin} className="flex items-center gap-2 mt-12">
            <span>Add Admin Email: </span>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={addedAdmin}
              required
              onChange={(event) => {
                setAddedAdmin(event.target.value);
              }}
              className="outline-none border-2 indent-1 rounded-lg focus:ring-2 focus:border-transparent "
            />
            <button className="py-2 px-3 rounded-lg p-2 bg-orange hover:bg-orangeHover">
              Submit
            </button>
          </form>
          <h2 className="mt-2">Allowable Admin Emails:</h2>
          <div className="flex flex-col gap-2 items-center mt-2">
            {admins &&
              admins.map((currentAdmin: string, index: number) => {
                return (
                  <Tooltip label="Delete email" key={index}>
                    <span
                      className="cursor-pointer"
                      onClick={(e) => {
                        deleteAdmin(currentAdmin);
                      }}
                    >
                      {currentAdmin}
                      {index !== admins.length - 1 && ","}
                    </span>
                  </Tooltip>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}
