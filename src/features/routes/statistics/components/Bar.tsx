"use client";
import _ from "lodash";
import { useState, useEffect } from "react";
import { InboundFetchData } from "@/features/routes/statistics/hooks";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { InboundYear, InboundCountry } from "@/constans/inbound";
import YearSelect from "./YearSelect";
import CountrySelect from "./CountrySelect";
import { GetChartClass } from "@/types/getChartClass";
import { GetChartValue } from "@/types/getChartValue";
import { GetGraph } from "@/types/getGraph";

const Bar: React.FC = () => {
  const [year, setYear] = useState(InboundYear[0]);
  const [country, setCountry] = useState([InboundCountry[0]["code"]]);
  const [purpose, setPurpose] = useState([]);
  const [purposeData, setPurposeData] = useState<GetGraph>([]);

  const yearDataValue = (newVal: string) => {
    setYear(newVal);
  }

  const countryDataValue = (newVal: string[]) => {
    setCountry(newVal);
  }

  useEffect(() => {
    const inboundFetchData = async () => {
      const result = await InboundFetchData(year, country);
      setPurpose(result.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[2].CLASS);
      const classData = result.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[2].CLASS.map((v: GetChartClass) => v["@code"]);
      const valueData: GetChartValue = result.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE;

      console.log(result)

      // 重複チェック
      const fixResult = _.chain(valueData).groupBy("@cat02").map((group) => ({
        "@area": group[0]["@area"],
        "@cat01": group[0]["@cat01"],
        "@cat02": group[0]["@cat02"],
        "@tab": group[0]["@tab"],
        "@time": group[0]["@time"],
        "@unit": group[0]["@unit"],
        "$": _.sumBy(group, item => Number(item["$"])),
      })).value();

      const data = fixResult.map((v) => {
        const obj = { value: "", cat02: "" };
        obj["value"] = String(v["$"]);
        obj["cat02"] = v["@cat02"];
        return obj;
      });
      if (classData.length !== valueData.length) {
        const extractionCat02 = valueData.map(v => v["@cat02"]);
        const notData = classData.filter((v: string) => !extractionCat02.includes(v)).map((v: any) => {
          const obj = { value: "", cat02: "" };
          obj["value"] = "0";
          obj["cat02"] = v;
          return obj;
        });
        const result = [...notData, ...data];
        result.sort((a, b) => Number(a.cat02) - Number(b.cat02));
        console.log(result)
        
        setPurposeData((prev) => {
          prev = [];
          return result;
        });
      } else {
        setPurposeData((prev) => {
          prev = [];
          return data;
        });
      }
    }
    inboundFetchData();
  }, [year, country]);

  return (
    <>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
      }}>
        <Box sx={{width: "12%"}}>
          <YearSelect key={year} year={year} yearDataValue={yearDataValue} />
          <CountrySelect key={country.join("-")} country={country} countryDataValue={countryDataValue} />
        </Box>
        <Box sx={{ width: "86%" }}>
          <BarChart
            layout="horizontal"
            yAxis={
              [
                {
                  data: purpose.map(v => v["@name"]),
                  dataKey: "purpose",
                  width: 240,
                  scaleType: "band",
                  tickLabelStyle: {
                    fontSize: 10,
                  },
                }
              ]
            }
            series={
              [
                {
                  data: purposeData.map(v => Number(v.value)),
                },
              ]
            }
            height={600}
          />
        </Box>
      </Box>
    </>
  )
}

export default Bar;