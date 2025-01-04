import {CORE_CONCEPTS} from "./data";
import Header from "./Components/Header";
import CoreConceptList from "./Components/CoreConceptList";

// Manipulate array to map and using object destructing
function App() {
  return (
    <div>
      <Header></Header>
      <main>
        <section id='core-concepts'>
          <h2>Time to get started!</h2>
          <ul>
            {CORE_CONCEPTS.map(item => CoreConceptList({title : item.title, img: item.image, description : item.description}))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
