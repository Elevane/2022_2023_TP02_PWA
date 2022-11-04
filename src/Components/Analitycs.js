import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Chart as ChartJS, ArcElement, Tooltip, LegendCategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title, Legend, CategoryScale} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import useLocalStorage from "./auth/Hooks/useLocalStorage";
function getUsers() {
    let user = useLocalStorage.GetUser();
    let token = user.token;
  
    return fetch(process.env.REACT_APP_DBHOST_APPS+"/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + user.token,
        Accept: "*/*",
      },
    }).then((data) =>  data.json());
  }
  const COLORLIST =  [
    '#e76f51',
    "#2a9d8f",
    "#e9c46a",
    "#264653"
    ]
   const LineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Date d\'ajout des outils',
      },
    },
  };
  const d = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const monthlist = {
    "january" : 1,
}
  const lineChartLabels = [monthNames[d.getMonth() - 6], monthNames[d.getMonth() - 5], monthNames[d.getMonth() - 4], monthNames[d.getMonth() - 3],monthNames[d.getMonth() - 2], monthNames[d.getMonth() - 1], monthNames[d.getMonth()]];
    
  const defaultDoughNutData = {
    labels: ["loading..."],
    datasets: [
    {
        label: 'Nombres d\'appareils par utilisateur',
        data: [100],
        backgroundColor: [
        '#EBEBEB',
    
        ],
    
        borderWidth: 0,
    },
    ],
};
const defaultLineChart = {
    lineChartLabels,
    datasets: [
      
    ],
  };

export default function Analitycs() {
    ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title);
    const user = useLocalStorage.GetUser();
    const [apiData, setApiData] = useState();
    const [doughnutData, setDoughnutData] = useState(defaultDoughNutData);
    const [lineData, setLineData] = useState(defaultLineChart)
    const procesDoughNutData = (ad) => {
        if(ad == undefined || ad == null)
            return;
        let users = []
        ad.map(e => users.push(e.username))
        let getAllAppareilsLength  = 0;
        ad.map(e => getAllAppareilsLength += e.appareils.length);
        let usersPercent = ad.map(e => e.appareils.length * 100 / getAllAppareilsLength)
        const values = Object.values(users);
        
        setDoughnutData({
            labels: values,
            datasets: [
            {
                label: 'Nombres d\'appareils par utilisateur',
                data: usersPercent,
                backgroundColor: COLORLIST,
            
                borderWidth: 0,
            },
            ],
        })
     }
     const processLineChart = (ad) => {
        if(ad == undefined || ad == null)
            return;

        let lineUsers = {}
        lineUsers = ad.map((e, index) => { 
            var countbyMonth = {}
            e.appareils.map((i) => { 
                if(lineChartLabels.includes(monthNames[new Date(i.date).getMonth()]))
                    countbyMonth[monthNames[new Date(i.date).getMonth()]] = (countbyMonth[monthNames[new Date(i.date).getMonth()]] || 0) + 250   
            });
            //console.log(countbyMonth)
            if(countbyMonth != {}){  
                let dates = []
                var ite = 0
                for (const [key, value] of Object.entries(countbyMonth)) {
                    dates.push(value);
                    ite += 1
                }
                console.log( dates +"  "+  lineChartLabels)
                return{
                    label : e.username,
                    data : dates,               
                    borderColor : COLORLIST[index],
                    backgroundColor : [COLORLIST[index]]
                }
            }
               
           })
        //console.log(lineUsers)
        const dataset = {
            labels : lineChartLabels,
            datasets: lineUsers
            ,
          }
          console.log(dataset)
        setLineData(dataset)
     }

    useEffect(() => {    
        getUsers().then(e => {
            setApiData(e.result);
        })
    }, [])
      
    useEffect(() => {
        procesDoughNutData(apiData)
        processLineChart(apiData)
    }, [apiData])
  return (
    <div>
      <NavBar />
      <div style={{ marginLeft: "25%" }}>
        <div className="w3-container w3-blue">
          <h1>Dashboard</h1>
        </div>
       
        <ul style={{ listStyle:"none", display: "flex", flexWrap: "wrap"}}>          
           <li className="chart"> <Doughnut data={doughnutData} />  </li>  
           <li className="chart"> <Line options={LineChartOptions} data={lineData} /></li>
        </ul>
        
      </div>
    </div>
  );
}


