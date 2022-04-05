import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Container } from "../shared/styles";

import { useQuestionContext } from "../lib/questionContext";

import Navbar from "../components/Navbar";
import CardResult from "../components/CardResult";

const Results = () => {
    const { formations } = useQuestionContext();
    const [formationsList, setFormationsList] = useState([]);

    useEffect(() => {
        if (!formations) return;
        // const list = formations.map((formation) => {
        //     return { score: formation.score || 0, name: formation.INTITULE, code: formation.ABREGE?.LIBELLE };
        // });
        // list.sort((a, b) => b.score - a.score);
        const list = [...formations];
        list.length = 10;
        setFormationsList(list);
    }, [formations]);

    return (
        <Container>
            <Grid>
                <GridItem area="header">
                    <h1>Mes Formations</h1>
                </GridItem>
                <GridItem area="results">
                    {formationsList?.length > 0 && (
                        <CardsList>
                            {formationsList.map((formation, index) => {
                                // const percentage = Math.round((parseInt(formation.score) / questionCounter) * 100) || 0;

                                return (
                                    <>
                                        <CardResult
                                            key={formation.formation_id}
                                            type={formation.type}
                                            title={formation.label}
                                            percentage={0}
                                        />
                                        {index < formationsList.length - 1 && <Separator key={index} />}
                                    </>
                                );
                            })}
                        </CardsList>
                    )}
                </GridItem>
                <GridItem area="navbar">
                    <Navbar />
                </GridItem>
            </Grid>
        </Container>
    );
};

export default Results;

const Grid = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 15vh 1fr 15vh;
    grid-template-areas:
        "header"
        "results"
        "navbar";
`;

const GridItem = styled.div`
    grid-area: ${(props) => props.area};
    display: grid;
    place-items: center;
`;

const CardsList = styled.ul`
    padding: 0 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: scroll;
    height: 500px;
    max-height: 100%;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Separator = styled.hr`
    height: 2px;
    box-shadow: none;
    border-color: #dddddd;
    width: 100%;
`;