import React, { useEffect, useState } from "react";
import useHover from "hooks/useHover";
import s from "./Tooltip.module.scss";
import useMediaQuery from "hooks/useMediaQuery";
import clsx from "clsx";

interface ToolTipProps {
  children: React.ReactNode;
  title: string;
  state?: boolean;
  reverse?: boolean;
}

export default function ToolTip({
  children,
  title,
  state,
  reverse,
}: ToolTipProps) {
  const [tooltipWidth, settooltipWidth] = useState<number | null>(null);
  const tooltipTarget = React.useRef<HTMLDivElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const isHovering: boolean = useHover(tooltipTarget);
  const matches: boolean = useMediaQuery("(max-width: 425px)");

  useEffect(() => {
    const tolltipWidth = tooltipRef.current && tooltipRef.current.clientWidth;
    if (tolltipWidth) settooltipWidth(tolltipWidth / 2);

    return () => {};
  }, []);

  return (
    <div ref={tooltipTarget} style={{ position: "relative" }}>
      <div
        style={{ left: `calc(47% - ${tooltipWidth}px)` }}
        ref={tooltipRef}
        className={clsx(
          s.tooltip,
          reverse && s.tooltipReverse,
          !matches && !state && isHovering && s.tooltipShow
        )}
      >
        {title}
      </div>
      {children}
    </div>
  );
}
