"use client";

import { SQUARE, platform, type SquareColor } from "@/lib/content";

/**
 * The platform, drawn.
 *
 * The hub is the mark itself. Four arms leave it in the directions of the mark's
 * own quadrants, and each arm ends in a node carrying its area's products as
 * satellites. Choosing an area in the list beside it lights that arm and sends a
 * signal out along it, so the diagram answers the list instead of repeating it.
 *
 * Only the outer ring turns. The structure holds still, because the point being
 * made is that these four areas are one fixed thing.
 *
 * Decorative on purpose: every name it stands for is a real, focusable item in
 * the tab list next to it, so this subtree is hidden from assistive technology
 * and nothing in it can be reached by keyboard.
 */

/** Arm directions follow the mark's quadrants, so the diagram is the logo. */
const ANGLE: Record<SquareColor, number> = {
  red: 225,
  green: 315,
  blue: 135,
  yellow: 45,
};

const HUB = 300;
const NODE_R = 148;
const SAT_R = 246;
const SPREAD = 26;

const rad = (deg: number) => (deg * Math.PI) / 180;

/*
 * Coordinates are rounded before they reach the DOM. Math.cos and Math.sin are
 * not required to be correctly rounded, so Node and the browser can disagree on
 * the last bit of a double — enough for React to report a hydration mismatch on
 * an attribute like y2. Three decimals is far finer than a 600-unit viewBox can
 * show, and it is the same number on both sides.
 */
const round = (n: number) => Math.round(n * 1000) / 1000;
const at = (deg: number, r: number) => ({
  x: round(HUB + Math.cos(rad(deg)) * r),
  y: round(HUB + Math.sin(rad(deg)) * r),
});

const arms = platform.map((p) => {
  const angle = ANGLE[p.color];
  const node = at(angle, NODE_R);
  const step = p.items.length > 1 ? (SPREAD * 2) / (p.items.length - 1) : 0;
  const satellites = p.items.map((item, i) => ({
    item,
    ...at(angle - SPREAD + step * i, SAT_R),
  }));
  const from = at(angle - SPREAD, SAT_R);
  const to = at(angle + SPREAD, SAT_R);
  return {
    ...p,
    angle,
    node,
    satellites,
    start: at(angle, 46),
    // The stretch of sky this area occupies, drawn on the outer ring.
    arc: `M ${from.x} ${from.y} A ${SAT_R} ${SAT_R} 0 0 1 ${to.x} ${to.y}`,
  };
});

export function PlatformEcosystem({ active }: { active: SquareColor }) {
  return (
    <svg
      viewBox="0 0 600 600"
      aria-hidden="true"
      focusable="false"
      data-active={active}
      className="eco pointer-events-none w-full"
    >
      <defs>
        <radialGradient id="eco-core">
          <stop offset="0%" stopColor="#8fc4ff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#8fc4ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={HUB} cy={HUB} r="230" fill="url(#eco-core)" />

      {/* The distance the areas sit at. Faint enough to read as structure. */}
      <circle
        cx={HUB}
        cy={HUB}
        r={NODE_R}
        fill="none"
        stroke="var(--edge)"
        strokeWidth="1"
      />

      <g className="eco-orbit">
        <circle
          cx={HUB}
          cy={HUB}
          r={SAT_R}
          fill="none"
          stroke="var(--edge)"
          strokeWidth="1"
          strokeDasharray="2 9"
        />
      </g>

      {arms.map((a) => {
        const live = active === a.color;
        return (
          <g key={a.color} className="eco-branch" data-live={live || undefined}>
            <path
              d={a.arc}
              fill="none"
              stroke={SQUARE[a.color]}
              strokeWidth={live ? 2 : 1}
              opacity={live ? 0.9 : 0.6}
            />

            {a.satellites.map((s) => (
              <line
                key={s.item}
                x1={a.node.x}
                y1={a.node.y}
                x2={s.x}
                y2={s.y}
                stroke={SQUARE[a.color]}
                strokeWidth="1"
                opacity={live ? 1 : 0.5}
              />
            ))}

            <line
              x1={a.start.x}
              y1={a.start.y}
              x2={a.node.x}
              y2={a.node.y}
              stroke={SQUARE[a.color]}
              strokeWidth={live ? 1.75 : 1}
              opacity={live ? 1 : 0.55}
            />

            {a.satellites.map((s) => (
              <circle
                key={s.item}
                cx={s.x}
                cy={s.y}
                r={live ? 5 : 3.5}
                fill={live ? SQUARE[a.color] : "#0a0c14"}
                stroke={SQUARE[a.color]}
                strokeWidth="1.25"
              />
            ))}

            <rect
              x={a.node.x - 11}
              y={a.node.y - 11}
              width="22"
              height="22"
              fill={SQUARE[a.color]}
              style={
                live
                  ? { filter: `drop-shadow(0 0 16px ${SQUARE[a.color]})` }
                  : undefined
              }
            />

            {/* The signal leaving the hub, on the lit arm only. Drawn in a
                frame rotated onto the arm, so it only has to travel in x. */}
            <g transform={`rotate(${a.angle} ${HUB} ${HUB})`}>
              <circle
                className="eco-pulse"
                cx={HUB + 50}
                cy={HUB}
                r="3.5"
                fill="#ffffff"
                style={{ "--reach": "84px" } as React.CSSProperties}
              />
            </g>
          </g>
        );
      })}

      {/* The hub. Not dimmed with the arms: it is the fixed thing. */}
      <g>
        <rect x={HUB - 33} y={HUB - 33} width="31" height="31" fill={SQUARE.red} />
        <rect x={HUB + 2} y={HUB - 33} width="31" height="31" fill={SQUARE.green} />
        <rect x={HUB - 33} y={HUB + 2} width="31" height="31" fill={SQUARE.blue} />
        <rect x={HUB + 2} y={HUB + 2} width="31" height="31" fill={SQUARE.yellow} />
      </g>
    </svg>
  );
}
