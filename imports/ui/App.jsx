import React, { useRef } from 'react'
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Story } from './Story.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { Stories } from '../api/stories.js';
import ReactDOM from 'react-dom';


export const App = (props) => {
  console.log("props");
  console.log(props);
  const inputEl = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
     const text = ReactDOM.findDOMNode(inputEl.current).value.trim();
     ReactDOM.findDOMNode(inputEl.current).value = "";
     if(text) {
      Stories.insert({
        text,
        favourites: 0,
      });
     }
  }

  const renderStories = () => {
    // return getStories().map((story) => (
    //       <Story key={story._id} story={story} />
    //     ));
      return props.stories.map((story) => (
        <Story key={story._id} story={story} />
      ));
  }
 
  return (
          // <div className="container">
          //   <header>
          //     <h1>Best stories</h1>
          //   </header>

          //   <form className="new-story" onSubmit={(event) => handleSubmit(event)} >
          //   <input
          //     type="text"
          //     ref={inputEl}
          //     placeholder="Type to add new super STORIES"
          //   />
          //   <input type="submit" value="SUCH A LOVELY PLACE :)" />
          //   </form>

     
          //   <ul>
          //     {renderStories()}
          //   </ul>
          // </div>
          <table className="table table-hover table-striped table-dark">
            {/* <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Age</th>
              </tr>
            </thead> */}
           <tbody>
            <tr>
                <td style={{"textAlign": "center", "verticalAlign": "middle"}}>
                  <img className="img-rounded img-list" src="book1.png" alt="book1"/>
                  {/* <span>Jull</span> */}
                </td>
                <td style={{"verticalAlign": "middle"}}>


                <ul className="list-group list-group-flush bg-transparent">
                  <li className="list-group-item bg-transparent" ><span style={{border: "none", "fontWeight": "bold"}}>RECOMMENDED</span></li>
                  <li className="list-group-item bg-transparent">
                  
                  <ul className="d-flex flex-wrap">
                      <li className="list-group-item bg-transparent" style={{border: "none", "fontWeight": "bold"}}>Title</li>
                      <li className="list-group-item bg-transparent" style={{border: "none"}}>Tower of God</li>
                  </ul>
                  <ul className="d-flex flex-wrap">
                      <li className="list-group-item bg-transparent" style={{border: "none", "fontWeight": "bold"}}>Author</li>
                      <li className="list-group-item bg-transparent" style={{border: "none"}}>Joseph Smith</li>
                  </ul>
                  <ul className="d-flex flex-wrap">
                      <li className="list-group-item bg-transparent" style={{border: "none", "fontWeight": "bold"}}>Genre</li>
                      <li className="list-group-item bg-transparent" style={{border: "none"}}>Comedy</li>
                  </ul>
                  
                  </li>
                </ul>


                  </td>
                <td className="text-success" style={{"fontWeight": "bold", verticalAlign:"middle"}}>Available</td>
              </tr>
              <tr>
                <td>Eve</td>
                <td>Jackson</td>
                <td>94</td>
              </tr>
           </tbody>
        </table>
        );
}

export default withTracker(() => {
  return {
    // stories: Stories.find({}).fetch(),
    stories: Stories.find({}, { sort: { favourites: -1 } }).fetch(),
  };
})(App);