import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { EntryWithoutId } from '../../types';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';

interface Props {
    submitEntry: (entry: EntryWithoutId) => Promise<boolean>;
    cancelEntry: () => void;
}

const OccupationalHealthcareForm = ({ submitEntry, cancelEntry }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [employer, setEmployer] = useState('');
    const [sickleaveStartDate, setSickleaveStartDate] = useState('');
    const [sickleaveEndDate, setSickleaveEndDate] = useState('');
    
    const entryCreation = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newEntry = {
            type: "OccupationalHealthcare",
            description: description,
            date: date,
            specialist: specialist,
            diagnosisCodes: diagnosis.split(','),
            employerName: employer,
            sickleave: { startDate: sickleaveStartDate, endDate: sickleaveEndDate }
        }

        const success = await submitEntry(newEntry as EntryWithoutId)
        if (success) {
            setDescription('');
            setDate('');
            setSpecialist('');
            setDiagnosis('');
            setEmployer('');
            setSickleaveStartDate('');
            setSickleaveEndDate('');
        }
    }
    return (
        <div className='form'>
            <h3>New hospital entry</h3>
            <form onSubmit={entryCreation}>
                <div className="entryForm">
                    <TextField
                        id="hospital-desc"
                        label="Description"
                        value={description}
                        variant="standard"
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <TextField
                        id="occupational-date"
                        label="Date"
                        value={date}
                        variant="standard"
                        onChange={(event) => setDate(event.target.value)}
                    />
                    <TextField
                        id="occupational-special"
                        label="Specialist"
                        value={specialist}
                        variant="standard"
                        onChange={(event) => setSpecialist(event.target.value)}
                    />
                    <TextField
                        id="occupational-diag"
                        label="Diagnosis codes"
                        value={diagnosis}
                        variant="standard"
                        onChange={(event) => setDiagnosis(event.target.value)}
                    />
                    <TextField
                        id="occupational-employer"
                        label="Employer"
                        value={employer}
                        variant="standard"
                        onChange={(event) => setEmployer(event.target.value)}
                    />
                    <div className='form-group'>
                        <Typography variant="subtitle1" sx={{color: 'gray'}}>
                            Sick leave:
                        </Typography>
                    
                        <Stack direction="row" spacing={2}>
                            <TextField
                                id="occupational-startdate"
                                label="start date"
                                value={sickleaveStartDate}
                                variant="standard"
                                onChange={(event) => setSickleaveStartDate(event.target.value)}
                            />
                            <TextField
                                id="occupational-enddate"
                                label="end date"
                                value={sickleaveEndDate}
                                variant="standard"
                                onChange={(event) => setSickleaveEndDate(event.target.value)}
                            />
                        </Stack>
                    </div>
                </div>
                <Stack direction="row" spacing={5}>
                    <Button variant="contained" color="success" type='submit'>Add</Button>
                    <Button variant="contained" color="error" onClick={cancelEntry}>Cancel</Button>
                </Stack>
            </form>
        </div>
    )
}

export default OccupationalHealthcareForm;