import EditPage from "@/components/editPage";
import { getUserLinks } from "@/utils/dbCalls";
import { handleUserPageCharacters } from "@/utils/utilFunctions";

export interface PageParams {
  params: { user: string };
}

export function generateMetadata({ params: { user } }: PageParams) {
  const userFormatted = handleUserPageCharacters(user);
  return { title: userFormatted, description: `${userFormatted}'s page` };
}

const User = async ({ params: { user } }: PageParams) => {
  const links = await getUserLinks(user);

  return (
    <main className="w-128 m-auto text-center">
      {<EditPage dbLinks={links} user={user} />}
      <p>{handleUserPageCharacters(user)}</p>
      {!links && <p>this page is unclaimed</p>}
      <ul className="mt-10">
        {links?.map((link) => (
          <div
            key={`${user}${link.title}${link.link}${link.description}`}
            className=""
          >
            <a
              href={link.link || undefined}
              target="_blank"
              className="underline hover:italic"
            >
              {link.title}
            </a>
            <p>{link.description}</p>
          </div>
        ))}
      </ul>
    </main>
  );
};

export default User;
