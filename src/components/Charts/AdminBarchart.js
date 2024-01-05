import React from 'react'
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import axios from 'axios';
import { useState,useEffect } from 'react';
 const AdminBarchart = () => {
const [categories,setCategories]=useState(null)
const [loading,setLoading]=useState(true)
    const labels=categories?.map(item=>item.categoryName)
    const marginPercentage = 0.1;
    const options = {
        scales: {
          x: {
            // barThickness: 100,
            // categoryPercentage: 0.8,  
            stacked: true,     
            categoryPercentage: 1 - marginPercentage,
            barPercentage: 1 - marginPercentage,
          },
          y: {
            beginAtZero: true,
          },
        },
      };
   
      const data={
        labels: labels,
        datasets: [{
          label: 'Books Data',
          data: categories?.map(item=>item.bookCount),
          backgroundColor: [
              '#95A4FC',
              '#1C1C1C',
            '#B1E3FF',
            '#BAEDBD',  
            '#A1E3CB',
          ],
          borderColor: [
              '#95A4FC',
              '#1C1C1C',
            '#B1E3FF',
            '#BAEDBD',  
            '#A1E3CB',
          ],
          borderWidth: 1,
          width:90,
        //   barPercentage: 0.9, 
        barThickness: 25,
        }]
      }
      function fetchCategoryData() {
        axios
          .get(`${process.env.REACT_APP_PATH}/api/books/getNbByCategory`)
          .then((response) => {
            setCategories(response.data);
            setLoading(false)
            console.log(response.data)
          })
          .catch(() => {
            // handleErrorAlert("Error while getting categories data");
            console.log("Error while getting categories data")
          });
      }
      useEffect(() => {
        fetchCategoryData();
      }, []);


  return (
    <div style={{width:'100%',height:'100%',overflow:'auto',
    padding:'10px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
    borderRadius: '8px',        
        
  }}>
        {
          !loading?(
            <Bar options={options}
            data = {data}
             style={{overflowX:'auto',width:'100%',
            //  border:"1px solid black",
            //  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
            //  borderRadius: '8px',        
            }}
           >
   
           </Bar>
          )
          :
          (
            <h1>loading..</h1>
          )
        
          }
    </div>
  )
}

export default AdminBarchart