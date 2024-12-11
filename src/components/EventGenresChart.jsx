// src/components/EventGenresChart.jsx

import React, { useState, useEffect } from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      // Genres you want to show in the pie chart
      const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"];
      
      // Loop through each genre to filter events that match the genre
      const data = genres.map((genre) => {
        // Filter events that contain the genre name in the summary
        const filteredEvents = events.filter((event) =>
          event.summary.includes(genre)
        );
        
        // Return an object containing the genre name and count of filtered events
        return {
          name: genre,
          value: filteredEvents.length,
        };
      });

      return data;
    };

    // Set the data for the pie chart
    setData(getData());
  }, [events]);

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          fill="#8884d8"
          labelLine={false}
          label
          outerRadius={130}
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
