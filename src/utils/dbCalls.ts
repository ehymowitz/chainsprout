import supabase from "./supabase";
import { Link } from "./types";
import { saltAndPepperPassword } from "./utilFunctions";
import bcrypt from "bcryptjs";

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

const getAndCompareUserPassword = async (name: string, password: string) => {
  const { data } = await supabase
    .from("users")
    .select("password")
    .eq("name", name);

  if (!data || !data[0].password) return undefined;

  return bcrypt.compareSync(password, data[0]?.password);
};

const upsertLinks = async (userId: number, links: Link[]) => {
  const linksWithUser: any = links.map((link, i) => ({
    ...link,
    user: userId,
  }));

  const { data, error } = await supabase.from("links").upsert(linksWithUser);

  return error ? error : data;
};

const deleteLink = async (title: string, userId: number) => {
  await supabase.from("links").delete().eq("title", title).eq("user", userId);
};

export const updateLinksList = async (
  userName: string,
  password: string,
  dbLinks: Link[],
  newLinks: Link[]
) => {
  const isGoodPassword = await getAndCompareUserPassword(userName, password);

  if (!isGoodPassword) {
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

  const linksToUpdate = newLinks
    .filter((newLink) =>
      dbLinks.some((dbLink) => dbLink.title === newLink.title)
    )
    .filter((link) => {
      const oldLink = dbLinks.filter(
        (dbLink) => link.title === dbLink.title
      )[0];

      return JSON.stringify(link) !== JSON.stringify(oldLink);
    });

  upsertLinks(id, linksToUpsert.concat(linksToUpdate));
  linksToDelete.forEach((link) => deleteLink(link, id));
};

export const removeUser = async (userName: string, password: string) => {
  const isGoodPassword = await getAndCompareUserPassword(userName, password);

  if (!isGoodPassword) {
    return "bad password";
  }

  const id = await getUserID(userName);

  await supabase.from("links").delete().eq("user", id);
  await supabase.from("users").delete().eq("name", userName);
};

export const addUser = async (userName: string, password: string) => {
  const res = await supabase
    .from("users")
    .insert({ name: userName, password: saltAndPepperPassword(password) });
  return res;
};
