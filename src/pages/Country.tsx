import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// Define Country type
interface Country {
  id: number;
  name: string;
}

function Country() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");

  // ✅ Use Vite env variable
  const baseUrl = `${import.meta.env.REACT_APP_API_URL}/Countries`;

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = () => {
    axios.get<Country[]>(baseUrl).then((res) => setCountries(res.data));
  };

  const toast = (icon: "success" | "error" | "warning" | "info", title: string) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const handleSave = () => {
    const data: Country = { id, name };

    if (!name.trim()) {
      toast("warning", "Country name required");
      return;
    }

    if (id === 0) {
      axios.post(baseUrl, data).then(() => {
        toast("success", "Country added");
        resetForm();
        loadCountries();
      });
    } else {
      axios.put(`${baseUrl}/${id}`, data).then(() => {
        toast("success", "Country updated");
        resetForm();
        loadCountries();
      });
    }
  };

  const handleEdit = (country: Country) => {
    setId(country.id);
    setName(country.name);
  };

  const handleDelete = (countryId: number) => {
    Swal.fire({
      title: "Delete country?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${baseUrl}/${countryId}`).then(() => {
          toast("success", "Country deleted");
          loadCountries();
        });
      }
    });
  };

  const resetForm = () => {
    setId(0);
    setName("");
  };

  return (
    <div>
      <h2>Manage Countries</h2>

      <div>
        <input
          type="text"
          placeholder="Enter country name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <button onClick={handleSave}>
          {id === 0 ? "Add Country" : "Update Country"}
        </button>
        <button onClick={resetForm}>Reset</button>
      </div>

      <table style={{ marginTop: "10px" }} border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Country;
