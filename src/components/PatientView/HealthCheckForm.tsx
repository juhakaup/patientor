import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Diagnose, EntryWithoutId, HealthCheckRating } from '../../types';
import { Stack } from '@mui/system';
import { Autocomplete, Rating, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface Props {
    submitEntry: (entry: EntryWithoutId) => Promise<boolean>;
    cancelEntry: () => void;
    diagnosisCodes: Diagnose[];
}

const parseHealthCheckrating = (rating: string) => {
    if (rating || !isNaN(Number(rating)) ) {
        return (4 - Number(rating)) as HealthCheckRating;
    }
    return HealthCheckRating.Healthy;
}

const StyledRating = styled(Rating)({
    iconFilled: {
      color: "#ff6d75",
    },
    iconHover: {
      color: "#ff3d47",
    }
  });

const HealtCheckForm = ({ submitEntry, cancelEntry, diagnosisCodes }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [rating, setRating] = useState<number | null>(2);
    const [selectedDiagnoses, setSelectedDiagnoses] = useState<Diagnose[]>([]);
    
    const entryCreation = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newEntry = {
            type: "HealthCheck",
            description: description,
            date: date,
            specialist: specialist,
            healthCheckRating: parseHealthCheckrating(rating ? rating.toString() : "2"),
            diagnosisCodes: selectedDiagnoses.map(diag => diag.code)
        }

        const success = await submitEntry(newEntry as EntryWithoutId)
        if (success) {
            setDescription('');
            setDate('');
            setSpecialist('');
            setSelectedDiagnoses([]);
            setRating(2);
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
                        type="date"
                        onChange={(event) => setDate(event.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="healthceck-special"
                        label="Specialist"
                        value={specialist}
                        variant="standard"
                        onChange={(event) => setSpecialist(event.target.value)}
                    />
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={diagnosisCodes}
                        getOptionLabel={(option) => `${option.code} - ${option.name}`}
                        defaultValue={[]}
                        onChange={(event, newValue) => {setSelectedDiagnoses(newValue)}}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Diagnosis codes"
                        />
                        )}
                    />
                    <br />
                    <Typography variant="subtitle1" sx={{color: 'gray'}}>
                        Healthcheck rating
                    </Typography>
                    <StyledRating
                        value={rating}
                        max={4}
                        icon={<Favorite fontSize="inherit" />}
                        onChange={(event, newValue) => {
                            setRating(Number(newValue));
                          }}
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