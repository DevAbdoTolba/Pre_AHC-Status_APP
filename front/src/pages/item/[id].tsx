import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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

const ItemPage: React.FC = () => {
  const [data, setData] = useState<RowData[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/get/${id}`)
        .then((res) => {
        return  res.json();
        })
        .then((result) => {
          setData(result.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [id]);

  return <ItemView data={data}/>;
};
