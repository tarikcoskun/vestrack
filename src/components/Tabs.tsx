import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { composeRefs } from "@/util/composeRefs";

// Styles
import style from "./Tabs.module.scss";
import classNames from "classnames/bind";

interface TabsValue {
  value: string;
  setValue: (value: string) => void;
  onValueChange: (value: string) => void;
}

const cx = classNames.bind(style);

const TabsContext = createContext({} as TabsValue);

const TabsProvider = ({
  value,
  setValue,
  onValueChange,
  children,
}: React.PropsWithChildren<TabsValue>) => {
  const initialState = { value, setValue, onValueChange };

  return (
    <TabsContext.Provider value={initialState}>{children}</TabsContext.Provider>
  );
};

/* -----------
 * TabsRoot
 * ----------- */

interface TabsProps extends React.HTMLAttributes<HTMLElement> {
  defaultValue: string;
  orientation?: "vertical" | "horizontal";
  onValueChange?: (value: string) => void;
}

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(
  (props, forwardedRef) => {
    const {
      defaultValue,
      orientation = "horizontal",
      className,
      children,
      ...tabsProps
    } = props;
    const [value, setValue] = useState(defaultValue);

    return (
      <TabsProvider
        value={value}
        setValue={setValue}
        onValueChange={(val) => props.onValueChange?.(val)}
      >
        <div
          {...tabsProps}
          data-orientation={orientation}
          className={cx("tabsRoot", className)}
          ref={forwardedRef}
        >
          {children}
        </div>
      </TabsProvider>
    );
  }
);

/* -----------
 * TabsList
 * ----------- */

interface TabsListProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean;
}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  (props, forwardedRef) => {
    const { sticky = false, className, children, ...listProps } = props;
    const tableHeadRef = useRef<HTMLElement>(null);
    const [isSticked, setSticked] = useState(false);

    useEffect(() => {
      const listener = () => {
        const rect = tableHeadRef.current?.getBoundingClientRect() as DOMRect;
        const parentRect = tableHeadRef.current?.parentElement?.getBoundingClientRect() as DOMRect;

        if (parentRect.height - rect.top <= 0) {
          setSticked(true);
        } else {
          setSticked(false);
        }
      };

      if (sticky) {
        document.addEventListener("scroll", listener, { capture: true });

        return () => {
          document.removeEventListener("scroll", listener, { capture: true });
        };
      }
    }, [sticky]);

    return (
      <div
        {...listProps}
        role="tablist"
        data-sticked={isSticked}
        className={cx("tabsList", className)}
        ref={composeRefs(forwardedRef, tableHeadRef)}
      >
        {children}
      </div>
    );
  }
);

/* -----------
 * TabsTrigger
 * ----------- */

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (props, forwardedRef) => {
    const { value, disabled, className, children, ...triggerProps } = props;
    const context = useContext(TabsContext);

    const isSelected = value === context.value;

    return (
      <button
        {...triggerProps}
        type="button"
        role="tab"
        aria-selected={isSelected}
        data-state={isSelected ? "active" : "inactive"}
        disabled={disabled}
        className={cx("tabsTrigger", className)}
        ref={forwardedRef}
        onClick={() => {
          context.setValue(value);
          context.onValueChange(value);
        }}
        onKeyDown={(event) => {
          if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
        }}
      >
        {children}
      </button>
    );
  }
);

/* -----------
 * TabsContent
 * ----------- */

interface TabsContentProps extends React.HTMLAttributes<HTMLElement> {
  value: string;
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  (props, forwardedRef) => {
    const { value, className, children, ...contentProps } = props;
    const context = useContext(TabsContext);

    const isSelected = value === context.value;

    return (
      <div
        {...props}
        role="tabpanel"
        id={value}
        data-state={isSelected ? "active" : "inactive"}
        className={cx("tabsContent", className)}
        ref={forwardedRef}
      >
        {isSelected && children}
      </div>
    );
  }
);

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
