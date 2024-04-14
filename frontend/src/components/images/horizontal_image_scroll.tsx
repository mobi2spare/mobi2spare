import { Grid, ImageListItem, ImageListItemBar } from "@mui/material";

export default function HorizontalImageList(props: any) {
    return (
      <Grid container spacing={2} style={{ overflowX: 'auto' }}>
        {props.images.map((item: string) => (
          <Grid item key={item}>
            <ImageListItem>
              <img src={item} alt="My Image" />
              <ImageListItemBar title={item} />
            </ImageListItem>
          </Grid>
        ))}
      </Grid>
    );
  }