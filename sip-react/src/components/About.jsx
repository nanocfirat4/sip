import { MenuItem, Paper, TextField } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Store'

import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { TagService } from '../services/TagService';
import keycloak from '../keycloak';

const About = () => {
    const [state, dispatch] = useContext(Context)

    const [fromIndex, setFromIndex] = useState(1)
    const [toIndex, setToIndex] = useState(state.allTags.length > 20 ? 20 : state.allTags.length)
    console.log(state.allTags)

    useEffect(() => {
        TagService.authToken(keycloak.token)
        TagService.findAll().then((res) => {
            dispatch({ type: "SET_ALL_TAGS", payload: res.data })
        });
    })


    return <div className='mt-3'>
        <TextField
            id="from_index"
            select
            value={fromIndex}
            label="From Rank"
            onChange={(event) => setFromIndex(event.target.value)}
            style={{ margin: "20px", width: "100px" }}
        >
            {Array.from({ length: toIndex }, (v, i) => i + 1).map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>

        <TextField
            id="to_index"
            select
            value={toIndex}
            label="To Rank"
            onChange={(event) => setToIndex(event.target.value)}
            style={{ margin: "20px", width: "100px" }}
        >
            {Array.from({ length: state.allTags.length - fromIndex }, (v, i) => i + fromIndex + 1).map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
        
        <Paper>
            <Chart data={state.allTags.slice(fromIndex - 1, toIndex)}>
                <ArgumentAxis />
                <ValueAxis may={7} />

                <BarSeries
                    valueField="hashtagCount"
                    argumentField="hashtagtxt"
                />
                <Title text="Tag usage" />
                <Animation />
            </Chart>
        </Paper>
    </div>
}
export default About