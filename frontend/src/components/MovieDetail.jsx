import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function MovieDetail() {
  const { theme } = useTheme();

  const borderr = theme === "dark" && "rgb(150, 150, 150)";
  const colorr = theme === "dark" && "rgb(200, 200, 200)";
  const commentt = theme === "dark" && "rgb(255, 255, 255)";
  const cardd = theme === "dark" && "#212529";

  let { movie_id } = useParams();

  const [movie, setMovie] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:9292/movies/${movie_id}`)
      .then((r) => r.json())
      .then((movie) => setMovie(movie));
  }, [movie_id]);

  if (!movie) return <h2>Loading game data...</h2>;



  
  return (
    <div className="moviedetail">
      <Navbar />
      <div className="container">
        
              <div key={movie.id} className="rightleft mt-4 border-1">
                <div className="left">
                  <div
                    className="card carddd ps-2 pt-2 pe-2 border-2"
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
                      alt="..."
                      style={{ height: "350px", borderRadius: "2%" }}
                    />
                    <div className="card-body">
                      <h5
                        className="card-title text-center"
                        style={{ color: colorr }}
                      >
                        {movie.title}
                        
                      </h5>
                      {/* <h5>score: {((movie.reviews.reduce((prev, cur) => prev + cur.score, 0))/movie.reviews.length).toFixed(1)}</h5> */}
                    </div>
                  </div>
                </div>
                <br />
                
              </div>
      
      </div>
      <br />
    </div>
  );
}

export default MovieDetail;
