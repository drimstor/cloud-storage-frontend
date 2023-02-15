import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import "react-circular-progressbar/dist/styles.css";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

function ProgressCircle({ data, sumValue }: any) {
  const dataKeys = Object.keys(data);

  return (
    <AnimatedProgressProvider
      valueStart={0}
      valueEnd={sumValue}
      duration={2}
      easingFunction={easeQuadInOut}
    >
      {(value: number) => {
        const roundedValue = Math.round(value);
        return (
          <CircularProgressbarWithChildren
            value={sumValue}
            strokeWidth={12}
            styles={buildStyles({
              rotation: 0.28,
              pathTransitionDuration: 2,
              pathColor: "#024da9",
              trailColor: "#fff",
            })}
          >
            <CircularProgressbarWithChildren
              value={sumValue - data[dataKeys[0]]}
              strokeWidth={12}
              styles={buildStyles({
                rotation: 0.28,
                pathTransitionDuration: 1.5,
                pathColor: "#0070f3",
                trailColor: "transparent",
              })}
            >
              <CircularProgressbarWithChildren
                value={data[dataKeys[2]]}
                strokeWidth={12}
                styles={buildStyles({
                  rotation: 0.28,
                  pathTransitionDuration: 1,
                  pathColor: `#abd1ff`,
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
