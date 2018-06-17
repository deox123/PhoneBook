import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class Form extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    number: '',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input id="firstName" value={this.state.firstName} onChange={this.handleChange('firstName')} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input id="lastName" value={this.state.lastName} onChange={this.handleChange('lastName')} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="number">Number</InputLabel>
          <Input id="number" value={this.state.number} onChange={this.handleChange('number')} />
        </FormControl>        
      </div>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);