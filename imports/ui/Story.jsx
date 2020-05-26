import React from 'react';
import { Stories } from '../api/stories.js';
// import heart from '/heart.png'
 
export const Story = (props) => {
  const iLoveIt = () => {
    Stories.update(props.story._id, {
      $set: { favourites: props.story.favourites + 1 },
    });
  }
  const iHateIt = () => {
    Stories.update(props.story._id, {
      $set: { favourites: props.story.favourites + -1 },
    });
  }

  // const storyClassName = props.story.checked ? 'checked' : '';
 
  const deleteThisStory = () => {
    Stories.remove(props.story._id);
  }


  return(
    // <li>{props.story.text}</li>
    <div>
      <span className="favourites"> favourites {props.story.favourites || 0}</span>
      {/* <img src={heart} /> */}
      
      <li>
      <img className="heartImage" src='/heart.png' onClick={() => iLoveIt()} />
      <img className="breakHeartImage" src='/breakHeart.png' onClick={() => iHateIt()} />
      {/* <span onClick={() => iLikeIt()}>Like</span> */}
 
        {/* <input
          type="checkbox"
          readOnly
          checked={!!props.story.checked}
          onClick={() => toggleChecked()}
        /> */}
         <span className="text">{props.story.text}</span>
         
        <button className="delete" onClick={() => deleteThisStory()}> delete
        </button>
 
        
      </li>
    </div>
    
  )
}
