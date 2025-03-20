import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { getTrendOverview } from "../../../api/handlers/marketHandler";

const TrendOverview: React.FC<{ timeRange: "3days" | "5days" | "10days" }> = ({ timeRange }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getTrendOverview(timeRange).then((data) => setData(data));
  }, [timeRange]);

  useEffect(() => {
    if (!data.length) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };

    const x = d3.scaleTime().domain(d3.extent(data, (d) => new Date(d.date)) as [Date, Date]).range([margin.left, width - margin.right]);
    const y = d3.scaleLinear().domain([0, d3.max(data, (d) => d.index) as number]).range([height - margin.bottom, margin.top]);

    const line = d3.line<any>().x((d) => x(new Date(d.date))).y((d) => y(d.index));
    svg.append("path").datum(data).attr("fill", "none").attr("stroke", "steelblue").attr("stroke-width", 1.5).attr("d", line);

    svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x));
    svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={svgRef} width={600} height={400}></svg>;
};

export default TrendOverview;