import { T } from "./Language";
const atoms = Array.from({ length: 4 }, (_, z) =>
  Array.from({ length: 5 }, (_, x) =>
    Array.from({ length: 3 }, (_, y) => ({ x, y, z })),
  ),
).flat(2);
const position = (x: number, y: number, z: number) => [
  115 + x * 68 + y * 33,
  274 - y * 44 - z * 57 + x * 8,
];
export function Lattice() {
  return (
    <div className="lattice-panel">
      <div className="figure-top">
        <span>
          <i className="live-dot" /> <T zh="结构探索">STRUCTURE EXPLORER</T>
        </span>
        <span>FIG. 01</span>
      </div>
      <svg
        viewBox="0 0 520 350"
        role="img"
        aria-label="Illustrative crystal lattice with atoms connected along a unit cell"
      >
        <defs>
          <pattern
            id="grid"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M26 0H0V26"
              fill="none"
              stroke="#e2e5e8"
              strokeWidth=".5"
            />
          </pattern>
        </defs>
        <rect width="520" height="350" fill="url(#grid)" />
        <g stroke="#8794a1" strokeWidth="1">
          {atoms.flatMap(({ x, y, z }, i) =>
            [
              [x + 1, y, z],
              [x, y + 1, z],
              [x, y, z + 1],
            ]
              .filter(([a, b, c]) => a < 5 && b < 3 && c < 4)
              .map(([a, b, c], j) => {
                const [x1, y1] = position(x, y, z),
                  [x2, y2] = position(a, b, c);
                return (
                  <line
                    key={`${i}-${j}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    opacity=".5"
                  />
                );
              }),
          )}
        </g>
        <g>
          {[...atoms]
            .sort((a, b) => b.y - a.y || a.z - b.z)
            .map(({ x, y, z }) => {
              const [cx, cy] = position(x, y, z);
              return (
                <circle
                  key={`${x}-${y}-${z}`}
                  cx={cx}
                  cy={cy}
                  r={y === 0 ? 4 : 3.2}
                  fill={(x + y + z) % 5 === 0 ? "#ffffff" : "#465f78"}
                  stroke="#465f78"
                  strokeWidth="1"
                  opacity={y === 2 ? 0.72 : 1}
                />
              );
            })}
        </g>
        <g stroke="#687583" fill="none" strokeWidth="1.2">
          <path d="M51 295v-43m0 43h44m-44 0 22-24" />
          <path d="m47 256 4-5 4 5m36 35 5 4-5 4m-21-24 4-5 1 6" />
        </g>
        <g fill="#687583" fontSize="11" fontFamily="monospace">
          <text x="99" y="300">
            a
          </text>
          <text x="78" y="270">
            b
          </text>
          <text x="46" y="245">
            c
          </text>
        </g>
        <path
          d="M351 39h69v38"
          stroke="#8794a1"
          fill="none"
          strokeDasharray="3 3"
        />
        <text
          x="366"
          y="32"
          fill="#687583"
          fontFamily="monospace"
          fontSize="10"
        >
          <T zh="晶胞">UNIT CELL</T>
        </text>
      </svg>
      <div className="figure-bottom">
        <span>
          <i className="legend-dot" /> <T zh="晶格">Crystal lattice</T>{" "}
          <small>
            <T zh="示意模型">Illustrative model</T>
          </small>
        </span>
        <span className="figure-axis">
          a · b · c <IconCube />
        </span>
      </div>
    </div>
  );
}
function IconCube() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="m12 2 9 5v10l-9 5-9-5V7l9-5ZM3 7l9 5 9-5m-9 5v10" />
    </svg>
  );
}
