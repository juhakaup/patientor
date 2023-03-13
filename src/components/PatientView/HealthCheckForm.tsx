import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { EntryWithoutId, HealthCheckRating } from '../../types';

interface Props {
    submitEntry: (entry: EntryWithoutId) => void;
}

const parseHealthCheckrating = (rating: string) => {
    if (rating || !isNaN(Number(rating)) ) {
        return Number(rating) as HealthCheckRating;
    }
    return HealthCheckRating.Healthy;
}

const HealtCheckForm = ({ submitEntry }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [rating, setRating] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    
    const entryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newEntry = {
            type: "HealthCheck",
            description: description,
            date: date,
            specialist: specialist,
            healthCheckRating: parseHealthCheckrating(rating),
            diagnosisCodes: diagnosis.split(',')
        }

        submitEntry(newEntry as EntryWithoutId);
    }
    return (
        <div className='form'>
            <h3>New health check entry</h3>
            <form onSubmit={entryCreation}>
                <div className="entryForm">
                    <TextField
                        id="healthceck-desc"
                        label="Description"
                        defaultValue={description}
                        variant="standard"
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <TextField
                        id="healthceck-date"
                        label="Date"
                        defaultValue={date}
                        variant="standard"
                        onChange={(event) => setDate(event.target.value)}
                    />
                    <TextField
                        id="healthceck-special"
                        label="Specialist"
                        defaultValue={specialist}
                        variant="standard"
                        onChange={(event) => setSpecialist(event.target.value)}
                    />
                    <TextField
                        id="healthceck-rating"
                        label="Healthcheck rating"
                        variant="standard"
                        type="number"
                        onChange={(event) => setRating(event.target.value)}
                    />
                    <TextField
                        id="healthceck-diag"
                        label="Diagnosis codes"
                        defaultValue={diagnosis}
                        variant="standard"
                        onChange={(event) => setDiagnosis(event.target.value)}
                    />
                </div>
                <Button variant="contained" type='submit'>Add</Button>
            </form>
        </div>
    )
}

export default HealtCheckForm;