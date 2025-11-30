"use client";
import dynamic from "next/dynamic";

const Bar = dynamic(
  () => import("@/features/routes/statistics/components/Bar"),
{ ssr: false })

const Chart: React.FC = () => {

  return (
    <>
      <Bar />
    </>
  )
}

export default Chart;