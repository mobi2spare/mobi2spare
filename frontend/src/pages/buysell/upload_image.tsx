import { Box, Button, Card, CardMedia, Typography, styled } from "@mui/material";
import { StyledButton } from "../../components/buttons/styled_buttons";
import RefreshIcon from '@mui/icons-material/Refresh';
import { ChangeEvent } from "react";
import placeholder_image from '../../assets/images/placeholder_add_image.svg'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const buttonStyle = {

  margin: '2rem',
  color: 'secondary',
  borderRadius: '0.8rem',
  backgroundColor: '#24293D', marginTop: '0.5rem',
  textWrap: 'nowrap'

}

const fontFamily = { fontFamily: 'SegoeUIBold' };

export function UploadImageComponent(props: any) {

  const { title, previewImage, handleImageChange } = props;

  return ( // Remove the semicolon after return
    <Box display={'grid'} sx={{ placeItems: 'center', gridTemplateColumns: '1fr' }}>
      <Typography fontSize={'1.5rem'} fontFamily={fontFamily.fontFamily}>{title}</Typography>

      <Card sx={{ backgroundColor: 'white', overflow: 'hidden', height: '100px', width: '100px', display: 'flex', flexDirection: 'column', margin: '1rem' }}>
        <CardMedia loading="lazy" sx={{ objectFit: "cover" }} alt="Product photo" component={'img'} src={previewImage || placeholder_image} ></CardMedia>

      </Card>

      <Button disableRipple={true} component="label" sx={{ ...buttonStyle, padding: '0.5rem' }} variant="contained"
        startIcon={<RefreshIcon />}
      >
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
        Reupload
      </Button >
    </Box>
  );
}
