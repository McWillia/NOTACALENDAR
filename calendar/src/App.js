import React from 'react';
import './App.css';
import $ from 'jquery';


class App extends React.Component { 
  
  constructor(){
    super();
    this.state = {
      tasks:[],
      numberOfTasks: 0,
      nextTaskNumber:1,

    };
  }

  handleEntry(){
    let input = $('#txtEnter').val();
    const nOfTasks = this.state.numberOfTasks;
    const next = this.state.nextTaskNumber;

    if (input.length <= 0) {input = "task"};

    this.setState({
      tasks: this.state.tasks.concat([{
        t: input,
        n: next,
      }]),
      numberOfTasks: nOfTasks+1,
      nextTaskNumber: next+1,
    })

  }

  handleDelete(i){
    const tasks = this.state.tasks;
    const num = this.state.numberOfTasks;

    let found = false;
    let counter = 0;

    while(!found){
      if (tasks[counter].n == i) {
        found=true;
      }else {
        counter++;
      };
    }

    if (!found) {
      alert("Something went really wrong. Sorry Dude.");
    };


    let newTasks = tasks.splice(counter,1);

  
    this.setState({
      tasks: tasks,
      numberOfTasks: num-1,
    })

  }


  //App render
  render(){
    return (
      <div>
        <TaskEntry onClick={() => this.handleEntry()} idGiven="btnEnter" idText="txtEnter" />

        <p>{this.state.numberOfTasks}</p>
        {this.state.tasks.map(
          (task, i) => <Task key={i} theTask={task} onDelete={() => this.handleDelete(task.n)} />
        )}        
      </div>
    );
  }
  
}

function Task(props){
  return(
    <div key={props.key}>

      <p> 
        {props.theTask.t} {props.theTask.n}        
        <button className="deleteButton" onClick={props.onDelete} >Delete </button>
      </p>


    </div>
  );
}

function TaskEntry(props){
  return(
    <div>
      <input type="text" id={props.idText} /><br/>
      <button className="entryButton" onClick={props.onClick} id={props.idGiven}>Enter</button>
    </div>
  );
}



export default App;
