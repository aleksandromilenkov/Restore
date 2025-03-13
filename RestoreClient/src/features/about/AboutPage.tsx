import { Container, Typography, Box, Card, CardContent } from "@mui/material";

const AboutPage = () => {
  return (
    <Container maxWidth="md" sx={{pb:"10px"}}>
      <Box textAlign="center" my={4} >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          About Us
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Your ultimate destination for premium winter sports gear.
        </Typography>
      </Box>

      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Who We Are
          </Typography>
          <Typography variant="body1" color="textSecondary">
            At ReStore, we specialize in top-quality winter sports
            equipment, offering a curated selection of snowboards, jackets,
            hats, and accessories. Whether you're a seasoned pro or just
            starting out, we have everything you need for an unforgettable ride.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" color="textSecondary">
            We are passionate about winter sports and committed to providing
            high-performance gear that enhances your experience on the slopes.
            Our products are handpicked for their durability, comfort, and
            cutting-edge technology.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AboutPage;
