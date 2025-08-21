import { type ReactNode } from "react";

import "./App.css";

export default function App(): ReactNode {
  return (
    <div className="app">
      <header>Header</header>
      <main>
        <h1>Boards</h1>
        <ul>
          <li>
            <div className="board">
              <div className="header">
                <div className="title">Board 1</div>
                <a href="/board/1">View</a>
              </div>
              <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam, at.
              </p>
            </div>
          </li>
          <li>
            <div className="board">
              <div className="header">
                <div className="title">Board 2</div>
                <a href="/board/2">View</a>
              </div>
              <p className="description">
                Corporis maxime officia quo sunt? Ad blanditiis consectetur
                consequuntur dicta enim error eveniet explicabo ipsa ipsum
              </p>
            </div>
          </li>
          <li>
            <div className="board">
              <div className="header">
                <div className="title">Board 3</div>
                <a href="/board/3">View</a>
              </div>
              <p className="description">doloribus ex id natus vel!</p>
            </div>
          </li>
        </ul>
      </main>
      <footer>Footer</footer>
    </div>
  );
}
