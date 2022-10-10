import React, { Component } from "react";
import axios from "axios";

const localhost = process.env.LOCALHOST;
// const axios = _axios.create({
//   baseURL: "",
// });

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

    // Add to DB
    const data = {
      id: `to-do-${this.props.count}`,
      name: this.state.placeHolder,
      completed: false,
    };

    axios
      .post(`${localhost}/api/post`, data)
      .then((res) => {
        this.props.addTask(this.state.placeHolder);
        this.setState({
          placeHolder: "",
        });
      })
      .catch((err) => {
        alert("Error in adding task!");
        // console.log("Error in adding task!");
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
