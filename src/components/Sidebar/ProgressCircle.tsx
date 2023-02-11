import React from "react";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import "react-circular-progressbar/dist/styles.css";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

function ProgressCircle({ data }: any) {
  return (
    <AnimatedProgressProvider
      valueStart={0}
      valueEnd={data.percent1}
      duration={2}
      easingFunction={easeQuadInOut}
    >
      {(value: number) => {
        const roundedValue = Math.round(value);
        return (
          <CircularProgressbarWithChildren
            value={data.percent1}
            strokeWidth={12}
            styles={buildStyles({
              rotation: 0.28,
              pathTransitionDuration: 2,
              pathColor: `#abd1ff`,
              trailColor: "#fff",
            })}
          >
            <CircularProgressbarWithChildren
              value={data.percent2}
              strokeWidth={12}
              styles={buildStyles({
                rotation: 0.28,
                pathTransitionDuration: 1.5,
                pathColor: "#0070f3",
                trailColor: "transparent",
              })}
            >
              <CircularProgressbarWithChildren
                value={data.percent3}
                strokeWidth={12}
                styles={buildStyles({
                  rotation: 0.28,
                  pathTransitionDuration: 1,
                  pathColor: "#024da9",
                  trailColor: "transparent",
                })}
              ></CircularProgressbarWithChildren>
            </CircularProgressbarWithChildren>
            <p>{`${roundedValue}%`}</p>
          </CircularProgressbarWithChildren>
        );
      }}
    </AnimatedProgressProvider>
  );
}

export default ProgressCircle;
