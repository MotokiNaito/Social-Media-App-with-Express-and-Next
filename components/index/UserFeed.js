import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import AccountBox from "@material-ui/icons/AccountBox";
import withStyles from "@material-ui/core/styles/withStyles";
import Link from "next/link";

import { getUserFeed, followUser } from "../../lib/api";

class UserFeed extends React.Component {
  state = {
    users: [],
    openSuccess: false,
    followingMessage: ""
  };

  componentDidMount() {
    const { auth } = this.props;

    getUserFeed(auth.user._id).then(users => this.setState({ users }));
  }

  handleFollow = (user, userIndex) => {
    followUser(user._id).then(user => {
      const updatedUsers = [...this.state.users.slice(0, userIndex), ...this.state.users.slice(userIndex + 1)];
      this.setState({
        users: updatedUsers,
        openSuccess: true,
        followingMessage: `Following ${user.name}`
      });
    });
  };

  handleClose = () => this.setState({ openSuccess: false });

  render() {
    const { classes } = this.props;
    const { users, openSuccess, followingMessage } = this.state;

    return (
      <div>
        <Typography type="title" variant="h6" component="h2" align="center">
          Browse Users
        </Typography>
        <Divider />

        {/* Users List */}
        <List>
          {users.map((user, i) => (
            <span key={user._id}>
              <ListItem>
                <ListItemAvatar className={classes.avatar}>
                  <Avatar src={user.avatar} />
                </ListItemAvatar>
                <ListItemText primary={user.name} />
                <ListItemSecondaryAction className={classes.follow}>
                  <Link href={`/profile/${user._id}`}>
                    <IconButton variant="contained" color="secondary" className={classes.viewButton}>
                      <AccountBox />
                    </IconButton>
                  </Link>
                  <Button variant="contained" color="primary" onClick={() => this.handleFollow(user, i)}>
                    Follow
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </span>
          ))}
        </List>

        {/* Follow User Snackbar */}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={openSuccess}
          onClose={this.handleClose}
          autoHideDuration={6000}
          message={<span className={classes.snack}>{followingMessage}</span>}
        />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  },
  avatar: {
    marginRight: theme.spacing.unit
  },
  follow: {
    right: theme.spacing.unit * 2
  },
  snack: {
    color: theme.palette.primary.light
  },
  viewButton: {
    verticalAlign: "middle"
  }
});

export default withStyles(styles)(UserFeed);
