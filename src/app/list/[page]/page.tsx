import ListTable from "@/features/routes/posts/list/components/ListTable";
import { FetchData, List } from "@/features/routes/posts/list/hooks";

export default async function ListPage({ params }: any) {
  const paramsPage = params.page;
  const page = parseInt(paramsPage, 10) - 1;
  const fetchNumber = parseInt(paramsPage, 10);

  const lists: List[] | undefined = await FetchData(fetchNumber);

  if (lists?.length) {
    return (
      <ListTable key="list" lists={lists} page={page} />
    );
  } else {
    return (
      <p>No Data</p>
    )
  }
}