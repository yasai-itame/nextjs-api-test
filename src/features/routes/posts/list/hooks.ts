export type List = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const FetchData = async (page: number): Promise<List[] | undefined> => {

  const pageCount = Number(page) >= 2 ? (Number(page) - 1) * 6 : 0;
  if (pageCount >= 96) return;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${pageCount}&_limit=6`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}