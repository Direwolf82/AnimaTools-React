namespace app.models {
    export class TodoModel implements ITodoModel {
        public key : string,
        public todos : Array<ITodo>,
        public onChanges : Array<any>,

        constructor(key) {
            this.key = key;
            this.todos = app.miscelaneous.Utils.store(key);
            this.onChanges = [];
        }

        public subscribe(onChange){
            this.onChanges.push(onChange);
        }

        public inform(){
            app.miscelaneous.Utils.store(this.key, this.todos);
            this.onChanges.forEach(function(cb){cb();});
        }

        public addTodo(title: string){
            this.todos = this.todos.concat({
                id: app.miscelaneous.Utils.uuid(),
                title: title,
                completed: false
            });
            this.inform();
        }

        public toggleAll(checked){
            this.todos = this.todos.map<ITodo>(
                function (todo: ITodo) {
                    return app.miscelaneous.Utils.extend(
                        {}, todo, {completed: checked}
                    );
                }
            );
            this.inform()();
        }

        public destroy(todo){
            this.todos = this.todos.filter(function(candidate){
                return candidate !== todo;
            });
            this.inform();
        }

        public clearCompleted(){
            this.todos = this.todos.filter(function(todo){
                return !todo.completed;
            });
            this.inform();
        }

        public save(todoToSave, text) {
            this.todos = this.todos.map(function (todo) {
                if (todo !== todoToSave) {
                    return todo;
                } else {
                    return app.miscelaneous.Utils.extend({}, todo, {title: text});
                }
            });
            this.inform();
        }

        public toggle(todoToToggle) {
            this.todos = this.todos.map<ITodo>((todo : ITodo) => {
                if (todo !== todoToToggle) {
                    return todo;
                } else {
                    return app.miscelaneous.Utils.extend(
                        {}, todo, {completed: !todo.completed}
                    );
                }
            });
            this.inform();
        }
    }
}