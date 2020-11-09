import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "react-chartjs-2";

import sellingDataAction from "../store/actions/sellingDataAction";

function Graphics() {
  const dispatch = useDispatch();
  const { sellingData } = useSelector((state) => state.sellingDataReducer);
  const kamusBulan = {
    "01": "jan",
    "02": "feb",
    "03": "mar",
    "04": "apr",
    "05": "mei",
    "06": "jun",
    "07": "jul",
    "08": "ags",
    "09": "sep",
    "10": "okt",
    "11": "nov",
    "12": "des",
  };
  
  const [data, setData] = useState();

  useEffect(() => {
    dispatch(sellingDataAction());
  }, [dispatch]);

  useEffect(() => {
    function setDataForGraph() {

      // SORT DATA BY DATE
      let sorted = sellingData?.data
      var length = sorted?.length;
      for (var i = 0; i < length; i++) {
        for (var j = 0; j < length - i - 1; j++) {
          if (sorted[j]?.customer_paid > sorted[j + 1]?.customer_paid) {
            var tmp = sorted[j]; 
            sorted[j] = sorted[j + 1]; 
            sorted[j + 1] = tmp; 
          }
        }
      }

      let tempObj = {};
      sorted?.forEach((shoe) => {
        let year = shoe.customer_paid.split(" ")[0].split("-")[0];
        let month = shoe.customer_paid.split(" ")[0].split("-")[1];
        const date = shoe.customer_paid.split(" ")[0].split("-")[2];
        const price = shoe.price;
        if (!tempObj[`${month + date}`]) {
          tempObj[`${month + date}`] = [
            `${date}.${kamusBulan[month]}`,
            price,
            year,
          ];
        } else {
          if (tempObj[`${month + date}`].price <= price) {
            tempObj[`${month + date}`].price = price;
          }
        }
      });

      let allLabels = [];
      let allDataSetsData = [];
      for (const temp in tempObj) {
        allLabels.push(tempObj[temp][0]);
        allDataSetsData.push(+tempObj[temp][1]);
      }

      const tempData = {
        labels: allLabels,
        datasets: [
          {
            label: "StockX Graphic",
            fill: false,
            lineTension: 0.3,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: allDataSetsData,
          },
        ],
      };
      setData(tempData);
    }
    setDataForGraph();
  }, [sellingData]);

  return (
    <div>
      <h1>Table</h1>
      {
        data ? <Line data={data} /> : <h1>Loading...</h1>
      }
    </div>
  );
}

export default Graphics;
