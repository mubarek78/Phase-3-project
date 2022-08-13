import Navbar from "./Navbar";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";


import { useTheme } from "../context/ThemeContext";

function List() {
  const { theme } = useTheme();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [render, setRender] = useState(false)
  const [isEditing, setIsEditing] = useState(false);

  const borderr = theme === "dark" && "rgb(150, 150, 150)";
  const colorr = theme === "dark" && "rgb(200, 200, 200)";
  const cardd = theme === "dark" && "#212529";



useEffect(() => {
    fetch("http://localhost:9292/movies")
      .then((r) => r.json())
      .then((movies) => setMovies(movies));
  }, [render]);

 


  function deleteMovie(id) {
    fetch(`http://localhost:9292/movies/${id}`, {
      method: "DELETE",
    });
    setRender(() => !render)
  }


  // function handleUpdateMessage(updatedMessageObj) {
  //   const updatedMessages = messages.map((message) => {
  //     if (message.id === updatedMessageObj.id) {
  //       return updatedMessageObj;
  //     } else {
  //       return message;
  //     }
  //   });
  //   setMessages(updatedMessages);
  // }


  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  function handleFormSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/movies/10`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        price: price,
      }),
    })
      // .then((r) => r.json())
      // .then((updatedMessage) => onUpdateMessage(updatedMessage));
  }



  return (
    <>
    <div className="listt">
      <Navbar movies={movies} search={search} setSearch={setSearch} />
      <div className="container mt-3">
        <div className="row mt-3" style={{ justifyContent: "center" }}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="card carddd ps-2 pt-2 pe-2 border-2 m-3   "
              style={{
                width: "18rem",
                color: borderr,
                backgroundColor: cardd,
              }}
            >
              <img
                src={
                 "https://pbs.twimg.com/media/EbwhU1TX0AYHdMb.jpg"
                    
                }
                className="card-img-top"
                alt={movie.title}
                style={{ height: "350px", borderRadius: "2%" }}
              />

              <div className="card-body">
                <h5
                  className="card-title text-center"
                  style={{ color: colorr }}
                >
                   {movie.title}
              
                    <button
                      onClick={() => deleteMovie(movie.id)}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "orangered",
                      }}
                    >
                      X
                    </button>
                    <button onClick={() => setIsEditing((isEditing) => !isEditing)}>
            <span role="img" aria-label="edit">
              ✏️
            </span>
          </button>
                </h5>

                <Link
                  to={`/movie/${movie.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <h5 className="card-title text-center text-primary">
                    Click for details
                  </h5>
                </Link>
                <h5>Score: {((movie.reviews.reduce((prev, cur) => prev + cur.score, 0))/movie.reviews.length).toFixed(1)}</h5>
              
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>


 {isEditing && <form className="edit-message" onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="title"
        autoComplete="off"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        name="price"
        autoComplete="off"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input type="submit" value="Save" />
    </form>}
    </>
  );
}

export default List;
