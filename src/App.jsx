import "./styles/style.css";
import detective from './assets/empty.png';
import Search from './ui/Search';
import ButtonFilter from './ui/button/ButtonFilter';
import ButtonTheme from './ui/button/ButtonTheme';
import NoteItem from "./ui/NoteItem";
import ButtonAdd from "./ui/button/ButtonAdd";
import Modal from "./ui/Modal";

const App = () => {
  return (
    <body>
      <main>
        <div className="page">
          <main className="todo">
            <h1 className="todo__title">TODO LIST</h1>

            <div className="toolbar todo__toolbar">
              <Search />
              <ButtonFilter />
              <ButtonTheme />
            </div>

            <ul className="notes todo__notes">
              <NoteItem />
            </ul>

            <ButtonAdd />
          </main>

          <Modal />
        </div>
      </main>
    </body>

  )
}

export default App