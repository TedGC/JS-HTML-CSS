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
  