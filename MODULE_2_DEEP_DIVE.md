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