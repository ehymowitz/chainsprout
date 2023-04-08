import bcrypt from "bcryptjs";

export const handleUserPageCharacters = (word: string) => {
  const upperCaseFirstCharacter = `${word[0].toLocaleUpperCase()}${word.slice(
    1
  )}`;

  const handleSpaces = upperCaseFirstCharacter.replaceAll("%20", " ");

  return handleSpaces;
};

export const handleUrlCharacters = (url: string) => {
  const charactersLowerCase = url.toLocaleLowerCase();

  return charactersLowerCase;
};

export const saltAndPepperPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = bcrypt.hashSync(
    password,
    `${salt}${process.env.PEPPER}`
  );

  return hashedPassword;
};
