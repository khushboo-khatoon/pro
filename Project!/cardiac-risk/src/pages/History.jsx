import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

const COLORS = ["#22c55e", "#facc15", "#ef4444"]

function History() {

  const [predictions,setPredictions] = useState([])
  const { user } = useContext(AuthContext)

  const [lineData,setLineData] = useState([])
  const [pieData,setPieData] = useState([])

  useEffect(()=>{

  if(!user) return

  const fetchPredictions = async()=>{

    try{

      const res = await axios.get(
        `http://localhost:8080/api/predictions/${user.id}`
      )

      const data = res.data

      setPredictions(data)

      const line = data.map(item=>({
        name: new Date(item.date).toLocaleDateString(),
        risk: item.risk
      }))

      setLineData(line)

      const low = data.filter(p=>p.level==="Low Risk").length
      const medium = data.filter(p=>p.level==="Moderate Risk").length
      const high = data.filter(p=>p.level==="High Risk").length

      setPieData([
        { name:"Low", value:low },
        { name:"Medium", value:medium },
        { name:"High", value:high }
      ])

    }catch(err){
      console.log(err)
    }

  }

  fetchPredictions()

},[user])

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Charts Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        {/* Line Chart */}
        <div className="col-span-2 bg-white p-4 rounded-xl shadow">

          <h3 className="font-semibold mb-3">
            Risk Trend Overview
          </h3>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
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

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center">

          <h3 className="font-semibold mb-4">
            Risk Distribution
          </h3>

          <PieChart width={200} height={200}>

            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={70}
              label
            >

              {pieData.map((entry,index)=>(
                <Cell key={index} fill={COLORS[index]}/>
              ))}

            </Pie>

          </PieChart>

        </div>

      </div>

      {/* Prediction History Table */}
      <div className="bg-white rounded-xl shadow p-4">

        <div className="flex justify-between mb-4">
          <h3 className="font-semibold text-lg">
            Prediction History
          </h3>
        </div>

        <table className="w-full text-left">

          <thead className="border-b">
            <tr>
              <th className="py-2">Date</th>
              <th>Risk %</th>
              <th>Risk Category</th>
              <th>Prediction</th>
            </tr>
          </thead>

          <tbody>

          {predictions.map((item,index)=>(

            <tr key={index} className="border-b">

              <td className="py-2">
                {new Date(item.date).toLocaleDateString()}
              </td>

              <td>
                {item.risk}%
              </td>

              <td className="font-semibold">
                {item.level}
              </td>

              <td>
                {item.prediction}
              </td>

            </tr>

          ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default History