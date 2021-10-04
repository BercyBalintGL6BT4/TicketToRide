import { useState } from "react";
import { LoadPage } from "./LoadPage";
import { Game } from "./Game";
import { MainPage } from "./MainPage";

export function App() {
  const [selectedPage, setSelectedPage] = useState(1);

  if (selectedPage === 1) {
    return <MainPage onSelect={setSelectedPage} />;
  }
  if (selectedPage === 2) {
    return <LoadPage onSelect={setSelectedPage} />;
  }
  if (selectedPage === 3) {
    return <Game onSelect={setSelectedPage} />;
  }
}
