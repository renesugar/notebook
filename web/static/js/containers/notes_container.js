import React                from "react";
import { connect }          from "react-redux";
import { hashHistory }      from "react-router";
import noteThunks           from "../actions/notes";
import * as noteActions     from "../actions/notes";
import NoteList             from "../components/note_list";
import NoteView             from "../components/note_view";

const mapStateToProps = (state) => {
  return {
    session: state.session,
    notes: state.notes,
    books: state.books
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNotes: (bookId) => {
      dispatch(noteThunks.getNotes(bookId));
    },
    addNewNote: (bookId, name) => {
      dispatch(noteThunks.addNote(bookId, name));
    },
    setCurrentNote: (noteId) => {
      console.log("setCurrentNote ", noteId);
    }
  }
}

class NotesContainer extends React.Component {

  componentWillMount() {
    this.props.getNotes(this.props.books.currentBook.id);
  }

  render() {
    if (this.props.session.signedIn == true)
      return (
        <div className="authenticated-container">
          <div className="notes-container">
            <NoteList book={this.props.books.currentBook}
                      notes={this.props.notes.noteList}
                      addNewNote={this.props.addNewNote} />
            <NoteView note={this.props.notes.currentNote} />
          </div>
        </div>
      );
    else
      return(<div>You need to be signed in to view this page</div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer)