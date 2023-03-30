import { useEffect } from "react";

interface IUseScrollToBottom {
  handler: () => void;
}
export const useScrollToBottom = ({ handler }: IUseScrollToBottom) => {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight === scrollHeight) {
        handler();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handler]);
};
