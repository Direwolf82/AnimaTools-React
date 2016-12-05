/**
 * Created by Enrique on 5/12/2016.
 */
namespace app.components {

    export class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {

        constructor(props : ITodoItemProps){
            super(props);
            // set initial state
            this.state = { editText: this.props.todo.title };
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