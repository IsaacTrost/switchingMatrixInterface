import './App.css';
import React, { useState } from 'react';

function App() {
  const size = 16
  const valueList = [[51, 51, 255], [0, 255, 0], [255, 0, 0], [255, 102, 78]]
  const [groups, setGroups] = useState([[0, "none", [50, 50, 50]]]); 
  let a = []
  for(let i = 0; i < 16; i++){
    a.push([])
    for(let j = 0; j < size; j++){
      a[i].push(0)
    }
  }
  const [clickedCircles, setClickedCircles] = useState(a); 

  const [current, setCurrent] = useState(0); 


  function addGroup() {
    const t = [...groups]
    t.push([groups.length, "" + groups.length, valueList[groups.length - 1]])
    setGroups(t)
  }

  function setGroup(id) {
    setCurrent(id)
  }

  return (
    <div style={{width: 100+"%"}}>
        <div className = "grid">
          <div className = "current" style = {{backgroundColor: rgb(groups[current][2][0], groups[current][2][1], groups[current][2][2])}}>
            current group: {groups[current][1]}
          </div>
          <div className='gridc'> 
              {Grid(clickedCircles, setClickedCircles, current, groups)}
          </div>
        </div>
        
        <div style={{margin_left: 50+"%"}}> 
            {GroupSelector(groups, addGroup, setGroup)}
        </div>
        <div className = "output">
          {Output(clickedCircles, size)}
        </div>
    </div>
    
  );
}

function Output(clickedCircles, size){
  let points = []
  for(let i = 0; i < size; i++){
    for(let j = 0; j < size; j++){
      if(clickedCircles[i][j] >= points.length){
        points.push([])
      }
      if(clickedCircles[i][j] > 0){
        points[clickedCircles[i][j]].push([i, j])
      }
    }
  }
  let st = ""
  for(let i = 1; i < points.length; i++){
    st+="["
    for(let j = 0; j < points[i].length; j++){
      st+="["+points[i][j][0]+","+points[i][j][1]+"],"
    }
    st = st.substring(0,st.length-1);
    st+="],"
  }
  st = st.substring(0,st.length-1);

  console.log("points")

  console.log(points)
  return '--pools="' + st + '"'
}

function Grid(clickedCircles, setClickedCircles, current, groups) {
  const size = 16; // size of the grid
  const circleSize = 20; // size of each circle in pixels
  const circles = [];
  // generate the grid
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // calculate the position of each circle
      const x = i * circleSize + circleSize / 2;
      const y = j * circleSize + circleSize / 2;
      // add a circle to the array
      circles.push(<circle
      key={`${i}-${j}`}
      cx={x}
      cy={y}
      style = {{fill: rgb(groups[clickedCircles[i][15-j]][2][0], groups[clickedCircles[i][15-j]][2][1], groups[clickedCircles[i][15-j]][2][2])}}
      r={circleSize / 2}
      onClick={() => {
        const t = [...clickedCircles]
        t[i][15-j] = current
        setClickedCircles(t)
        }}
    />)
    }
  }
  
  return (
    <svg className = "svgg" viewBox='0 0 325 325'>
      {circles}
    </svg>
  ); 
}

function GroupSelector(groups, addGroup, setGroup) {

  
  return (
    <div className = "sidebar">
      <button className='addGroupBtn' onClick = {() => addGroup()}>add Group</button>

      {groups.slice(1).map(item => (
      <div className = "sidebar_item" key = {item[0]} onClick={() => setGroup(item[0])} style = {{backgroundColor: rgb(item[2][0], item[2][1], item[2][2])}}>
        {item[0]}
      </div>
      ))}
    </div>
  )
  
}
function rgb(r, g, b){
  return "rgb("+r+","+g+","+b+")";
}


export default App;
