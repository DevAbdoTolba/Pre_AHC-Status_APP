import * as React from 'react';
import { GetServerSideProps } from 'next';
import ItemView from '../../components/ItemView';

interface RowData {
  id: string;
  name: string;
  age: string;
  level: string;
  message: string;
  important: boolean;
  status: string;
}

interface ItemPageProps {
  data: RowData[];
}

const ItemPage: React.FC<ItemPageProps> = ({ data }) => {
  return <ItemView data={data} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const response = await fetch(`api/get/${id}`);
  const data = (await response.json()).data;

  return {
    props: {
      data,
    },
  };
};

export default ItemPage;
