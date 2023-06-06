import { useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";

const CalorieProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
        return (45 / 150) * 100;
    };

    const newProgress = calculateProgress();
    setProgress(newProgress);
  }, []);

  return <LinearProgress variant="determinate" value={progress} sx={{width: 400}}/>;
};

export default CalorieProgress;
