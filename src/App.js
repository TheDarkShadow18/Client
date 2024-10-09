import { useEffect, useState } from 'react';
import './App.css';
import Formdata from './components/Formdata';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection,setEditSection]=useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id:""
  });
  const [dataList, setDataList] = useState([]);
  
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    console.log(data);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();  // Fetch data again after adding a new entry
      setFormData(
        {
          name:"",
          email:"",
          mobile:""
        }
      )
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/");
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();  // Only fetch data once on component mount
  }, []);

  console.log(dataList);

  const handleDelete = async (id) => {
    let data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getFetchData();  // Fetch data again after deleting an entry
      alert(data.data.message);
    }
  };

  const handleUpdate=async(e)=>{
      e.preventDefault();
      const data = await axios.put("/update",formDataEdit)
      if (data.data.success) {
        getFetchData();  // Fetch data again after deleting an entry
        alert(data.data.message);
        setEditSection(false)
      }
  }

  const handleEditOnChange=async(e)=>{
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value
    }));
  }
  const handleData=(el)=>{
    setFormDataEdit(el);
    setEditSection(true)
  }

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>Add</button>
        {addSection && (
          <Formdata
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleclose={()=>setAddSection(false)}
          rest={formData}
          />
        )}
        {
          editSection && <Formdata
          handleSubmit={handleUpdate}
          handleChange={handleEditOnChange}
          handleclose={()=>setEditSection(false)}
          rest={formDataEdit}
          />
        }

        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                dataList[0]?(
              dataList.map((el) => (
                <tr key={el._id}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.mobile}</td>
                  <td>
                    <button className='btn btn-edit' onClick={()=>handleData(el)}>Edit</button>
                    <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                  </td>
                </tr>
              )))
            :(
              <p style={{textAlign: "center"}}>No data</p>
            )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
