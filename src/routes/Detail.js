import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; 
import Loading from "../components/Loading";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({}); 

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    setDetail(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []); 
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <section className={styles.container}>
          <img  className={styles.background} src={detail.background_image_original} alt=""/>
          <div className={styles.focus}>
            <img
              className={styles.focus_img}
              src={detail.large_cover_image}
              alt={detail.title}
            />
            <div className={styles.txt__box}>
              <h1>{detail.title}</h1>
              <p>{detail.description_full}</p>
              <ul className={styles.focus_list}>
                <li>{detail.year} / {detail.runtime} min</li>
                <li>RATE ({detail.rating})</li>
                <li className={styles.genres}>
                  <span>GENRES</span>
                  <ul className={styles.genre}>
                    {detail.genres.map((ele) => ( <li>{ele}</li> ))}
                  </ul>
                </li>
              </ul>
            </div>
            <Link to={`/`}className={styles.back}>Back to Home</Link>
          </div>
        </section>
      )}
    </div>
  );
}
export default Detail;
