import { useState } from "react";
import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeContext";

export default function AddMovie() {
  const { theme } = useTheme();

  const [name, setName] = useState([]);
  const [Year, setYear] = useState("");
  const [comment, setComment] = useState("");
  const [Director, setDirector] = useState("");

  const colorr = theme === "dark" && "rgb(235, 235, 235)";

  async function handleSubmit(e) {
    e.preventDefault();
    if (name === "" || Year === "" || comment === "" || Director === "") {
      return window.alert("You cannot leave the fields blank.");
    }
    fetch("http://localhost:9292/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: name,
        year: Year,
        directedby: Director,
        price: 50
      }),
    })
      .then((r) => r.json())
      .then((newMovie) => newMovie);
      alert("submited")
  }


  return (
    <div className="addmovie">
      <Navbar />
      <form className="container mt-5" onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ color: colorr }}>Movie title:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label style={{ color: colorr }}>Year:</label>
          <input
            type="number"
            placeholder="Year"
            className="form-control"
            value={Year}
            id="img"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label style={{ color: colorr }}>Directed By:</label>
          <input
            type="text"
            className="form-control"
            value={Director}
            id="Recommended"
            onChange={(e) => setDirector(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label style={{ color: colorr }}>
            Your thoughts about movie (Dizi/Film hakkındaki düşünceleriniz):
          </label>
          <textarea
            className="form-control"
            id="comment"
            value={comment}
            rows="3"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button type="submit" className="btn-sm mt-2">
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
}
