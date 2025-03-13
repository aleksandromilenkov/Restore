import { Container, Typography, Box, Card, CardContent } from "@mui/material";

const ContactPage = () => {
  return (
    <Container maxWidth="md">
      <Box textAlign="center" my={4}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          We’d love to hear from you! Get in touch with us for any inquiries.
        </Typography>
      </Box>

      <Card sx={{ p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Our Contact Details
          </Typography>
          <Typography variant="body1" color="textSecondary">
            📍 Address: Nikola Jonkov Vapcarov 10, Bansko, Pirin <br />
            📞 Phone: +1 (555) 123-4567 <br />
            📧 Email: support@restore.com <br />
            🕒 Hours: Mon-Fri: 9AM - 6PM
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ContactPage;
