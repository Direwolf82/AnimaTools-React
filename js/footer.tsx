namespace app.components {
    export class TodoFooter extends React.Component<ITodoFooterProps, {}>{
        public render() {
            var activeTodoWord = app.miscelaneous.Utils.pluralize(this.props.count, 'item');
            var clearButton = null;

            if(this.props.completedCount > 0) {
                clearButton = (
                    <button
                        className="clear-completed"
                        onClick={this.props.onClearCompleted}>
                        Clear Completed
                    </button>
                );
            }

            var cx = React.addons.className;
            var nowShowing = this.props.nowShowing;
            return(
                <footer className="footer">
                    <span className="todo-count">
                        <strong>{this.props.count}</strong>
                        {activeTodoWord} left
                    </span>
                    <ul className = "filters">
                        <li>
                            <a href="#/"
                                className={cx({selected: nowShowing === app.constants.ALL_TODOS})}>
                                ALL
                            </a>
                        </li>
                        {' '}
                        <li>
                            <a href="#/active"
                            className={cx({selected: nowShowing === app.constants.ACTIVE_TODOS})}>
                            Active
                            </a>
                        </li>
                        {' '}
                        <li>
                            <a href="#/completed"
                               className={cx({selected: nowShowing === app.constants.COMPLETED_TODOS})}>
                                Completed
                            </a>
                        </li>
                    </ul>
                    {clearButton}
                </footer>
            );
        }
    }
}