import React from 'react'
import './app.css'
import { Container } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    marginTop:30,
    marginLeft:30,
    width: theme.spacing(7)+40,
    height: theme.spacing(7)+40,
  },
}));
function App() {
  const classes=useStyles()
  const [state,setState]=React.useState({})
  const [name,setName]=React.useState('')
  const [flag,setFlag]=React.useState(true)
  const [message,setMessage]=React.useState('Please Search Github User')

  React.useEffect(()=>{
const getUserInfo=()=>{
  fetch(`https://api.github.com/users/${name}`)
  .then(res=>res.json())
  .then(data=>{
    console.log(data)
    setState(data)
  })
}
getUserInfo()

  }
,[flag]  
  )

 
  return (
   <Container className="container" maxWidth="sm">

     {/*Nav Bar */}
     <Box className="nav-box">
     <Typography className="logo" variant="h5">devFinder</Typography>
     
       <Box className="light-dark">
       <h5 className="light"  >LIGHT</h5>
       <Button><WbSunnyIcon className="icon"/></Button>
       </Box>
     </Box>

     {/*Search Box*/}
     <Box className="search-box">
       <Box className="search-left">
         <SearchIcon/>
          <input className="textfield" value={name} onChange={(e)=>setName(e.target.value)}  placeholder="Search Github username..." type="text"/>
       </Box>
       <Box className="serach-right">
         <button className="search-btn" onClick={()=>setFlag(!flag)}>Search</button>
       </Box>
     </Box>

{/*Details Box*/}
{state.name?<Box className="details-box">
<Grid container spacing={1}>

  <Grid item sm={4}>
    <Avatar alt="developer image" src={state.avatar_url} className={classes.large}/>
  </Grid>

  <Grid item container sm={8}>
     
     <Grid item sm={12}>
         <Grid className="row1"  container>
           <Grid item sm={6} xs={12}>
             <h4>{state.name}</h4>
           </Grid>
           <Grid item sm={6} xs={12}>
             <h6>{state.created_at}</h6>
           </Grid>
         </Grid>
     </Grid>
     
     <Grid item sm={12}>
       <Grid container>
         <Grid sm={12}>
           <h6 className="username">@{state.login}</h6>
         </Grid>
       </Grid>
     </Grid>

     <Grid item sm={12}>
       <Grid container>
         <Grid sm={12}>
           <p className="description">{state.bio}</p>
         </Grid>
       </Grid>
     </Grid>
      
    <Grid item sm={12}>
      <div className="followers-box">
         <div className="repos">
           <h6>Repos</h6>
           <p>{state.public_repos}</p>
         </div>
         <div className="followers">
           <h6>Followers</h6>
           <p>{state.followers}</p>
         </div>
         <div className="following">
           <h6>Following</h6>
           <p>{state.following}</p>
         </div>
      </div>
    </Grid>

    <Grid item sm={11}>
      <Grid container spacing={6}>
        <Grid item sm={6}>
          <div className="location">
             <LocationOnIcon/>
             <p>{state.location?state.location:'Not Available'}</p>
          </div>
        </Grid>
        <Grid item sm={6}>
          <div className="location right">
             <TwitterIcon/>
             <p>{state.twitter_username?state.twitter_username:"Not Available"}</p>
          </div>
        </Grid>
      </Grid>
    </Grid>

    <Grid item sm={11}>
      <Grid container spacing={6}>
        <Grid item sm={6}>
          <div className="location margin">
             <LinkIcon/>
             <p>{state.blog?state.blog:"Not Available"}</p>
          </div>
        </Grid>
        <Grid item sm={6}>
          <div className="location right margin">
             <TwitterIcon/>
             <p>{state.company?state.company:"Not Available"}</p>
          </div>
        </Grid>
      </Grid>
    </Grid>

  </Grid>
  
</Grid>
</Box>:state.name===null?<h1>Enter Valid username</h1>:<h1>Please Search Github User</h1>}

   </Container>
  );
}

export default App;
