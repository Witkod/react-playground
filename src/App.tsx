import React, { useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useKeyboardShortcut } from "./hooks/useKeyboardShortcut";
import styled from "styled-components";
import { useIsElementVisible } from "./hooks/useIsElementVisible";

function App() {
  useKeyboardShortcut("a + s+d", () => {
    console.log("GOGOGOG");
  });
  const ref = useRef(null);
  const isVisible = useIsElementVisible(ref);

  return (
    <div className="App">
      <Wrapper>
        <h1>{isVisible ? "VISIBLE" : "NOT VISIBLE"}</h1>
      </Wrapper>
      <header className="App-header" ref={ref}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

const Wrapper = styled.div`
  height: 110dvh;
  background-color: coral;
  display: flex;
  align-items: center;
  justify-content: center;
`;
