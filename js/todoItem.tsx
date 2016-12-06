/**
 * Created by Enrique on 5/12/2016.
 */
//var ReactDOM = require('react-dom');
namespace app.components {

    export class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {

        constructor(props: ITodoItemProps) {
            super(props);
            // set initial state
            this.state = {editText: this.props.todo.title};
        }

        public handleSubmit(event) {
            var val = this.state.editText.trim();
            if (val) {
                this.props.onSave(val);
                this.setState({editText: val});
            } else {
                this.props.onDestroy();
            }
        }

        public handleEdit() {
            this.props.onEdit();
            this.setState({editText: this.props.todo.title});
        }

        public handleKeyDown(event){
            if(event.which === app.constants.ESCAPE_KEY){
                this.setState({editText: this.props.todo.title});
                this.props.onCancel(event);
            } else if (event.which === app.constants.ENTER_KEY) {
                this.handleSubmit(event);
            }
        }

        public handleChange(event) {
            this.setState({editText: event.target.value});
        }

        public componentDidUpdate(prevProps){
            if(!prevProps.editing && this.props.editing){
                var node = ReactDOM.findDOMNode<HTMLInputElement>(this.refs["editField"]);
                node.focus();
                node.setSelectionRange(node.value.length, node.value.length);
            }
        }

        public render(){
            return (
                <li className={React.addons.className({
                completed: this.props.todo.completed,
                editing: this.props.editing
                })}>
                    <div className="view">
                        <input
                            className="toggle"
                            type="checkbox"
                            checked={this.props.todo.completed}
                            onChange={this.props.onToggle}
                        />
                        <label onDoubleClick={e => this.handleEdit()}>
                            {this.props.todo.title}
                        </label>
                        <button className="destroy" onClick={this.props.onDestroy}/>
                    </div>
                    <input
                        ref="editField"
                        className="edit"
                        value={this.state.editText}
                        onBlur={e=> this.handleSubmit(e)}
                        onChange={e => this.handleChange(e)}
                        onKeyDown = {e => this.handleKeyDown(e)}
                    />
                </li>
            );
        }
    }
}