# react-essential-learn
Learning React essential features

# JSX

> Javascript Syntax Extension
> Used to describe and create HTML elements in JavaScript in a declarative way

* Browser didn't know what is JSX
* Browser can't read JSX
* React will turn JSX file into something that browser familiar

# React Component

> Javascript function that return an HTML or renderable UI

Javascript function will be called as component if:
1. Name start with uppercase character
2. Return "Renderable" content

```
// inside a jsx file
// component name should represent the UI
function AppHeader() {
    // ...
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

// to use it, just call in another components
function OtherComponent() {
    return (
        <div>
            <AppHeader/>
            <main>
                ...
            </main>
        </div>
    );
}
```

# Dynamic value

Syntax that can be used in HTML and will be rendered as a value.
Can contain javascript expression.

```
// inside a jsx file
let randomName = ['John', 'Jane', 'Bob'];

function generateRandomNumber(maxArraySize) {
    return Math.floor(Math.random() * (maxArraySize + 1));
}

// notice curl brace is used as dynamic value
function CustomComponent() {
    let name = randomName[generateRandomNumber[2]];
    return (
        <div>
            <p>Your name is {name}</p>
        </div>
    );
}
```

# Best way to handled image

Avoid define image like traditional HTML, because when application build to deployed in production,
the image info possibility will be lost. Thus, recommend use React way to define image in HTML tag.

```
// inside a jsx file

// notice the variable myImage pointing to image source
import myImage from './asserts/img/some-image.png';

// notice the expression used inside src attribute
function CustomComponent() {
    return (
        <div>
            <img src={myImage} alt="Some image"/>
            <h1>A Title</h1>
        </div>
    );
}

```

# Props

> A way to pass value into component

Behind the scene, React will transform defined attribute (aka _props_) in component into an object.

```
// inside a jsx file

const imageA import './assets/imgA.png';
const imageB import './assets/imgB.png';
const imageC import './assets/imgC.png';

// notice this function only have one parameter **AS AN OBJECT**
function CardTitle(props) {
    return (
        <div>
            <img src={props.image} alt={props.title} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    );
}

// notice the component used multiple time with different value
// notice the attribute inside component: image, title, and description

function TitleWrapper() {
    
    return (
        <main>
            <CardTitle image={imageA} title="Product A" description="Car that has 5 tires" />
            <CardTitle image={imageB} title="Product B" description="Commuters that faster than light" />
            <CardTitle image={imageC} title="Product C" description="Robot that can fly" />
        </main>
    );
}

```