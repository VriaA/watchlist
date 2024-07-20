import { useRef } from "react";
import Suggestion from "./Suggestion";
import { TResult, TResults } from "../../types/resultTypes";
import { useCloseOnClickOutside } from "../../hooks/useCloseOnClickOutside";

type TSuggestions = {
  suggestions: TResults;
  setIsSuggestionsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Suggestions({
  suggestions,
  setIsSuggestionsOpen,
}: TSuggestions) {
  const suggestionsRef = useRef<HTMLUListElement>(null);
  useCloseOnClickOutside(suggestionsRef, setIsSuggestionsOpen);

  const suggestionsElArray = suggestions.map((suggestion: TResult, i) => {
    return <Suggestion key={i} suggestion={suggestion} />;
  });

  return (
    <ul
      id="suggestions"
      className={`films search-suggestions z-30 transition-all`}
      ref={suggestionsRef}
    >
      {suggestionsElArray}
    </ul>
  );
}
