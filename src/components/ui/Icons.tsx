import type { SVGProps } from "react";

export function ArrowOpenLeftIcon({
  size = 24,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path strokeDasharray="20" strokeDashoffset="20" d="M21 3v18">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.3s"
            values="20;0"
          />
        </path>
        <path strokeDasharray="16" strokeDashoffset="16" d="M17 12h-13.5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.4s"
            dur="0.3s"
            to="0"
          />
        </path>
        <path strokeDasharray="12" strokeDashoffset="12" d="M3 12l7 7M3 12l7 -7">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.7s"
            dur="0.2s"
            to="0"
          />
        </path>
      </g>
    </svg>
  );
}

export function ArrowOpenRightIcon({
  size = 24,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path strokeDasharray="20" strokeDashoffset="20" d="M3 3v18">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.3s"
            values="20;0"
          />
        </path>
        <path strokeDasharray="16" strokeDashoffset="16" d="M7 12h13.5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.4s"
            dur="0.3s"
            to="0"
          />
        </path>
        <path strokeDasharray="12" strokeDashoffset="12" d="M21 12l-7 7M21 12l-7 -7">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.7s"
            dur="0.2s"
            to="0"
          />
        </path>
      </g>
    </svg>
  );
}
