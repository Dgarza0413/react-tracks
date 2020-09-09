import React, { useState } from "react";
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Lock from "@material-ui/icons/Lock";

import Error from '../Shared/Error';

const Login = ({ classes, setNewUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event, tokenAuth) => {
    event.preventDefault()
    const res = await tokenAuth()
    console.log(res)
  }


  return <div className={classes.root}>
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <Lock />
      </Avatar>
      <Typography variant='title'>Login as Exisiting User</Typography>
      <Mutation
        mutation={LOGIN_MUTATION}
        variables={{ username, password }}
        onCompleted={data => {
          console.log(data)
        }}
      >
        {(tokenAuth, { loading, error }) => {
          return (
            <form
              onSubmit={(event) => handleSubmit(event, tokenAuth)}
              className={classes.form}>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input onChange={event => setUsername(event.target.value)} id="username" />
              </FormControl>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input type="password" onChange={event => setPassword(event.target.value)} id="password" />
              </FormControl>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='secondary'
                disabled={loading || !username.trim() || !password.trim()}
                className={classes.submit}
              >
                {loading ? "Logging In..." : "Log In"}
              </Button>
              <Button
                onClick={() => setNewUser(true)}
                color='primary'
                fullWidth
                variant='outlined'
              >
                New User? Register Here
          </Button>

              {error && <div><Error error={error} /></div>}
            </form>
          )
        }}
      </Mutation>
    </Paper>
  </div>;
};

const LOGIN_MUTATION = gql`
mutation( $username: String!, $password:String!){
  tokenAuth(username: $username, password: $password){
    token
  }
}
`

const styles = theme => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing.unit * 2
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.secondary.main
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Login);
