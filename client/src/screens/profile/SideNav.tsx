import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface SideNavProps {
  menuItems: Array<string>
  width: number,
  itemHeight: number,
  selectedIndex: number
  onSelect: (index: number) => void
}

const SideNav = ({ menuItems, width, itemHeight, selectedIndex, onSelect }: SideNavProps) => {
  const theme = useTheme();

  const HIGHLIGHT_HEIGHT = itemHeight - 8;

  const renderMenuItems = () => {
    return menuItems.map((item, index) => (
      <div key={`${item}`}>
        <Box
          height={HIGHLIGHT_HEIGHT}
          marginTop={theme.spacing(1)}
          marginBottom={theme.spacing(1)}
          onClick={() => onSelect(index)}
          bgcolor={index === selectedIndex ? "secondary.main" : "white"}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          flex="0 auto"
          sx={[
            index !== selectedIndex && {
              "&:hover": { bgcolor: "secondary.light" }
            }
          ]}
        >
          <Box 
            width={3} 
            height={HIGHLIGHT_HEIGHT} 
            bgcolor={index === selectedIndex ? "primary.main" : "inherit"} 
            marginRight={theme.spacing(2)} />
          <Typography>{item}</Typography>
        </Box>
        {index < menuItems.length - 1 && <Divider/>}
      </div>
    ));
  };

  return (
    <Box
      width={width}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
    >
      {renderMenuItems()}
    </Box>
  );
};

export default SideNav;