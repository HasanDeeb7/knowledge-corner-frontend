import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Bar, Doughnut, Line } from "react-chartjs-2";

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Tableau10 = [
  '#4e79a7',
  '#f28e2c',
  '#e15759',
  '#76b7b2',
  '#59a14f',
  '#edc949',
  '#af7aa1',
  '#ff9da7',
  '#9c755f',
  '#bab0ab',
];

const chartsParams = {
  margin: { bottom: 20, left: 25, right: 5 },
  height: 300,
};


export default function BasicColor() {
  const [dataMonth, setData] = useState(null)
  const [color, setColor] = React.useState('#4e79a7');
  const [loading, setLoading] = useState(true)


  const handleChange = (event, nextColor) => {
    setColor(nextColor);
  };

  function fetchData() {
    axios
      .get(`${process.env.REACT_APP_PATH}/api/books/byMonth`)
      .then((response) => {
        setData(response.data);
        setLoading(false)
        console.log(response.data)
      })
      .catch(() => {
        // handleErrorAlert("Error while getting categories data");
        console.log("Error while getting categories data")
      });
  }
  useEffect(() => {
    fetchData();
  }, []);


  return (
    
      !loading?(
        <Stack direction="column" spacing={2} alignItems="center" sx={{ width: '100%', background: "#fff", borderRadius: "15px", padding: "25px",
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a box shadow
        borderRadius: '8px',
        height:'100%'
        }}>
        {/* <LineChart
          {...chartsParams}
          series={[
            {
                        data:[dataMonth.map(item=>item.bookCount)],

  
              labels: [dataMonth.map(item=>item.month)],
              color: 'black',
            },
          ]}
        /> */}
         <Line

          data={{
            labels: dataMonth.map((data) => data.month),
            datasets: [
              {
                label: "Nb Of Books",
                data: dataMonth.map((data) => data.bookCount),
                // backgroundColor: ["rgba(43, 63, 229, 0.8)"],
                backgroundColor:['#03151e'],
                borderColor: "#03151e",
                pointBackgroundColor: 'black'
              },
              
              // {
              //   label: "Donor",
              //   data: [25, 10, 15],
              //   backgroundColor: ["rgba(43, 63, 229, 0.8)"],
              //   borderColor: "rgb(255, 99, 132)",
              // },
            ],
          }}
          options={{
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Last Six Months',
                  color:'black'
                },
                grid: {
                  color: 'lightgrey', // X-axis grid color
                },
                ticks:{
                  color: 'black',
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Books',
                  color:'black'

                },
                grid: {
                  color: 'lightgrey', // X-axis grid color
                },
                ticks:{
                  color: 'black', // X-axis grid color

                }
              },
            },}}
          // options={{
          //   elements: {
          //     line: {
          //       tension: 0.5,
          //     },
          //   },
          //   plugins: {
          //     title: {
          //       text: "helloo",
          //     },
          //   },
          // }}
        />
        <ToggleButtonGroup
          value={color}
          exclusive
          onChange={handleChange}
        >
          {/* {Tableau10.map((value) => (
            <ToggleButton key={value} value={value} sx={{ p: 1 }}>
              <div
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: value,
                  display: 'inline-block',
                }}
              />
            </ToggleButton>
          ))} */}
        </ToggleButtonGroup>
      </Stack>
      )
      :
      (
        <Stack direction="column" spacing={2} alignItems="center" sx={{ width: '100%', background: "#FFF", borderRadius: "15px", padding: "25px" }}>
<h1>loading..</h1>
</Stack>
      )
    
  
  );
}