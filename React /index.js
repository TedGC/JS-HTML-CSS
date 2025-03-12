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
root.render(<App />)


