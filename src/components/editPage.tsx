"use client";
import { Link } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const emptyLink = [{ title: "", link: "", description: "" }];

interface EditPageProps {
  dbLinks?: Link[];
  user: string;
}

type ApiState = "loading" | "submitted" | "user removed";

const EditPage = ({ dbLinks, user }: EditPageProps) => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [password, setPassword] = useState("");
  const [links, setLinks] = useState(dbLinks || emptyLink);
  const [apiState, setApiState] = useState<ApiState>();

  useEffect(() => {
    setLinks(dbLinks || emptyLink);
  }, [dbLinks, showForm]);

  const handleSubmit = async () => {
    setApiState("loading");
    const res = await fetch("/links", {
      method: "POST",
      body: JSON.stringify({ user, password, dbLinks, links }),
    });
    const data: ApiState = await res.json();

    setApiState(Object.keys(data).length === 0 ? "submitted" : data);
    router.refresh();
  };

  const handleRemoveUser = async () => {
    if (!confirm("Are you sure?")) return;

    setApiState("loading");
    const res = await fetch("/users", {
      method: "POST",
      body: JSON.stringify({ user, password }),
    });

    setApiState("user removed");
    setPassword("");

    router.refresh();
  };

  return (
    <div className="text-xs absolute top-5 right-5 h-5/6 overflow-auto">
      {showForm ? (
        <div className="grid">
          <button
            className="pb-1 text-right"
            onClick={() => {
              setShowForm(false);
              setApiState(undefined);
            }}
          >
            close
          </button>
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setApiState(undefined);
              setPassword(e.target.value);
            }}
            className="mb-4"
          />
          {links.map((link, i) => (
            <div key={i}>
              <div className="grid gap-2">
                <input
                  type="text"
                  value={link.title}
                  onChange={(e) =>
                    setLinks((c) => {
                      const newLinks = [...c];
                      setApiState(undefined);
                      newLinks[i] = {
                        title: e.target.value,
                        link: newLinks[i].link,
                        description: newLinks[i].description,
                      };

                      return newLinks;
                    })
                  }
                  placeholder="title"
                />
                <input
                  type="text"
                  value={link.link || ""}
                  onChange={(e) =>
                    setLinks((c) => {
                      const newLinks = [...c];
                      setApiState(undefined);
                      newLinks[i] = {
                        title: newLinks[i].title,
                        link: e.target.value,
                        description: newLinks[i].description,
                      };

                      return newLinks;
                    })
                  }
                  placeholder="link"
                />
                <input
                  type="text"
                  value={link.description || ""}
                  onChange={(e) =>
                    setLinks((c) => {
                      const newLinks = [...c];
                      setApiState(undefined);
                      newLinks[i] = {
                        title: newLinks[i].title,
                        link: newLinks[i].link,
                        description: e.target.value,
                      };

                      return newLinks;
                    })
                  }
                  placeholder="description"
                />
              </div>
              <button
                onClick={() =>
                  setLinks((c) => {
                    const newLinks = [...c];
                    setApiState(undefined);
                    delete newLinks[i];
                    return newLinks.filter((e) => e !== undefined);
                  })
                }
              >
                -
              </button>
            </div>
          ))}
          {links.length === 0 && (
            <button className="-mt-3 mb-1" onClick={() => handleRemoveUser()}>
              remove user
            </button>
          )}
          <div className="flex justify-around">
            {links[links.length - 1]?.title !== "" && (
              <button
                onClick={() =>
                  setLinks((c) => {
                    const newLinks = [...c];
                    setApiState(undefined);
                    newLinks.push({ title: "", link: "", description: "" });
                    return newLinks;
                  })
                }
              >
                +
              </button>
            )}
            {links.every((link) => link.title !== "") && (
              <button onClick={() => handleSubmit()}>submit</button>
            )}
          </div>
          {apiState && (
            <p className={apiState === "submitted" ? "" : "text-red-500"}>
              {apiState}
            </p>
          )}
        </div>
      ) : (
        <p onClick={() => setShowForm(true)}>
          {dbLinks ? "edit page" : "claim page"}
        </p>
      )}
    </div>
  );
};

export default EditPage;
