import ListTable from "@/features/routes/posts/list/components/ListTable";
import { FetchData, List } from "@/features/routes/posts/list/hooks";

interface Props {
  params: {
    page: string
  }
}

export const ListPage: React.FC<Props> = async ({ params }) => {
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

export default ListPage;