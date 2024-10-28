import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Share, Twitter, Facebook, LinkedIn } from "@mui/icons-material";

export const ShareButton = ({ songTitle, stationTitle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setAnchorEl(null);
  };

  const shareToSocial = (platform) => {
    const shareText = `Escuchando ${songTitle} en ${stationTitle}`;
    const shareUrl = window.location.href;
    let url;

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          shareUrl
        )}&title=${encodeURIComponent(shareText)}`;
        break;
      default:
        return;
    }

    window.open(url, "_blank");
    handleShareClose();
  };

  return (
    <>
      <IconButton
        onClick={handleShareClick}
        size="small"
        sx={{ color: "secondary.main" }}
      >
        <Share />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleShareClose}>
        <MenuItem onClick={() => shareToSocial("twitter")}>
          <Twitter sx={{ mr: 1 }} /> Twitter
        </MenuItem>
        <MenuItem onClick={() => shareToSocial("facebook")}>
          <Facebook sx={{ mr: 1 }} /> Facebook
        </MenuItem>
        <MenuItem onClick={() => shareToSocial("linkedin")}>
          <LinkedIn sx={{ mr: 1 }} /> LinkedIn
        </MenuItem>
      </Menu>
    </>
  );
};
