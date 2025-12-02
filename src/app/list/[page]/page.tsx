import ListTable from "@/features/routes/posts/list/components/ListTable";
import { FetchData, List } from "@/features/routes/posts/list/hooks";
import { ListPageParams } from "@/types/other";

export default async function ListPage({ params }: ListPageParams) {
  const paramsPage = (await params).page;
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