import { useEffect, useRef } from "react";
import * as d3 from "d3";

const D3Charts = () => {
  // Sample data
  const categoryData = [
    { name: "Food", value: 300, color: "#FF6384" },
    { name: "Housing", value: 600, color: "#36A2EB" },
    { name: "Transportation", value: 200, color: "#FFCE56" },
    { name: "Entertainment", value: 150, color: "#4BC0C0" },
    { name: "Healthcare", value: 250, color: "#9966FF" },
  ];

  const monthlyData = [
    { name: "Jan", budget: 1000, actual: 1200 },
    { name: "Feb", budget: 1500, actual: 1300 },
    { name: "Mar", budget: 1200, actual: 1100 },
    { name: "Apr", budget: 1600, actual: 1500 },
    { name: "May", budget: 1400, actual: 1700 },
  ];

  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  // Pie Chart with D3
  useEffect(() => {
    if (!pieChartRef.current) return;

    // Clear any existing SVG
    d3.select(pieChartRef.current).selectAll("*").remove();

    const width = pieChartRef.current.clientWidth;
    const height = pieChartRef.current.clientHeight;
    const radius = (Math.min(width, height) / 2) * 0.8;

    const svg = d3
      .select(pieChartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create tooltip
    const tooltip = d3
      .select(pieChartRef.current)
      .append("div")
      .attr(
        "class",
        "bg-black bg-opacity-75 text-white p-2 rounded text-sm absolute pointer-events-none opacity-0 transition-opacity duration-300"
      )
      .style("pointer-events", "none");

    // Pie layout generator
    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);

    // Arc generator with inner radius for donut effect
    const arc = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);

    // Arc for labels
    const labelArc = d3
      .arc()
      .innerRadius(radius * 0.8)
      .outerRadius(radius * 0.8);

    // Add pie chart segments
    const path = svg
      .selectAll("path")
      .data(pie(categoryData))
      .enter()
      .append("path")
      .attr("d", (d) => arc(d))
      .attr("fill", (d) => d.data.color)
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.8)
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .attr(
            "d",
            d3
              .arc()
              .innerRadius(radius * 0.6)
              .outerRadius(radius * 1.05)
          );

        tooltip.transition().duration(200).style("opacity", 0.9);

        tooltip
          .html(`${d.data.name}: $${d.data.value}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 25 + "px");
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 0.8)
          .attr("d", arc);

        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Add labels to pie chart
    svg
      .selectAll("text")
      .data(pie(categoryData))
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "white")
      .style("font-weight", "bold")
      .text((d) => {
        const percent =
          (d.data.value / d3.sum(categoryData, (d) => d.value)) * 100;
        return percent > 5 ? `${percent.toFixed(0)}%` : "";
      });

    // Add entrance animation
    path
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arc(interpolate(t));
        };
      });
  }, [categoryData]);

  // Bar Chart with D3
  useEffect(() => {
    if (!barChartRef.current) return;

    // Clear any existing SVG
    d3.select(barChartRef.current).selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = barChartRef.current.clientWidth - margin.left - margin.right;
    const height =
      barChartRef.current.clientHeight - margin.top - margin.bottom;

    const svg = d3
      .select(barChartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create tooltip
    const tooltip = d3
      .select(barChartRef.current)
      .append("div")
      .attr(
        "class",
        "bg-black bg-opacity-75 text-white p-2 rounded text-sm absolute pointer-events-none opacity-0 transition-opacity duration-300"
      )
      .style("pointer-events", "none");

    // Create X scale
    const x0 = d3
      .scaleBand()
      .domain(monthlyData.map((d) => d.name))
      .range([0, width])
      .paddingInner(0.1);

    const x1 = d3
      .scaleBand()
      .domain(["budget", "actual"])
      .range([0, x0.bandwidth()])
      .padding(0.05);

    // Create Y scale
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(monthlyData, (d) => Math.max(d.budget, d.actual)) * 1.2,
      ])
      .range([height, 0]);

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x0))
      .selectAll("text")
      .style("text-anchor", "middle");

    // Add Y axis
    svg.append("g").call(d3.axisLeft(y).tickFormat((d) => `$${d}`));

    // Add grid lines
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0, ${height})`)
      .style("stroke-dasharray", "3 3")
      .style("opacity", 0.2)
      .call(d3.axisBottom(x0).tickSize(-height).tickFormat(""));

    svg
      .append("g")
      .attr("class", "grid")
      .style("stroke-dasharray", "3 3")
      .style("opacity", 0.2)
      .call(d3.axisLeft(y).tickSize(-width).tickFormat(""));

    // Create color scale
    const color = d3
      .scaleOrdinal()
      .domain(["budget", "actual"])
      .range(["#8884d8", "#82ca9d"]);

    // Add bars
    const barGroups = svg
      .selectAll(".bar-group")
      .data(monthlyData)
      .enter()
      .append("g")
      .attr("class", "bar-group")
      .attr("transform", (d) => `translate(${x0(d.name)}, 0)`);

    // Add "budget" bars
    barGroups
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x1("budget"))
      .attr("y", height)
      .attr("width", x1.bandwidth())
      .attr("height", 0)
      .attr("fill", color("budget"))
      .attr("rx", 4)
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(200).attr("opacity", 0.8);

        tooltip.transition().duration(200).style("opacity", 0.9);

        tooltip
          .html(`Budget: $${d.budget}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 25 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).attr("opacity", 1);

        tooltip.transition().duration(500).style("opacity", 0);
      })
      .transition()
      .duration(800)
      .attr("y", (d) => y(d.budget))
      .attr("height", (d) => height - y(d.budget));

    // Add "actual" bars
    barGroups
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x1("actual"))
      .attr("y", height)
      .attr("width", x1.bandwidth())
      .attr("height", 0)
      .attr("fill", color("actual"))
      .attr("rx", 4)
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(200).attr("opacity", 0.8);

        tooltip.transition().duration(200).style("opacity", 0.9);

        tooltip
          .html(`Actual: $${d.actual}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 25 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).attr("opacity", 1);

        tooltip.transition().duration(500).style("opacity", 0);
      })
      .transition()
      .duration(800)
      .delay(200)
      .attr("y", (d) => y(d.actual))
      .attr("height", (d) => height - y(d.actual));

    // Add legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 100}, ${height + 30})`);

    // Budget legend item
    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", color("budget"));

    legend
      .append("text")
      .attr("x", 18)
      .attr("y", 10)
      .style("font-size", "12px")
      .text("Budget");

    // Actual legend item
    legend
      .append("rect")
      .attr("x", 70)
      .attr("y", 0)
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", color("actual"));

    legend
      .append("text")
      .attr("x", 88)
      .attr("y", 10)
      .style("font-size", "12px")
      .text("Actual");
  }, [monthlyData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Expense by Category */}
      <div className="bg-white rounded-xl shadow-sm p-6 transform transition-all hover:shadow-md duration-300">
        <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
        <div className="h-64 relative" ref={pieChartRef}></div>
      </div>

      {/* Budget vs Actual */}
      <div className="bg-white rounded-xl shadow-sm p-6 transform transition-all hover:shadow-md duration-300">
        <h2 className="text-lg font-semibold mb-4">Budget vs Actual</h2>
        <div className="h-64 relative" ref={barChartRef}></div>
      </div>
    </div>
  );
};

export default D3Charts;
