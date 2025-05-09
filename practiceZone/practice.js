import React, { Component } from "react";
import logo from "./react_photo-goose.jpg";

export default class Header extends Component {
  render() {
    return (
      <div className="row">
        <div className="logo">
          <img src={logo} width="100%" alt="Googe Pic" />
        </div>
      </div>
    );
  }
}



import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";

const IndexPage = () => {
  return <h2>Home Page</h2>;
};

const PropsPage = ({ title }) => {
  return <h2>{title}</h2>;
};

const App = () => {
  return (
    <section className="App">
      <Router>
        <Link to="/">Home</Link> |
        <Link to="/props-through-component">Props through component</Link> |
        <Link to="/props-through-render">Props through render</Link> |
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route
            exact
            path="/props-through-component"
            component={() => <PropsPage title={`Props through component`} />}
          />
          <Route
            exact
            path="/props-through-render"
            render={(props) => (
              <PropsPage {...props} title={`Props through render`} />
            )}
          />
        </Switch>
      </Router>
    </section>
  );
}


import React, { useState, useRef } from "react";

export default function App() {

  const prevScrollY = useRef(0);
  const [goingUp, setGoingUp] = useState(false);

  const onScroll = (e) => {
    const currentScrollY = e.target.scrollTop;
    if (prevScrollY.current < currentScrollY && goingUp) {
      setGoingUp(false);
    }
    if (prevScrollY.current > currentScrollY && !goingUp) {
      setGoingUp(true);
    }
    prevScrollY.current = currentScrollY;
    console.log(goingUp, currentScrollY);
  };

  return (
    <div onScroll={onScroll} style={{ height: 300, overflowY: "scroll" }}>
      {Array(50)
        .fill("Get the scroll position on scroll in react.")
        .map((f, i) => {
          return <p key={i}>{f}</p>;
        })}
    </div>
  );
}


class TimeComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { time: Date() };
    }
    componentDidMount() {
      this.interval = setInterval(() => this.setState({ time: Date() }), 1000);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  
    render() {
      return <h3>Current Time: {this.state.time} </h3>;
    }
  }

// need to understand the difference between using this vs 
// just going straight into using map loop[ing over]

  const posts = [
    { id: 10, title: "Link One" },
    { id: 20, title: "Link Two" },
    { id: 30, title: "Link Three" }
  ];
  
  export default function App() {
    return (
      <ul>
        {posts.map(function (post) {
          return (
            <li key={post.id}>
              <a href={"/posts/" + post.id}>{post.title}</a>
            </li>
          );
        })}
      </ul>
    );
  }
  


  class App extends Component {
    state = {
      file: null
    };
  
    handleFile(e) {
      let file = e.target.files[0];
      this.setState({ file });
    }
    async handleUpload(e) {
      console.log(this.state.file);
      await uploadImage(this.state.file);
    }
  
    render() {
      return (
        <div className="App">
          <h1> File Upload in React </h1>
          <input type="file" name="file" onChange={(e) => this.handleFile(e)} />
          <button onClick={(e) => this.handleUpload(e)}>Upload</button>
        </div>
      );
    }
  }
  
  const uploadImage = async (file) => {
    try {
      console.log("Upload Image", file);
      const formData = new FormData();
      formData.append("filename", file);
      formData.append("destination", "images");
      formData.append("create_thumbnail", true);
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };

      formData.from(fs.entries())
  
      const url = "FILE_DIRECTORY";
  
      const result = await axios.post(url, formData, config);
      console.log("REsult: ", result);
    } catch (error) {
      console.error(error);
    }
  };
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);



  function App() {

    const [value, setValue] = React.useState("");
  
    const handleOnChange = (event) => {
      setValue(event.target.value);
    };
  
    React.useEffect(() => {
      const timeoutId = setTimeout(
        () => console.log(`Search function called: "${value}"`),
        300
      );
      return () => clearTimeout(timeoutId);
    }, [value]);

    // this should be the dependencies such as state or props within the useEffect that may 
    // be subject to the change of them 
  
    return (
      <>
        <input onChange={handleOnChange} value={value} placeholder="Search" />
        <h1>{value}</h1>
      </>
    );
  }


  import React, { Component } from "react";
import logo from "./react_photo-goose.jpg";

export default class Header extends Component {
  render() {
    return (
      <div className="row">
        <div className="logo">
          <img src={logo} width="100%" alt="Googe Pic" />
        </div>
      </div>
    );
  }
}


import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}


import React, { useState, useEffect } from 'react';

function Example() {

  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
  

mport { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";

const IndexPage = () => {
  return <h2>Home Page</h2>;
};

const PropsPage = ({ title }) => {
  return <h2>{title}</h2>;
};

const App = () => {
  return (
    <section className="App">
      <Router>
        <Link to="/">Home</Link> |
        <Link to="/props-through-component">Props through component</Link> |
        <Link to="/props-through-render">Props through render</Link> |
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route
            exact
            path="/props-through-component"
            component={() => <PropsPage title={`Props through component`} />}
          />
          <Route
            exact
            path="/props-through-render"
            render={(props) => (
              <PropsPage {...props} title={`Props through render`} />
            )}
          />
        </Switch>
      </Router>
    </section>
  );
}


class App extends React.Component {
    state = {
      email: ""
    };
  
    handleChange = (e) => {
      this.setState({
        email: e.target.value
      });
    };
  
    render() {
      return (
        <div>
          <input
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <button disabled={this.state.email.length < 1}>Submit</button>
        </div>
      );
    }
  }



  export default function saveMeal(meals){
    meals.slug = slugify(meals.title, {lower: true})
    meals.description = xss(meals.description)

    const extnesion = meals.image.name.split('.').pop()
    const fileName = `${meals.slug} ${extension}`

    const stream = fs.createWriteStream(`/public/images/${fileName}`)
    const bufferedImage = meals.iamge.bufferArray()

    stream.wrtieFile(Buffer.from(bufferedImage), (error) => {
      if(error) {
        throw new Error('error')
      }
    })

    meals.image = `iamges.${fileName}`


    db.prepare(`INSERT INTO meals (title, summary, name) VALUES (@title, @summary, @name)`).run()
    )
  }
  }


  export default function useHttp(url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
  
    function clearData() {
      setData(initialData);
    }
  
    const sendRequest = useCallback(
      async function sendRequest(data) {
        setIsLoading(true);
        try {
          const resData = await sendHttpRequest(url, { ...config, body: data });
          setData(resData);
        } catch (error) {
          setError(error.message || 'Something went wrong!');
        }
        setIsLoading(false);
      },
      [url, config]
    );



    async function sendHttpRequest(url, config) {
      const response = await fetch(url, config);
    
      const resData = await response.json();
    
      if (!response.ok) {
        throw new Error(
          resData.message || 'Something went wrong, failed to send request.'
        );
      }
    
      return resData;
    }



    import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});


app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null || orderData.items.length === 0) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }



  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ),
            loader: () =>
              import('./pages/Blog').then((module) => module.loader()),
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PostPage />
              </Suspense>
            ),
            loader: (meta) =>
              import('./pages/Post').then((module) => module.loader(meta)),
          },
        ],
      },
    ],
  },
]);

export default function Modal({ children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    // Using useEffect to sync the Modal component with the DOM Dialog API
    // This code will open the native <dialog> via it's built-in API whenever the <Modal> component is rendered
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close(); // needed to avoid error being thrown
    };
  }, []);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}

function App() {
  log('<App /> rendered');

  const [enteredNumber, setEnteredNumber] = useState(0);
  const [chosenCount, setChosenCount] = useState(0);

  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    setChosenCount(enteredNumber);
    setEnteredNumber(0);
  }

  return (
    <>
      <Header />
      <main>
        <section id="configure-counter">
          <h2>Set Counter</h2>
          <input type="number" onChange={handleChange} value={enteredNumber} />
          <button onClick={handleSetClick}>Set</button>
        </section>
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}