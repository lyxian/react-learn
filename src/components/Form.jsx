import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      placeHolder: "A",
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    // alert("Hello, world!");
    this.props.addTask(this.state.placeHolder);
    this.setState({
      placeHolder: "",
    });
  }

  handleChange(e) {
    this.setState({
      placeHolder: e.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={this.state.placeHolder}
          onChange={this.handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
  }
}

export default Form;

// const [name, setName] = useState('Use hooks!');

// function Form(props) {
//     function handleSubmit(e) {
//       e.preventDefault();
//       props.addTask("Say hello!");
//     }

//     return (
//       <form onSubmit={handleSubmit}>
//         <h2 className="label-wrapper">
//           <label htmlFor="new-todo-input" className="label__lg">
//             What needs to be done?
//           </label>
//         </h2>
//         <input
//           type="text"
//           id="new-todo-input"
//           className="input input__lg"
//           name="text"
//           autoComplete="off"
//         />
//         <button type="submit" className="btn btn__primary btn__lg">
//           Add
//         </button>
//       </form>
//     );
//   }
