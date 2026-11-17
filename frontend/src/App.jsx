import { Routes, Route } from 'react-router-dom';
import OfferForm from './pages/OfferForm';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OfferForm />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}