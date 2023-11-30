import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1
        style={{ fontSize: "5rem", textAlign: "center", paddingTop: "10rem" }}
      >
        404 NOT FOUND
      </h1>
      <p style={{ textAlign: "center" }}>
        {" "}
        <Link
          style={{
            fontSize: "2rem",

            display: "inline-block",
          }}
          to="/"
        >
          Back to homepage
        </Link>
      </p>
    </>
  );
};

export default NotFound;
