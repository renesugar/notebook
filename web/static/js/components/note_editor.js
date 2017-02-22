import React    from "react";

export default class NoteEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }

  toggleExpander() {
    this.setState({expanded: !this.state.expanded});
  }

  expanderClassName() {
    const base = "edit-note-form";
    if (this.state.expanded == true)
      return(base);
    else
      return(base + " hidden");
  }

  render() {
    return(
      <div className="edit-note-form">
        <button
          onClick={this.toggleExpander.bind(this)}
          className={this.expanderClassName()} >
          Edit
        </button>
        <div className="edit-note-form">
          Edit the note
        </div>
      </div>
    )
  }
}