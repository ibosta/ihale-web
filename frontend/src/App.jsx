import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Teklif formu</h1>} />
      <Route path="/admin" element={<h1>Yönetici</h1>} />
    </Routes>
  );
}