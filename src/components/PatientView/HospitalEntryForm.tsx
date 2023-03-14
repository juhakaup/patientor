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

const HospitalForm = ({ submitEntry, cancelEntry }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    
    const entryCreation = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newEntry = {
            type: "Hospital",
            description: description,
            date: date,
            specialist: specialist,
            diagnosisCodes: diagnosis.split(','),
            discharge: { date: dischargeDate, criteria: dischargeCriteria }
        }

        const success = await submitEntry(newEntry as EntryWithoutId)
        if (success) {
            setDescription('');
            setDate('');
            setSpecialist('');
            setDiagnosis('');
            setDischargeDate('');
            setDischargeCriteria('');
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
                        defaultValue={description}
                        variant="standard"
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <TextField
                        id="hospital-date"
                        label="Date"
                        value={date}
                        variant="standard"
                        onChange={(event) => setDate(event.target.value)}
                    />
                    <TextField
                        id="hospital-special"
                        label="Specialist"
                        value={specialist}
                        variant="standard"
                        onChange={(event) => setSpecialist(event.target.value)}
                    />
                    <TextField
                        id="hospital-diag"
                        label="Diagnosis codes"
                        value={diagnosis}
                        variant="standard"
                        onChange={(event) => setDiagnosis(event.target.value)}
                    />
                    <div className='form-group'>

                        <Typography variant="subtitle1" sx={{color: 'gray'}}>
                            Discharge:
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                id="hospital-dischargedate"
                                label="Discharge date"
                                value={dischargeDate}
                                variant="standard"
                                onChange={(event) => setDischargeDate(event.target.value)}
                            />
                            <TextField
                                id="hospital-dischargecriteria"
                                label="Criteria"
                                value={dischargeCriteria}
                                variant="standard"
                                onChange={(event) => setDischargeCriteria(event.target.value)}
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

export default HospitalForm;