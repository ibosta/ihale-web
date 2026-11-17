import { Routes, Route } from 'react-router-dom';
import OfferForm from './pages/OfferForm';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OfferForm />} />
      <Route path="/admin" element={<h1>Yönetici</h1>} />
    </Routes>
  );
}