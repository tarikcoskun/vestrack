import { toast } from "sonner";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useClipboard } from "@/hooks/useClipboard";

// Components
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

// Styles
import style from "./Sidebar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const sections = [
  {
    label: "Cast & Crew",
    id: "cast",
  },
  {
    label: "Videos",
    id: "videos",
  },
  {
    label: "User Reviews",
    id: "reviews",
  },
  {
    label: "Recommendations",
    id: "recommendations",
  },
];

export function TitleInfoSidebar() {
  const { copyToClipboard, isCopied } = useClipboard();

  const activeId = useScrollSpy(sections.map((i) => i.id), 48);

  return (
    <div className={cx("sidebar")}>
      <ol className={cx("sidebarLinks")}>
        {sections.map((section) => (
          <li key={section.label}>
            <button
              role="button"
              data-state={activeId === section.id ? "active" : "inactive"}
              className={cx("sidebarLink")}
              onClick={() => {
                document.querySelector(`#${section.id}`)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ol>
      <div className={cx("actions")}>
        <Button.Group>
          <Button
            color="blue"
            leading={<Icon icon="bookmark" variant="fill" size={18} />}
          >
            Add to Watchlist
          </Button>
          <Button color="blue" padding="square">
            <Icon icon="caret-down" size={18} />
          </Button>
        </Button.Group>

        <Button
          color="gray"
          variant="soft"
          leading={<Icon icon={isCopied ? "check" : "share"} variant="fill" />}
          onClick={() => {
            copyToClipboard(location.href);
            toast.info("Copied to clipboard");
          }}
        >
          Share
        </Button>
      </div>
    </div>
  );
}
