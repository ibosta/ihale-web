import OffersTable from '../components/OffersTable';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Container, Paper, Title, Stack, TextInput, PasswordInput, Button, Text, Loader } from '@mantine/core';
import api from '../api';

export default function Admin() {
  const queryClient = useQueryClient();
  const me = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get('/me').then((r) => r.data),
    retry: false,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function login(e) {
    e.preventDefault();
    setError('');
    try {
      await api.post('/login', { email, password });
      queryClient.invalidateQueries({ queryKey: ['me'] });
    } catch (err) {
      setError(err.response?.data?.message || 'Giriş başarısız');
    }
  }

  async function logout() {
    await api.post('/logout');
    queryClient.setQueryData(['me'], null);
  }

  if (me.isLoading) return <Loader m="xl" />;

  if (!me.data) {
    return (
      <Container size="xs" py="xl">
        <Paper withBorder shadow="sm" p="lg" radius="md">
          <Title order={2} mb="md">Yönetici Girişi</Title>
          <form onSubmit={login}>
            <Stack>
              <TextInput label="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} />
              <PasswordInput label="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
              {error && <Text c="red" size="sm">{error}</Text>}
              <Button type="submit" fullWidth>Giriş yap</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    );
  }

  return (
    <Container py="xl">
      <Title order={2}>Hoş geldin, {me.data.name}</Title>
      <Button my="md" variant="light" onClick={logout}>Çıkış yap</Button>
      <OffersTable />
    </Container>
  );
}