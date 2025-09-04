# Module 2, deep dive into react essentials

## Don't have to use JSX extensions

React can work in vanilla JS file. But it is convenient to use JSX.

```javascript
// this html render by react from jsx
<div>
    <p>Hello World</p>
</div>
```

```javascript
// this html render from common js file
// first parameter is tag name, second is props that passed to the component, third is children element
React.createElement(
    'div',
    { id : 'root' },
    React.createElement('p', null, 'Hello World')
);
```

## Fragments

In a component, it is expected to return a single element.
But sometimes, we need to return multiple elements.

```javascript
// this is not allowed
export default function AComponent() {
    return (
        <h1>Title World</h1>
        <p>Hello world</p>
    );
}
```

Code above will have a compile error.
Then, we can wrap those siblings elements into a div tag.
But what if in the styling, we don't want to apply to the wrapper div tag?

React can solve this problem by using Fragments.

```javascript
// using Fragment element (old React version)
import { Fragment } from 'react';

export default function AComponent() {
    return (
        <Fragment>
            <h1>Title World</h1>
            <p>Hello world</p>
        </Fragment>
    );
}
```

```javascript
// using empty tag
export default function AComponent() {
    return (
        <>
            <h1>Title World</h1>
            <p>Hello world</p>
        </>
    );
}
```

## Forwarding props

If we working in detail multiplple separate components, sometimes the props from parent and child become different.
It can lead to a lot of bugs and difficulties to use and styling the components.

React can solve this problem by using Forwarding props.
Where we pass the props from parent to child by using javascript Rest operator.

```javascript
// this Section component will used for multi-purpose
export default function Section({ title, children, ...props }) {
    return (
        <section {...props}>
            <h3>{title}</h3>
            {children}
        </section>
    );
}

// In another component...
// Lets focus to Section component, the attributes "id" and "className" has been passed to the Section component
// by using the rest operator `...props`
export default function CardPreview() {
    return (
        <Section id="card-preview" title="Availables Robots" className="primary-border">
            CARDS.map((card) => <Card key={card.id} {...card} />)
        </Section>
    );
}
```

## Multiple JSX slots

Pass the JSX element as slot to another JSX element.

```javascript
// a component in a single JSX file
export default function Tabs({ children, buttons }) {
    return (
        <>
            <menu>{buttons}</menu>
            {children}
        </>
    );
}


// a component in another JSX file
// notice the Button element is passed as slot to the Tabs component
export default function App() {
    return (
        <>
            <Tabs button={
                <>
                <Button isSelectted={selectedTopic === 'component'} onClick={() => handleTopic('component')} />
                <Button isSelectted={selectedTopic === 'jsx'} onClick={() => handleTopic('jsx')} />
                <Button isSelectted={selectedTopic === 'props'} onClick={() => handleTopic('props')} />
                <Button isSelectted={selectedTopic === 'state'} onClick={() => handleTopic('state')} />
                </>
            }
            >
                <Title />
                <SubTitle />
                <Details />
            </Tabs>
        </>
    );
}
```

## Using built-in html or custom component as dynamic wrappers

Very useful when we want to use a custom component as dynamic wrappers.
Use string to use built-in html element. and use curly braces to use custom component.

```javascript
// a component in a single JSX file.
// Please notice the capital letter used by ButtonWrappers.
// it is a shorthand for reinitialize the wrappers.
// buttonWrappers by not using capital, it is only accept the built-in html element.
// if use that approach, then we need to reinitialize the wrappers to accept it as custom component.
export default function Tabs({ children, buttons, ButtonWrappers }) {
    // const ButtonWrappers = buttonWrappers;
    return (
        <>
            <ButtonWrappers>{buttons}</ButtonWrappers>
            {children}
        </>
    );
}

// a component in another JSX file
export default function App() {
    return (
        <>
            <Tabs
                // ButtonWrappers={SomeComponent}
                ButtonWrappers="menu"
                button={
                <>
                <Button isSelectted={selectedTopic === 'component'} onClick={() => handleTopic('component')} />
                <Button isSelectted={selectedTopic === 'jsx'} onClick={() => handleTopic('jsx')} />
                <Button isSelectted={selectedTopic === 'props'} onClick={() => handleTopic('props')} />
                <Button isSelectted={selectedTopic === 'state'} onClick={() => handleTopic('state')} />
                </>
            }
            >
                <Title />
                <SubTitle />
                <Details />
            </Tabs>
        </>
    );
}
```

## Not all content should be a component

Should only applied to static content where it not will be changed.
We can define the static content inside index.html file.

```javascript
  <body>
    <header>
        <img src="logo.png" alt="logo" />
        <h1>Static application title</h1>
        <p>Static application description</p>   
    </header>
    <div id="root"></div>
    <script type="module" src="/src/index.jsx"></script>
  </body>
```

notice how the logo.png defined.
No path is needed if it is in the public folder and same folder as index.html.

```
public
└───logo.png
src
index.html
```

## Component instance works in isolation

Each component that we defined will works in isolation.
Example, if the same component has been used in multiple places, then each component will have its own state.

```javascript
import {useState} from 'react';

export default function Player({ name, symbol }) {
    const [isEditing, setIsEditing] = useState(false);
    
    function handleEditing() {
        if (isEditing) {
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    }
    
    return (
        <li>
            {
                isEditing ? 
                    <input type="text" value={name} /> : 
                    <span>Player name: {name}</span>
            }
            <span>Player symbol: {symbol}</span>
            <button onClick={handleEditing}>Edit</button>
        </li>
        
    );
}

export default function App() {
    return (
        <ul>
            <Player name="Player 1" symbol="X" />
            <Player name="Player 2" symbol="O" />
        </ul>
    );   
}
```

In above example, if the "Player 1" is edited, then the "Player 2" will not be affected.

## Best practice to update state value based on previous value

Behind the scene, React will update the state like schedulers.
So, it could can lead to race condition if not handled properly.

```javascript
// this is not good
export default function Player({ name, symbol }) {
    const [isEditing, setIsEditing] = useState(false);

    function handleEditing() {
        setIsEditing(isEditing ? false : true);
    }

    // ...
}
```

```javascript
// this is good
// notice the funtion inside setIsEditing, the parameter prevEdit is the previous value of isEditing.
export default function Player({ name, symbol }) {
    const [isEditing, setIsEditing] = useState(false);

    function handleEditing() {
        setIsEditing((prevEdit) => !prevEdit);
    }

    // ...
}
```

## Two way binding

Is a technique to bind the state value to the input element.
We got the value from input, put the value on a state, and update it back to the input.

```javascript

// notice the event parameter inside handleChangeName function
// it is the event object that triggered by the input element.
// and it is automatically passed by React.
export default function Player({ name, symbol }) {
    const [name, setName] = useState(name);
    
    function handleChangeName(event) {
        setName(event.target.value);
    }

    return (
        <li>
            <input type="text" value={name} onChange={handleChangeName} />/>
            // ...
        </li>

    );
}

```

## Update using reference object for object and array

* If the reference is the same (i.e., you mutated the object/array directly), React will assume nothing has changed → no re-render.
* If you provide a new reference (by copying), React can detect the change → re-render happens.

```javascript

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];


export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState[initialGameBoard];
    
    function handleClick(rowIndex, cellIndex, symbol) {
        setGameBoard(
            (prevBoardState) => { // get previous array state
                const newBoardState = [...prevBoardState.map((cellArray) => [...cellArray])]; // copy previous array state to a new array state
                newBoardState[rowIndex][cellIndex] = symbol;
                return newBoardState;
            }
        );
    }
    
    return (
        <lo>
            {
                gameBoard.map((row, rowIndex) =>
                    (
                        <li key={rowIndex}>
                            <ol>
                                row.map((cell, cellIndex) => (
                                <li>
                                    <button onClick={() => handleClick(rowIndex, cellIndex)}>
                                        // ...
                                    </button>
                                </li>
                                ))
                            </ol>
                        </li>
                    )
                )
            }
        </lo>
    );
}
```

## Merging multiple state using object

The idea is to use object to merge multiple states.
When our component getting larger, it will be easier to manage the state.

```javascript

export default function App() {
    const [gameTurn, setGameTurn] = useState([]);
    
    function handleGameTurn(columnIndex, cellIndex) {
        setGameTurn((prevTurn) => {
            let player = 'X';
            
            if (gameTurn.length > 0 && gameTurn[0] == 'X') {
                player = 'O';
            }
            
            const updatedTurn = [
                {
                    square : {
                        col: columnIndex,
                        cel : cellIndex
                    },
                    player: player,
                },
                ...prevTurn
            ];
        });
    }
    
    return (
        <div>
            <Player name={} symbol={"X"} />
            <Player name={} symbol={"O"} />
            <GameBoard />
        </div>
    );
}

```

## Reducing state

Since state can be merged into one by using object, then we can use states as minim as possible.
If want the state in component, we can deriving the state from the props.

## When not to lifting state up

If the state is used as input in a component and it used to trigger a re-render.
We can use an alternative to lift the state up by using a callback function.

```javascript

// notice  on how GameEndBanner us accept props of winner
// and notice how players is change through onPlayerChange attribute
export default function App() {
    conts [players, setPlayers] = useState({
        X: 'Player 1',
        O: 'Player 2',
        winner: null,
    });

    return (
        <>
            <PlayersInfo onPlayerChange={setPlayers}/>
            <GameBoard players={players}/>
            <GameEndBanner winner={players.winner}/>
        </>
    );
}

function PlayersInfo({ onPlayerChange }) {
    const [player1, setPlayer1] = useState('');
    const [player2, setPLayer2] = useState('');

    function handleChangePlayer1(event) {
        setPlayer1(event.target.value);
        onPlayerChange(prevValue => {
            const newValue = {...prevValue};
            newValue.X = player1;
            return newValue;
        });
    }

    function handleChangePlayer2(event) {
        setPlayer2(event.target.value);
        onPlayerChange(prevValue => {
            const newValue = {...prevValue};
            newValue.O = player2;
            return newValue;
        });
    }

    return (
        <div>
            <text type="input" values={player1} onChange={handleChangePlayer1}/>
            <text type="input" values={player2} onChange={handleChangePlayer2}/>
        </div>
    );
}
```