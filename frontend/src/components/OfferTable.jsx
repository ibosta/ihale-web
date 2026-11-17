import { useQuery } from '@tanstack/react-query';
import { Table, Loader, Text } from '@mantine/core';
import api from '../api';

const tl = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' });

export default function OffersTable() {
  const offers = useQuery({
    queryKey: ['offers'],
    queryFn: () => api.get('/offers').then((r) => r.data),
  });

  if (offers.isLoading) return <Loader />;
  if (offers.isError) return <Text c="red">Teklifler yüklenemedi.</Text>;
  if (offers.data.length === 0) return <Text c="dimmed">Henüz teklif yok.</Text>;

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Firma</Table.Th>
          <Table.Th>Tutar</Table.Th>
          <Table.Th>Başvuru tarihi</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {offers.data.map((o) => (
          <Table.Tr key={o.id}>
            <Table.Td>{o.company_name}</Table.Td>
            <Table.Td>{tl.format(o.amount)}</Table.Td>
            <Table.Td>{new Date(o.created_at).toLocaleString('tr-TR')}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}