import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ItemView from '../../components/ItemView';

interface RowData {
  id: string;
  name: string;
  age: string;
  level: string;
  msg: string;
  important: boolean;
  status: string;
}

const ItemPage: React.FC = () => {
  const [data, setData] = useState<RowData>({} as RowData); 
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = router.query;

   
    useEffect(() => {
      if (id) {
        console.log(`Fetching data for ID: ${id}`);
        setLoading(true);
        fetch(`/api/get/${id}`)
          .then((res) => {
            console.log('Response status:', res.status);
            return res.json();
          })
          .then((result) => {
            console.log('Result data:', result.data);
            setData(result);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
          });
      }
    }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data.id) {
    return <p>No data found.</p>;
  }
  return <ItemView data={data}/>;
};
export default ItemPage;