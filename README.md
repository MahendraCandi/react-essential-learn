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

```javascript
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

```javascript
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

```javascript
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

```javascript
// inside a jsx file

import imageA from './assets/imgA.png';
import imageB from './assets/imgB.png';
import imageC from './assets/imgC.png';

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

# Props shorthand

By using this way we may avoid the attribute definitions when use the component.
Also, this is can be useful when retrieving data from APIs.

> Please a note, the component props and the data attribute should have similar name

```javascript
// a jsx file that export some data
import imageA from './assets/imgA.png';
import imageB from './assets/imgB.png';
import imageC from './assets/imgC.png';

export const ÏMAGE_DATA = [
    {
        image : imageA, 
        title : "Product A", 
        description : "Car that has 5 tires"
    },
    {
        image : imageB, 
        title : "Product B", 
        description : "Commuters that faster than light"
    },
    {
        image : imageC, 
        title : "Product C", 
        description : "Robot that can fly"
    }
];

// a jsx file that consume data in component
import IMAGE_DATA from './data.js'; // import the IMAGE_DATA from js file

// component use the image data
// notice the spread operator (three dots), is use to extract array into individual element
function TitleWrapper() {

    return (
        <main>
            <CardTitle {...IMAGE_DATA[0]}/>
            <CardTitle {...IMAGE_DATA[1]}/>
            <CardTitle {...IMAGE_DATA[2]}/>
        </main>
    );
}

function CardTitle(props) {
    return (
        <div>
            <img src={props.image} alt={props.title} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    );
}

```

# Props destructuring object

The component props that used as a parameter may be destructuring by using Javascript features.

```javascript
// this compoenent should be similar

// destructuring object
function CardTitle({ image, title, description }) {
    return (
        <div>
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

// using object
function CardTitle(props) {
    return (
        <div>
            <img src={props.image} alt={props.title} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    );
}

```

# Props default value

In Javascript, it is possible to set a default value for destructing object parameter.

```javascript
function CardTitle({ image, title='untitled', description='lorem ipsum...' }) {
    return (
        <div>
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}
```

# Separate component in JSX file

> It is recommended for a component to has its own jsx file except for component that related very close each other

```
src
├───assets
├───components
│    ├───Header
│    │   └───Header.jsx
│    │   └───Header.css
│    └───CardTitle
│        └───CardTitle.jsx
│        └───CardTitle.css
└───App.jsx
```

```javascript
// inside Header.jsx

import './Header.css';

// notice the default sintax
// means that the function will export as default file
// so the caller doesn't have to mention the function again
export default function Header() {
    return (
        <div>
            <h1>A header</h1>
        </div>
    );
}

```

```javascript
// inside App.jsx
import Header from './components/Header/Header.jsx';

function App() {
    return (
        <div>
            <Header/>
        </div>
    );
}
```

# Children Props

> A content between closed-enclosed of component

`props` has special attribute `props.children` that by default always present.
This attribute is used to get content between component closed-enclosed element.

The content inside could be another jsx element, another component, or just a string.

```javascript
function SomeComponent() {
    return (
        <Header>
            <CardTitle />
        </Header>
    );
}

// inside Header component
// notice the children attribute, it is react built-in attribute to call 
// the content between closed-enclosed component
function Header({ children }) {
    return (
        <header>
            <h1>My Header</h1>
            {children}
        </header>
    );
}
```

# Listening on event

We can listen on event on element.


```javascript
function CustomButton({ children }) {
    function handleClick() {
        console.log('Click me');
    }
    
    return (
        <button onClick={handleClick}>{children}</button>
    );
}
```

Please notice the function name inside `onClick` attribute.
If we put the function name with parenthesis `{handleClick()}`, it will be executed during rendering process.
We don't want that, because we want to execute the function when user click on the button.
Thus, it is recommended to pass only the function name without parenthesis.

# Passing function as value

From the parent component, we can pass function as value to child component.
That function will be executed inside child component.
As a result, the parent can use the process in the function.

```javascript
function ParentComponent() {
    function handleClick() {
        // do something
    }
    
    return (
        <List>
            <CustomButton onClick={handleClick}><CustomComponent/></CustomButton>
            <CustomButton onClick={handleClick}><CustomComponent/></CustomButton>
            <CustomButton onClick={handleClick}><AnotherCustomComponent/></CustomButton>
        </List>
    );
}

function CustomButton({ children, onClick }) {
    return (
        <button onClick={onClick}>{children}</button>
    );
}
```
# Passing function with argument as value

By using anonymous function, we can pass function with argument as value.

```javascript
function ParentComponent() {
    function handleClick(selectedItem) {
        console.log(selectedItem);
    }
    
    return (
        <List>
            <CustomButton onClick={() => handleClick('Item A')}><CustomComponent/></CustomButton>
            <CustomButton onClick={() => handleClick('Item B')}><CustomComponent/></CustomButton>
            <CustomButton onClick={() => handleClick('Item C')}><AnotherCustomComponent/></CustomButton>
        </List>
    );
}

function CustomButton({ children, onClick }) {
    return (
        <button onClick={onClick}>{children}</button>
    );
}
```

# Component Render State

1. By default react will only render components once
2. To notify react that the component need to be re-rendered, we can use `useState`
3. `useState` is a hook function. "Hook" function in React mean attaching/connecting our code to React system.
4. Hook function should be called inside Top level of Component function.

This NOT ALLOWED:

```javascript
export default function App() {
    function handleClick(selectedItem) {
        useState('');
    }
    return (
        <>
            // some content
        </>
    );
}
```

This IS ALLOWED:

```javascript
export default function App() {
    useState('');
    function handleClick(selectedItem) {
        // do something
    }
    return (
        <>
            // some content
        </>
    );
}
```

5. `useState` will return an array with two element.
6. The first element is the state value.
7. The second element is a function that can be used to update the state value.

```javascript
export default function App() {
    // notice the brackets, it is called array destructuring
    // it destructure the return array into two variables
    const [item, setItem] = useState('my initial value'); // initial value could be any type, null, boolean, string, number, array, object
    
    function handleClick(selectedItem) {
        // do something
    }
    return (
        <>
            // some content
        </>
    );
}
```

8. Calling the second element (a.k.a the function element) will tell react to update the component where `useState`.
9. All the first and second element will always be updated, so that it is okay to using const instead of let.

```javascript
import { useState } from 'react';

const FRAMEWORK_ITEMS = {
    react: {
        name: "React",
        type: "frontend",
        language: "JavaScript",
        website: "https://react.dev"
    },
    vite: {
        name: "Vite",
        type: "build-tool",
        language: "JavaScript/TypeScript",
        website: "https://vitejs.dev"
    },
    node: {
        name: "Node.js",
        type: "runtime",
        language: "JavaScript",
        website: "https://nodejs.org"
    }
};


export default function App() {
    const [selectedFramework, setSelectedFramework] = useState(null);
    
    function handleFramework(selectedItem) {
        setSelectedFramework(selectedItem);
    }
    return (
        <>
            <div>
                <li><CustomButton onClick={handleFramework}>React</CustomButton></li>
                <li><CustomButton onClick={handleFramework}>Vite</CustomButton></li>
                <li><CustomButton onClick={handleFramework}>Node</CustomButton></li>
            </div>
            <div>
            {
                selectedFramework === null ? 
                    <p>Please hit a button</p>
                    :
                    (
                    <h3>FRAMEWORK_ITEMS[selectedFramework].name</h3>
                    <p>Type: FRAMEWORK_ITEMS[selectedFramework].type</p>
                    <p>Language: FRAMEWORK_ITEMS[selectedFramework].language</p>
                    <p>Website: FRAMEWORK_ITEMS[selectedFramework].website</p>
                )
            }
            </div>
        </>
    );
}

function CustomButton({ children, onClick }) {
    return (
        <button onClick={onClick}>{children}</button>
    );
}


```

# Dynamic CSS stylish

In JSX, the attribute `className` is used to define CSS class. 
By using curly brace, we can add conditions to the class name.
Example below, to add `active-button` class when the button is clicked.

```javascript
export default function App() {
    const [selectedFramework, setSelectedFramework] = useState(null);
    
    function handleFramework(selectedItem) {
        setSelectedFramework(selectedItem);
    }
    return (
        <>
            <div>
                <li><CustomButton 
                    isSelected={FRAMEWORK_ITEMS[selectedFramework] === 'react'} 
                    onClick={handleFramework}>
                    React
                </CustomButton></li>
                <li><CustomButton 
                    isSelected={FRAMEWORK_ITEMS[selectedFramework] === 'vite'} 
                    onClick={handleFramework}>
                    Vite
                </CustomButton></li>
                <li><CustomButton 
                    isSelected={FRAMEWORK_ITEMS[selectedFramework] === 'node'} 
                    onClick={handleFramework}>
                    Node
                </CustomButton></li>
            </div>
            <div>
            {
                selectedFramework === null ? 
                    <p>Please hit a button</p>
                    :
                    (
                    <h3>FRAMEWORK_ITEMS[selectedFramework].name</h3>
                    <p>Type: FRAMEWORK_ITEMS[selectedFramework].type</p>
                    <p>Language: FRAMEWORK_ITEMS[selectedFramework].language</p>
                    <p>Website: FRAMEWORK_ITEMS[selectedFramework].website</p>
                )
            }
            </div>
        </>
    );
}

function CustomButton({ children, onClick, isSelected }) {
    return (
        <button className={isSelected ? 'active-button' : undefined} onClick={onClick}>{children}</button>
    );
}
```

# Using array to render dynamic content

Handle dynamic list of value by using javascript map function.

```javascript

const FRAMEWORK_ITEMS = {
    react: {
        name: "React",
        type: "frontend",
        language: "JavaScript",
        website: "https://react.dev"
    },
    vite: {
        name: "Vite",
        type: "build-tool",
        language: "JavaScript/TypeScript",
        website: "https://vitejs.dev"
    },
    node: {
        name: "Node.js",
        type: "runtime",
        language: "JavaScript",
        website: "https://nodejs.org"
    }
};

export default function App() {
    const [selectedFramework, setSelectedFramework] = useState(null);

    function handleFramework(selectedItem) {
        setSelectedFramework(selectedItem);
    }

    return (
        <ul>
            {
                FRAMEWORK_ITEMS.map((item) => {
                    CardPreview({...item}) // destructuring object of framework item
                })
            }
        </ul>
    );
}

function CardPreview({ title, type, language, website }) {
    return (
        <div>
            <h3>{title}</h3>
            <p>Type: {type}</p>
            <p>Language: {language}</p>
            <a>{website}</a>
        </div> 
    );
}

```