const capitalizeFirstLetter = (str) => {
  const capitalWord = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalWord;
};

const categories = [
  "all",
  "tech",
  "finance",
  "news",
  "business",
  "Entertainment",
  "marketing",
  "photography",
  "others",
];
export { categories, capitalizeFirstLetter };
