import supabase from "./supabase";
import { Link } from "./types";

async function getUserID(name: string) {
  const { data } = await supabase.from("users").select(`id`).eq("name", name);
  return data ? data[0]?.id : undefined;
}

export async function getUserLinks(name: string) {
  const id = await getUserID(name);

  const { data } = await supabase
    .from("links")
    .select("title, link, description")
    .eq("user", id);

  return data ? data : undefined;
}

const getUserPassword = async (name: string) => {
  const { data } = await supabase
    .from("users")
    .select("password")
    .eq("name", name);

  return data ? data[0]?.password : undefined;
};

const upsertLinks = async (userId: number, links: Link[]) => {
  const linksWithUser: any = links.map((link, i) => ({
    ...link,
    user: userId,
  }));

  const { data, error } = await supabase.from("links").upsert(linksWithUser);

  return error ? error : data;
};

const deleteLink = async (title: string) => {
  await supabase.from("links").delete().eq("title", title);
};

export const updateLinksList = async (
  userName: string,
  password: string,
  dbLinks: Link[],
  newLinks: Link[]
) => {
  const userPassword = await getUserPassword(userName);

  if (password !== userPassword) {
    return "bad password";
  }

  const id = await getUserID(userName);

  if (!id) return "cannot find user id";

  const linksToUpsert = newLinks.filter(
    (newLink) => !dbLinks.some((dbLink) => dbLink.title === newLink.title)
  );

  const linksToDelete = dbLinks
    .filter(
      (dbLink) => !newLinks.some((newLink) => newLink.title === dbLink.title)
    )
    .map((link) => link.title);

  upsertLinks(id, linksToUpsert);
  linksToDelete.forEach((link) => deleteLink(link));
};
