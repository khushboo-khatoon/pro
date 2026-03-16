import { useLocation } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis
} from "recharts"

import { AuthContext } from "../context/AuthContext"

function Report(){

  const location = useLocation()
  const { user } = useContext(AuthContext)

  const [result, setResult] = useState(location.state?.result || null)

  const [inputs, setInputs] = useState(
  location.state?.inputs || location.state?.parameters || null
  )

  useEffect(()=>{

    if(!result){

      const fetchLatest = async()=>{

        try{

          const res = await axios.get(
            "http://localhost:8080/api/predictions/latest/1"
          )

          setResult(res.data)

        }catch(err){

          console.log(err)

        }

      }

      fetchLatest()

    }

  },[result])

  const downloadReport = () => {

  const pdf = new jsPDF()

  pdf.setFontSize(18)
  pdf.text("CardioAI Heart Risk Report",20,20)

  pdf.setFontSize(12)

  pdf.text(`Patient Name: ${user?.name}`,20,40)
  pdf.text(`Email: ${user?.email}`,20,48)
  pdf.text(`Date: ${today}`,20,56)

  pdf.text("AI Prediction",20,75)

  pdf.text(`Risk Score: ${result.risk}%`,20,85)
  pdf.text(`Risk Level: ${result.level}`,20,93)
  pdf.text(`Prediction: ${result.prediction}`,20,101)

  pdf.text("Health Parameters",20,120)

  if(inputs){

    pdf.text(`Age: ${inputs.age}`,20,130)
    pdf.text(`Cholesterol: ${inputs.chol}`,20,138)
    pdf.text(`HDL: ${inputs.hdl}`,20,146)
    pdf.text(`LDL: ${inputs.ldl}`,20,154)
    pdf.text(`Triglycerides: ${inputs.trig}`,20,162)
    pdf.text(`Blood Pressure: ${inputs.bp}`,20,170)
    pdf.text(`Heart Rate: ${inputs.hr}`,20,178)

  }

  pdf.text("AI Recommendation",20,200)

  if(result.risk < 30)
    pdf.text("Maintain a healthy lifestyle and regular exercise.",20,210)

  else if(result.risk < 60)
    pdf.text("Monitor cholesterol levels and consult a doctor.",20,210)

  else
    pdf.text("High risk detected. Please consult a cardiologist immediately.",20,210)

  pdf.save("CardioAI_Report.pdf")
}

  if(!result){

    return(
      <div className="p-10 text-center">
        No report data available
      </div>
    )

  }

  const gaugeData = [
    { name:"Risk", value: result.risk }
  ]

  const getColor = ()=>{

    if(result.risk < 30) return "#22c55e"
    if(result.risk < 60) return "#facc15"
    return "#ef4444"

  }

  const today = new Date().toLocaleDateString()

  return(

    <div className="p-10 bg-gray-100 min-h-screen">

      <div id="reportContent" className="bg-white p-8 rounded-xl shadow">

        {/* HEADER */}

        <div className="flex justify-between mb-6">

          <h1 className="text-2xl font-bold">
            ❤️ CardioAI | AI Heart Risk Analysis
          </h1>

          <div className="text-right text-sm">
            <p>Report Date: {today}</p>
            <p>Patient Email: {user?.email}</p>
          </div>

        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-3 gap-6 mb-6">

          {/* PATIENT INFO */}

          <div className="bg-gray-50 p-4 rounded-lg">

            <h2 className="font-semibold mb-3">
              Patient Information
            </h2>

            <p><b>Name:</b> {user?.name}</p>
            <p><b>Email:</b> {user?.email}</p>

          </div>

          {/* RISK GAUGE */}

          <div className="flex flex-col items-center">

            <RadialBarChart
              width={250}
              height={150}
              cx="50%"
              cy="100%"
              innerRadius="80%"
              outerRadius="110%"
              barSize={20}
              data={gaugeData}
              startAngle={180}
              endAngle={0}
            >

              <PolarAngleAxis
                type="number"
                domain={[0,100]}
                tick={false}
              />

              <RadialBar
                background
                dataKey="value"
                cornerRadius={10}
                fill={getColor()}
              />

            </RadialBarChart>

            <h2
            className={`text-5xl font-bold ${
              result.risk < 30
              ? "text-green-600"
              : result.risk < 60
              ? "text-yellow-500"
              : "text-red-600"
            }`}
            >
            {result.risk}%
            </h2>

            <p className="font-semibold">
              {result.level}
            </p>

          </div>

          {/* AI DETAILS */}

          <div className="bg-gray-50 p-4 rounded-lg">

            <h2 className="font-semibold mb-3">
              AI Analysis
            </h2>

            <p>Prediction: <b>{result.prediction}</b></p>
            <p>Confidence: <b>{result.confidence}%</b></p>
            <p>Data Completeness: <b>{result.completeness}%</b></p>

          </div>

        </div>

        {/* USER INPUT DATA */}

        {inputs && (

          <div className="bg-gray-50 p-4 rounded-lg">

            <h2 className="font-semibold mb-3">
              Health Input Data
            </h2>

            <div className="grid grid-cols-3 gap-3">

              <p><b>Age:</b> {inputs.age}</p>
              <p><b>Cholesterol:</b> {inputs.chol}</p>
              <p><b>HDL:</b> {inputs.hdl}</p>
              <p><b>LDL:</b> {inputs.ldl}</p>
              <p><b>Triglycerides:</b> {inputs.trig}</p>
              <p><b>Blood Pressure:</b> {inputs.bp}</p>
              <p><b>Heart Rate:</b> {inputs.hr}</p>

            </div>

          </div>

        )}

      </div>

      {/* DOWNLOAD BUTTON */}

      <div className="text-center mt-6">

        <button
        onClick={downloadReport}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
        >
        Download PDF Report
        </button>

      </div>

    </div>

  )

}

export default Report