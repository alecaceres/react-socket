import React, { useContext, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { SocketContext } from "../context/SocketContext";

const generateColorFromId = (id) => {
    // Use a hash function to generate a color based on the band's ID
    const hash = id.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue = (hash % 360).toString(10); // Use hue values between 0 and 359
  
    // Allow more flexibility by varying the saturation and lightness
    const saturation = Math.floor(Math.random() * 41) + 30; // Range from 30% to 70%
    const lightness = Math.floor(Math.random() * 41) + 30; // Range from 30% to 70%
  
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`; // Use HSL color format
  };
  
   

export const BandChart = () => {
  const { socket } = useContext(SocketContext);
  const chartRef = useRef(null);

  const createChart = (bands = []) => {
    const ctx = document.getElementById("myChart");
  
    // Destroy the previous chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  
    // Generate colors for bands based on their IDs
    const backgroundColors = bands.map((band) => generateColorFromId(band.id));
  
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: bands.map((band) => band.name),
        datasets: [
          {
            label: "# of Votes",
            data: bands.map((band) => band.votes),
            backgroundColor: backgroundColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        scales: {
          x: {
            beginAtZero: true,
            stacked: true,
          },
        },
        indexAxis: 'y',
      },
    });
  }
  
  

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      createChart(bands);
    });
    return () => socket.off("current-bands");
  }, [socket]);

  return (
    <div>
      <canvas id="myChart"></canvas>
    </div>
  );
};
