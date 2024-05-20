import { icons } from "./lib";

export type IconList = keyof typeof icons;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: IconList;
  size?: number | string;
}

export function Icon({ icon, size = 16, ...props }: IconProps) {
  const body = icons[icon];

  return (
    <svg
      {...props}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size.toString()}
      height={size.toString()}
    >
      <g>{body}</g>
    </svg>
  );
}
