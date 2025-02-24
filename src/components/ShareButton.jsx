import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import {
  Share,
  Twitter,
  Facebook,
  LinkedIn,
  Telegram,
  Reddit,
  WhatsApp,
} from "@mui/icons-material";

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
      case "telegram":
        url = `https://t.me/share/url?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent(shareText)}`;
        break;
      case "reddit":
        url = `https://www.reddit.com/submit?url=${encodeURIComponent(
          shareUrl
        )}&title=${encodeURIComponent(shareText)}`;
        break;
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          shareText
        )}%20${encodeURIComponent(shareUrl)}`;
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
          <Twitter sx={{ mr: 1, color: "primary.main" }} /> Twitter
        </MenuItem>
        <MenuItem onClick={() => shareToSocial("facebook")}>
          <Facebook sx={{ mr: 1, color: "primary.main" }} /> Facebook
        </MenuItem>
        <MenuItem onClick={() => shareToSocial("linkedin")}>
          <LinkedIn sx={{ mr: 1, color: "primary.main" }} /> LinkedIn
        </MenuItem>
        <MenuItem onClick={() => shareToSocial("telegram")}>
          <Telegram sx={{ mr: 1, color: "primary.main" }} /> Telegram
        </MenuItem>
        <MenuItem onClick={() => shareToSocial("reddit")}>
          <Reddit sx={{ mr: 1, color: "primary.main" }} /> Reddit
        </MenuItem>
        <MenuItem onClick={() => shareToSocial("whatsapp")}>
          <WhatsApp sx={{ mr: 1, color: "primary.main" }} /> WhatsApp
        </MenuItem>
      </Menu>
    </>
  );
};
