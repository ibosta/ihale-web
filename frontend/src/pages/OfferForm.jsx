import { useState } from 'react';
import { TextInput, Textarea, Button } from '@mantine/core';
import api from '../api';

export default function OfferForm() {
  const [values, setValues] = useState({
    company_name: '', contact_name: '', email: '', phone: '', amount: '', description: '',
  });

  function change(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post('/offers', values);
    alert('Gönderildi');
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="Firma adı" name="company_name" value={values.company_name} onChange={change} />
      <TextInput label="Yetkili adı soyadı" name="contact_name" value={values.contact_name} onChange={change} />
      <TextInput label="E-posta" name="email" value={values.email} onChange={change} />
      <TextInput label="Telefon" name="phone" value={values.phone} onChange={change} />
      <TextInput label="Teklif tutarı (TL)" name="amount" value={values.amount} onChange={change} />
      <Textarea label="Açıklama" name="description" value={values.description} onChange={change} />
      <Button type="submit">Gönder</Button>
    </form>
  );
}