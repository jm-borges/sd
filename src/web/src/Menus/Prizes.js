import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const Prizes = ({ token }) => {
    const [prizes, setPrizes] = useState(null);

    useEffect(() => {
        const fetchPrizes = async () => {
            if (!token) return;

            console.log("Fetching prizes with token:", token);
            try {
                const response = await fetch('http://localhost:8080/prizes', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setPrizes(data);
            } catch (error) {
                console.error('Error fetching prizes', error);
            }
        };

        fetchPrizes();
    }, [token]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Prizes</Typography>
            {prizes ? (
                <List>
                    {prizes.map(prize => (
                        <ListItem key={prize.id}>
                            <ListItemText
                                primary={`${prize.year} - ${prize.category.charAt(0).toUpperCase() + prize.category.slice(1)}`}
                                secondary={prize.laureates.map(laureate => (
                                    <div key={laureate.id}>
                                        <Typography component="span" variant="body2">
                                            {laureate.firstname} {laureate.surname} - {laureate.motivation}
                                        </Typography>
                                    </div>
                                ))}
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <CircularProgress />
            )}
        </Container>
    );
};

export default Prizes;
