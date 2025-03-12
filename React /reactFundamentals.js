// 1. import the React and REactDom libraries

import React from 'react'; 
import ReactDOM from 'react-dom/client'

// 2. get a reference to the div with ID root

const el = document.getElementById('root')
// 3. tell React to take control of that element 

const root = ReactDOM.createRoot(el)
// 4. create a component 

//react does not interpret th booleand values or anything else
// and just purely takes in string values {} for JSX 
function App() { 
    const inputType = 'number'
    const minValue = 5;

    return (
        <input type={inputType} min={minValue}> </input>

    )
// 5. show the component on the screen 
}
// converting HTML to JSX 
/**
 * 1. All prop names follow camelCase
 * 2. nubmer attributes use curly braces
 * 3. boolean 'true' can be written with just the property name.
 *    'False' should be written with curly braces
 * 4. The 'class' attribute is written as 'className'
 * 5. In-line styles are provided as objects 
 */


/** convnetioanl way of creating a component in React 
 * Creating/Extracting a component 
 * 1. create a new file (file should start with a capital letter)
 *   ex. App.js
 * 2. Make your component. Should be a function that returns JSX 
 *   ex. function App() { return <h1>hi</hi>}
 * 3. Export the component at the bottom of the line
 *   ex. export default App
 * 4. Import the component into another file
 *   ex. import App from './App'
 * 5. Use the component 
 *    ex. <App /> 
 * 
 * 
 * 
 * some of the rules to be aware of with regard to module systems
 * 
 * default exports can be renamed in the importing file
 * 
 * Named Export Statements 
 * 1. use when exporting multiple variables
 * 2. can have as many named exports as we want 
 * 3. two ways to write a named export 
 * 
 * Import statments 
 * 1. curly braces indicate we want a "named" export
 * 2. single import statement can get both default + named exports
 *   ex. import App, {message} from './App
 * 3. named exprots cannot be renamed 
 * 
 * props system
 * 
 * 1. pass data from a parent to a child
 * 2. allows a parent to configure each child differently
 *     (show different text, different styles, ect)
 * 3. one way flow of data. Child can't push props back up
 * 4. Like 25% of understanding React 
 * 
 * parent component ---- (props) ----> child component
 * 
 * 
 * 
 */
root.render(<App />)


