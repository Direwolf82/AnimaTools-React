declare var Router: any;

var TodoModel = app.models.TodoModel;
var TodoFooter = app.components.TodoFooter;
var TodoItem = app.components.TodoItem;

namespace app.components {
    export class TodoApp extends React.Component<IAppProps, IAppState> {
        constructor (props : IAppProps) {
            super(props);
            this.state = {
                nowShowing: app.constants.ALL_TODOS,
                editing: null
            };
        }

        public componentDidMount() {
            var setState = this.setState;
            var router = Router({
                '/': setState.bind(this,{nowShowing: app.constants.ALL_TODOS}),
                '/active': setState.bind(this, {nowShowing: app.constants.ACTIVE_TODOS}),
                '/completed': setState.bind(this, {nowShowing: app.constants.COMPLETED_TODOS})
            });
            router.init('/');
        }

        public handleNewTodoKeyDown(event){
            if(event.keyCode !== app.constants.ENTER_KEY){
                return;
            }
            event.preventDefault();
            var val = React.findDOMNode<HTMLInputElement>(this.refs["newField"]).value.trim();
            if(val){
                this.props.model.addTodo(val);
                React.findDOMNode<HTMLInputElement>(this.refs["newField"]).value = '';
            }
        }

        public toggleAll(event){
            var checked = event.target.checked;
            this.props.model.toggleAll(checked);
        }

        public toggle(todoToToggle){
            this.props.model.toggle(todoToToggle);
        }

        public destroy(todo){
            this.props.model.destroy(todo);
        }

        public edit(todo) {
            this.setState({editing: todo.id});
        }

        public save(todoToSave, text) {
            this.props.model.save(todoToSave, text);
            this.setState({editing: null});
        }

    }
}