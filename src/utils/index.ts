export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

export const truncateText = (description: string, count: number) => {
  const words = description?.split(" ");
  if (words?.length > count) {
    return words?.slice(0, count).join(" ") + "...";
  }
  return description;
};
