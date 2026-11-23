import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as echarts from "echarts";

interface District {
  total: {
    confirmed?: number;
    recovered?: number;
    deceased?: number;
    tested?: number;
    vaccinated1?: number;
    vaccinated2?: number;
    vaccinated3?: number;
  };
  delta: Record<string, number>;
  meta: {
    population?: number;
  };
}

interface GujaratResponse {
  districts: Record<string, District>;
  total: District["total"];
  meta: {
    date?: string;
    last_updated?: string;
    notes?: string;
    population?: number;
  };
}

const ChartCom = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const [gujaratData, setGujaratData] = useState<GujaratResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getGujaratData = async () => {
      try {
        const response = await axios.get("/covid-api/v4/min/data.min.json");

        const gujarat: GujaratResponse | undefined = response.data?.GJ;

        if (!gujarat?.districts) {
          throw new Error(
            "Gujarat district data was not found in the API response.",
          );
        }

        console.log("Complete Gujarat data:", gujarat);
        console.log("Districts:", gujarat.districts);
        console.log("State totals:", gujarat.total);

        setGujaratData(gujarat);
      } catch (err) {
        console.error("Gujarat API error:", err);

        setError(
          axios.isAxiosError(err)
            ? `Request failed: ${err.message}`
            : err instanceof Error
              ? err.message
              : "Unable to fetch Gujarat data.",
        );
      } finally {
        setLoading(false);
      }
    };

    getGujaratData();
  }, []);

  useEffect(() => {
    if (!chartRef.current || !gujaratData) return;

    const districts = Object.entries(gujaratData.districts);

    const chart = echarts.init(chartRef.current);

    chart.setOption({
      title: {
        text: "Gujarat District-wise COVID-19 Statistics",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        top: 35,
      },
      grid: {
        left: 60,
        right: 25,
        bottom: 110,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: districts.map(([name]) => name),
        axisLabel: {
          rotate: 45,
          interval: 0,
        },
      },
      yAxis: {
        type: "value",
      },
      dataZoom: [{ type: "inside" }, { type: "slider", bottom: 10 }],
      series: [
        {
          name: "Confirmed",
          type: "bar",
          data: districts.map(([, district]) => district.total.confirmed ?? 0),
        },
        {
          name: "Recovered",
          type: "bar",
          data: districts.map(([, district]) => district.total.recovered ?? 0),
        },
        {
          name: "Deceased",
          type: "bar",
          data: districts.map(([, district]) => district.total.deceased ?? 0),
        },
      ],
    });

    const handleResize = () => chart.resize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [gujaratData]);

  if (loading) {
    return <p>Loading Gujarat statistics...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!gujaratData) {
    return <p>No Gujarat data available.</p>;
  }

  return (
    <div className="max-w-[1500px] mx-auto">
      <h2>Gujarat COVID-19 Statistics</h2>
      <p>Data date: {gujaratData.meta.date ?? "Not available"}</p>

      <div
        ref={chartRef}
        className="pb-7"
        style={{ width: "100%", height: "748px" }}
      />
    </div>
  );
};

export default ChartCom;
