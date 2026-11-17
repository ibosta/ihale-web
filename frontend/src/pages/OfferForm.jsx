import { useState } from 'react';
import { TextInput, Button } from '@mantine/core';
import api from '../api';

export default function OfferForm() {
  const [company, setCompany] = useState('');
  const [amount, setAmount] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post('/offers', { company_name: company, amount });
    alert('Gönderildi');
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="Firma adı" value={company} onChange={(e) => setCompany(e.target.value)} />
      <TextInput label="Tutar" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <Button type="submit">Gönder</Button>
    </form>
  );
}