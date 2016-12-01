/**
 * Created by Enrique on 1/12/2016.
 */
// Playing around with creating tabs for a page

var Tabs = React.createClass({
   handleTabClick: function(item){

    },
    render: function(){
       //need to figure out how to dynamically add tabs
       var tabs = [
           {title: 'first', content: 'ContentA'},
           {title: 'second', content: 'ContentB'}
       ];
       return <div>
           <TabSwitcher items={tabs} onTabClick="{this.handleTabClick"/>
           <TabsContent items={tabs}/>
       </div>
    }
});

var TabSwitcher = React.createClass({
    render: function(){
        var items = this.props.items.map(function(item){
            return <a onClick={this.onClick.bind(this, item)}>{item.title}</a>;
        }.bind(this));
        return<div>{items}</div>;
    },
    onClick: function(item){
        this.props.onTabClick(item);
    }
});