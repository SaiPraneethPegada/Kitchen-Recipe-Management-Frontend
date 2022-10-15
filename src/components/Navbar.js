import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import { searchContext } from "../App";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigate = useNavigate();
  const context = useContext(searchContext);

  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");
  const userDetails = JSON.parse(user);
  const userName = userDetails.userName;
  //console.log(token);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
      <MenuItem onClick={() => navigate("/dashboard")}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!token ? (
        <div>
          <MenuItem>
            <Button
              variant="contained"
              className="bg-dark bg-gradient"
              onClick={() => navigate("/signin")}
            >
              Login
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              variant="contained"
              className="bg-dark bg-gradient"
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem>
            <Button color="inherit" onClick={() => navigate("/home")}>
              Home
            </Button>
          </MenuItem>
          <MenuItem>
            <Button color="inherit" onClick={() => navigate("/addRecipe")}>
              Add Recipe
            </Button>
          </MenuItem>
          <MenuItem>
            <Button color="inherit" onClick={() => navigate("/userRecipes")}>
              My Recipes
            </Button>
          </MenuItem>
          <MenuItem>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </MenuItem>
          <MenuItem>
            <IconButton
              color="inherit"
              onClick={() => {
                sessionStorage.clear();
                navigate("/signin");
              }}
            >
              <LogoutIcon />
            </IconButton>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }} className="sticky-top">
      <AppBar position="static" className="bg-dark">
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            style={{ cursor: "pointer" }}
            sx={{ display: { xs: "none", sm: "block" } }}
            onClick={() => navigate("/home")}
          >
            Recipes
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={context.searchTerm}
              onChange={(e) => context.setSearchTerm(e.target.value)}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!token ? (
              <>
                <MenuItem>
                  <Button
                    variant="contained"
                    className="bg-dark bg-gradient"
                    onClick={() => navigate("/signin")}
                  >
                    Login
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    variant="contained"
                    className="bg-dark bg-gradient"
                    onClick={() => navigate("/signup")}
                  >
                    Signup
                  </Button>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem>
                  <Button color="inherit" onClick={() => navigate("/home")}>
                    Home
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    color="inherit"
                    onClick={() => navigate("/userRecipes")}
                  >
                    My Recipes
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    color="inherit"
                    onClick={() => navigate("/addRecipe")}
                  >
                    Add Recipe
                  </Button>
                </MenuItem>
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                  <span className="mx-1">{userName}</span>
                </IconButton>
                <MenuItem>
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      sessionStorage.clear();
                      navigate("/signin");
                    }}
                  >
                    <LogoutIcon />
                  </IconButton>
                </MenuItem>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}