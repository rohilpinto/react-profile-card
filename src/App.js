import React, { useEffect, useState } from "react";

import "./style/app.scss";

const key = "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";

function App() {
  const [data, setData] = useState([]);

  let arrayOfApis = ["https://api.github.com/user/1", "https://api.github.com/user/2", "https://api.github.com/user/3", "https://api.github.com/user/4"];

  const getusers = async () => {
    try {
      const users = await Promise.all(
        arrayOfApis.map((url) =>
          fetch(url, {
            headers: {
              Authorization: `token ${key}`,
            },
          })
        )
      );

      const json = await Promise.all(users.map((res) => res.json()));

      setData(json);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getusers();
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div className="card">
          <Card data={data} setData={setData} />
        </div>
      </div>
    </React.Fragment>
  );
}

const Card = ({ data, setData }) => {
  // console.log(currentIndex);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <React.Fragment>
      <div className="inner-card">
        <img src={data[currentIndex]?.avatar_url} alt={data[currentIndex]?.name} className="profile-img" />
        <h1 className="profile-name">{data[currentIndex]?.name}</h1>
      </div>
      <Buttons currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
    </React.Fragment>
  );
};

const Buttons = ({ currentIndex, setCurrentIndex }) => {
  const callPrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };
  const callNext = () => {
    if (currentIndex === 4) return;
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <React.Fragment>
      <div className="button-wrapper">
        <button onClick={() => callPrev()}>Prev</button>
        <button onClick={() => callNext()}>Next</button>
      </div>
    </React.Fragment>
  );
};

export default App;
