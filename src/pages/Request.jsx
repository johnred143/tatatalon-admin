import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

<<<<<<< HEAD
=======
const Request = () => {
>>>>>>> 266d7c4b50bdd1fb849ea3941273cdb001cac3f8
  return (
    <Container >
      <Box>
      <Card sx={{ maxWidth: 345,mt:15 }}>
      <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      
      <CardContent>
        
        <Typography variant="body2" color="text.secondary">
          Name: 
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Email: 
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Address: 
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Contact Number: 
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Request Type: 
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Status: 
        </Typography>
      </CardContent>
      </Collapse>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <CancelIcon /> 
          <Typography>
            cancel
          </Typography>
        </IconButton>
        <IconButton aria-label="share">
          <PendingActionsIcon />
          <Typography>
            pending
          </Typography>
        </IconButton>
        <ExpandMore
          
          onClick={handleExpandClick}
          aria-label="show more"
        >
          <CheckCircleIcon />
          <Typography>
            done
          </Typography>
        </ExpandMore>
      </CardActions>
     
    </Card>
      </Box>
    </Container>
  
  );
<<<<<<< HEAD
}
=======
};

export default Request;
>>>>>>> 266d7c4b50bdd1fb849ea3941273cdb001cac3f8
