import React from 'react';
import './CreateTarget.css';

class CreateTarget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
                        targetName: '',
                        targetSlug: '', 
                        click: props.cb 
                     };

        this.inputChange = this.inputChange.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    inputChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    buttonClick () {
        if (this.state.targetName.length > 0 && this.state.targetSlug.length > 0) {
            this.setState({targetName: '', targetSlug: ''});
            this.state.click(this.state.targetName, this.state.targetSlug);
        }
    }

    render() {
        return (
        <div className="c-createTarget">
            <h1>New Target</h1>
            <input type="text" name="targetName" value={this.state.targetName} placeholder="Target Name" onChange={this.inputChange} />
            <input type="text" name="targetSlug" value={this.state.targetSlug} placeholder="Target Slug" onChange={this.inputChange} />
            <button type="button" value="Create" onClick={this.buttonClick}>Create</button>
        </div>
        );
    }
  }
  
  export default CreateTarget;