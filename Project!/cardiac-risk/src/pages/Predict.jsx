import { useState } from "react"
import ManualEntryCard from "../components/ManualEntryCard"
import UploadReportCard from "../components/UploadReportCard"

function Predict() {

  const [mode, setMode] = useState("manual")

  return (

    <div className="flex flex-col items-center">

      <h1 className="text-3xl font-semibold mb-2">
        Heart Risk Prediction
      </h1>

      <p className="text-gray-500 mb-6 text-center max-w-xl">
        Enter patient vitals manually or upload a medical report.
      </p>

      <div className="flex gap-4 mb-8">

        <button
          onClick={() => setMode("manual")}
          className={`px-4 py-2 rounded-md
          ${mode === "manual"
          ? "bg-blue-600 text-white"
          : "bg-gray-200"}`}
        >
          Manual Entry
        </button>

        <button
          onClick={() => setMode("upload")}
          className={`px-4 py-2 rounded-md
          ${mode === "upload"
          ? "bg-blue-600 text-white"
          : "bg-gray-200"}`}
        >
          Upload Report
        </button>

      </div>

      {mode === "manual" && <ManualEntryCard />}
      {mode === "upload" && <UploadReportCard />}

    </div>

  )
}

export default Predict