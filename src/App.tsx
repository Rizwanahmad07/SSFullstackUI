import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout"
import "bootstrap/dist/css/bootstrap.min.css";

import Language from './pages/Language';
import State from './pages/State';
import District from './pages/District';
import ImageUpload from './pages/ImageUpload';
import RadioButton from './pages/RadioButton';
import Searching from './pages/Searching';
import Pagination from './pages/Pagination';
import ExportCSV from './pages/ExportCSV';
import CheckBox from './pages/CheckBox';
import MultiselectDropdown from './pages/MultiselectDropdown';
import Authentication from './pages/Authentication';
import Country from './pages/Country';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Language />} />
          <Route path="/language" element={<Language />} />
          <Route path="/country" element={<Country />} />
          <Route path="/state" element={<State />} />
          <Route path="/district" element={<District />} />
          <Route path="/imageupload" element={<ImageUpload />} />
          <Route path="/radiobutton" element={<RadioButton />} />
          <Route path="/searching" element={<Searching />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/exportcsv" element={<ExportCSV />} />
          <Route path="/checkbox" element={<CheckBox />} />
          <Route path="/multiselectdropdown" element={<MultiselectDropdown />} />
          <Route path="/authentication" element={<Authentication />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
