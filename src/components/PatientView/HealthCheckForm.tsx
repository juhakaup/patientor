import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { EntryWithoutId, HealthCheckRating } from '../../types';
import { Stack } from '@mui/system';

interface Props {
    submitEntry: (entry: EntryWithoutId) => Promise<boolean>;
    cancelEntry: () => void;
}

const parseHealthCheckrating = (rating: string) => {
    if (rating || !isNaN(Number(rating)) ) {
        return Number(rating) as HealthCheckRating;
    }
    return HealthCheckRating.Healthy;
}

const HealtCheckForm = ({ submitEntry, cancelEntry }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [rating, setRating] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    
    const entryCreation = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newEntry = {
            type: "HealthCheck",
            description: description,
            date: date,
            specialist: specialist,
            healthCheckRating: parseHealthCheckrating(rating),
            diagnosisCodes: diagnosis.split(',')
        }

        const success = await submitEntry(newEntry as EntryWithoutId)
        if (success) {
            setDescription('');
            setDate('');
            setSpecialist('');
            setDiagnosis('');
            setRating('');
        }
    }
    return (
        <div className='form'>
            <h3>New health check entry</h3>
            <form onSubmit={entryCreation}>
                <div className="entryForm">
                    <TextField
                        id="healthceck-desc"
                        label="Description"
                        value={description}
                        variant="standard"
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <TextField
                        id="healthceck-date"
                        label="Date"
                        value={date}
                        variant="standard"
                        onChange={(event) => setDate(event.target.value)}
                    />
                    <TextField
                        id="healthceck-special"
                        label="Specialist"
                        value={specialist}
                        variant="standard"
                        onChange={(event) => setSpecialist(event.target.value)}
                    />
                    <TextField
                        id="healthceck-diag"
                        label="Diagnosis codes"
                        value={diagnosis}
                        variant="standard"
                        onChange={(event) => setDiagnosis(event.target.value)}
                    />
                    <TextField
                        id="healthceck-rating"
                        label="Healthcheck rating"
                        value={rating}
                        variant="standard"
                        type="number"
                        onChange={(event) => setRating(event.target.value)}
                    />
                </div>
                <Stack direction="row" spacing={5}>
                    <Button variant="contained" color="success" type='submit'>Add</Button>
                    <Button variant="contained" color="error" onClick={cancelEntry}>Cancel</Button>
                </Stack>
            </form>
        </div>
    )
}

export default HealtCheckForm;