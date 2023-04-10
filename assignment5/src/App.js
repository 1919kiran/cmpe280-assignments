import React, { useState } from "react";
import Chart from "react-google-charts";

const MyComponent = () => {
  const [selectedYear, setSelectedYear] = useState("");

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const data2021 = [
    ["From", "To", "Weight"],
    ["United States of America", "China, mainland", 2738215],
    ["United States of America", "China, Taiwan Province of", 951269],
    ["United States of America", "Egypt", 152947],
    ["United States of America", "Japan", 2233209.85],
    ["United States of America", "Mexico", 4159731.44],
    ["United States of America", "Nigeria", 1682175],
    ["United States of America", "Philippines", 2806644],
    ["United States of America", "Republic of Korea", 1725778]
  ];

  const data2020 = [
    ["From", "To", "Weight"],
    ["United States of America", "China, mainland", 2252243],
    ["United States of America", "China, Taiwan Province of", 1177416.48],
    ["United States of America", "Egypt", 50722],
    ["United States of America", "Japan", 2629651.03],
    ["United States of America", "Mexico", 3148009.93],
    ["United States of America", "Nigeria", 1339484],
    ["United States of America", "Philippines", 3368920],
    ["United States of America", "Republic of Korea", 1458090.17]
  ];

  const data2019 = [
    ["From", "To", "Weight"],
    ["United States of America", "China, mainland", 2252243],
    ["United States of America", "China, Taiwan Province of", 1177416.48],
    ["United States of America", "Egypt", 50722],
    ["United States of America", "Japan", 2629651.03],
    ["United States of America", "Mexico", 3148009.93],
    ["United States of America", "Nigeria", 1339484],
    ["United States of America", "Philippines", 3368920],
    ["United States of America", "Republic of Korea", 1458090.17]
  ];

  const data2018 = [
    ["From", "To", "Weight"],
    ["United States of America", "China, mainland", 236062],
    ["United States of America", "China, Taiwan Province of", 1284727.99],
    ["United States of America", "Egypt", 827918.43],
    ["United States of America", "Japan", 2581461.32],
    ["United States of America", "Mexico", 3563372.52],
    ["United States of America", "Nigeria", 2174905.2],
    ["United States of America", "Philippines", 2925510],
    ["United States of America", "Republic of Korea", 1282764.36]
  ];

  const data = [data2021, data2020, data2019, data2018];
  function getRandomObject() {
    let randomIndex = Math.floor(Math.random() * data.length);
    console.log(randomIndex);
    return data[randomIndex];
  }

  const randObject = getRandomObject();
  

  const options = {
    sankey: {
      node: {
        colorMode: "gradient",
      },
      link: {
        colorMode: "gradient",
      },
    },
  };

  return (
    <div>
      <div>
        Select year:
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">-- Select --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
          <option value="2011">2011</option>
          <option value="2010">2010</option>
          <option value="2009">2009</option>
          <option value="2008">2008</option>
          <option value="2007">2007</option>
          <option value="2006">2006</option>
          <option value="2005">2005</option>
          <option value="2004">2004</option>
          <option value="2003">2003</option>
          <option value="2002">2002</option>
          <option value="2001">2001</option>
          <option value="2000">2000</option>
        </select>
      </div>
      {selectedYear === "2021" ? (
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="Sankey"
          data={data2021}
          options={options}
        />
      ) : selectedYear === "2020" ? (
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="Sankey"
          data={data2020}
          options={options}
        />
      ) : selectedYear === "2019" ? (
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="Sankey"
          data={data2019}
          options={options}
        />
      ) : selectedYear === "2018" ? (
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="Sankey"
          data={data2018}
          options={options}
        />
      )
      :  (
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="Sankey"
          data={randObject}
          options={options}
        />
      )}
    </div>
  );
};

export default MyComponent;
