import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "react-chartjs-2";

import sellingDataAction from "../store/actions/sellingDataAction";

function Graphics() {
  const dispatch = useDispatch();
  const { sellingData } = useSelector((state) => state.sellingDataReducer);
  const kamusBulan = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "Mei",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "Septempber",
    "10": "October",
    "11": "November",
    "12": "December",
  };

  const [loading, setLoading] = useState(false) ;

  useEffect(() => {
    dispatch(sellingDataAction());
    setLoading(true)
  }, [dispatch]);

  function getGradient(canvas) {
    const ctx = canvas?.getContext("2d")
    const gradient = ctx?.createLinearGradient(0, 0, 600, 550)
    gradient?.addColorStop(0.1, "rgba(247, 202, 24, 1)")
    gradient?.addColorStop(0.95, 'rgba(75,192,192,0.4)')
    return gradient;
  }

  function setDataForGraph(canvas) {
      // Sort by higher price
      let sellData = sellingData?.data?.[6];
      let tempObj = {};
      sellData?.forEach((shoe) => {
        const year = shoe.customer_paid.split(" ")[0].split("-")[0];
        const month = shoe.customer_paid.split(" ")[0].split("-")[1];
        const date = shoe.customer_paid.split(" ")[0].split("-")[2];
        const fullDate = shoe.customer_paid;
        const price = shoe.price;

        if (tempObj[`${date}${month}${year}`] === undefined) {
          tempObj[`${date}${month}${year}`] = [
            `${date} ${kamusBulan[month]} ${year}`,
            price,
            year,
            fullDate
          ];
        } else {
          if (tempObj[`${date}${month}${year}`].price < price) {
            tempObj[`${month + date}`].price = price;
          }
        }
      });

      // Sort by Date
      let tempObjValue = Object?.values(tempObj)
      var length = tempObjValue?.length;
      for (var i = 0; i < length; i++) {
        for (var j = 0; j < length - i - 1; j++) {
          if (tempObjValue[j]?.[3] > tempObjValue[j + 1]?.[3]) {
            var tmp = tempObjValue[j];
            tempObjValue[j] = tempObjValue[j + 1];
            tempObjValue[j + 1] = tmp;
          }
        }
      }

      // Get labels and dataset.data for Chart
      let allLabels = [];
      let allDataSetsData = [];
      tempObjValue.forEach(value => {
        allLabels.push(value[0]);
        allDataSetsData.push(value[1]);
      })
      
      const tempData = {
        labels: allLabels,
        datasets: [
          {
            label: "Shoes Sale History",
            fill: true,
            lineTension: 0.3,
            backgroundColor: getGradient(canvas),
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
      setLoading(true)
      return tempData
    }

    useDispatch(() => {
      setDataForGraph()
    }, [sellingData])

    const options = {
      scales: {
          xAxes: [{
              type: 'time',
              time: {
                  unit: 'month'
              }
          }]
      }
  }
  return (
    <div>
      <h1>Kick Avenue</h1>
      <h3>Sale History Chart</h3>
      {loading ? <Line data={setDataForGraph} options={options} /> : <h1>Loading...</h1>}
    </div>
  );
}

export default Graphics;
