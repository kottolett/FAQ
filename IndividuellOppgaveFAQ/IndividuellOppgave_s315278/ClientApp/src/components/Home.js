import React, { Component } from 'react';
import { Jumbotron, Modal, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { Question } from "./Question";
import { AddQuestion } from './AddQuestion';

export class Home extends Component {
    displayName = Home.name

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.getQuestions = this.getQuestions.bind(this);
        this.upVoter = this.upVoter.bind(this);
        this.downVoter = this.downVoter.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);

        this.state = {
            show: false,
            qview: false,
            questions: [],
            selectedCategory: 'Navigasjon'
        };
    }

    //Henter objekter fra databasen og lagrer dem i this.state.questions
    componentDidMount() {
        fetch('api/FAQ/Get')
            .then(response => response.json())
            .then(data => {
                this.setState({ questions: data });
            });
    }

    //Hjelpemetode for å hente alle spørsmål fra state
    getQuestions() {
        return this.state.questions;
    }

    //De to neste er hjelpemetoder for å åpne og lukke modalen for nye spørsmål.
    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    //Metode for å legge inn nye spørsmål i databasen og state.
    //Hvis man ikke vil oppgi epost, settes spørsmålsstilleren til 'anonym', ellers lagres den oppgitte epostadressen.
    handleAdd(asker, question) {
        const questions = this.getQuestions();
        let inQuestion;
        {
            asker === '' ? (
                inQuestion = {
                    asker: 'anonym',
                    question,
                    answer: 'Takk for spørsmål, vi vil svare så fort som mulig!',
                    upVotes: 0,
                    totalVotes: 0,
                    category: this.state.selectedCategory
                }
            ) : (
                inQuestion = {
                    asker,
                    question,
                    answer: 'Takk for spørsmål, vi vil svare så fort som mulig!',
                    upVotes: 0,
                    totalVotes: 0,
                    category: this.state.selectedCategory
                }
                )
        };
        fetch('api/FAQ', {
            method: "Post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inQuestion)
        }).then(res => res.json());

        questions.push(inQuestion);
        this.setState({ questions });
    }

    //De to neste registrerer tommel opp og tommel ned, og lagrer dem i databasen og state
    upVoter(idIn, upVotesIn, totalVotesIn) {
        let questions = this.getQuestions();

        questions = questions.map(q => {
            if (q.id === idIn) {
                q.upVotes = upVotesIn + 1;
                q.totalVotes = totalVotesIn + 1;
                fetch('api/FAQ/' + q.id, {
                    method: 'Put',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(q)
                }).then(res => res.json()
                );
            }
            return q;
        });

        this.setState({ questions });
    }

    downVoter(idIn, totalVotesIn) {
        let questions = this.getQuestions();

        questions = questions.map(q => {
            if (q.id === idIn) {
                q.totalVotes = totalVotesIn + 1;
                fetch('api/FAQ/' + q.id, {
                    method: 'Put',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(q)
                }).then(res => res.json()
                );
            }
            return q;
        });

        this.setState({ questions });
    }

    //Denne metoden oppdaterer spørsmålskategorien fra dropdown-feltet
    onCategoryChange(event) {
        event.preventDefault();
        this.setState({ selectedCategory: event.target.value })
    }

    render() {
        return (
            <div>
                <Jumbotron id="jumbotron">
                    <h1 className='bold'>Ofte stilte spørsmål</h1>
                    <br />
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Velg kategori:</ControlLabel>
                        <FormControl componentClass="select" onChange={this.onCategoryChange}>
                            <option value="Navigasjon">Navigasjon</option>
                            <option value="Faktura">Faktura</option>
                            <option value="Innhold">Innhold</option>
                        </FormControl>
                    </FormGroup>
                    {this.state.questions.map(q => (q.category === this.state.selectedCategory ?
                        <Question
                            upVoter={this.upVoter}
                            downVoter={this.downVoter}
                            id={q.id}
                            question={q.question}
                            answer={q.answer}
                            asker={q.asker}
                            upVotes={q.upVotes}
                            totalVotes={q.totalVotes}
                            category={q.category}
                        /> : null
                    ))}
                    <button onClick={this.handleShow}>Legg til spørsmål</button>
                </Jumbotron>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Legg til spørsmål</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddQuestion handleAdd={this.handleAdd} handleClose={this.handleClose} category={this.category} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.handleClose}>Close</button>
                    </Modal.Footer>
                </Modal>
            </div >
        );
    }
}