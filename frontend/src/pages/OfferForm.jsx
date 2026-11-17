import { useState } from 'react';
import { Container, Paper, Title, Stack, TextInput, Textarea, Button } from '@mantine/core';
import api from '../api';

export default function OfferForm() {
  const [values, setValues] = useState({
    company_name: '', contact_name: '', email: '', phone: '', amount: '', description: '',
  });
  const [errors, setErrors] = useState({});

  function change(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    try {
      await api.post('/offers', values);
      alert('Gönderildi');
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      }
    }
  }

  return (
    <Container size="sm" py="xl">
      <Paper withBorder shadow="sm" p="lg" radius="md">
        <Title order={2} mb="md">İhale Teklif Formu</Title>
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput label="Firma adı" name="company_name" value={values.company_name} onChange={change}
              error={errors.company_name?.[0]} />
            <TextInput label="Yetkili adı soyadı" name="contact_name" value={values.contact_name} onChange={change}
              error={errors.contact_name?.[0]} />
            <TextInput label="E-posta" name="email" value={values.email} onChange={change}
              error={errors.email?.[0]} />
            <TextInput label="Telefon" name="phone" value={values.phone} onChange={change}
              error={errors.phone?.[0]} />
            <TextInput label="Teklif tutarı (TL)" name="amount" value={values.amount} onChange={change}
              error={errors.amount?.[0]} />
            <Textarea label="Açıklama" name="description" value={values.description} onChange={change}
              error={errors.description?.[0]} />
            <Button type="submit" fullWidth>Gönder</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}