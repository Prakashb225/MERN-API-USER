import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({ name: "", email: "", age: "" });
  const [apiData, setApiData] = useState("");
  const [id, setId] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    const { name, email, age } = data;
    if (!name || !email || !age) return alert("All fields are required");
    console.log(data);

    e.preventDefault();

    await fetch("http://localhost:5001/api/postUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, age }),
    });

    alert("User Added Successfully");

    //   if ((res.status = 400 || !data)) {
    //     alert("Invalid User");
    //   } else {
    //     console.log("Successful Submission");
    //     console.log(data);
    //   }
  };
  const getData = async () => {
    await fetch("http://localhost:5001/api/getUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setApiData(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, [id]);

  const deleteUser = async (id, name) => {
    let confirmDelete = window.confirm(`Are you sure want to delete ${name}`);
    setId(id);
    if (confirmDelete) {
      await fetch(`http://localhost:5001/api/delete/${id}`, {
        method: "DELETE",
        body: { userid: id },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      //  getData()
    }
  };

  return (
    <div>
      <form>
        <div>
          <label>
            Name: &nbsp;
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <label>
            Email: &nbsp;
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <label>
            Age: &nbsp;
            <input
              type="number"
              name="age"
              value={data.age}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          <button type="submit" onClick={getData}>
            GetData
          </button>
        </div>
      </form>

      <div>
        {apiData &&
          apiData.map((item) => {
            // console.log(item);
            return (
              <table>
                <tbody>
                  <tr>
                    <th>Name</th>&nbsp;
                    <th>Email</th>&nbsp;
                    <th>Age</th>&nbsp;
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>{item.name}</td>&nbsp;&nbsp;&nbsp;
                    <td>{item.email}</td>&nbsp;&nbsp;&nbsp;
                    <td>{item.age}</td>
                    <button onClick={() => deleteUser(item._id, item.name)}>
                      Delete
                    </button>
                  </tr>
                </tbody>
              </table>
            );
          })}
      </div>
    </div>
  );
}

export default App;
