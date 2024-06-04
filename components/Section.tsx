// Components
import { Icon } from "./Icon";
import { Scroller } from "./Scroller";

// Styles
import style from "./Section.module.scss";
import classNames from "classnames/bind";

type SectionProps = React.HTMLAttributes<HTMLElement>;

const cx = classNames.bind(style);

function SectionRoot(props: SectionProps) {
  const { className, children, ...sectionProps } = props;

  return (
    <section {...sectionProps} className={cx("section", className)}>
      {children}
    </section>
  );
}

interface SectionHeaderProps extends React.HTMLAttributes<HTMLElement> {
  scrollerControls?: boolean;
}

function SectionHeader(props: SectionHeaderProps) {
  const { scrollerControls = false, className, children, ...headerProps } = props;

  return (
    <header {...headerProps} className={cx("sectionHeader", className)}>
      {children}

      {scrollerControls && (
        <div className={cx("scrollerControls")}>
          <Scroller.Trigger direction="left">
            <Icon icon="caret-left" />
          </Scroller.Trigger>
          <Scroller.Trigger direction="right">
            <Icon icon="caret-right" />
          </Scroller.Trigger>
        </div>
      )}
    </header>
  );
}

export const Section = Object.assign(SectionRoot, {
  Header: SectionHeader,
});
