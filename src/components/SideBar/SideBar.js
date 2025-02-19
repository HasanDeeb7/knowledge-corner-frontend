import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import logo from '../../assets/images/book1.jpg'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Person from '@mui/icons-material/Person';
import MoveDown from '@mui/icons-material/MoveDown';
import Sell from '@mui/icons-material/Sell';
import Settings from '@mui/icons-material/Settings';
import SwapVert from '@mui/icons-material/SwapVert';
import PublishedWithChanges from '@mui/icons-material/PublishedWithChanges'
import { Avatar } from '@mui/material'
import Notifications from '../TopSide/Notifications';
import { AccountPopover } from '../TopSide/AccountPopover';
import { usePopover } from '../TopSide/usePopover'; 
import { Outlet, NavLink } from 'react-router-dom';
import './Sidebar.css'
import Books from '../../assets/icons/books-stack-of-three 2.svg'
import PersonIcon from '@mui/icons-material/Person';
import booksIcon from '../../assets/icons/open-book.png'
import authorIcon from '../../assets/icons/author.png'
import libraryIcon from '../../assets/icons/library1.png'
import categoryIcon  from '../../assets/icons/category.png'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import DrawIcon from '@mui/icons-material/Draw';
import CategoryIcon from '@mui/icons-material/Category';
import { Helmet } from 'react-helmet';


const menuItems=[
  { text:'Users',url:'/adminAllUsers',icon:<PersonIcon/>},
  { text:'Authors',url:'/adminAllAuthors',icon:<DrawIcon/>},
  { text:'Books',url:'/adminAllBooks',icon:<AutoStoriesIcon/>},
  { text:'Libraries',url:'/adminAllLibraries',icon:<CollectionsBookmarkIcon/>},
  { text:'Catgories',url:'/adminAllCategories',icon:<CategoryIcon/>},
]

const drawerWidth = 240;
const icons = [<Person />, <SwapVert />, <MoveDown />, <PublishedWithChanges />, <Sell />, <Settings />];
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',

  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    color: 'red',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
      '@media (max-width: 500px)': {
        display: 'none',
      },
    }),
  }),
);



export default function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const accountPopover = usePopover();


  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  React.useEffect(() => {
    console.log(window.innerWidth)
    const handleResize = () => {
      setOpen(window.innerWidth > 500);
    };
    
    handleResize()
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <>
      <Box>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ backgroundColor: 'white' }}>
          <Toolbar sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', justifyContent:"space-between",alignItems:"center"}}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  ...(open && { display: 'none' }),
                  width:"50px",
                  height:"50px",
                  color:"black"
                }}
              >
                <ChevronRightIcon />
              </IconButton>
              <Typography variant="h6" noWrap component={NavLink}  to={'/'} className='logo' sx={{
                color: 'white',
                color:"black",
                mr: 2,
                display: 'flex',
                fontFamily: 'fantasy',
                // fontWeight: 700,
                letterSpacing: '.1rem',
                textDecoration: 'none',
                borderRadius: 1,
                p: 1,
                ...(open && { display: 'none' }),
                '@media(width<500px)': {
                  display: 'none',
                },
justifyContent:"space-between",
alignItems:"center"
              }}>
                <img src={Books} style={{width:"50px"}}/>
                <h1  style={{
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', sans-serif",
  fontSize: "23px"
}}>Sapiens</h1>

              </Typography>
            </Box>
            
            <Box component='nav' sx={{ display: 'flex' }}>
              <Avatar
                onClick={accountPopover.handleOpen}
                ref={accountPopover.anchorRef}
                sx={{
                  cursor: 'pointer',
                  height: 40,
                  width: 40,
                  marginLeft: 1.5
                }}
                src=""
              />
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} sx={{

          ...(!open && {
            '@media(width<500px)': {
              display: 'none'
            }
          })
         
        }}>
          <DrawerHeader sx={{display:"flex",justifyContent:"space-between"}}>
            <Typography variant="h6" noWrap component={NavLink}  to={'/'} className='logo' sx={{
              color: 'Black',
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'fantasy',
              letterSpacing: '.1rem',
              textDecoration: 'none',
              borderRadius: 1,
              p: 1,
              justifyContent:"space-between",
alignItems:"center"
            }}>
              
              <img src={Books} style={{width:"50px"}}/>
                <h1  style={{
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', sans-serif",
  fontSize: "23px"
}}>Sapiens</h1>
            </Typography>
            <IconButton onClick={handleDrawerClose} sx={{width:"50px",height:"50px",borderRadius: "50%",
}}>
              {theme.direction === 'rtl' ? <ChevronRightIcon  /> : <ChevronLeftIcon   />}
            </IconButton>

          </DrawerHeader>

          <List>

            {menuItems.map((menuItem, index) => (
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "activee" : ""
                  }
                  component={NavLink}
                  to={`/dashboard${menuItem.url}`}
                  exact
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    p: 2.5,
                    borderLeft:'4px solid transparent',
                    
                  }}

                >

                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    
                    }}
                  >
                    {menuItem.icon}
                  </ListItemIcon>
                  <ListItemText primary={menuItem.text} sx={{opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

        </Drawer>
        <AccountPopover
          anchorEl={accountPopover.anchorRef.current}
          open={accountPopover.open}
          onClose={accountPopover.handleClose}
        />
      </Box>
      <Outlet />
    </>
  );
}