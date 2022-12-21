# reactjs-org

## Main Concepts

**Introducing JSX**

- You can put any valid JavaScript expression inside the curly braces in JSX. For example, 2 + 2, user.firstName, or formatName(user) are all valid JavaScript expressions.
- You should either use quotes (for string values) or curly braces (for expressions), but not both in the same attribute.
- If a tag is empty, you may close it immediately with />, like XML
- Babel compiles JSX down to React.createElement() calls.

**Rendering Elements**

- React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.

**Components and Props**

- [ES6 class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- React treats components starting with lowercase letters as DOM tags. For example, `<div />` represents an HTML div tag, but `<Welcome />` represents a component and requires Welcome to be in scope.
- Whether you declare a component as a function or a class, it must never modify its own props.
- All React components must act like pure functions with respect to their props.

**State and Lifecycle**

- State allows React components to change their output over time in response to user actions, network responses, and anything else, without violating this rule.
- Class components should always call the base constructor with props.
- Lifecycle methods
  - We want to set up a timer whenever the Clock is rendered to the DOM for the first time. This is called “mounting” in React.
  - We also want to clear that timer whenever the DOM produced by the Clock is removed. This is called “unmounting” in React.
- Using state correctly
  - _Do Not Modify State Directly_, except in Constructor
    - instead, use `setState()`
  - _State Updates May Be Asynchronous_
    - to fix it, use a second form of `setState()` that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument
  - _State Updates are Merged_
    - when you call setState(), React merges the object you provide into the current state.
- Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn’t care whether it is defined as a function or a class.

**Handling Events**

- With JSX you pass a function as the event handler, rather than a string.
- Another difference is that you cannot return false to prevent default behavior in React. You must call preventDefault explicitly.
- When using React, you generally don’t need to call addEventListener to add listeners to a DOM element after it is created. Instead, just provide a listener when the element is initially rendered.
- Generally, if you refer to a method without `()` after it, such as `onClick={this.handleClick}`, you should bind that method.
- Passing Arguments to Event Handlers
  - <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
  - <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

**Conditional Rendering**

- You may embed expressions in JSX by wrapping them in curly braces. This includes the JavaScript logical && operator.
- In rare cases you might want a component to hide itself even though it was rendered by another component. To do this return null instead of its render output.
- Returning `null` from a component’s `render` method does not affect the firing of the component’s lifecycle methods. For instance `componentDidUpdate` will still be called.

**Lists and Keys**

- Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity:
- A good rule of thumb is that elements inside the `map()` call need keys.
- Keys used within arrays should be unique among their siblings. However, they don’t need to be globally unique. We can use the same keys when we produce two different arrays:
- JSX allows embedding any expression in curly braces so we could inline the `map()` result:

**Forms**

- But in most cases, it’s convenient to have a JavaScript function that handles the submission of the form and has access to the data that the user entered into the form. The standard way to achieve this is with a technique called “controlled components”.
- In React, mutable state is typically kept in the state property of components, and only updated with `setState()`.
- Since `handleChange` runs on every keystroke to update the React state, the displayed value will update as the user types.
- With a controlled component, the input’s value is always driven by the React state. While this means you have to type a bit more code, you can now pass the value to other UI elements too, or reset it from other event handlers.
- In React, a `<textarea>` uses a value attribute instead. This way, a form using a `<textarea>` can be written very similarly to a form that uses a single-line input:
- You can pass an array into the `value` attribute, allowing you to select multiple options in a `select` tag:
- When you need to handle multiple controlled `input` elements, you can add a `name` attribute to each element and let the handler function choose what to do based on the value of `event.target.name`.
  - The object initializer syntax also supports computed property names. That allows you to put an expression in brackets [], that will be computed and used as the property name
- Specifying the `value` prop on a controlled component prevents the user from changing the input unless you desire so. If you’ve specified a `value` but the input is still editable, you may have accidentally set `value` to `undefined` or `null`.
- It can sometimes be tedious to use `controlled components`, because you need to write an event handler for every way your data can change and pipe all of the input state through a React component.
  - To write an `uncontrolled component`, instead of writing an event handler for every state update, you can use a ref to get form values from the DOM.

**Lifting State Up**

- Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor. Let’s see how this works in action.
- In React, sharing state is accomplished by moving it up to the closest common ancestor of the components that need it. This is called “lifting state up”.
- component asks React to re-render itself by calling `this.setState()` with the new input value.
- Usually, the state is first added to the component that needs it for rendering. Then, if other components also need it, you can lift it up to their closest common ancestor. Instead of trying to sync the state between different components, you should rely on the `top-down data flow`.

**Composition vs Inheritance**

- _Containment_ : Some components don’t know their children ahead of time. This is especially common for components like `Sidebar` or `Dialog` that represent generic “boxes”. We recommend that such components use the special children prop to pass `children` elements directly into their output
- _Specialization_ : In React, this is also achieved by composition, where a more “specific” component renders a more “generic” one and configures it with props:
- Props and composition give you all the flexibility you need to customize a component’s look and behavior in an explicit and safe way. Remember that components may accept arbitrary props, including primitive values, React elements, or functions.
- If you want to reuse non-UI functionality between components, we suggest extracting it into a separate JavaScript module. The components may import it and use that function, object, or class, without extending it.

**Thinking In React**

- Start With A Mock
  - Step 1: Break The UI Into A Component Hierarchy
    - FilterableProductTable (orange): contains the entirety of the example
    - SearchBar (blue): receives all user input
    - ProductTable (green): displays and filters the data collection based on user input
    - ProductCategoryRow (turquoise): displays a heading for each category
    - ProductRow (red): displays a row for each product
  - Step 2: Build A Static Version in React
    - `props` get passed to the component (similar to function parameters) whereas,
    - `state` is managed within the component (similar to variables declared within a function)
  - Step 3: Identify The Minimal (but complete) Representation Of UI State
    - To make your UI interactive, you need to be able to trigger changes to your underlying data model. React achieves this with `state`.
  - Step 4: Identify Where Your State Should Live
  - Step 5: Add Inverse Data Flow

## Advanced Guides

## API Reference

## Hooks

## Testing
