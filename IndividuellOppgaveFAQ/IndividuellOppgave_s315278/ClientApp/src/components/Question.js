import React, { Component } from 'react';
import { Panel, PanelGroup } from 'react-bootstrap';
import * as Icon from 'react-feather';

export class Question extends Component {
    displayName = Question.name

    constructor(props, context) {
        super(props, context);
        
        this.upVoter = this.upVoter.bind(this);
        this.downVoter = this.downVoter.bind(this);

        this.state = {
            voteAuth: true
        };
    }

    //De to neste metodene sjekker om voteAuth er true, og kjører metoden upVoter eller downVoter i parent, før voteAuth settes til false.
    //Dette gjør at man bare kan stemme en gang per spørsmål. Man må refreshe siden hvis man vil stemme flere ganger.
    upVoter(event) {
        event.preventDefault();

        this.state.voteAuth === true ? (
        this.props.upVoter(this.props.id, this.props.upVotes, this.props.totalVotes),
        this.setState({
            voteAuth: false
        })) : null
        }
    
    downVoter(event) {
        event.preventDefault();

        this.state.voteAuth === true ? (
        this.props.downVoter(this.props.id, this.props.totalVotes),
        this.setState({
            voteAuth: false
        })) : null
    }

    render() { 
        return (
        <PanelGroup
            accordion
            onSelect={this.handleSelect}
            >
                        <Panel>
                            <Panel.Heading>
                        <Panel.Title toggle className='bold'>{this.props.question}</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                                {this.props.answer} <br /><br />
                        <Icon.ThumbsUp className='icon' color='green' size={18} onClick={this.upVoter} />
                        <Icon.ThumbsDown className='icon' color='red' size={18} onClick={this.downVoter} />
                        {this.props.totalVotes === 0 ? null : <div>{Math.round(((this.props.upVotes / this.props.totalVotes) * 100) * 100) / 100}% fant dette svaret hjelpsomt.</div>}
                        <h6>Sendt inn av {this.props.asker}</h6>
                            </Panel.Body>
                        </Panel>
        </PanelGroup>
        );
    }
}
