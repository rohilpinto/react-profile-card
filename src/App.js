import React, { useEffect, useState } from "react";
import leftarrow from "./assets/left-arrow.svg";
import rightarrow from "./assets/right-arrow.svg";
import location from "./assets/location.svg";
import github from "./assets/github.png";
import "./style/app.scss";

const KEY = process.env.REACT_APP_KEY;

function App() {
  // this state is for the data
  const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(false);
  // this state is for the url
  const [count, setCount] = useState(1);

  useEffect(() => {
    get(count);
    // console.log(count);
  }, [count]);

  const get = async (id) => {
    try {
      const response = await fetch(`https://api.github.com/user/${id}`, {
        headers: {
          Authorization: `token ${KEY}`,
        },
      });

      const json = await response.json();

      setData(json);

      // console.log(json);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="card">
          <Card data={data} setData={setData} count={count} setCount={setCount} get={get} />
        </div>
      </div>
    </React.Fragment>
  );
}

const Card = ({ data, setData, count, setCount, get, loading }) => {
  return (
    <React.Fragment>
      <div className="inner-card">
        {data ? (
          <React.Fragment>
            <img src={data?.avatar_url} alt={data?.name} className="profile-img" />
            <h1 className="profile-name">{data?.name}</h1>

            <div className="links-container">
              <div className="location-parent">
                <div className="icon-outer">
                  <img src={location} alt="location" />
                </div>

                <div className="text-outer">{data?.location ?? "Not available"}</div>
              </div>
              <div className="github-parent">
                <div className="icon-outer">
                  <img src={github} alt="github" width="20" />
                </div>
                <div className="text-outer"> {data?.html_url}</div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="lds-dual-ring"></div>
        )}
      </div>
      <Buttons count={count} setCount={setCount} get={get} />
    </React.Fragment>
  );
};

const Buttons = ({ count, setCount, get }) => {
  const callPrev = () => {
    if (count <= 1) {
      setCount(7);
    } else {
      setCount(count - 1);
    }
  };
  const callNext = () => {
    if (count >= 7) {
      setCount(1);
      // get(count);
    } else {
      setCount(count + 1);
    }
  };

  const randomCount = () => {
    // console.log("sjflaksj");
    const randomNumber = Math.floor(Math.random() * 7 + 1);
    setCount(randomNumber);
    console.log("random numbers", randomNumber);
  };

  return (
    <React.Fragment>
      <div className="button-wrapper">
        <button onClick={() => callPrev()}>
          <img src={leftarrow} className="arrow arrow-left" alt="" />
          Prev
        </button>
        <button onClick={randomCount} className="random">
          Randomize
        </button>
        <button onClick={() => callNext()}>
          Next
          <img src={rightarrow} className="arrow arrow-right" alt="" />
        </button>
      </div>
    </React.Fragment>
  );
};

export default App;

// const getusers = async () => {
//   try {
//     const users = await Promise.all(
//       arrayOfApis.map((url) =>
//         fetch(url, {
//           headers: {
//             Authorization: `token ${key}`,
//           },
//         })
//       )
//     );

//     const json = await Promise.all(users.map((res) => res.json()));

//     setData(json);

//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// };
