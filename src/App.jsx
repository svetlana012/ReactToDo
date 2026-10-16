import "./styles/style.css"
import "./styles/global.css"
import detective from "./assets/empty.png";
import Search from './ui/components/Search';
import ButtonFilter from './ui/button/ButtonFilter';
import ButtonTheme from './ui/button/ButtonTheme';
import NoteItem from "./ui/components/NoteItem";
import ButtonAdd from "./ui/button/ButtonAdd";
import Modal from "./ui/components/Modal";

const App = () => {
  return (
  
      <main>
        <div className="page">
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
          <Modal />
        </div>
      </main>
  

  )
}

export default App