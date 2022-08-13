import { useState } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { movieCollectionRef } from "../lib/firestore.collections";
import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeContext";

export default function AddMovie() {
  const { theme } = useTheme();

  const [name, setName] = useState([]);
  const [img, setImg] = useState("");
  const [comment, setComment] = useState("");
  const [Recommender, setRecommender] = useState("");

  const colorr = theme === "dark" && "rgb(235, 235, 235)";

  async function handleSubmit(e) {
    e.preventDefault();
    if (name === "" || img === "" || comment === "" || Recommender === "") {
      return window.alert("You cannot leave the fields blank.");
    }
    fetch("http://localhost:9292/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
        score: 4,
        user_id: 1,
        movie_id: 1,
      }),
    })
      .then((r) => r.json())
      .then((newReview) => newReview);
  }


  return (
    <div className="addmovie">
      <Navbar />
      <form className="container mt-5" onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ color: colorr }}>Movie Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label style={{ color: colorr }}>Movie Image (URL):</label>
          <input
            type="text"
            placeholder="You should add image url on this area"
            className="form-control"
            value={img}
            id="img"
            onChange={(e) => setImg(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label style={{ color: colorr }}>Your Name, Surname:</label>
          <input
            type="text"
            className="form-control"
            value={Recommender}
            id="Recommended"
            onChange={(e) => setRecommender(e.target.value)}
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
