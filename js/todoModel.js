var app;
(function (app) {
    var models;
    (function (models) {
        var TodoModel = (function () {
            function TodoModel(key) {
                this.key = key;
                this.todos = app.miscelaneous.Utils.store(key);
                this.onChanges = [];
            }
            TodoModel.prototype.subscribe = function (onChange) {
                this.onChanges.push(onChange);
            };
            TodoModel.prototype.inform = function () {
                app.miscelaneous.Utils.store(this.key, this.todos);
                this.onChanges.forEach(function (cb) { cb(); });
            };
            TodoModel.prototype.addTodo = function (title) {
                this.todos = this.todos.concat({
                    id: app.miscelaneous.Utils.uuid(),
                    title: title,
                    completed: false
                });
                this.inform();
            };
            TodoModel.prototype.toggleAll = function (checked) {
                this.todos = this.todos.map(function (todo) {
                    return app.miscelaneous.Utils.extend({}, todo, { completed: checked });
                });
                this.inform()();
            };
            TodoModel.prototype.destroy = function (todo) {
                this.todos = this.todos.filter(function (candidate) {
                    return candidate !== todo;
                });
                this.inform();
            };
            TodoModel.prototype.clearCompleted = function () {
                this.todos = this.todos.filter(function (todo) {
                    return !todo.completed;
                });
                this.inform();
            };
            TodoModel.prototype.save = function (todoToSave, text) {
                this.todos = this.todos.map(function (todo) {
                    if (todo !== todoToSave) {
                        return todo;
                    }
                    else {
                        return app.miscelaneous.Utils.extend({}, todo, { title: text });
                    }
                });
                this.inform();
            };
            TodoModel.prototype.toggle = function (todoToToggle) {
                this.todos = this.todos.map(function (todo) {
                    if (todo !== todoToToggle) {
                        return todo;
                    }
                    else {
                        return app.miscelaneous.Utils.extend({}, todo, { completed: !todo.completed });
                    }
                });
                this.inform();
            };
            return TodoModel;
        }());
        models.TodoModel = TodoModel;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
