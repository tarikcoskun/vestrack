const solidProps = {
  fill: "currentColor",
} as const;

const lineProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "2",
} as const;

export const icons = {
  // tabler:menu-deep
  menu: <path {...lineProps} d="M4 6h16M7 12h13m-10 6h10" />,
  // tabler:star-filled
  star: (
    <path
      {...solidProps}
      d="m8.243 7.34l-6.38.925l-.113.023a1 1 0 0 0-.44 1.684l4.622 4.499l-1.09 6.355l-.013.11a1 1 0 0 0 1.464.944l5.706-3l5.693 3l.1.046a1 1 0 0 0 1.352-1.1l-1.091-6.355l4.624-4.5l.078-.085a1 1 0 0 0-.633-1.62l-6.38-.926l-2.852-5.78a1 1 0 0 0-1.794 0z"
    />
  ),
  // tabler:player-play-filled
  play: (
    <path
      {...solidProps}
      d="M6 4v16a1 1 0 0 0 1.524.852l13-8a1 1 0 0 0 0-1.704l-13-8A1 1 0 0 0 6 4"
    />
  ),
  // tabler:bookmark-filled
  bookmark: (
    <path
      {...solidProps}
      d="M14 2a5 5 0 0 1 5 5v14a1 1 0 0 1-1.555.832L12 18.202l-5.444 3.63a1 1 0 0 1-1.55-.72L5 21V7a5 5 0 0 1 5-5z"
    />
  ),
  // tabler:loader-2
  loader: <path {...lineProps} d="M12 3a9 9 0 1 0 9 9" />,
  // tabler:x
  x: <path {...lineProps} d="M18 6L6 18M6 6l12 12" />,
  // tabler:search
  search: (
    <path {...lineProps} d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6" />
  ),
  // mdi:account-circle
  user: (
    <path
      d="M12 20.64C9 20.64 6.348 19.104 4.8 16.8C4.836 14.4 9.6 13.08 12 13.08C14.4 13.08 19.164 14.4 19.2 16.8C18.4068 17.9814 17.3352 18.9496 16.0796 19.6193C14.824 20.2889 13.423 20.6395 12 20.64ZM12 3.6C12.9548 3.6 13.8705 3.97928 14.5456 4.65442C15.2207 5.32955 15.6 6.24522 15.6 7.2C15.6 8.15478 15.2207 9.07045 14.5456 9.74559C13.8705 10.4207 12.9548 10.8 12 10.8C11.0452 10.8 10.1295 10.4207 9.45442 9.74559C8.77928 9.07045 8.4 8.15478 8.4 7.2C8.4 6.24522 8.77928 5.32955 9.45442 4.65442C10.1295 3.97928 11.0452 3.6 12 3.6ZM12 0C10.4241 0 8.86371 0.310389 7.4078 0.913446C5.95189 1.5165 4.62902 2.40042 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C4.62902 21.5996 5.95189 22.4835 7.4078 23.0866C8.86371 23.6896 10.4241 24 12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 5.364 18.6 0 12 0Z"
      {...solidProps}
    />
  ),
  // tabler:external-link
  "external-link": (
    <path
      {...lineProps}
      d="M12 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6m-7 1l9-9m-5 0h5v5"
    />
  ),
  // tabler:chevron-down
  "chevron-down": <path {...lineProps} d="m6 9l6 6l6-6" />,
  "chevron-left": <path {...lineProps} d="m15 6l-6 6l6 6" />,
  "chevron-right": <path {...lineProps} d="m9 6l6 6l-6 6" />,
  "arrow-right": <path {...lineProps} d="M5 12h14m-6 6l6-6m-6-6l6 6" />,
  share: (
    <path
      {...lineProps}
      d="M3 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m12-6a3 3 0 1 0 6 0a3 3 0 1 0-6 0m0 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m-6.3-7.3l6.6-3.4m-6.6 6l6.6 3.4"
    />
  ),
  check: <path {...lineProps} d="m5 12l5 5L20 7" />,
};
