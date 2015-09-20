// The rating part of a person's profile
Rating = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData: function() {
        Meteor.subscribe("Voterspub");
        Meteor.subscribe("currentUserData");
        return {
            currentUser: Meteor.user()
        }
    },
    getVote: function() {
        // Get the users vote for this person
        var person = Votersdb.find({userVoter:this.data.currentUser._id, peopleId:this.props.pId}).fetch()[0];
        // set default to No opinion if no vote cast
        return typeof(person) == "undefined" ? "No opinion" : person.points
    },
    componentDidMount: function() {
        // Fetch user's vote at load
        this.setState({
          selectedValue: this.getVote(),
        });
    },
    getInitialState: function() {   
        return {
            selectedValue: "No opinion"
        };
    },
    avgPts: function () {
        // Return averege vote score or
        return (this.props.totalpoints / this.props.totalvoters) || 0
    },
    handleChange: function(value){
        // As soon as radio button is selected, change vote.
        this.setState({
          selectedValue: value,
        });
        // Change vote on the server side
        Meteor.call("userUpdatesVote", this.data.currentUser._id, this.props.pId, value);
    },
    renderRater: function() {
        // Array of ratings
        var inputs = ["No opinion",1,2,3,4,5,6,7,8,9,10];
        // Only render radio buttons if logged in
        if (this.data.currentUser) {
            return (
                <RadioGroup name={this.props.pId} selectedValue={this.state.selectedValue} onChange={this.handleChange}>
                    {Radio => (
                        <div>
                            {inputs.map((i, i) => {
                                return <Radio value={i} key={i}/>
                            })}
                        </div>
                    )}
                </RadioGroup>
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

// Single Person
Person = React.createClass({
    render: function() {
        var p = this.props.person;
        // If no profile pi present, show placeholder
        var pic = this.props.person.profilepic ? this.props.person.profilepic : "images/placeholder.png";
        return (
            <li className="person">
                <a href={p.althing_url}>
                    <h1>{p.name}</h1>
                </a>
                <h2 className="party-name">{p.party}</h2>
                <div className="person-body">
                    <img src={pic} height="220" alt="Profile picture" className="clearfix" />
                    <br />
                    <Rating totalpoints={p.totalpoints} totalvoters={p.totalvoters} pId={p._id} />
                </div>
            </li>
        );
    }
});

// All the people
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