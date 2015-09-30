// The rating part of a person's profile
Rating = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData: function() {
        Meteor.subscribe("Voterspub");
        Meteor.subscribe("currentUserData");
        return {
            currentUser: Meteor.user(),
            vote: Votersdb.find({peopleId:this.props.person._id}).fetch()[0]
        }
    },
    hasVoted: function() {
        // If vote was found in the db return true
        return typeof(this.data.vote) !== "undefined"
    },
    getVote: function() {
        // Set default to No opinion if no vote cast
        return this.hasVoted() ? this.data.vote.points : 0
    },
    componentDidMount: function() {
        // Fetch user's vote at load
        this.setState({
          selectedValue: this.getVote()
        });
    },
    getInitialState: function() {   
        return {
            selectedValue: 0
        };
    },
    avgPts: function () {
        // Return averege vote score or
        var avg = (this.props.person.totalpoints / this.props.person.totalvoters);
        return isFinite(avg) && !isNaN(avg) ? avg : 0;
    },
    handleChange: function(value){
        if (this.hasVoted()) {
            // User changes vote from nothing to something
            if (this.data.vote.points == 0 && value > 0){
                Meteor.call("userIncVoters", this.props.person._id, value);
            }
            // User changes his vote to nothing
            else if (value == 0 && this.data.vote.points > 0) {
                Meteor.call("userDecVoters", this.props.person._id, this.data.vote.points);
            }
            // User changes his vote
            else {
                Meteor.call("userAddPoints", this.props.person._id, (value - this.data.vote.points));
            }
        } 
        else {
            // User votes for the first time
            Meteor.call("userIncVoters", this.props.person._id, value);
        }        
        // As soon as radio button is selected, selectedValue.
        this.setState({
          selectedValue: value
        });
        // Change vote on the server side
        Meteor.call("userUpdatesVote", this.data.currentUser._id, this.props.person._id, value);
        Meteor.call("personUpdateAvg", this.props.person._id, this.avgPts());
    },
    renderRater: function() {
        // Array of ratings
        var inputs = [0,1,2,3,4,5,6,7,8,9,10];
        // Only render radio buttons if logged in
        if (this.data.currentUser) {
            return (
                <RadioGroup name={this.props.person._id} selectedValue={this.state.selectedValue} onChange={this.handleChange}>
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
                    Votes: <span>{this.props.person.totalvoters}</span>
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
        // If no profile pi present, show placeholder image
        var pic = this.props.person.profilepic ? this.props.person.profilepic : "images/p.png";
        return (
            <li className="person">
                <a href={p.althing_url}>
                    <h1>{p.name}</h1>
                </a>
                <h2 className="party-name">{p.party}</h2>
                <div className="person-body">
                    <img src={pic} height="220" alt="Profile picture" className="clearfix" />
                    <br />
                    <Rating person={p} />
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
            people: Peopledb.find({}, {sort: {name: 1}}).fetch().sort(dynamicSort("name"))
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