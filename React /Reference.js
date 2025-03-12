// component layout in JSX - React

function App() {
 // code to compute values we want to show in our JSX 
    const message = 'hello'; 
    const sum = 1 + 1;
// comtent we want this component to show 
    return  (
        <div>
            <div>Message is: {message}</div>
            <div>Sum is: {sum} </div>
        </div>
    )
}
