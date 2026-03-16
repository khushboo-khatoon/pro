import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

function Dashboard(){

  const [risk,setRisk] = useState("--")
  const [category,setCategory] = useState("No Data")
  const [total,setTotal] = useState(0)
  const [date,setDate] = useState("--")
  const [chartData,setChartData] = useState([])

  useEffect(()=>{

    const fetchDashboard = async()=>{

      try{

        // latest prediction
        const latest = await axios.get(
          "http://localhost:8080/api/predictions/latest/1"
        )

        if(latest.data){

          setRisk(latest.data.risk + "%")
          setCategory(latest.data.level)
          setDate(new Date(latest.data.date).toLocaleDateString())

        }

        // full history
        const history = await axios.get(
          "http://localhost:8080/api/predictions/1"
        )

        setTotal(history.data.length)

        const chart = history.data.map((item,index)=>({

          name: new Date(item.date).toLocaleDateString(),
          risk: item.risk

        }))

        setChartData(chart)

      }catch(err){

        console.log(err)

      }

    }

    fetchDashboard()

  },[])

  return(

    <>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Last Risk Percentage</p>
          <h2 className="text-3xl font-bold mt-2">{risk}</h2>
          <p className="text-gray-400 text-sm mt-1">{date}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Risk Category</p>
          <h2 className="text-2xl font-bold mt-2">{category}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Predictions</p>
          <h2 className="text-3xl font-bold mt-2">{total}</h2>
        </div>

        <Link
          to="/dashboard/predict"
          className="bg-gradient-to-r from-blue-500 to-blue-700 
          text-white p-6 rounded-xl shadow-md flex flex-col justify-center"
        >
          <p className="text-sm opacity-80">Predict Risk</p>
          <h2 className="text-xl font-semibold mt-2">
            Start New Risk Prediction
          </h2>
        </Link>

      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">

        <h2 className="text-lg font-semibold mb-6">
          Risk Trend
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={chartData}>

            <XAxis dataKey="name"/>

            <YAxis/>

            <Tooltip/>

            <Line
              type="monotone"
              dataKey="risk"
              stroke="#3b82f6"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </>
  )
}

export default Dashboard