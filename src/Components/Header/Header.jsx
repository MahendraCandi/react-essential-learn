import reactImg from "../../assets/react-core-concepts.png";
import "./Header.css";

const firstWord = ['Fundamental', 'Core', 'Cruise'];
function genRandomNumber(maxValue) {
  return Math.floor(Math.random() * (maxValue + 1));
}

// Component should always use PascalCamel
// Using {} to create dynamic expression on JSX
export default function Header(){
  let description = firstWord[genRandomNumber(2)];
  return (
    <header>
      <img src={reactImg} alt="Stylized atom"/>
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}
