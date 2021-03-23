import React from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';

class Thumbnail extends React.Component {
    isChecked = true;


    render() {
        return (null
            // CheckboxLabels(this.props.imgName)
        )
    }
}
export default Thumbnail



function CheckboxLabels(imgName) {
  const [state, setState] = React.useState({
    checked: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked}
            onChange={handleChange}
            name="checked"
            color="primary"
          />
        }
        label={
            <img src={imgName} />
        }
      />
    </FormGroup>
  );
}
