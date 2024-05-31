import { iconsFill } from "./fill";
import { iconsRegular } from "./regular";
import { iconsShared } from "./shared";

const icons = {
  fill: {
    ...iconsShared,
    ...iconsFill,
  },
  regular: {
    ...iconsShared,
    ...iconsRegular,
  },
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
  variant?: "regular" | "fill";
  icon: keyof typeof icons.fill;
  size?: number | string;
}

export type IconList = keyof typeof icons.fill;

export function Icon({ icon, size = 16, variant = "regular", ...props }: IconProps) {
  const body = icons[variant][icon];

  return (
    <svg
      {...props}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size.toString()}
      height={size.toString()}
      fill="currentColor"
    >
      <g>{body}</g>
    </svg>
  );
}
