import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

export class AddQuestion extends Component {
    displayName = AddQuestion.name

    constructor(props, context) {
        super(props, context);
        this.state = {
            email: '',
            question: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.okSubmit = this.okSubmit.bind(this);
    }

    //Endrer state på email-prop når inputfeltet endres.
    handleEmailChange(event) {
        event.preventDefault();
        this.setState({email: event.target.value})
    }

    //Endrer state på question-prop når inputfeltet endres.
    handleQuestionChange(event) {
        event.preventDefault();
        this.setState({ question: event.target.value })
    }

    //Sjekker at spørsmålsfeltet ikke er tomt.
    okSubmit() {
        return ( this.state.question.length > 0 );
    }

    //Sender utfylt informasjon tilbake til parent.
    onSubmit(event) {
        event.preventDefault();
        if (!this.okSubmit()) {
            return;
        }

        this.props.handleAdd(this.state.email, this.state.question);
        this.props.handleClose();
    }
    
    render() {
        //Denne sjekker at spørsmålsfeltet er utfylt, og gjør at man ikke kan trykke på send-knappen hvis ikke.
        const isEnabled = this.okSubmit();

        return (
            <form onSubmit={this.onSubmit}>
                <FormGroup controlId="formControlsEmail">
                <ControlLabel>E-postadresse:</ControlLabel>
                    <FormControl type="email" placeholder="(valgfritt)" onChange={this.handleEmailChange} />
                </FormGroup>
                <FormGroup controlId="formControlsTextarea" >
                    <ControlLabel>Skriv spørsmål her:</ControlLabel>
                    <FormControl componentClass="textarea" onChange={this.handleQuestionChange} />
                </FormGroup>
                <button disabled={!isEnabled}>Send</button>
            </form>
        );
    }
}