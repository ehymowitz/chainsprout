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

export const upsertLinks = async (
  name: string,
  password: string,
  links: Link[]
) => {
  const userPassword = await getUserPassword(name);
  const id = await getUserID(name);

  if (password !== userPassword) {
    return "bad password";
  }

  const linksWithUser: any = links.map((link, i) => ({
    ...link,
    user: id,
  }));

  console.log(linksWithUser);

  const { data, error } = await supabase.from("links").upsert(linksWithUser);

  return error ? error : data;
};
