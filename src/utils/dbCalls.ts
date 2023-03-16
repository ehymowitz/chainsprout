import supabase from "./supabase";

async function getUserID(name: string) {
  return await supabase.from("users").select(`id`).eq("name", name);
}

async function getUserLinks(id: string) {
  return await supabase
    .from("links")
    .select("title, link, description")
    .eq("user", id);
}

export const getUserData = async (user: string) => {
  let { data: IdData, error: idError } = await getUserID(user);
  if (idError) console.log(idError);

  if (IdData?.length === 0) {
    return undefined;
  }

  const id = IdData?.[0].id;

  const { data: links, error: linksError } = await getUserLinks(id);
  if (linksError) console.log(linksError);

  return links || undefined;
};
