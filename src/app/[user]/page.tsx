import { getUserData } from "@/utils/dbCalls";
import { upperCaseFirstLetter } from "@/utils/utilFunctions";

export interface PageParams {
  params: { user: string };
}

export function generateMetadata({ params: { user } }: PageParams) {
  const userFormatted = upperCaseFirstLetter(user);
  return { title: userFormatted, description: `${userFormatted}'s page` };
}

const User = async ({ params: { user } }: PageParams) => {
  const links = await getUserData(user);

  return (
    <div>
      <p>{upperCaseFirstLetter(user)}</p>
      {!links && <p>This page is unclaimed!</p>}
      <ul>
        {links?.map((link) => (
          <div key={`${user}${link.title}${link.link}`}>
            <a href={link.link}>{link.title}</a>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default User;
