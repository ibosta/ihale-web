import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, Loader, Text, Modal, Stack } from '@mantine/core';
import api from '../api';

const tl = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' });
const tarih = (d) => new Date(d).toLocaleString('tr-TR');

function OfferDetail({ id }) {
  const offer = useQuery({
    queryKey: ['offer', id],
    queryFn: () => api.get(`/offers/${id}`).then((r) => r.data),
  });

  if (offer.isLoading) return <Loader />;
  if (offer.isError) return <Text c="red">Detay yüklenemedi.</Text>;

  const o = offer.data;
  return (
    <Stack gap="xs">
      <Text><b>Firma:</b> {o.company_name}</Text>
      <Text><b>Yetkili:</b> {o.contact_name}</Text>
      <Text><b>E-posta:</b> {o.email}</Text>
      <Text><b>Telefon:</b> {o.phone}</Text>
      <Text><b>Tutar:</b> {tl.format(o.amount)}</Text>
      <Text><b>Tarih:</b> {tarih(o.created_at)}</Text>
      <Text><b>Açıklama:</b> {o.description || '-'}</Text>
    </Stack>
  );
}

export default function OffersTable() {
  const [selected, setSelected] = useState(null);
  const offers = useQuery({
    queryKey: ['offers'],
    queryFn: () => api.get('/offers').then((r) => r.data),
  });

  if (offers.isLoading) return <Loader />;
  if (offers.isError) return <Text c="red">Teklifler yüklenemedi.</Text>;
  if (offers.data.length === 0) return <Text c="dimmed">Henüz teklif yok.</Text>;

  return (
    <>
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
            <Table.Tr key={o.id} onClick={() => setSelected(o.id)} style={{ cursor: 'pointer' }}>
              <Table.Td>{o.company_name}</Table.Td>
              <Table.Td>{tl.format(o.amount)}</Table.Td>
              <Table.Td>{tarih(o.created_at)}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal opened={selected !== null} onClose={() => setSelected(null)} title="Teklif detayı">
        {selected && <OfferDetail id={selected} />}
      </Modal>
    </>
  );
}