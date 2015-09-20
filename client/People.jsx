Rating = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData: function() {
        Meteor.subscribe("Voterspub");
        Meteor.subscribe("currentUserData");
        return {
            currentUser: Meteor.user()
        }
    },
    getInitialState: function() {
        return {};
    },
    avgPts: function () {
        return (this.props.totalpoints / this.props.totalvoters) || 0
    },
    addRating: function(e) {
        e.preventDefault();
        var val = React.findDOMNode(this.refs.input).value;
        val += this.props.totalpoints;
        // Voterdb.update(
        //     this.data.currentUser,
        //     { $push: {

        //     }
        // });
        // Peopledb.update(
        //     this.props.pId,
        //     { $set:{
        //         totalpoints: val
        //     }
        // });

        //ItemsCollection.insert({'content': item});
        //React.findDOMNode(this.refs.input).value = "";
    },
    renderRater: function() {
        var inputs = [];
        for (var i = 0; i < 11; i++) {
            inputs.push({nr: i, pId: this.props.pId, key: this.props.key})
        };
        if (this.data.currentUser) {
            return (
                <form id={this.props.key} className="add-points" onSubmit={this.addRating} >
                    {inputs.map((i) => {
                        return <input type="radio" name={i.pId} value={i.nr}>{i.nr}</input>
                    })}
                    
                    <input type="submit" value="Vote" />
                </form>
            )
            
        }
        else {
            return (
                <p>Sign in to vote</p>
            )
        }
    },
    render: function() {
        return (
            <div className="rating">
                <div className="rating-average">
                    Average: <span>{this.avgPts()}</span> 
                </div>
                <div className="rating-votes">
                    Votes: <span>{this.props.totalvoters}</span>
                </div>    
                {this.renderRater()}
            </div>
        );
    }
});


Person = React.createClass({
    render: function() {
        var p = this.props.person;
        return (
            <li className="person">
                <h1>{p.name}</h1>
                <h2 className="party-name">{p.party}</h2>
                <div className="person-body">
                    <a href={p.althing_url}>
                        <img src={p.profilepic} height="220" alt="Profile picture" className="clearfix" />
                    </a>
                    <br />
                    <Rating totalpoints={p.totalpoints} totalvoters={p.totalvoters} pId={p._id} />
                </div>
            </li>
        );
    }
});

People = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData: function() {
        Meteor.subscribe("Peoplepub");
        return {
            people: Peopledb.find({}, {sort: {name: 1}}).fetch()
        }
    },
    getInitialState: function() {
        return {};
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1 className="person-heading">
                        How much do you trust these people?
                    </h1>
                </div>
                <ul className="person-list">
                    {this.data.people.map((p) => {
                        return <Person key={p._id} person={p} />
                    })}
                </ul>
            </div>
        );
    }
});