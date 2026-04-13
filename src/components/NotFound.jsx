import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Sorry, but we couldn't find your page...</h2>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/58TBZnvyGwQ?si=Z8hQPLsI84vL-Fs4&amp;start=55"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <Link to="/">
        <button className="">Let's Go Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
