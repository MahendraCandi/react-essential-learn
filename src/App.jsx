import reactImg from './assets/react-core-concepts.png'
import componentImg from './assets/components.png'

const firstWord = ['Fundamental', 'Core', 'Cruise'];
function genRandomNumber(maxValue) {
  return Math.floor(Math.random() * (maxValue + 1));
}

// Component should always use PascalCamel
// Using {} to create dynamic expression on JSX
function Header() {
  let description = firstWord[genRandomNumber(2)];
  return (
    <>
      <header>
        <img src={reactImg} alt="Stylized atom"/>
        <h1>React Essentials</h1>
        <p>
          {description} React concepts you will need for almost any app you are
          going to build!
        </p>
      </header>
    </>
  );
}

// Use props to passing component's property
function BoxDescription (props) {
  return <li>
    <img src={props.img} alt='...'/>
    <h3>{props.title}</h3>
    <p>{props.description}</p>
  </li>
}

function App() {
  return (
    <div>
      <Header></Header>
      <main>
        <section id='core-concepts'>
          <h2>Time to get started!</h2>
          <ul>
            <BoxDescription title='Components' description='The core UI buildeing block' img={componentImg}/>
            <BoxDescription title='Props' description='The core UI buildeing block' img={componentImg}/>
            <BoxDescription title='Components' description='The core UI buildeing block' img={componentImg}/>
            <BoxDescription title='Components' description='The core UI buildeing block' img={componentImg}/>
          </ul>

        </section>
      </main>
    </div>
  );
}

export default App;
