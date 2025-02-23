import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../../public/Auth.jpg";

function Home() {
  return (
    <>
      <section className="container bg-white flex flex-wrap justify-between items-center p-5 h-dvh">
        <div className="">
          <p className="text-gray-900 font-bold text-4xl">
            Organize Your Day{" "}
            <span className="text-blue-900 font-bold text-4xl">
              Achieve More!
            </span>
          </p>
          <p className="text-gray-700 py-5">
            Stay focused, boost productivity, and never miss a task again.
          </p>
          <Link to="/">
            <button className="bg-gray-900 text-white py-3 px-5 text-xl rounded-4xl hover:bg-amber-100">
              Try for free
            </button>
          </Link>
        </div>
        <div>
          <img src={HeroImage} alt="hero image" width="400px"/>
        </div>
      </section>
    </>
  );
}

export default Home;
