import React from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const faqs = [
  {
    question: 'Apa itu aplikasi ini?',
    answer:
      'Aplikasi ini adalah platform monitoring investasi peternakan kambing yang membantu pengguna dalam mengelola dan memantau investasi mereka secara real-time.',
  },
  {
    question: 'Bagaimana cara memulai investasi?',
    answer:
      'Anda dapat memulai dengan mendaftar akun, memilih jenis kambing yang tersedia, dan mengikuti langkah-langkah investasi yang disediakan di dashboard.',
  },
  {
    question: 'Apakah data saya aman?',
    answer:
      'Kami menggunakan enkripsi dan protokol keamanan terbaru untuk memastikan data Anda terlindungi dengan baik.',
  },
  {
    question: 'Siapa yang dapat saya hubungi untuk bantuan?',
    answer:
      'Anda dapat menghubungi tim dukungan kami melalui halaman kontak atau fitur live chat yang tersedia di aplikasi.',
  },
];

const FAQ = () => (
  <>
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />

      <Box
        component="main"
        sx={{
          mt: 4,
          mb: 8,
          py: 4,
          backgroundColor: '#f9fafb',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Pertanyaan yang Sering Diajukan (FAQ)
          </Typography>

          {faqs.map((faq, idx) => (
            <Accordion
              key={idx}
              sx={{
                mb: 2,
                boxShadow: 1,
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${idx}-content`}
                id={`panel${idx}-header`}
              >
                <Typography sx={{ fontWeight: 500 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      <Footer />
    </div>
  </>
);

export default FAQ;
