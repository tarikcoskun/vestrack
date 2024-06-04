import { iconsLine } from "./line";
import { iconsFill } from "./fill";
import { iconsCommon } from "./common";

const icons = {
  line: {
    ...iconsCommon,
    ...iconsLine,
  },
  fill: {
    ...iconsCommon,
    ...iconsFill,
  },
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
  variant?: "line" | "fill";
  icon: IconList;
  size?: number | string;
}

export type IconList = keyof typeof icons.line;

export function Icon({ icon, size = 16, variant = "line", ...props }: IconProps) {
  const body = icons[variant][icon];

  return (
    <svg
      {...props}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size.toString()}
      height={size.toString()}
    >
      <g fill="currentColor">{body}</g>
    </svg>
  );
}
