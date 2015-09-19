Rating = React.createClass({
    getMeteorData: function() {
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
            inputs.push({nr: i, pId: this.props.pId})
        };
        console.log(inputs);
        //if (this.data.currentUser != null) {
            return (
                <form id={this.props.key} className="add-points" onSubmit={this.addRating} >
                    {inputs.map((i) => {
                        return <input type="radio" name={i.pId} value={i.nr}>{i.nr}</input>
                    })}
                    
                    <input type="submit" value="Vote" />
                </form>
            )
            
        //}
        //else {
        //    return (
        //        <p>Sign in to vote</p>
        //    )
        //}
    },
    render: function() {
        return (
            <div className="rating">
                <span>Average: {this.avgPts()}</span>
                <span>Votes: {this.props.totalvoters}</span>
                {this.renderRater()}
            </div>
        );
    }
});


Person = React.createClass({
    render: function() {
        var p = this.props.person;
        return (
            <div className="singlePerson col-md-3">
                <h3>{p.name}</h3>
                <h4>{p.party}</h4>
                <a href={p.althing_url}>
                    <img src={p.profilepic} height="220" alt={p.name} />
                </a>
                <br />
                <Rating totalpoints={p.totalpoints} totalvoters={p.totalvoters} pId={p._id} />
            </div>
        );
    }
});

People = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData: function() {
        return {
            people: Peopledb.find({}, {sort: {name: 1}}).fetch()
        }
    },
    getInitialState: function() {
        return {};
    },
    render: function() {
        return (
            <div className="people">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Rate how much you trust</h3>
                    </div>
                    {this.data.people.map((p) => {
                        return <Person key={p._id} person={p} />
                    })}
                </div>
            </div>
        );
    }
});