import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function MovieDetail() {
  const { theme } = useTheme();

  const borderr = theme === "dark" && "rgb(150, 150, 150)";
  const colorr = theme === "dark" && "rgb(200, 200, 200)";
  const cardd = theme === "dark" && "#212529";

  let { movie_id } = useParams();

  const [movie, setMovie] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showReviews, setshowReviews] = useState(false);
  const [comment, setComent] = useState('');
  const [score, setScore] = useState('');


  function handleFormSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:9292/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
        score: score,
        user_id: 1,
        movie_id: movie_id,
      }),
    })


 
     
  }


  useEffect(() => {
    fetch(`http://localhost:9292/movies/${movie_id}`)
      .then((r) => r.json())
      .then((movie) => setMovie(movie));
  }, [movie_id]);

  if (!movie) return <h2>Loading game data...</h2>;


console.log(movie.reviews)
  
  return (
    <div className="moviedetail">
      <Navbar />
      <div className="con">
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
                      <button onClick={() => setIsEditing((isEditing) => !isEditing)}>
                      <span role="img" aria-label="edit">
                        Edit
                       </span>
                      </button>
                      <button onClick={() => setshowReviews((showReviews) => !showReviews)}>
                      <span role="img" aria-label="edit">
                        Reviews
                       </span>
                      </button>
                      {/* <h5>score: {((movie.reviews.reduce((prev, cur) => prev + cur.score, 0))/movie.reviews.length)}</h5> */}
                      
                    </div>
                  </div>
                </div>
                <br />
                
              </div>
      
      </div>
      {/* <br /> */}

      {isEditing && <form className="edit-message" onSubmit={handleFormSubmit}>
      Score:
      <input
        type="number"
        name="score"
        autoComplete="off"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      /><br></br>
     Comment: 
     <input
        type="text"
        name="comment"
        autoComplete="off"
        value={comment}
        onChange={(e) => setComent(e.target.value)}
      />
      <input type="submit" value="Save" />
    </form>}
    </div>
    <h4>Reviews</h4>
    {showReviews && movie.reviews.map((review) => (
    <>
    <p>Comment: {review.comment}</p>
    <p>Score: {review.score}</p>
    <br></br>
    </>
    ))}
  
    </div>
  );
}

export default MovieDetail;
