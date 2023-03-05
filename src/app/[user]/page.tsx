import supabase from "@/utils/supabase";
import { upperCaseFirstLetter } from "@/utils/utilFunctions";

export interface Params {
  params: { user: string };
}

export function generateMetadata({ params: { user } }: Params) {
  const userFormatted = upperCaseFirstLetter(user);
  return { title: userFormatted, description: `${userFormatted}'s page` };
}

const User = async ({ params: { user } }: Params) => {
  const { data: posts } = await supabase.from("posts").select();

  console.log(posts);

  return (
    <div>
      <p>{upperCaseFirstLetter(user)}</p>
      {/* <UserData user={} /> */}
    </div>
  );
};

export default User;
