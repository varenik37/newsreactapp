import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

function App() {
    const [characterList, setCharacterList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [speciesFilter, setSpeciesFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("");

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                let url = `https://rickandmortyapi.com/api/character/?name=${searchTerm}`;
                if (statusFilter) {
                    url += `&status=${statusFilter}`; 
                }
                if (speciesFilter) {
                    url += `&species=${speciesFilter}`; 
                }
                if (genderFilter) {
                    url += `&gender=${genderFilter}`; 
                }
                const response = await fetch(url);
                const jsonData = await response.json();
                setCharacterList(jsonData.results);
            } catch (error) {
                console.error("Error fetching characters:", error);
            }
        };
        fetchCharacters();
    }, [searchTerm, statusFilter, speciesFilter, genderFilter]); 

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleStatusFilter = (status) => {
        setStatusFilter(statusFilter === status ? "" : status);
    };

    const handleSpeciesFilter = (species) => {
        setSpeciesFilter(speciesFilter === species ? "" : species);
    };

    const handleGenderFilter = (gender) => {
        setGenderFilter(genderFilter === gender ? "" : gender);
    };

    const resetFilters = () => {
        setSearchTerm("");
        setStatusFilter("");
        setSpeciesFilter("");
        setGenderFilter("");
    };

    const isActiveStatus = (status) => {
        return statusFilter === status ? "btn-primary active" : "btn-light";
    };

    const isActiveSpecies = (species) => {
        return speciesFilter === species ? "btn-primary active" : "btn-light";
    };

    const isActiveGender = (gender) => {
        return genderFilter === gender ? "btn-primary active" : "btn-light";
    };

    return (
        <>
            <Navbar fixed='top' bg='dark'>
                <Container>
                    <h1 className="text-center text-white">Rick and Morty Characters</h1>
                </Container>
            </Navbar>
            <Container className="mt-5 pt-5">
                <Form className="mb-4">
                    <Form.Group controlId="searchForm">
                        <Form.Control 
                            type="text" 
                            placeholder="Search Characters..." 
                            value={searchTerm} 
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                </Form>
                <Row className="mb-4"> 
                    <Col>
                        <Card className="p-3" bg="info">
                            <Card.Title>Status</Card.Title>
                            <Card.Body>
                                <Button 
                                    className={isActiveStatus("alive")} 
                                    onClick={() => handleStatusFilter("alive")}
                                >
                                    Alive
                                </Button>{' '}
                                <Button 
                                    className={isActiveStatus("dead")} 
                                    onClick={() => handleStatusFilter("dead")}
                                >
                                    Dead
                                </Button>{' '}
                                <Button 
                                    className={isActiveStatus("unknown")} 
                                    onClick={() => handleStatusFilter("unknown")}
                                >
                                    Unknown
                                </Button>{' '}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="p-3" bg="success">
                            <Card.Title>Species</Card.Title>
                            <Card.Body>
                                <Button 
                                    className={isActiveSpecies("human")} 
                                    onClick={() => handleSpeciesFilter("human")}
                                >
                                    Human
                                </Button>{' '}
                                <Button 
                                    className={isActiveSpecies("alien")} 
                                    onClick={() => handleSpeciesFilter("alien")}
                                >
                                    Alien
                                </Button>{' '}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="p-3" bg="warning">
                            <Card.Title>Gender</Card.Title>
                            <Card.Body>
                                <Button 
                                    className={isActiveGender("male")} 
                                    onClick={() => handleGenderFilter("male")}
                                >
                                    Male
                                </Button>{' '}
                                <Button 
                                    className={isActiveGender("female")} 
                                    onClick={() => handleGenderFilter("female")}
                                >
                                    Female
                                </Button>{' '}
                                <Button 
                                    className={isActiveGender("unknown")} 
                                    onClick={() => handleGenderFilter("unknown")}
                                >
                                    Unknown
                                </Button>{' '}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Button 
                            variant="secondary" 
                            onClick={resetFilters}
                        >
                            Сбросить фильтры
                        </Button>
                    </Col>
                </Row>
                <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4">
                    {characterList && characterList.length > 0 ? (
                        characterList.map(character => (
                            <Col key={character.id}>
                                <Card className="h-100">
                                    <Card.Img variant="top" src={character.image} />
                                    <Card.Body>
                                        <Card.Title>{character.name}</Card.Title>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>Status: {character.status}</ListGroup.Item>
                                            <ListGroup.Item>Species: {character.species}</ListGroup.Item>
                                            <ListGroup.Item>Gender: {character.gender}</ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <p>No characters found.</p>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
}

export default App;